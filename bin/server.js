const os = require("os");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { createServer, IncomingMessage, ServerResponse } = require("http");

let fileData = "";

function getLocalIp() {
  const interfaces = Object.values(os.networkInterfaces());
  for (let iface of interfaces) {
    for (let alias of iface) {
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
  return "0.0.0.0";
}

const sub_process = exec("pwd");

class Router {
  /**
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  constructor(req, res) {
    /**
     * @property {Array<string>} urls
     */
    this.urls = [];
    this.routes = [];
    this.req = req;
    this.res = res;
    //    this.res = Object.assign(res, {send});
    this.res.body = "";
    /**
     * @param {string} message
     */
    this.res.send = (message) => {
      this.res.write(message);
      this.res.end();
    };
    /**
     * @param {string} fileName - Name of file to send
     */
    this.res.sendFile = (fileName) => {
      const ext = fileName.split(".")[1];
      const halfFileName = fileName.split(".")[0];
      const newFileName = halfFileName + "." + ext;
      if (
        ext === "png" ||
        ext === "zip" ||
        ext === "jpg" ||
        ext === "gif" ||
        ext === "ico" ||
        ext === "svg" ||
        ext === "mp4" ||
        ext === "avi" ||
        ext === "pdf"
      ) {
        if (ext === "ico") {
          this.res.writeHead(200, { "Content-Type": `image/x-icon` });
        } else if (ext === "svg") {
          this.res.writeHead(200, { "Content-Type": `image/svg+xml` });
        } else if (ext === "mp4" || ext === "avi") {
          this.res.writeHead(200, { "Content-Type": `video/${ext}` });
        } else if (ext === "pdf") {
          this.res.writeHead(200, { "Content-Type": `application/${ext}` });
        } else if (ext === "zip") {
          const currentFileNameArray = fileName.split("/");
          const currentFileName =
            currentFileNameArray[currentFileNameArray.length - 1];
          const stat = fs.statSync(fileName);
          this.res.writeHead(200, {
            "Content-Type": "application/" + ext,
            "Content-Disposition": "attachment; filename=" + currentFileName,
            "Content-Length": stat.size,
          });
        } else {
          this.res.writeHead(200, { "Content-Type": `image/${ext}` });
        }
        const stream = fs.createReadStream(fileName);
        stream.pipe(this.res);
      } else {
        fs.readFile(newFileName, { encoding: "utf8" }, (err, data) => {
          if (err) {
            this.res.send(err);
          } else {
            let dataToSend = data;
            fileData = data;
            if (fileName.includes("html")) {
              const newData = data.split("\n").reverse();
              for (let i = 0; i < newData.length; i++) {
                if (newData[i].includes("body")) {
                  const htmlNeeded = data.split(newData[i])[0];
                  const htmlToAdded =
                    `
                  <script>
                    const checkChange = async () => {
                        try {
                            const res = await fetch("/change", {
                              method: "POST",
                              headers: {
                                "Content-type": "*/* plain/text",
                                "Accept": "application/json"
                              },
                              body: JSON.stringify({route: location, content: ` +
                    `${JSON.stringify(data.split("/script"))}` +
                    `})
                            });
                            const data = await res.json()
                            if(data.msg){
                              location.reload();
                            }
                        }catch(e){
                            console.error(e)
                        }
                    }
                    setInterval(() => {
                      checkChange()
                    }, 5000)
                  </script>
                  `;
                  const result = [
                    ...htmlNeeded,
                    ...htmlToAdded,
                    "\n</body>\n",
                    "</html>",
                  ];
                  dataToSend = result.join("");
                  break;
                }
              }
            }
            if (ext === "png") {
              this.res.writeHead(200, { "Content-Type": "image/png" });
            }
            this.res.send(dataToSend);
          }
        });
      }
    };
  }
  /**
   * get method for get request
   * @param {string} url
   * url is url for that particular route
   * @param {(req:IncomingMessage, res: ServerResponse) => void} callback
   * callback is a function that will be called when request will be made to that url
   */
  get(url, callback) {
    this.routes.push({ url, callback, method: "GET" });
  }
  resolve() {
    this.routes.forEach((route) => {
      if(
        this.req.url === route.url &&
        this.req.method === route.method
      )
      {
        if(this.req.method === "GET") {
          route.callback(this.req, this.res);
        }else if(this.req.method === "POST"){
            let bodyData = "";
            this.req.on("data", (data) => {
              bodyData += data.toString();
            });
            this.req.on("end", () => {
              this.req.body = bodyData;
              this.req.__proto__.body = JSON.parse(bodyData);
              route.callback(this.req, this.res);
            });
        }
        return;
      }
    })
  }
  /**
   * post method for post request
   * @param {string} url
   * url is string for that particular route
   * @param {(req:IncomingMessage, res: ServerResponse) => void} callback
   * callback is a function that will be called when request will be made to that url
   */
  post(url, callback) {
    this.routes.push({ url, callback, method: "POST" });
  }
}


sub_process.stdout.on("data", (data) => {
  /**
   * Get list of files in directory
   * @returns {string[]}
   */
  const getFiles = () => {
    let countDataDir = 0;
    /**
     * @type {string[]} files
     * It will contain all the files
     */
    const files = [];
    /**
     * @param {string} directory
     * Name of directory
     */
    const getDirectory = (directory) => {
      if (directory.trim() === data.trim()) {
        countDataDir = countDataDir + 1;
      }
      if (
        (directory.trim() === data.trim() && countDataDir <= 1) ||
        directory.trim() !== data.trim()
      ) {
        fs.readdirSync(directory).forEach((file) => {
          const absolute = path.join(directory, file);
          if (fs.statSync(absolute).isDirectory()) {
            return absolute;
            //return getDirectory(absolute);
          } else {
            return files.push(absolute.replace(data.replace("\n", ""), ""));
          }
        });
      }
    };
    getDirectory(data.replace("\n", ""));
    return files;
  };

  if (process.argv[2]) {
    process.env.PORT = process.argv[2];
  }
  /**
   * @type {string | number} port
   */
  let port = process.env.PORT ?? 5000;
  const server = createServer((req, res) => {
    const router = new Router(req, res);
    const staticFiles = getFiles();
    let result = "";
    let isFile = false;

    router.get("/", (req, res) => {
      staticFiles.forEach((file, idx) => {
        if (file === "/index.html") {
          isFile = true;
        } else {
          if (idx === 0) {
            result += `
            <li>
                <a href="./">/</a>
            </li>
            `;
          } else {
            result += `<li>
            <a href="./${file.replace("/", "")}">
                ${file.replace("/", "")}
              </a>
            </li>`;
          }
        }
      });

      if (isFile) {
        res.sendFile(data.replace("\n", "") + "/index.html");
      } else {
        //console.log(result);
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
            <title> Files List </title>
            </head>
            <style>
              *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
              }
              body{
                font-family: Verdana, Geneva, sans-serif;
                width: 98vw;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 2rem;
                font-weight: bold;
              }
              ul {
                display: flex;
                justify-content: center;
                flex-direction: column;
                overflow: scroll;
              }
              ul > li {
                list-style: none;
                padding: 1rem;
                border: 1px solid #333;
                border-bottom: none;
              }
              /*
              ul > li:nth-child(${staticFiles.length - 1}) {
                border-bottom: 1px solid #f00;
                background-color: #0f0;
              }*/
              ul > li:hover {
                background-color: #b7b7b7;
              }
              ul > li > a {
                text-decoration: none;
              }
            </style>
            <body>
                <ul>${result}</ul>
            </body>
            </html>
         `);
      }
    });

    staticFiles.forEach((file) => {
        router.get(file, (req, res) => {
          res.sendFile(data.replace("\n", "") + file);
        });
    })

    router.get("/change", (req, res) => {
      res.send(JSON.stringify({ msg: false }));
    });

    router.post("/change", (req, res) => {
      let result = "";
      req.on("data", (data) => {
        result += data;
      });
      req.on("end", () => {
        let filename = "";
        const resultObject = JSON.parse(result);
        if (resultObject.route.pathname === "/") {
          filename = "index.html";
        } else {
          filename = resultObject.route.pathname.split("/")[1];
        }
        const newFileName = data.replace("\n", "/") + filename;
        fs.readFile(newFileName, { encoding: "utf8" }, (err, newFileData) => {
          if (err) {
            res.send(JSON.stringify({ msg: false }));
          } else {
            if (newFileData === resultObject.content.join("/script")) {
              res.send(JSON.stringify({ msg: false }));
            } else {
              res.send(JSON.stringify({ msg: true }));
            }
          }
        });
      });
    });
    router.resolve();
  });


  server.listen(port, () => {
    console.log(
      `\n\x1b[1;44;38m server is up and runing on http://localhost:${port}.\x1b[0m\n`,
      `\x1b[1;42;38m you can also check your website on connected devices on http://${getLocalIp()}:${port}.\x1b[0m\n`,
    );
  });

  server.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
      console.log("Address in use, retrying...");
      setTimeout(() => {
        port = port + 1;
        server.close();
        server.listen(port, () =>
          console.log(
            `\n\x1b[1;44;38m server is up and runing on http://localhost:${port}.\x1b[0m\n`,
            `\x1b[1;42;38m you can also check your website on connected devices on http://${getLocalIp()}:${port}.\x1b[0m\n`,
          ),
        );
      }, 1000);
    }
  });
});
