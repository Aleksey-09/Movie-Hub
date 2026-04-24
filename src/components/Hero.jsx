import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useFavorites } from "../context/FavoritesContext"
import './Hero.style.scss'


export default function Hero({movies}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [genresMap, setGenresMap] = useState({})
    const navigate = useNavigate()

    const { addToFavorites, removeFromFavorites, isFavorite} = useFavorites()
    
    const capitalize = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };

    useEffect(() => {
        if (movies.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % movies.length)
        }, 10000)

        return () => clearInterval(interval)
    },[movies.length])

    

    if (movies.length === 0) {
    return <div className="hero-loading">Загрузка героя...</div>;
  }

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ru-RU`;
        const res = await fetch(url);
        const data = await res.json();

        const map = data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        setGenresMap(map);
      } catch (err) {
        console.error('Ошибка загрузки жанров:', err);
      }
    };

    fetchGenres();
  }, []); 

  const currentMovie = movies[currentIndex];

  const backdropUrl = currentMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
    : 'https://via.placeholder.com/1920x1080?text=Нет+фона';

    return (
        <section className="hero" style={{backgroundImage: `url(${backdropUrl})`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',}}>
            <div className="hero-overlay">
                <div className="hero-content">
                    <h1 className="hero-title">{currentMovie.title}</h1>
                    <div className="hero-genres">
                        {currentMovie.genre_ids?.slice(0, 4).map((id) => (
                        <h4 key={id} className="genre-tag">
                            {capitalize(genresMap[id] || '—')}
                        </h4>
                        ))}
                    </div>
                    <span className="hero-rating"><FontAwesomeIcon className="star-icon" icon={faStar} />  {currentMovie.vote_average.toFixed(1)}</span><br /><br />
                    <span className="hero-year">{currentMovie.release_date?.split('-')[0] || 'N/A'}</span>
                    <p className="hero-overview">
                        {currentMovie.overview?.length > 300
                        ? currentMovie.overview.slice(0, 300) + '...'
                        : currentMovie.overview || 'Описание отсутствует'}
                    </p>
                </div>
                <div className="hero-btn">
                    <button className="btn-play"
                        onClick={() => navigate(`/movie/${currentMovie.id}`)}
                        >
                        <FontAwesomeIcon 
                            className="play" icon={faPlay}style={{background: 'transparent'}}
                            onClick={() => navigate(`/movie/${currentMovie.id}`)}
                             />
                            
                            Смотреть
                        </button>
                    <button 
                        className={`btn-favorite ${isFavorite(currentMovie.id) ? ' active' : ''}`}
                        onClick={() => {
                            if (isFavorite(currentMovie.id)) {
                                removeFromFavorites(currentMovie.id)
                            } else {
                                addToFavorites(currentMovie)
                            }
                        }}
                    >
                        <FontAwesomeIcon style={{background: 'transparent'}} icon={faBookmark} />
                    </button>
                </div>
            </div>
        </section>
    )
}