import React, { useState, useEffect } from 'react';
import { fetchMovies } from './ApiService';

const Content = ({ tabId, searchState, updateSearchState, addRecentSearch }) => {
  const initialSearchState = JSON.parse(sessionStorage.getItem(`searchState_${tabId}`)) || {
    query: '',
    results: [],
    selectedMovie: null
  };

  const [newSearch, setNewSearch] = useState(initialSearchState.query);
  const [searchResults, setSearchResults] = useState(initialSearchState.results);
  const [selectedMovie, setSelectedMovie] = useState(initialSearchState.selectedMovie);

  useEffect(() => {
    const savedSearchState = {
      query: newSearch,
      results: searchResults,
      selectedMovie: selectedMovie
    };
    sessionStorage.setItem(`searchState_${tabId}`, JSON.stringify(savedSearchState));
  }, [newSearch, searchResults, selectedMovie, tabId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (newSearch) {
        fetchMovies(newSearch).then(results => {
          setSearchResults(results);
          updateSearchState(tabId, { query: newSearch, results, selectedMovie });
        });
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [newSearch]);

  const handleSearchInput = (e) => {
    setNewSearch(e.target.value);
  };

  const handleMovieSelection = (movie) => {
    setSelectedMovie(movie);
    setNewSearch('');
    setSearchResults([]);
    updateSearchState(tabId, { query: '', results: [], selectedMovie: movie });
    addRecentSearch(movie.Title);
  };

  return (
    <div className='w-full max-sm:w-auto h-auto m-[15px] bg-[white] rounded-lg p-4'>
        <div className='flex justify-center'>
          <input
            type='text'
            value={newSearch}
            onChange={handleSearchInput}
            placeholder='Search for a movie...'
            className='p-[10px] w-[600px] flex border rounded-3xl '
          />
        </div>
        <div className='flex justify-center'>
          {searchResults.length > 0 && (
            <div className='border w-[500px] rounded mt-2 bg-white shadow-lg'>
              {searchResults.map((movie) => (
                <div
                  key={movie.imdbID}
                  onClick={() => handleMovieSelection(movie)}
                  className='cursor-pointer p-2 hover:bg-gray-200'
                >
                  {movie.Title} ({movie.Year})
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='flex justify-center'>
          {selectedMovie && (
            <div className='mt-[50px]'>
              <h2 className='text-2xl font-bold'>{selectedMovie.Title}</h2>
              <p>Release Year: {selectedMovie.Year}</p>
              <p>Type: {selectedMovie.Type}</p>
              <img src={selectedMovie.Poster} alt={selectedMovie.Title} className='mt-4 w-[200px]' />
            </div>
          )}
        </div>
      </div>
  );
};

export default Content;
