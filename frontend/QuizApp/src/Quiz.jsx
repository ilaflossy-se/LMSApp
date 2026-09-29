import { useEffect, useState } from "react";

function Quiz({ category }) {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/data")
            .then(response => response.json())
            .then(data => {
                const filteredQuestions = data.filter(
                    quiz => quiz.category === category
                );

                setQuestions(filteredQuestions);
            })
            .catch(error => {
                console.error(error);
            });
    }, [category]);

    return (
        <div className="main-container">

            <h1>{category}</h1>

            {questions.map((quiz, index) => (
                <div key={index} className="question-card">
                    <h2>
                        {index + 1}. {quiz.question}
                    </h2>
                </div>
            ))}

        </div>
    );
}

export default Quiz;