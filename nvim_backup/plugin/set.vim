syntax on
filetype plugin on

set tabstop=4 softtabstop=4
set shiftwidth=4
set expandtab
set smartindent
set relativenumber
set signcolumn=yes
set number
set hidden
set nobackup
set updatetime=50
set scrolloff=8
set wildignore+=**/*/node_modules
set wildignore+=**/.git
set wildignore+=**/build
set wildignore+=**/dist
set wildignore+=**/.next
set wildignore+=**/*.zip
set background=dark

if has("patch-8.1.1564")
  set signcolumn=number
else
  set signcolumn=yes
endif
