if [ "$DISTRO"="Ubuntu" ]
then
    echo "Installing neovim"
    sudo add-apt-repository ppa:neovim-ppa/stable
    sudo apt update
    sudo apt install neovim -y
    sudo apt install python-dev python-pip python3-dev python3-pip -y
    sudo apt install python-neovim -y
    sudo apt install python3-neovim -y
    echo "Installing vim-plug for neovim"
    sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
        https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'

    echo "Installing plugins for neovim"
    nvim -es -u ../nvim/init.vim -i NONE -c "PlugInstall" -c "qa"

else
    echo "try installing yourself"
fi
