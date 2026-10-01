import React from "react";
import { useNavigate } from "react-router-dom";
// Define props interface
interface CoursesCardProps {
  CourseName?: string; // optional string prop
}

// CourseCard component
const CourseCard: React.FC<CoursesCardProps> = ({ CourseName }) => {
  return (
    <div className="course-card">
      <img src="logo192.png" alt={CourseName} />
      <h3>{CourseName ?? "Untitled Course"}</h3>
    </div>
  );
};

// Courses component
const Login: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>LogIn</h2>
        <input className = "text-input"type="text" placeholder="Username" />
        <input className = "text-input" type="password" placeholder="Password" />
        <button className = "button-login" onClick={() => navigate("/home")}>
          LogIn
        </button>
      </div>
    </div>
  );
};

export default Login;
