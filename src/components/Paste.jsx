
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { removeFromPastes } from "../redux/pasteSlice";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = pastes.filter((paste) =>
    `${paste.title} ${paste.content}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  async function handleCopy(content) {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Unable to copy. Check browser permissions.");
    }
  }

  async function handleShare(paste) {
    const shareUrl = `${window.location.origin}/pastes/${paste._id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: paste.title,
          text: paste.content,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Paste link copied!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        toast.error("Unable to share this paste.");
      }
    }
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this paste?")) {
      dispatch(removeFromPastes(id));
      toast.success("Paste deleted successfully!");
    }
  }

  return (
    <main className="page-container">
      <section className="hero-section">
        <span className="eyebrow">YOUR COLLECTION</span>

        <h1 className="page-title">
          Your <span className="gradient-text">Pastes.</span>
        </h1>

        <p className="page-description">
          All your saved ideas and snippets, organized in one place.
        </p>
      </section>

      <div className="collection-toolbar">
        <div>
          <h2 className="section-title">My library</h2>
          <p className="section-subtitle">
            {pastes.length} {pastes.length === 1 ? "paste" : "pastes"} saved
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          + New Paste
        </button>
      </div>

      <div className="search-wrap">
        <input
          className="search-field"
          type="search"
          placeholder="⌕  Search by title or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredData.length > 0 ? (
        <div className="paste-list">
          {filteredData.map((paste) => (
            <article className="paste-card" key={paste._id}>
              <div className="card-topline">
                <span className="card-type">✦ SAVED PASTE</span>
                <span className="card-dot" />
              </div>

              <h3 className="paste-card-title">{paste.title}</h3>

              <p className="paste-card-content">
                {paste.content.length > 180
                  ? `${paste.content.slice(0, 180)}…`
                  : paste.content}
              </p>

              <div className="paste-actions">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/?pasteId=${encodeURIComponent(paste._id)}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn"
                  onClick={() => navigate(`/pastes/${paste._id}`)}
                >
                  View
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(paste._id)}
                >
                  Delete
                </button>

                <button
                  className="btn"
                  onClick={() => handleCopy(paste.content)}
                >
                  Copy
                </button>

                <button
                  className="btn"
                  onClick={() => handleShare(paste)}
                >
                  Share
                </button>
              </div>

              <div className="paste-meta">
                Created{" "}
                {paste.createdAt
                  ? new Date(paste.createdAt).toLocaleString()
                  : "Date unavailable"}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">✧</div>
          <h3>
            {searchTerm ? "No matching pastes" : "Your library is waiting"}
          </h3>
          <p>
            {searchTerm
              ? "Try a different search term."
              : "Create your first paste and it will appear here."}
          </p>

          {!searchTerm && (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/")}
            >
              Create your first paste
            </button>
          )}
        </div>
      )}
    </main>
  );
};

export default Paste;
