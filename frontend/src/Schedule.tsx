import { useState } from "react";
import { DAYS, ScheduleItem, useApi } from "./api";
import Status from "./Status";

function Schedule() {
  const { data, error, loading, reload } = useApi<ScheduleItem[]>("/schedule");
  const [day, setDay] = useState((new Date().getDay() + 6) % 7); // Monday = 0

  if (!data) return <Status loading={loading} error={error} onRetry={reload} />;

  const items = data.filter(s => s.day === day);

  return (
    <div className="dashboard">
      <div className="page-header"><h1>Schedule</h1></div>
      <div className="tabs" role="tablist">
        {DAYS.map((name, i) => (
          <button
            key={name}
            role="tab"
            aria-selected={i === day}
            className={i === day ? "tab active" : "tab"}
            onClick={() => setDay(i)}
          >
            {name.slice(0, 3)}
          </button>
        ))}
      </div>
      <section className="dashboard-card">
        {items.length === 0 && <p className="empty">No classes on {DAYS[day]}.</p>}
        {items.map(s => (
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
  );
}

export default Schedule;