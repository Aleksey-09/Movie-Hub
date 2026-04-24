import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../context/FavoritesContext';
import './MovieDetails.style.scss';

export default function MovieDetails() {
  const { id } = useParams();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ru-RU`);
        const movieData = await movieRes.json();

        const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=ru-RU`);
        const videoData = await videoRes.json();

        setMovie(movieData);
        setVideos(videoData.results || []);
      } catch (err) {
        console.log('Ошибка загрузки фильма:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  

  if (loading) {
    return <div className="container loading">Загрузка фильма...</div>;
  }

  if (!movie) {
    return <div className="container">Фильм не найден 😔</div>;
  }
  
  const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube') || videos[0];

  return (
    <div className="movie-details-page">
      <div 
        className="backdrop"
        style={{
          backgroundImage: movie.backdrop_path 
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` 
            : 'none'
        }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      <div className="container content">
        <Link to="/" className="back-button">← Назад на главную</Link>

        <div className="movie-main">
          <div className="poster-side">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
              className="poster"
            />
          </div>

          <div className="info-side">
            <h1 className="title">{movie.title}</h1>
            
            <div className="meta">
              <span><FontAwesomeIcon className='meta-stars' icon={faStar} /> {movie.vote_average.toFixed(1)}</span>
              <span>{movie.release_date?.split('-')[0]}</span>
              <button 
                className={`btn-favorite-details ${isFavorite(movie.id) ? 'active' : ''}`}
                onClick={() => {
                  if (isFavorite(movie.id)) {
                    removeFromFavorites(movie.id);
                  } else {
                    addToFavorites(movie);
                  }
                }}
              >
                <FontAwesomeIcon style={{background: 'transparent'}} icon={faBookmark} />
              </button>
              
            </div>
            

            <div className="genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>

            {movie.tagline && <p className="tagline">«{movie.tagline}»</p>}
            

            <p className="overview">{movie.overview}</p>

            {trailer && (
              <div className="trailer-section">
                <h3>Трейлер</h3>
                <div className="trailer-container">
                  <iframe 
                    width="100%" 
                    height="450" 
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Трейлер"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>  
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}