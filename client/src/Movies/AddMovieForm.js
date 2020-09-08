import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

const AddMovieForm = () => {
    const initialState = {
      id: '',
      title: '',
      director: '',
      metascore: '',
      stars: '',
    }

    const {push} = useHistory();
    const [addedMovie, setAddedMovie] = useState(initialState);
    
    const handleChange = e => {
        let value = '';
        if(e.target.name === 'stars') {
            value = e.target.value.split(',');
        } else {
            value = e.target.value
        }

        setAddedMovie({
            ...addedMovie,
            [e.target.name]: value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        Axios
            .post('http://localhost:5000/api/movies/', addedMovie)
            .then(push(`/`))
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title: </label>
            <input name='title' type='text' value={addedMovie.title} onChange={handleChange} />
            <label htmlFor='director'>Director: </label>
            <input name='director' type='text' value={addedMovie.director} onChange={handleChange} />
            <label htmlFor='metascore'>Metascore: </label>
            <input name='metascore' type='text' value={addedMovie.metascore} onChange={handleChange} />
            <label htmlFor='stars'>Stars: </label>
            <input name='stars' type='text' value={addedMovie.stars} onChange={handleChange} />

            <button type='submit'>Submit</button>
        </form>
    )
}

export default AddMovieForm