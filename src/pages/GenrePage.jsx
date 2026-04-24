import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MovieCard  from "../components/MovieCard"
import './GenrePage.style.scss'



export default function GenrePage () {
    const [genresMap, setGenresMap] = useState({})

    const {id} = useParams()
    const genreNames = {
        28: "Экшн",
        12: "Приключения",
        16: "Анимация",
        35: "Комедия",
        80: "Криминал",
        18: "Драма",
        10751: "Семейный",
        14: "Фэнтези",
        27: "Ужасы",
        9648: "Мистика",
        10749: "Романтика",
        878: "Научная фантастика",
        53: "Триллер",
        37: "Вестерн"
    }
    const [ genreMovies, setGenreMovies ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState(null);
    const [page, setPage] =useState(1)

    useEffect(() => {
        const fetchGenres = async () => {
            const apiKey = import.meta.env.VITE_TMDB_API_KEY

            const res = await fetch(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ru-RU`
            )

            const data = await res.json()

            const map = data.genres.reduce((acc, genre) => {
                acc[genre.id] = genre.name
                return acc
            }, {})

            setGenresMap(map)
        }

        fetchGenres()
    }, [])

    useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
                if (page === 1) {
                    setLoading(true)
                } else {
                    setLoadingMore(true)
                }
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;
                const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ru-RU&with_genres=${id}&page=${page}`;
                
                const res = await fetch(url);
                const data = await res.json();

                setGenreMovies(prev => [...prev, ...(data.results || [])]);
            } catch (err) {
                console.error('Ошибка загрузки фильмов жанра:', err);
                setError('Не удалось загрузить фильмы');
            } finally {
                setLoading(false)
                setLoadingMore(false)
            }
        };

        if (id) {
            fetchMoviesByGenre();
        }
    }, [id, page]);

            useEffect(() => {
            setGenreMovies([])
            setPage(1)
        }, [id])

    if (loading) return <div>Загрузка фильмов...</div>


    return (
        <div className="genrePage-container">
            <h1 className="genrePage-title">{genreNames[id]}</h1>
            
                <div className="movies-grid">
                    {genreMovies.map((movie) => {
                        return (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie} 
                            genresMap={genresMap}
                            showGenres={false} 
                        />
                        )
                    })}
                </div>
                <button 
                    className="genrePage-btn"
                    onClick={() => setPage(page + 1)}
                    disabled={loadingMore}
                >
                    {loadingMore ? "Загрузка..." : "Показать еще"}
                </button>
            
        </div>
    )
}