const { useMemo, useState } = React;
const { AnimatePresence, motion } = Motion;

const seedPosts = [
  {
    id: 1,
    title: "How AI Search Is Reshaping Content Discovery",
    source: "The Interface",
    category: "AI",
    excerpt: "Publishers are adapting to intent-driven discovery models and richer snippets.",
    body: "The feed is fragmenting across products, forcing teams to rethink distribution and attention. Editorial workflows now include social-native framing, metadata strategy, and automated curation.",
    read: false,
    favorite: true,
    date: "Hoje"
  },
  {
    id: 2,
    title: "Design Systems That Scale With Small Teams",
    source: "UX Weekly",
    category: "Design",
    excerpt: "A practical blueprint for keeping consistency without blocking experiments.",
    body: "A healthy design system behaves like an API. Teams move faster when primitives are stable but composition is flexible. Governance can be lightweight if documentation is embedded in delivery.",
    read: false,
    favorite: false,
    date: "Ontem"
  },
  {
    id: 3,
    title: "Performance Budgeting for Content-Heavy Apps",
    source: "Frontend Digest",
    category: "Engineering",
    excerpt: "Dense interfaces remain smooth with strict rendering budgets.",
    body: "Set clear budgets for JS, images, and layout shifts. Prioritize skeletons, optimistic UX, and progressive hydration. Measure interaction latency continuously, not just load time.",
    read: true,
    favorite: false,
    date: "2 dias"
  },
  {
    id: 4,
    title: "The Return of Long-Form Editorial Interfaces",
    source: "Readwise Blog",
    category: "Product",
    excerpt: "Users are spending more time in calm, focused reading environments.",
    body: "Readers reward clarity and hierarchy. Calm visual rhythm, typography, and subtle motion can significantly increase completion and retention in high-information products.",
    read: false,
    favorite: false,
    date: "3 dias"
  }
];

function App() {
  const [posts, setPosts] = useState(seedPosts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [source, setSource] = useState("all");
  const [selectedId, setSelectedId] = useState(seedPosts[0].id);

  const sources = ["all", ...new Set(posts.map((post) => post.source))];

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const bySearch = post.title.toLowerCase().includes(search.toLowerCase());
      const byFilter =
        filter === "all" ||
        (filter === "unread" && !post.read) ||
        (filter === "favorites" && post.favorite);
      const bySource = source === "all" || post.source === source;
      return bySearch && byFilter && bySource;
    });
  }, [posts, search, filter, source]);

  const selectedPost = posts.find((post) => post.id === selectedId) || filtered[0] || null;

  const openPost = (id) => {
    setSelectedId(id);
    setPosts((current) =>
      current.map((post) => (post.id === id ? { ...post, read: true } : post))
    );
  };

  const toggleFavorite = (id, event) => {
    event.stopPropagation();
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, favorite: !post.favorite } : post
      )
    );
  };

  const inboxZero = () => {
    setPosts((current) => current.map((post) => ({ ...post, read: true })));
  };

  const unreadCount = posts.filter((post) => !post.read).length;

  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="brand">Editorial RSS</h1>
        <p className="subtle">{unreadCount} não lidos</p>

        <p className="section-title">Filtros</p>
        <div className="filter-list">
          {[
            ["all", "Todos"],
            ["unread", "Não lidos"],
            ["favorites", "Favoritos"]
          ].map(([key, label]) => (
            <button
              key={key}
              className={`filter-btn ${filter === key ? "active" : ""}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="section-title">Fontes</p>
        <div className="source-list">
          {sources.map((item) => (
            <button
              key={item}
              className={`source-btn ${source === item ? "active" : ""}`}
              onClick={() => setSource(item)}
            >
              {item === "all" ? "Todas as fontes" : item}
            </button>
          ))}
        </div>
      </aside>

      <main className="feed-panel">
        <div className="topbar">
          <div className="title-wrap">
            <h2>Feed unificado</h2>
            <p className="subtle">Layout denso, leitura respirável</p>
          </div>
          <input
            className="search"
            placeholder="Buscar por título..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button className="zero-btn" onClick={inboxZero}>
            Inbox Zero
          </button>
        </div>

        <div className="cards">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div
                className="empty"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Nenhum post encontrado.
              </motion.div>
            ) : (
              filtered.map((post) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className={`card ${post.read ? "" : "unread"}`}
                  onClick={() => openPost(post.id)}
                >
                  <div className="card-head">
                    <div>
                      <h3 className="card-title">{post.title}</h3>
                      <div className="meta">
                        {post.source} · {post.date}
                      </div>
                    </div>
                    <button
                      className={`icon-btn ${post.favorite ? "active" : ""}`}
                      onClick={(event) => toggleFavorite(post.id, event)}
                      aria-label="Favoritar"
                    >
                      ★
                    </button>
                  </div>
                  <p className="excerpt">{post.excerpt}</p>
                  <div className="tags">
                    <span className="tag">{post.category}</span>
                    {!post.read && <span className="tag">Novo</span>}
                  </div>
                </motion.article>
              ))
            )}
          </AnimatePresence>
        </div>
      </main>

      <section className="preview-panel">
        {selectedPost ? (
          <motion.div
            key={selectedPost.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="section-title">Preview</p>
            <h2 className="preview-title">{selectedPost.title}</h2>
            <p className="meta">
              {selectedPost.source} · {selectedPost.category}
            </p>
            <p className="preview-body">{selectedPost.body}</p>
          </motion.div>
        ) : (
          <div className="empty">Selecione um artigo para pré-visualizar.</div>
        )}
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
