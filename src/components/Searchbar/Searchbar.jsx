import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
    state = {
        imageName: '',
    };

    handleNameChange = event => {
        this.setState({ imageName: event.currentTarget.value.toLowerCase() });
    };

    hendleSubmit = event => {
        event.preventDefault();        

        if (this.state.imageName.trim() === '') {
            toast.warn('Input must not be empty!');
            return
        }
        this.props.onSubmit(this.state.imageName);
        // this.setState({ imageName: '' });
    };

    render() {
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.hendleSubmit}>
                    <button type="submit" className={css.button}>
                      {/* <span class={css.button__label}>Search</span> */}
                    </button>

                    <input
                        className={css.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        // value={this.state.imageName}
                        onChange={this.handleNameChange}
                    />
                </form>
            </header>
        )
    }
}