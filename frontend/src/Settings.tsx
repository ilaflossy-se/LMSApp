import { api, Settings as SettingsData, useApi } from "./api";
import Status from "./Status";

const OPTIONS: { key: keyof SettingsData; label: string; hint: string }[] = [
  { key: "notifications", label: "Deadline reminders", hint: "Get a reminder before a task is due." },
  { key: "emailDigest", label: "Weekly email digest", hint: "A summary of your week every Monday." },
];

function Settings() {
  const { data, setData, error, loading, reload } = useApi<SettingsData>("/settings");

  if (!data) return <Status loading={loading} error={error} onRetry={reload} />;

  const toggle = async (key: keyof SettingsData) => {
    const next = { ...data, [key]: !data[key] };
    setData(next);
    try {
      await api("/settings", { method: "PUT", body: JSON.stringify(next) });
    } catch {
      setData(data);
    }
  };

  return (
    <div className="dashboard">
      <div className="page-header"><h1>Settings</h1></div>
      <section className="dashboard-card">
        {OPTIONS.map(o => (
          <label className="setting-row" key={o.key}>
            <div>
              <h3>{o.label}</h3>
              <p>{o.hint}</p>
            </div>
            <input type="checkbox" role="switch" checked={data[o.key]} onChange={() => toggle(o.key)} />
          </label>
        ))}
      </section>
    </div>
  );
}

export default Settings;