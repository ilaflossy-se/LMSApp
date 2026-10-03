import { Link } from "react-router-dom";
import { DashboardData, formatDue, useApi } from "./api";
import Status from "./Status";

function Dashboard() {
  const { data, error, loading, reload } = useApi<DashboardData>("/dashboard");

  if (!data) return <Status loading={loading} error={error} onRetry={reload} />;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Hello, {data.user.name}!</h1>
          <p>Here is your learning overview.</p>
        </div>
      </div>

      <div className="top-grid">
        <section className="dashboard-card">
          <div className="card-header">
            <h2>Due soon</h2>
            <Link className="link" to="/deadlines">View all</Link>
          </div>
          {data.deadlines.length === 0 && <p className="empty">Nothing due. Nice work.</p>}
          {data.deadlines.map(d => (
            <div className={`deadline-item ${d.priority}`} key={d.id}>
              <div>
                <h3>{d.title}</h3>
                <p>{d.course}</p>
              </div>
              <span>{formatDue(d.due)}</span>
            </div>
          ))}
        </section>

        <section className="dashboard-card">
          <div className="card-header">
            <h2>Today's schedule</h2>
            <Link className="link" to="/schedule">Full week</Link>
          </div>
          {data.schedule.length === 0 && <p className="empty">No classes today.</p>}
          {data.schedule.map(s => (
            <div className="schedule-item" key={s.id}>
              <span className="time">{s.time}</span>
              <div>
                <h3>{s.subject}</h3>
                <p>{s.location}</p>
              </div>
            </div>
          ))}
        </section>
      </div>

      <section className="courses-section">
        <div className="section-header">
          <h2>My courses</h2>
          <Link className="link" to="/courses">View all</Link>
        </div>
        <div className="courses-grid">
          {data.courses.map(c => (
            <div className="new-course-card" key={c.id}>
              <div className="course-icon">{c.name[0]}</div>
              <h3>{c.name}</h3>
              <p>Next: {c.nextTask}</p>
              <div className="progress">
                <div className="progress-bar" style={{ width: `${c.progress}%` }} />
              </div>
              <span>{c.progress}% completed</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;