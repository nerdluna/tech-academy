# Editorial RSS (V1)

Frontend de leitor RSS pessoal com estética editorial dark e interações de triagem.

## Ambiente Jekyll para GitHub Pages

Este projeto agora está estruturado como site Jekyll para publicação no GitHub Pages.

### Estrutura Jekyll

- `_config.yml` — configuração do site Jekyll.
- `_layouts/default.html` — layout base com fontes, CSS e scripts.
- `index.md` — página inicial que renderiza o app no `#root`.
- `app.jsx` — lógica React (filtros, busca, favoritos, inbox zero, preview).
- `styles.css` — tema editorial dark e layout responsivo.

### Deploy no GitHub Pages

1. Garanta que a branch padrão do repositório seja `main`.
2. Faça push dos arquivos para o GitHub.
3. O workflow `.github/workflows/jekyll-gh-pages.yml` fará build e deploy automático.
4. Em **Settings → Pages**, confirme a opção **GitHub Actions** como source.
