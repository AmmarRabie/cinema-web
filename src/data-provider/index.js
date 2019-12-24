import Axios from 'axios';

export async function login(username, password) {
    console.log(username, password)
    const encodedAuth = btoa(username + ":" + password)
    try {
        const response = await Axios.get("http://localhost:5000/login", { headers: { 'Authorization': `Basic ${encodedAuth}` } })
        console.log(response.data)
        return response.data
        
    } catch (error) {
        console.log("errrorr", error.message)
        return error.data
    }
}

export async function signup(fname, lname, username, email, password, birthDate) {
    console.log(fname, lname, username, email, password)
    const body = {
        fname, lname, username, email, password, birthDate
    }
    try {
        const response = await Axios.post("http://localhost:5000/signup", body)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log("errrorr", error.message)
        return error.data
    }
}


export async function getMovies(token) {
    console.log(token)
    try {
        const response = await Axios.get("http://localhost:5000/movies/", { headers: { 'x-access-token': token } })
        console.log(response.data)
        return response.data.movies
    } catch (error) {
        console.log("errrorr", error.message)
        return error.data
    }
}

export async function getScreeningReservations(token, screeningId) {
    console.log(token)
    try {
        const response = await Axios.get(`http://localhost:5000/screenings/${screeningId}/reservations`, { headers: { 'x-access-token': token } })
        console.log(response.data)
        return response.data.reservations
    } catch (error) {
        console.log("errrorr", error.message)
        return error.data
    }
}


export async function makeReservation(token, screeningId, pos) {
    console.log("makeReservation called with: ", token, screeningId, pos)
    const body = {
        pos
    }
    try {
        const response = await Axios.post(`http://localhost:5000/screenings/${screeningId}/reservations`, body, { headers: { 'x-access-token': token } })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log("errrorr", error.message)
        return error.data
    }
}

export async function addMovie(token, screenId, title, genre, length) {
    console.log("addMovie called with: ", token, screenId, title, genre, length)
    const body = {
        name: title,
        genre,
        length, screenId
    }
    try {
        const response = await Axios.post(`http://localhost:5000/movies`, body, { headers: { 'x-access-token': token } })
        console.log(response.data)
        return response.data.movie
    } catch (error) {
        console.log("errrorr", error.message)
        return error.data
    }
}

export async function addScreening(token, movieId, time) {
    console.log("makeReservation called with: ", token, movieId, time)
    const body = {
        time
    }
    try {
        const response = await Axios.post(`http://localhost:5000/movies/${movieId}`, body, { headers: { 'x-access-token': token } })
        console.log(response.data)
        return response.data.screening
    } catch (error) {
        console.log("errrorr", error.message)
        return error.data
    }
}