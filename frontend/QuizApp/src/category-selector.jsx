import { useEffect, useState } from "react";

function CategorySelector({ onStartQuiz }) {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/data")
            .then(response => response.json())
            .then(data => {
                setQuizzes(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const categories = [...new Set(
        quizzes.map(quiz => quiz.category)
    )];

    return (
        <div className="main-container">

            <div className="category-container">

                {categories.map(category => (
                    <div
                        className={`category-card ${
                            selectedCategory === category
                                ? "selected"
                                : ""
                        }`}
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                    >
                        <img
                            className="category-icon"
                            src="#"
                            alt={category}
                        />

                        <h1 className="category-text">
                            {category}
                        </h1>

                        <p className="category-description">
                            Choose {category} questions
                        </p>
                    </div>
                ))}

            </div>

            <button
                className="start-quiz-btn"
                disabled={!selectedCategory}
                onClick={() => onStartQuiz(selectedCategory)}
            >
                Start Quiz
            </button>

        </div>
    );
}

export default CategorySelector;