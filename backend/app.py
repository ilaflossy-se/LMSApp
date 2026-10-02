from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

courses = [
    {
        "id": 1,
        "name": "ICT",
        "progress": 75,
        "nextTask": "Assignment 3"
    },
    {
        "id": 2,
        "name": "Linear Algebra",
        "progress": 60,
        "nextTask": "Quiz"
    },
    {
        "id": 3,
        "name": "Calculus",
        "progress": 35,
        "nextTask": "Lab Report"
    }
]

deadlines = [
    {
        "id": 1,
        "title": "Assignment 3",
        "course": "ICT",
        "date": "Tomorrow",
        "priority": "high"
    },
    {
        "id": 2,
        "title": "Quiz",
        "course": "Linear Algebra",
        "date": "Oct 10",
        "priority": "high"
    },
    {
        "id": 3,
        "title": "Lab Report",
        "course": "Calculus",
        "date": "Oct 12",
        "priority": "low"
    }
]

schedule = [
    {
        "id": 1,
        "time": "10:00",
        "subject": "Discrete Mathematics",
        "location": "Room A-214"
    },
    {
        "id": 2,
        "time": "14:00",
        "subject": "Programming",
        "location": "Room B-103"
    },
    {
        "id": 3,
        "time": "17:00",
        "subject": "Physics",
        "location": "Online"
    }
]


@app.route("/api/profile")
def profile():
    return jsonify({
        "user": {
            "name": "Ali"
        },
        "courses": courses,
        "deadlines": deadlines,
        "schedule": schedule
    })


@app.route("/api/courses")
def get_courses():
    return jsonify(courses)


@app.route("/api/deadlines")
def get_deadlines():
    return jsonify(deadlines)


@app.route("/api/schedule")
def get_schedule():
    return jsonify(schedule)


@app.route("/api/login", methods=["POST"])
def login():

    data = request.json

    username = data.get("username")
    password = data.get("password")

    if username == "admin" and password == "1234":
        return jsonify({
            "success": True,
            "message": "Login successful"
        })

    return jsonify({
        "success": False,
        "message": "Invalid username or password"
    }), 401


if __name__ == "__main__":
    app.run(debug=True)