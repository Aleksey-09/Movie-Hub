import { useRef } from 'react';
import MovieCard from './MovieCard'; 
import './PopularMovies.style.scss'

export default function PopularMovies({ title, movies, genresMap = {} }) {
const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };


  return (
    <section className="popular-section">
      <div className="container">
        <div className="section-header">
          <h2>{title}</h2>
          <div className="scroll-buttons">
            <button onClick={scrollLeft}>←</button>
            <button onClick={scrollRight}>→</button>
          </div>
        </div>

        <div className="movies-carousel" ref={scrollRef}>
          {movies.slice(0, 15).map((movie) => (   // берём 15 штук для карусели
            
              <MovieCard movie={movie} genresMap={genresMap} showGenres={true} />
            
          ))}
        </div>
      </div>
    </section>
  );
}