import { createContext, useContext, useEffect, useState,  } from "react"


const FavoritesContext = createContext()

export  function FavoritesProvider({ children }) {
    const [ favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites')
        return saved ? JSON.parse(saved) : []
    })
    
    
    

    // useEffect(() => {
    //     const saved = localStorage.getItem('favorites')
    //      if (saved) {  //"если что-то достали из сейфа"
    //         const parsedFavorites = JSON.parse(saved)  //"превратить текст обратно в нормальный массив"
    //         setFavorites(parsedFavorites)  //положить этот массив в наш ящик"
            
    //      }
    // }, [])

    


    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites((prev) => {
            const alreadyExists = prev.some(film => film.id === movie.id)
                if (alreadyExists) {
                    return prev
                } else {
                    return [...prev, movie]
                }
        })
    }

    

    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => {
            return prev.filter(film => film.id !== movieId)
        })
    }

    
    const isFavorite = (movieId) => {
    return favorites.some(film => Number(film.id) === movieId);
};
    return (
        <FavoritesContext.Provider value={{
            favorites,
            addToFavorites,
            removeFromFavorites,
            isFavorite
        }}>
            {children}

           
        </FavoritesContext.Provider>
        
    )

   

}
export function useFavorites() {
        return useContext(FavoritesContext)
    }