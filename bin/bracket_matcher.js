function checkBracket(source) {
    let bracketString = "";
    let countWhileLoop = 0;
    let countWhileLoopLimit = 0;
    for(let i = 0; i < source.length; i++){
        if(source[i] === "("
            || source[i] === ")"
            || source[i] === "{"
            || source[i] === "}"
            || source[i] === "["
            || source[i] === "]"
        ){
            bracketString += source[i];
        }
    }
    countWhileLoopLimit = bracketString.length;
    //console.log("intial brackets: ", bracketString);
    while (bracketString.length !== 0){
        let result = compareStack(bracketString);
        bracketString = result === undefined ? bracketString: result;
        if(result === undefined){
            console.log("can not found pair for \"%s\"", bracketString[bracketString.length - 1])
            return bracketString;
        }
        if(countWhileLoop > countWhileLoopLimit){
            console.log("countWhileLoop: ", countWhileLoop)
            return bracketString;
        }
        countWhileLoop++;
    }
    if(bracketString.length <= 0){
        console.log("All pairs matched\n")
    }
    return bracketString;
}

function compareStack(source){
    let bracketString = source;
    let result = "";
    for(let i = 0; i < bracketString.length; i++){
        let tmp = "";
        let tmpIndex = 0;
        for(let k = 0; k < bracketString.length; k++){
            if( bracketString[k] === "("
                || bracketString[k] === "{"
                || bracketString[k] === "["
            ){
                tmp = bracketString[k]
                tmpIndex = k;
            }
        }
        //console.log("tmp: %s, bracketString[tmpIndex + 1]: %s, tmpIndex: %d", tmp, bracketString[tmpIndex + 1], tmpIndex);
        if((tmp === "(" && bracketString[tmpIndex + 1] === ")") ||
           (tmp === "{" && bracketString[tmpIndex + 1] === "}") ||
           (tmp === "[" && bracketString[tmpIndex + 1] === "]")
        ){
            result = "";
            for(let k = 0; k < bracketString.length; k++){
                if(bracketString[tmpIndex + 1] !== undefined){
                    if(k !== tmpIndex && k !== tmpIndex + 1){
                        result += bracketString[k];
                    }
                }else{
                    return undefined;
                }
            }
            bracketString = "";
            for(let k = 0; k < result.length; k++){
                bracketString += result[k];
            }
        }else {
            if(bracketString[tmpIndex + 1] === undefined){
                return undefined;
            }
        }
    }
    return bracketString;
}

console.log(checkBracket("((){{}}))"))
console.log(checkBracket("(({}()))"))
console.log(checkBracket("({{(({{((({{{{{((((({{{{{{{{{{{{{{{{{{{{{{{{{{((((((((((((((((((((((((((((((((({{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}})))))))))))))))))))))))))))))))))}}}}}}}}}}}}}}}}}}}}}}}}}})))))}}}}})))}}))}})"))
