import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './Header.style.scss'


export default function Header() {
    
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const searchRef = useRef(null)

      useEffect(() => {
        if (searchQuery.length < 2 ) {
          setSearchResults([])
          return
        }

        const timer = setTimeout(async () => {
          try {
            const apiKey = import.meta.env.VITE_TMDB_API_KEY;
            const res = await fetch(
              `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ru-RU&query=${searchQuery}`
            )
            const data = await res.json()
            setSearchResults(data.results || []) 
          } catch (err) {
            console.log('Ошибка поиска:', err);
          }
        }, 400)

        return () => clearTimeout(timer) 
       }, [searchQuery])

// Закрытие по клику вне поиска
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false)
            }
        }

        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isSearchOpen])
    return (
        <header className="header">
            <a href="/"><div className="logo">Movie <span className='logo-red'>Hub</span></div></a>
            <div className='navigation'>
                <nav className="nav">
                <ul>
                    <li><a href="/">Главная</a></li>
                    <li><a href="/favorites">Избранное</a></li>
                    <li><a href="/about">О нас</a></li>
                </ul>
            </nav>
            <div className="search" ref={searchRef}>
          {isSearchOpen ? (
            <div className="search-open">
              <input
                type="text"
                placeholder="Поиск фильмов..."
                value={searchQuery} //связываем поле ввода с нашим состоянием searchQuery.
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="search-input"
              />
              {searchResults.length > 0 && ( //если в searchResults есть хотя бы один фильм, то показываем блок с результатами.
                <div className='search-dropdown'>
                  {searchResults.slice(0, 8).map((movie) => ( //берём только первые 8 результатов (чтобы список не был слишком длинным).
                      <Link 
                        key={movie.id}
                        to={`/movie/${movie.id}`} //делает весь результат кликабельной ссылкой. При клике пользователь перейдёт на страницу фильма.
                        className='search-result-item'
                        onClick={() => { //после клика закрываем поиск и очищаем поле ввода.
                          setIsSearchOpen(false)
                          setSearchQuery('')
                        }}
                        >
                         <img 
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                         >
                        </img>
                          <div >  
                            <strong>{movie.title}</strong> <br />
                            <span>{movie.release_date?.split('-')[0] || ''}</span>
                          </div>
                      </Link>

                      
                      
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button className="search-toggle" onClick={() => setIsSearchOpen(true)}>
               <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          )}
        </div>
            </div>
        </header>
    )
}