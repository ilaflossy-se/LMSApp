import { useEffect } from "react";

function CategorySelector() {
    const [quizzes, setQuizzes] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/data')
        .then(response => response.json())
        .then(data => {
            setQuizzes(data)
        })
        .catch(error => {
            console.error(error)
        })
    }, [])

    const categories = [...new Set(
        quizzes.map(quiz => quiz.category)
    )]
    return (
        <div className="main-container">
            <div className="category-container">
                <div className="category-card">
                    <img
                        className="category-icon"
                        src="#"
                        alt="category"
                    />
                    <h1 className="category-text">
                        Text
                    </h1>

                    <p className="category-description">
                        Description
                    </p>                
                </div>
            </div>
            
            
            <button className="start-quiz-btn">
                    Start Quiz
            </button>
        </div>
    );
}

export default CategorySelector;