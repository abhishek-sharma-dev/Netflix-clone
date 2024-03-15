import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDdhMmQ1MzA5ODg3ZTg0M2U0Zjk2M2M5YzZiYjI0MyIsInN1YiI6IjYzODBmNzA5YTQxMGM4MDA4NDgyMGVjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.luOAs3cSwgJnRfbw9D25IFbcXUAFs9VCn-9Y5ZUzSkk"

const headers = {
    Authorization: 'Bearer '+ TMDB_TOKEN,
}

export const fetchDataFromApi = async (url, params) => {
    try {
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data
    } catch (error) {
        console.log(error);
        return error
    }
}
