import { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css'
import type Movie from '../../types/movie'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';




function App() {
  const token: string = import.meta.env.VITE_DOSTRUP;
  const [topic, setTopic] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<Movie | null>(null);
  const [page, setPage] = useState<number>(1)

  const fetchMovies = async (id: number) => {

    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          query: topic,
          language: 'en-US',
          page: id,
        },
      }
    );
    console.log(response.data)
    return response.data;

  };


  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['searchFor', topic, page],
    queryFn: () => fetchMovies(page),
    enabled: topic !== '',
  });

  const openModal = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedId = Number(event.currentTarget.id);
    const movie = data.results.find((el: Movie) => el.id === clickedId);

    if (movie) {
      setModalInfo(movie);
      setIsModalOpen(true);
    }
  }

  const cloesModal = () => { setIsModalOpen(false) }


  return (
    <div className={css.app}>
      <SearchBar onSubmit={setTopic} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}
      {isSuccess && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {data && <MovieGrid movies={data.results} onSelect={openModal} />}
      {isModalOpen && modalInfo && (
        <MovieModal onClose={cloesModal} movie={modalInfo} />
      )}
    </div>
  )
}

export default App
