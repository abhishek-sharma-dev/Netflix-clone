import { fetchDataFromApi } from "./utils/api";
import { getPopularMovies } from "./Slice/homeSlice";
import { useDispatch} from "react-redux";


export const MoviesData = () => {
    
    const dispatch = useDispatch();
    const movieData = () => {
        fetchDataFromApi("/movie/popular").then((res) => {
          const popularMoviesData = res.results;
          dispatch(getPopularMovies(popularMoviesData));
        });
      };
      movieData();
}