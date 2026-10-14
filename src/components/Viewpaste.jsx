
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const paste = useSelector((state) =>
    state.paste.pastes.find((item) => item._id === id)
  );

  async function copyContent() {
    try {
      await navigator.clipboard.writeText(paste.content);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Unable to copy content.");
    }
  }

  if (!paste) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <h2>Paste not found</h2>
          <p>This paste may have been deleted.</p>
          <button className="btn btn-primary" onClick={() => navigate("/pastes")}>
            Back to My Pastes
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <span className="eyebrow">PASTE DETAILS</span>

      <h1 className="page-title">
        <span className="gradient-text">{paste.title}</span>
      </h1>

      <p className="page-description">
        View your saved content whenever you need it.
      </p>

      <section className="panel">
        <div className="detail-toolbar">
          <span className="card-type">✦ SAVED CONTENT</span>

          <button className="btn btn-primary" onClick={copyContent}>
            Copy Content
          </button>
        </div>

        <div className="detail-content">{paste.content}</div>

        <div className="detail-meta">
          Created:{" "}
          {paste.createdAt
            ? new Date(paste.createdAt).toLocaleString()
            : "Date unavailable"}
        </div>

        <div className="form-actions">
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate(`/?pasteId=${encodeURIComponent(paste._id)}`)
            }
          >
            Edit Paste
          </button>

          <button className="btn" onClick={() => navigate("/pastes")}>
            Back to My Pastes
          </button>
        </div>
      </section>
    </main>
  );
};

export default ViewPaste;
