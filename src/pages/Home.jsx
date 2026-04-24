import { useState, useEffect } from 'react';
import Hero from '../components/Hero'
import PopularMovies from '../components/PopularMovies';
import TopFilms from '../components/TopFilms';
import MovieCard from '../components/MovieCard';
import GenresCarousel from '../components/GenresCarousel';

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([]); //Создаем коробку с пустым масивом
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genresMap, setGenresMap] = useState({}); //Коробка для жанров. Мы будем хранить там объект {28: "Экшн", 12: "Приключения", ...}
    const [loading, setLoading] = useState(true) // Коробка, которая говорит "сейчас идёт загрузка".Пока true — показываем "Загрузка...".Когда данные придут — ставим false.
    

      useEffect(() => {
    const fetchPopular = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU&page=1`);
        const data = await res.json();
        setPopularMovies(data.results || []);
      } catch (err) {
        console.log('Ошибка популярных фильмов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
        //useEffect(() => { ... }, []); — «Сделай это один раз, когда страница загрузилась».
        // const fetchPopular = async () => { ... } — функция, которая делает запрос.
        // const apiKey = import.meta.env.VITE_TMDB_API_KEY; — берём твой ключ из файла .env.
        // await fetch(...) — отправляем запрос на TMDB и ждём ответа.
        // await res.json() — превращаем ответ в нормальный JavaScript объект.
        // setPopularMovies(data.results || []); — кладём полученные фильмы в коробку popularMovies.
        // finally { setLoading(false); } — в любом случае (успех или ошибка) говорим "загрузка закончена".

  }, []);

        useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=ru-RU&page=1`);
        const data = await res.json();
        setTopRatedMovies(data.results || []);
      } catch (err) {
        console.log('Ошибка топ-10:', err);
      } 
    };
        // 2. Топ 10
        // → Это просто комментарий для меня и для тебя. Никакого влияния на работу не имеет. Просто чтобы было понятно, что этот блок делает.
        // useEffect(() => { ... }, []);
        // → Второй отдельный useEffect.
        // Он тоже запускается только один раз, когда компонент Home загружается на экран (из-за пустого массива [] в конце).
        // Почему отдельный? Потому что это другой запрос к API. Мы не можем смешивать его с первым useEffect, иначе код станет запутанным.
        // const fetchTopRated = async () => { ... }
        // → Создаём функцию с названием fetchTopRated.
        // Название придумали мы сами, чтобы было понятно: "загрузи топ-рейтинговые фильмы".
        // async — значит внутри функции мы будем использовать await (ждать ответ от сервера).
        // try { ... }
        // → Блок "попробуй выполнить". Если внутри что-то пойдёт не так (нет интернета, ошибка сервера и т.д.), код не упадёт, а перейдёт в catch.
        // const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        // → Берём твой секретный ключ из файла .env.
        // Это безопасно — Vite не показывает этот ключ в браузере.
        // const res = await fetch(https://api.themoviedb.org/3/movie/top_rated?...`)`
        // → Главное отличие от первого запроса.
        // Здесь мы обращаемся к эндпоинту /movie/top_rated.
        // Этот адрес возвращает фильмы, отсортированные по рейтингу (от самого высокого к низкому).
        // Поэтому здесь будут другие фильмы, а не те же самые, что в "Популярных".
        // const data = await res.json();
        // → Ждём, пока сервер ответит, и превращаем ответ в обычный JavaScript объект.
        // setTopRatedMovies(data.results || []);
        // → Кладём полученные фильмы в состояние topRatedMovies.
        // data.results — это массив фильмов.
        // || [] — страховка: если вдруг results не пришло, чтобы не было ошибки.
        // } catch (err) { console.log('Ошибка топ-10:', err); }
        // → Если запрос не удался — выводим ошибку в консоль, но приложение продолжает работать.
        // fetchTopRated();
        // → Запускаем созданную функцию сразу.
        // }, []);
        // → Пустой массив в конце useEffect говорит: "выполни этот код только один раз при загрузке страницы".

    fetchTopRated();
        
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ru-RU`);
        const data = await res.json();
        const map = data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenresMap(map);
      } catch (err) {
        console.log('Ошибка жанров:', err);
      }
    };
        // 3. Жанры
        // → Просто комментарий. Ничего не делает, просто нам с тобой подсказка.
        // useEffect(() => { ... }, []);
        // → Опять хук, который говорит: «Выполни этот код один раз, когда страница загрузится».
        // const fetchGenres = async () => { ... }
        // → Создаём функцию с названием fetchGenres.
        // Название говорит само за себя — "загрузи жанры".
        // try { ... }
        // → "Попробуй выполнить код". Если где-то будет ошибка — перейдём в catch, приложение не упадёт.
        // const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        // → Берём твой API ключ из файла .env (точно так же, как в предыдущих запросах).
        // const res = await fetch(https://api.themoviedb.org/3/genre/movie/list?...`)`
        // → Делаем запрос к специальному адресу TMDB.
        // Этот адрес возвращает список всех возможных жанров (Экшн, Драма, Комедия, Ужасы и т.д.) вместе с их ID.
        // const data = await res.json();
        // → Превращаем ответ от сервера в нормальный JavaScript объект.
        // const map = data.genres.reduce((acc, genre) => { ... }, {});
        // → Самая сложная строчка. Давай разберём её особенно подробно.data.genres — это массив, который приходит от TMDB. Примерно такой:

    fetchGenres();
  }, []);


  

  

  if (loading) {
    return <div className="container">Загрузка...</div>;
  }
        
    return (
      
      <div className='container'>
        <Hero movies={popularMovies}/>

        <PopularMovies 
          title="Популярные фильмы"
          movies={popularMovies}
          genresMap={genresMap}
        />
        <GenresCarousel 
          title="Популярные жанры"
        />
        <PopularMovies 
          title="Топ" 
          movies={topRatedMovies} 
          genresMap={genresMap} 
      />
        
        
      </div>
    )
} 