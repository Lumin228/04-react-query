import { useEffect, useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css'
import type Movie from '../../types/movie'
import axios from 'axios';


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const token = import.meta.env.VITE_DOSTRUP;
  const [topic, setTopic] = useState<string>('');
  const [searchList, setSearchList] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<Movie | null>(null);

  useEffect(() => {
    if (!topic) return;
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/search/movie',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              query: topic,
              language: 'en-US',
            },
          }
        );
        setSearchList(response.data.results);

      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [topic, token]);

  const openModal = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedId = Number(event.currentTarget.id);
    const movie = searchList.find(el => el.id === clickedId);

    if (movie) {
      setModalInfo(movie);
      setIsModalOpen(true);
    }
  }

  const cloesModal = () => { setIsModalOpen(false) }


  return (
    <div className={css.app}>
      <SearchBar onSubmit={setTopic} />
      {isLoading ? (
        <Loader />
      ) : error !== false ? (
        <ErrorMessage />
      ) : (
        <MovieGrid movies={searchList} onSelect={openModal} />
      )}
      {isModalOpen && modalInfo && (
        <MovieModal onClose={cloesModal} movie={modalInfo} />
      )}
    </div>
  )
}

export default App
