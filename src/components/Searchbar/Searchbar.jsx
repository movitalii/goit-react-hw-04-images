import { useState } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';

export const Searchbar = ({handleSearchSubmit}) => {
    const [imageName, setImageName] = useState('')
    

    const handleNameChange = event => {
        setImageName(event.currentTarget.value.toLowerCase());
    };

    const hendleSubmit = event => {
        event.preventDefault();        

        if (imageName.trim() === '') {
            toast.warn('Input must not be empty!');
            return
        }
        handleSearchSubmit(imageName);
    };

     
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={hendleSubmit}>
                    <button type="submit" className={css.button}>                     
                    </button>

                    <input
                        className={css.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        // value={this.state.imageName}
                        onChange={handleNameChange}
                    />
                </form>
            </header>
        )
    
}