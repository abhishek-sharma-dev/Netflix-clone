import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    imageUrl: {},
    genres: {
      movieGeneres: [],
      tvGeneres: []
    },
    popularMovies: [],
    watchlist: [],
  },
  reducers: {
    getImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    getGeners: (state, action) => {
      const { movieGeneres, tvGeneres } = action.payload;
      state.genres = {
        movieGeneres: movieGeneres || [],
        tvGeneres: tvGeneres || [],
      };
    },
    getPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    getWatchList: (state, action) => {
      state.watchlist = action.payload
    },
  },
});

export const {
  getImageUrl,
  getGeners,
  getPopularMovies,
  getWatchList,
} = homeSlice.actions;

export default homeSlice.reducer;
