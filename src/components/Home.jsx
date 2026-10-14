
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const pastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const existingPaste = pastes.find(
        (paste) => paste._id === pasteId
      );

      if (existingPaste) {
        setTitle(existingPaste.title);
        setValue(existingPaste.content);
      } else {
        toast.error("Paste not found");
        setSearchParams({});
      }
    } else {
      setTitle("");
      setValue("");
    }
  }, [pasteId, pastes, setSearchParams]);

  function createPaste() {
    if (!title.trim() || !value.trim()) {
      toast.error("Please enter both title and content!");
      return;
    }

    const paste = {
      title: title.trim(),
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: pasteId
        ? pastes.find((item) => item._id === pasteId)?.createdAt ||
          new Date().toISOString()
        : new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      toast.success("Paste updated successfully!");
    } else {
      dispatch(addToPastes(paste));
      toast.success("Paste created successfully!");
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <main className="page-container">
      <div className="hero-section">
        <span className="eyebrow">YOUR PERSONAL WORKSPACE</span>

        <h1 className="page-title">
          Your ideas, <span className="gradient-text">beautifully saved.</span>
        </h1>

        <p className="page-description">
          Create, organize and revisit your notes and code snippets
          anytime. Everything you need, in one simple place.
        </p>
      </div>

      <section className="panel editor-panel">
        <div className="section-heading">
          <div>
            <h2 className="section-title">
              {pasteId ? "Edit your paste" : "Create a new paste"}
            </h2>
            <p className="section-subtitle">
              Give your idea a title and write something worth keeping.
            </p>
          </div>

          <span className="editor-badge">
            {pasteId ? "EDIT MODE" : "NEW NOTE"}
          </span>
        </div>

        <form
          className="form-grid"
          onSubmit={(e) => {
            e.preventDefault();
            createPaste();
          }}
        >
          <div>
            <label className="field-label" htmlFor="paste-title">
              Paste title
            </label>

            <input
              id="paste-title"
              className="field"
              type="text"
              placeholder="e.g. Java interview notes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
            />
          </div>

          <div>
            <div className="editor-label-row">
              <label className="field-label" htmlFor="paste-content">
                Your content
              </label>
              <span className="character-count">
                {value.length} characters
              </span>
            </div>

            <textarea
              id="paste-content"
              className="content-field"
              value={value}
              placeholder="Start writing your thoughts, notes or code here..."
              onChange={(e) => setValue(e.target.value)}
              rows={12}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {pasteId ? "✓ Update Paste" : "+ Create My Paste"}
            </button>

            {(title || value || pasteId) && (
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setTitle("");
                  setValue("");
                  setSearchParams({});
                }}
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};

export default Home;
