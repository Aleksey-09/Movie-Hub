import { useFavorites } from "../context/FavoritesContext"
import { Link } from "react-router-dom"
import './Favorites.style.scss'


    export default function Favorites () {
        const { favorites, removeFromFavorites } = useFavorites()
        console.log("Favorites page - количество фильмов:", favorites.length);
        console.log("Favorites page - сами фильмы:", favorites);

        if (favorites.length === 0) {
            return <div className="favorites-empty">
                <h3>Пока ничего не добавлено...</h3>
            </div>
        }  

        return (
            <section className="favorites-section">
                <div className="favorite-title">
                    <h1>Избранное</h1>
                </div>
                {favorites.map((oneFilm) => (
                    <Link to={`/movie/${oneFilm.id}`} key={oneFilm.id}>
                    <div  className="favorite-card">
                        <div className="favorite-img">
                            <img 
                                src={`https://image.tmdb.org/t/p/w300${oneFilm.poster_path}`}
                                alt={oneFilm.title} />
                        </div>
                        <div className="favorites-description">
                            <h1>{oneFilm.title}</h1>
                            <p>{oneFilm.overview}</p>
                        </div>
                        <div className="favorite-btn-card">
                            <button 
                            onClick={(e) => {
                                e.preventDefault();     // ⛔ блокирует переход по Link
                                e.stopPropagation();    // ⛔ останавливает всплытие
                                removeFromFavorites(oneFilm.id);
                            }}
                            >Удалить!
                            </button>
                        </div>
                    </div>
                </Link>

                ))}

            </section>
        )
    }