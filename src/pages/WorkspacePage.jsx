import { useParams } from "react-router-dom";

const workspaceData = {
  "collab-1": {
    title: "Bakery Website",
    tasks: [
      { title: "Finalize homepage layout", done: true },
      { title: "Prepare product booking section", done: true },
      { title: "Refine mobile interactions", done: false },
    ],
    files: ["homepage-v2.fig", "brand-guidelines.pdf", "content-draft.docx"],
  },
  "collab-2": {
    title: "College Event Platform",
    tasks: [
      { title: "Review event signup flow", done: true },
      { title: "Test admin dashboard", done: false },
      { title: "Collect stakeholder feedback", done: false },
    ],
    files: ["requirements.md", "experience-map.pdf", "demo-script.txt"],
  },
};

function WorkspacePage() {
  const { id } = useParams();
  const workspace = workspaceData[id];

  if (!workspace) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">Workspace not found.</div>
      </div>
    );
  }

  return (
    <div className="container py-5 workspace-page">
      <div className="section-heading mb-4">
        <p className="eyebrow">Workspace</p>
        <h3>{workspace.title}</h3>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="panel-card">
            <h3>Tasks</h3>
            <div className="mt-3 task-list">
              {workspace.tasks.map((task) => (
                <div key={task.title} className="task-item">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={task.done}
                      readOnly
                    />
                    <label className="form-check-label">{task.title}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="panel-card">
            <h3>Files & Assets</h3>
            <div className="mt-3 file-list">
              {workspace.files.map((file) => (
                <div key={file} className="file-item">
                  <span>📄 {file}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkspacePage;
