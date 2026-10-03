import { api, Deadline, formatDue, useApi } from "./api";
import Status from "./Status";

function Deadlines() {
  const { data, setData, error, loading, reload } = useApi<Deadline[]>("/deadlines");

  if (!data) return <Status loading={loading} error={error} onRetry={reload} />;

  const toggle = async (d: Deadline) => {
    // update the UI right away, roll back if the server refuses
    setData(data.map(x => (x.id === d.id ? { ...x, done: !x.done } : x)));
    try {
      await api(`/deadlines/${d.id}`, { method: "PATCH", body: JSON.stringify({ done: !d.done }) });
    } catch {
      setData(data);
    }
  };

  return (
    <div className="dashboard">
      <div className="page-header"><h1>Deadlines</h1></div>
      <section className="dashboard-card">
        {data.length === 0 && <p className="empty">No deadlines yet.</p>}
        {data.map(d => (
          <div className={`deadline-item ${d.priority} ${d.done ? "done" : ""}`} key={d.id}>
            <label className="check">
              <input type="checkbox" checked={d.done} onChange={() => toggle(d)} />
              <div>
                <h3>{d.title}</h3>
                <p>{d.course}</p>
              </div>
            </label>
            <span>{d.done ? "Done" : formatDue(d.due)}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Deadlines;