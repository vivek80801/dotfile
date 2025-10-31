echo "Installing git..."
if [ "$DISTRO"="Ubuntu" ]
then
    sudo add-apt-repository ppa:git-core/ppa
    sudo apt update
    sudo apt install git -y
elif [ "$DISTRO"="Debian" ]
    sudo apt install git
elif [ "$DISTRO"="Arch" ]
    pacman -s git
else
    echo "try installing by yourself"
fi
