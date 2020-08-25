import React from 'react';
import { connect } from 'react-redux';

import Movie from './Movie';
import { Creators } from '../../store/ducks/movies';

interface Props {
  loading?: boolean;
  movies: Movie[];
}

const Movies: React.FC<Props> = ({ loading, movies }: Props) => {
  return movies && movies.length ? (
    <>
      {!loading ? (
        <ul id="movies-list">
          {movies.map((movie: Movie) => (
            <Movie key={`movie-${movie.id}`} movie={movie} />
          ))}
        </ul>
      ) : (
        <div className="loading">Loading ...</div>
      )}
    </>
  ) : (
    <div className="no-items">No movies found.</div>
  );
};

Movies.defaultProps = { loading: false };

const mapStateToProps = ({ movies }: StoreState) => ({
  loading: movies.loading,
});

const mapDispatchToProps = { toggleLoading: Creators.toggleLoading };

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
