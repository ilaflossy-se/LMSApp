import { useEffect, useState } from "react";

interface User {
    name: string;
}

interface ProfileData {
    user: User;
}

function Profile() {

    const [data, setData] = useState<ProfileData | null>(null);

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
        <div className="profile">

            <h1>Profile</h1>

            <div className="profile-card">

                <div className="profile-avatar">
                    {data.user.name[0]}
                </div>

                <div>
                    <h2>{data.user.name}</h2>
                    <p>AITU Student</p>
                </div>

            </div>

        </div>
    );
}

export default Profile;