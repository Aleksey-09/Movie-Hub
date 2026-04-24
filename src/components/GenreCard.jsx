import { Link } from "react-router-dom";
import "./GenreCard.style.scss"



export default function GenreCard ({genre, imageUrl}) {

    


    return (
        <Link to={`/genre/${genre.id}`}>
            <div className="genre-card">
                <img src={imageUrl} alt={genre.name} />
                <div className="genre-overlay">
                    <h3>{genre.name}</h3>
                </div>
            </div>
        </Link>
    )
}