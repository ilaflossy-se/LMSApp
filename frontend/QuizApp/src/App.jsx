import { useState } from 'react'
import Header from './header.jsx'
import CategorySelector from './category-selector.jsx'
import Footer from './footer.jsx'
import Quiz from './Quiz.jsx'
function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <>
     <Header/>
      {!selectedCategory ? (
                <CategorySelector
                    onStartQuiz={setSelectedCategory}
                />
            ) : (
                <Quiz category={selectedCategory} />
            )}
     <Footer/>
    </>
  )
}

export default App
