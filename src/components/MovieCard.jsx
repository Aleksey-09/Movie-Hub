import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './MovieCard.style.scss'

export default function MovieCard({ movie, genresMap, showGenres = true }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=Нет+постера';

  const year = movie.release_date?.split('-')[0] || 'N/A';

  // Жанры — берём первые 2–3
  const genres = movie.genre_ids?.slice(0, 3).map(id => 
    genresMap[id] ? capitalize(genresMap[id]) : '—'
  ) || [];

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <div className="poster-wrapper">
          <img src={posterUrl} alt={movie.title} className="poster" />
          {/* <div className="overlay">
            <p className="overview-short">
              {movie.overview?.slice(0, 120) || 'Нет описания'}...
            </p>
          </div> */}
        </div>

        <div className="movie-card-info">
          <h3 className="movie-card-title">{movie.title}</h3>
          <div className="movie-card-meta">
            <span className="movie-card-rating">
              <FontAwesomeIcon icon={faStar} /> {movie.vote_average.toFixed(1)}
            </span><br />
            <span className="movie-card-year">{year}</span>
          </div>
          {showGenres ? (
            <div className="movie-card-genres">
              {genres.map((g, i) => (
                <span key={i} className="movie-card-genre">{g}</span>
              ))}
            </div>
          ) : (
            <p className="movie-card-overview">
              {movie.overview?.slice(0, 100) + '...'}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

// Функция capitalize (если не вынесена в отдельный файл)
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}