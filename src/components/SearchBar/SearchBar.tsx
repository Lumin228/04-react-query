import { useId } from 'react';
import styles from './SearchBar.module.css'
interface OrderFormProps {
  onSubmit: (value: string) => void;
}


function SearchBar({ onSubmit }: OrderFormProps) {
    const handleSubmit = (formData: FormData) => {
        const search = formData.get('query') as string;
        onSubmit(search)
    };
    const id = useId();
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={styles.form} action={handleSubmit} id={id}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                        id={id}
                    />
                    <button className={styles.button} type="submit" id={id}>
                        Search
                    </button>
                </form>
            </div>
        </header>

    )
}

export default SearchBar