import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Header from './components/Header';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites'
import { FavoritesProvider } from './context/FavoritesContext';
import GenrePage from './pages/GenrePage';
import About from './pages/About';
import Footer from './components/Footer';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FavoritesProvider>
        <BrowserRouter>
          <div className="app-wrapper">
            <Header />
            {/* Здесь потом добавишь Navbar */} 

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/genre/:id" element={<GenrePage />}/>
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </FavoritesProvider>
      
    </>
  )
}

export default App
