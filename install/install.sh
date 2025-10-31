#!/bin/sh

export DISTRO=$(lsb_release --id | awk '{print $3}')
echo "Your operating system is ${DISTRO}. \nChecking....\nIf I can install softwares"

echo "updating"

if [ "$DISTRO"="Ubuntu" ]
then
    sudo apt update && sudo apt upgrade -y
elif [ "${DISTRO}"="Debian" ]
    sudo apt update && sudo apt upgrade -y
elif [ "$DISTRO"="Arch" ]
    pacman -Syy
else
    echo "#######################################################################"
    echo "#                                                                     #"
    echo "#                 your distro not is supported                        #"
    echo "#                                                                     #"
    echo "#######################################################################"
fi

echo "installing softwares........."
echo "It may take sometime"

echo "Changing permission to all install scripts in this directory"
chmod +x ./git.sh
chmod +x ./vim.sh
chmod +x ./nvim.sh
chmod +x ./awesome.sh
chmod +x ./brave.sh

echo "Installing softwares"
./git.sh
./vim.sh
./nvim.sh
./awesome.sh
./brave.sh
echo "All softwares should be installed."

echo "creating ${HOME}/.config"
mkdir ${HOME}/.config
echo "${HOME}/.config is created"

echo "linking all files"
ln -s ${HOME}/dotfiles/.gitconfig ${HOME}/.gitconfig
ln -s ${HOME}/dotfiles/.vimrc ${HOME}/.vimrc
ln -s ${HOME}/dotfiles/.tmux.conf ${HOME}/.tmux.conf
ln -s ${HOME}/dotfiles/.zshrc ${HOME}/.zshrc
ln -s ${HOME}/dotfiles/.Xresources ${HOME}/.Xresources
ln -s ${HOME}/dotfiles/nvim ${HOME}/.config/nvim
ln -s ${HOME}/dotfiles/awesome ${HOME}/.config/awesome
ln -s ${HOME}/dotfiles/.screenrc ${HOME}/.screenrc
ln -s ${HOME}/dotfiles/.nanorc ${HOME}/.nanorc
ln -s ${HOME}/dotfiles/.nano ${HOME}/.nano
ln -s ${HOME}/dotfiles/.inputrc ${HOME}/.inputrc
echo "all files are linked"
