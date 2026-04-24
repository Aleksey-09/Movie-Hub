import  GenreCard  from './GenreCard.jsx'
import { Link } from 'react-router-dom'
import { useRef } from 'react';
import actionImg from '../assets/action.jpg';
import adventureImg from '../assets/adventure.jpg';
import animationImg from '../assets/animation.jpg';
import comedyImg from '../assets/comedy.jpg';
import crimeImg from '../assets/crime.jpg';
import dramaImg from '../assets/drama.jpg';
import familyImg from '../assets/family.jpg';
import fantasyImg from '../assets/fantasy.jpg';
import horrorImg from '../assets/horror.jpg';
import mysteryImg from '../assets/mystery.jpg';
import romanceImg from '../assets/romance.jpg';
import scifiImg from '../assets/scifi.jpg';
import thrillerImg from '../assets/thriller.jpg';
import westernImg from '../assets/western.jpg';

export default function GenresCarousel ({title = "Популярные жанры", imageUrl}) {
  

  const genres = [
    { id: 28, name: "Экшн" },
    { id: 12, name: "Приключения" },
    { id: 16, name: "Анимация" },
    { id: 35, name: "Комедия" },
    { id: 80, name: "Криминал" },
    { id: 18, name: "Драма" },
    { id: 10751, name: "Семейный" },
    { id: 14, name: "Фэнтези" },
    { id: 27, name: "Ужасы" },
    { id: 9648, name: "Мистика" },
    { id: 10749, name: "Романтика" },
    { id: 878, name: "Научная фантастика" },
    { id: 53, name: "Триллер" },
    { id: 37, name: "Вестерн" }
  ]

  

  const genreImages = 
    {
      28: actionImg,      // Экшн
      12: adventureImg,   // Приключения
      16: animationImg,   // Анимация
      35: comedyImg,      // Комедия
      80: crimeImg,       // Криминал
      18: dramaImg,       // Драма
      10751: familyImg,   // Семейный
      14: fantasyImg,     // Фэнтези
      27: horrorImg,      // Ужасы
      9648: mysteryImg,   // Мистика
      10749: romanceImg,  // Романтика
      878: scifiImg,      // Sci-Fi
      53: thrillerImg,    // Триллер
      37: westernImg      // Вестерн
    }
  

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
        <section className="genresCarousel">
            <div className="container">
                    <div className="section-header">
                      <h2>{title}</h2>
                      <div className="scroll-buttons">
                        <button onClick={scrollLeft}>←</button>
                        <button onClick={scrollRight}>→</button>
                      </div>
                    </div>
            
                    <div className="movies-carousel" ref={scrollRef}>
                      {genres.slice(0, 14).map((genre) => (   // берём 15 штук для карусели
                        
                          <GenreCard key={genre.id} genre={genre} imageUrl={genreImages[genre.id]} />
                        
                      ))}
                    </div>
                  </div>
        </section>
    )
}