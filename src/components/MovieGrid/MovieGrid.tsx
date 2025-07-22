import css from './MovieGrid.module.css'
import type Movie from '../../types/movie'

interface MovieGridInter {
    movies: Movie[],
    onSelect: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function MovieGrid({ movies, onSelect }: MovieGridInter) {
    
    return (
        <>
            <ul className={css.grid}>
                {movies.map(movie => {
                    return (
                        <li key={movie.id} >
                            <div className={css.card} id={movie.id.toString()} onClick={onSelect}>
                                <img
                                    className={css.image}
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.backdrop_path}`}
                                    alt={movie.title}
                                    loading="lazy"
                                />
                                <h2 className={css.title}>{movie.title}</h2>
                            </div>
                        </li>)
                })}

            </ul>
        </>
    )
}

export default MovieGrid