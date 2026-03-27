# Editorial RSS (V1)

Frontend de leitor RSS pessoal com estética editorial dark e interações de triagem.

## Rodando em localhost

```bash
cd editorial-rss
python3 -m http.server 5173
```

Abra no navegador:
- `http://localhost:5173`

## Estrutura

- `index.html` — shell da aplicação e carregamento de libs CDN.
- `app.jsx` — lógica React (filtros, busca, favoritos, inbox zero, preview).
- `styles.css` — tema editorial dark e layout responsivo.
