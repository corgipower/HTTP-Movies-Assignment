import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';

const UpdateMovieForm = props => {
    const initialState = {
      id: '',
      title: '',
      director: '',
      metascore: '',
      stars: [],
    }

    const {push} = useHistory();
    const [updatedMovie, setUpdatedMovie] = useState(initialState);
    const {id} = useParams();

    useEffect(() => {
        Axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setUpdatedMovie(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleChange = e => {
        let value = '';
        if(e.target.name === 'stars') {
            value = e.target.value.split(',');
        } else {
            value = e.target.value
        }

        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]: value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        Axios
            .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
            .then(res => {
                setUpdatedMovie(res.data);
                push(`/`);
            })
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title: </label>
            <input name='title' type='text' value={updatedMovie.title} onChange={handleChange} />
            <label htmlFor='director'>Director: </label>
            <input name='director' type='text' value={updatedMovie.director} onChange={handleChange} />
            <label htmlFor='metascore'>Metascore: </label>
            <input name='metascore' type='text' value={updatedMovie.metascore} onChange={handleChange} />
            <label htmlFor='stars'>Stars: </label>
            <input name='stars' type='text' value={updatedMovie.stars} onChange={handleChange} />

            <button type='submit'>Submit</button>
        </form>
    )

}

export default UpdateMovieForm;