if filereadable(expand("~/.local/share/nvim/site/autoload/plug.vim"))
    call plug#begin("~/.vim/plugged")
    Plug 'HerringtonDarkholme/yats.vim'
    Plug 'gruvbox-community/gruvbox'
    Plug 'airblade/vim-gitgutter'
    Plug 'puremourning/vimspector'
    Plug 'szw/vim-maximizer'
    Plug 'neoclide/coc.nvim', {'branch': 'release'}
    Plug 'vivek80801/Brackets'
    call plug#end()

    colorscheme gruvbox
else
    echo "plug is not installed"
    colorscheme pablo
endif

let mapleader = " "
