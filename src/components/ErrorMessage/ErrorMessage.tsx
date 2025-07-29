import css from './ErrorMessage.module.css'

function ErrorMessage({message}) {
    return (
        <>
            <p className={css.text}>There was an error {message}, please try again...</p>
        </>
    )
}

export default ErrorMessage