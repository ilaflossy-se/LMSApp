from datetime import date, timedelta

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def in_days(n: int) -> str:
    return (date.today() + timedelta(days=n)).isoformat()


USER = {"name": "Ali", "role": "AITU Student"}

COURSES = [
    {"id": 1, "name": "ICT", "progress": 75, "nextTask": "Assignment 3"},
    {"id": 2, "name": "Linear Algebra", "progress": 60, "nextTask": "Quiz"},
    {"id": 3, "name": "Calculus", "progress": 35, "nextTask": "Lab Report"},
]

DEADLINES = [
    {"id": 1, "title": "Assignment 3", "course": "ICT", "due": in_days(1), "priority": "high", "done": False},
    {"id": 2, "title": "Quiz", "course": "Linear Algebra", "due": in_days(7), "priority": "high", "done": False},
    {"id": 3, "title": "Lab Report", "course": "Calculus", "due": in_days(9), "priority": "low", "done": False},
]

# day: 0 = Monday ... 6 = Sunday
SCHEDULE = [
    {"id": 1, "day": 0, "time": "10:00", "subject": "Discrete Mathematics", "location": "Room A-214"},
    {"id": 2, "day": 0, "time": "14:00", "subject": "Programming", "location": "Room B-103"},
    {"id": 3, "day": 1, "time": "17:00", "subject": "Physics", "location": "Online"},
    {"id": 4, "day": 2, "time": "10:00", "subject": "Linear Algebra", "location": "Room A-101"},
    {"id": 5, "day": 3, "time": "12:00", "subject": "Calculus", "location": "Room C-305"},
    {"id": 6, "day": 4, "time": "14:00", "subject": "ICT", "location": "Room B-103"},
]

SETTINGS = {"notifications": True, "emailDigest": False}


def pending_deadlines():
    return sorted((d for d in DEADLINES if not d["done"]), key=lambda d: d["due"])


@app.get("/api/profile")
def profile():
    return jsonify(USER)


# One small request for the dashboard instead of dumping everything.
@app.get("/api/dashboard")
def dashboard():
    today = date.today().weekday()
    return jsonify({
        "user": USER,
        "courses": COURSES,
        "deadlines": pending_deadlines()[:3],
        "schedule": [s for s in SCHEDULE if s["day"] == today],
    })


@app.get("/api/courses")
def get_courses():
    return jsonify(COURSES)


@app.get("/api/deadlines")
def get_deadlines():
    return jsonify(sorted(DEADLINES, key=lambda d: (d["done"], d["due"])))


@app.patch("/api/deadlines/<int:deadline_id>")
def update_deadline(deadline_id: int):
    body = request.get_json(silent=True) or {}
    for d in DEADLINES:
        if d["id"] == deadline_id:
            if "done" in body:
                d["done"] = bool(body["done"])
            return jsonify(d)
    return jsonify({"message": "Deadline not found"}), 404


@app.get("/api/schedule")
def get_schedule():
    return jsonify(sorted(SCHEDULE, key=lambda s: (s["day"], s["time"])))


@app.get("/api/settings")
def get_settings():
    return jsonify(SETTINGS)


@app.put("/api/settings")
def put_settings():
    body = request.get_json(silent=True) or {}
    for key in SETTINGS:
        if key in body:
            SETTINGS[key] = bool(body[key])
    return jsonify(SETTINGS)


@app.post("/api/login")
def login():
    data = request.get_json(silent=True) or {}
    if data.get("username") == "admin" and data.get("password") == "1234":
        return jsonify({"success": True, "token": "demo-token"})
    return jsonify({"success": False, "message": "Invalid username or password"}), 401


if __name__ == "__main__":
    app.run(debug=True)
