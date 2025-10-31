if [ "$DISTRO"="Ubuntu" ]
then
    echo "Installing vim..."
    sudo apt install vim -y
    echo "Installing vim-plug for plugins in vim"
    curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
        https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

    echo "Installing all vim plugins"
    vim -es -u ../.vimrc -i NONE -c "PlugInstall" -c "qa"
elif [ "${DISTRO}"="Debian" ]
    sudo apt install vim -y
else
    echo "try installing yourself"
fi
