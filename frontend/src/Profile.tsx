import { useNavigate } from "react-router-dom";
import { User, useApi } from "./api";
import Status from "./Status";

function Profile() {
  const { data, error, loading, reload } = useApi<User>("/profile");
  const navigate = useNavigate();

  if (!data) return <Status loading={loading} error={error} onRetry={reload} />;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="page-header"><h1>Profile</h1></div>
      <div className="dashboard-card profile-card">
        <div className="profile-avatar">{data.name[0]}</div>
        <div>
          <h2>{data.name}</h2>
          <p>{data.role}</p>
        </div>
        <button className="btn secondary" onClick={logout}>Log out</button>
      </div>
    </div>
  );
}

export default Profile;