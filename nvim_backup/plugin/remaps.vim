inoremap jj <Esc>
nnoremap ew <C-w><C-w>
nnoremap eh <C-w>h
nnoremap el <C-w>l
nnoremap <leader>; A;<Esc>
nnoremap <leader>e :Lexplore<CR>
nnoremap <leader>w :w<CR>
nnoremap <leader>wq :wq<CR>
nnoremap <leader>q :q<CR>
nnoremap <leader>qq :q!<CR>
nnoremap <leader>re :so<Space>%<CR>
nnoremap <leader>st :e<Space>**/*.ts
nnoremap <leader>sj :e<Space>**/*.js
nnoremap <leader>sx :e<Space>**/*.tsx
nnoremap <leader>t :terminal<CR>
nnoremap <leader>y "+yy:echo "copied to calipboard"<CR>
nnoremap <leader>p "+p:echo "pasted from calipboard"<CR>
vnoremap <leader>y "+yy:echo "copied to calipboard"<CR>
vnoremap <leader>p "+p:echo "pasted from calipboard"<CR>
tnoremap jj <C-\><C-n>
" go to the file from where error is coming and press CTRL+u to come back to
" terminal
tnoremap <leader>gf <C-w>F
nnoremap <c-j> :cnext<CR>
nnoremap <c-k> :cprev<CR>
nnoremap <leader>j :lnext<CR>
nnoremap <leader>k :lprev<CR>

" React specific
au fileType typescriptreact iab rfce import<Space>React<Space>from<Space>"<Esc>A<bs>react"<Esc>A<bs>;<CR><CR>const<Space><Esc>:put =expand('%:t')<CR><Esc>kJA<bs><bs><bs><bs> :React.FC = ():JSX.Element => {<CR>return(<CR><<Esc>la<CR><<Esc>a/<Esc>A<bs><CR><CR>export default<Esc>:put =expand('%:t')<CR>kJA<bs><bs><bs><bs>;<Esc>3ko
au fileType typescriptreact iab st const<Space>[state,<Space>setState<Esc>A<Space>=<Space>React.useState(<Esc>A;<Esc>F(a
au fileType typescriptreact iab ef const<Space>[state,<Space>setState<Esc>A<Space>=<Space>React.useState(<Esc>A;<Esc>F(a

""if executable('intelephense')
""  augroup LspPHPIntelephense
""    au!
""    au User lsp_setup call lsp#register_server({
""        \ 'name': 'intelephense',
""        \ 'cmd': {server_info->[&shell, &shellcmdflag, 'intelephense --stdio']},
""        \ 'whitelist': ['php'],
""        \ 'initialization_options': {'storagePath': '/tmp/intelephense'},
""        \ 'workspace_config': {
""        \   'intelephense': {
""        \     'files': {
""        \       'maxSize': 1000000,
""        \       'associations': ['*.php', '*.phtml'],
""        \       'exclude': [],
""        \     },
""        \     'completion': {
""        \       'insertUseDeclaration': v:true,
""        \       'fullyQualifyGlobalConstantsAndFunctions': v:false,
""        \       'triggerParameterHints': v:true,
""        \       'maxItems': 100,
""        \     },
""        \     'format': {
""        \       'enable': v:true
""        \     },
""        \   },
""        \ }
""        \})
""  augroup END
""endif

""if exists('*complete_info')
""  inoremap <expr> <cr> complete_info()["selected"] != "-1" ? "\<C-y>" : "\<C-g>u\<CR>"
""else
""  inoremap <expr> <cr> pumvisible() ? "\<C-y>" : "\<C-g>u\<CR>"
""endif

" Use tab for trigger completion with characters ahead and navigate.
" NOTE: Use command ':verbose imap <tab>' to make sure tab is not mapped by
" other plugin before putting this into your config.
"inoremap <silent><expr> <TAB>
"      \ pumvisible() ? "\<C-n>" :
"      \ <SID>check_back_space() ? "\<TAB>" :
"      \ coc#refresh()
"inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

" Use `[g` and `]g` to navigate diagnostics
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

" GoTo code navigation.
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)


" Applying codeAction to the selected region.
" Example: `<leader>aap` for current paragraph
xmap <leader>a  <Plug>(coc-codeaction-selected)
nmap <leader>a  <Plug>(coc-codeaction-selected)

" Remap keys for applying codeAction to the current line.
nmap <leader>ac  <Plug>(coc-codeaction)
" Apply AutoFix to problem on the current line.
nmap <leader>qf  <Plug>(coc-fix-current)

" Introduce function text object
" NOTE: Requires 'textDocument.documentSymbol' support from the language server.
xmap if <Plug>(coc-funcobj-i)
xmap af <Plug>(coc-funcobj-a)
omap if <Plug>(coc-funcobj-i)
omap af <Plug>(coc-funcobj-a)


" Add `:Format` command to format current buffer.
command! -nargs=0 Format :call CocAction('format')

" Add `:Fold` command to fold current buffer.
command! -nargs=? Fold :call     CocAction('fold', <f-args>)

" Add `:OR` command for organize imports of the current buffer.
command! -nargs=0 OR   :call     CocAction('runCommand', 'editor.action.organizeImport')

" Add (Neo)Vim's native statusline support.
" NOTE: Please see `:h coc-status` for integrations with external plugins that
" provide custom statusline: lightline.vim, vim-airline.
set statusline^=%{coc#status()}%{get(b:,'coc_current_function','')}

