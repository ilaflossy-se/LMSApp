import { useState } from "react";
import { Course, useApi } from "./api";
import Status from "./Status";

function Courses() {
  const { data, error, loading, reload } = useApi<Course[]>("/courses");
  const [query, setQuery] = useState("");

  if (!data) return <Status loading={loading} error={error} onRetry={reload} />;

  const list = data.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Courses</h1>
        <input
          className="search"
          placeholder="Search courses"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      {list.length === 0 && <p className="empty">No courses match “{query}”.</p>}
      <div className="courses-grid">
        {list.map(c => (
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
    </div>
  );
}

export default Courses;