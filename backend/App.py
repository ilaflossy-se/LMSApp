from flask import Flask,jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
@app.route("/data")
def data():
    app.json.ensure_ascii = False
    quizzes = [
        {
            "question": "Столица Франции?",
            "category": "География"
        },
        {
            "question": "Когда началась ВОВ?",
            "category": "История"
        }
        ,
        {
            "question": "Когда началась ВОВ?",
            "category": "Месси"
        }
        ,
        {
            "question": "Когда началась ВОВ?",
            "category": "Роналду"
        },
        {
            "question": "Когда началась ВОВ?",
            "category": "Еламан"
        }
        
    ]
    return jsonify(quizzes)
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)