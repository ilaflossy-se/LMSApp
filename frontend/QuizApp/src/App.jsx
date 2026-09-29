import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Header from './header.jsx'
import CategorySelector from './category-selector.jsx'
import Footer from './footer.jsx'
function App() {
  return (
    <>
     <Header/>
     <CategorySelector/>
     <Footer/>
    </>
  )
}

export default App
