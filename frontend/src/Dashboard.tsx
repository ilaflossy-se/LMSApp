import { useEffect, useState } from "react";

interface Course {
    id: number;
    name: string;
    progress: number;
    nextTask: string;
}

interface Deadline {
    id: number;
    title: string;
    course: string;
    date: string;
    priority: "high" | "medium" | "low";
}

interface Schedule {
    id: number;
    time: string;
    subject: string;
    location: string;
}

interface DashboardData {
    user: {
        name: string;
    };
    courses: Course[];
    deadlines: Deadline[];
    schedule: Schedule[];
}

function Dashboard() {

    const [data, setData] = useState<DashboardData | null>(null);

    useEffect(() => {

        fetch("http://127.0.0.1:5000/api/profile")
            .then(response => response.json())
            .then(result => {
                setData(result);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <h1>
                        Hello, {data.user.name}!
                    </h1>

                    <p>
                        Here is your learning overview.
                    </p>
                </div>

            </div>


            <div className="top-grid">

                <section className="dashboard-card">

                    <div className="card-header">
                        <h2>Due Soon</h2>
                        <button>View all</button>
                    </div>

                    {data.deadlines.map(deadline => (

                        <div
                            className={`deadline-item ${deadline.priority}`}
                            key={deadline.id}
                        >

                            <div>
                                <h3>{deadline.title}</h3>
                                <p>{deadline.course}</p>
                            </div>

                            <span>
                                {deadline.date}
                            </span>

                        </div>

                    ))}

                </section>


                <section className="dashboard-card">

                    <div className="card-header">
                        <h2>Today's Schedule</h2>
                    </div>

                    {data.schedule.map(item => (

                        <div
                            className="schedule-item"
                            key={item.id}
                        >

                            <span className="time">
                                {item.time}
                            </span>

                            <div>
                                <h3>{item.subject}</h3>
                                <p>{item.location}</p>
                            </div>

                        </div>

                    ))}

                </section>

            </div>


            <section className="courses-section">

                <div className="section-header">
                    <h2>My Courses</h2>
                </div>

                <div className="courses-grid">

                    {data.courses.map(course => (

                        <div
                            className="new-course-card"
                            key={course.id}
                        >

                            <div className="course-icon">
                                {course.name[0]}
                            </div>

                            <h3>{course.name}</h3>

                            <p>
                                Next: {course.nextTask}
                            </p>

                            <div className="progress">

                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${course.progress}%`
                                    }}
                                />

                            </div>

                            <span>
                                {course.progress}% completed
                            </span>

                        </div>

                    ))}

                </div>

            </section>

        </div>
    );
}

export default Dashboard;