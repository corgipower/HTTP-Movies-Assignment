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
        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        Axios
            .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
            .then(res => {
                setUpdatedMovie(res.data);
                push(`/movies/${id}`);
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

            <button type='submit'>Submit</button>
        </form>
    )

}

export default UpdateMovieForm;