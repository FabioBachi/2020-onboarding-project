import React from 'react';
import Skeleton from '@charie/react-skeleton-preload';

const MovieLoading: React.FC = () => (
  <>
    {[...Array(20)].map(() => (
      <li className="movie-item">
        <div className="movie-poster-loading">
          <Skeleton colors={{ background: '#5d5d5d', pulse: '#444' }} />
        </div>
        <div className="movie-info">
          <h2>
            <Skeleton colors={{ background: '#5d5d5d', pulse: '#444' }} />
          </h2>
          <div className="movie-text">
            <Skeleton colors={{ background: '#5d5d5d', pulse: '#444' }} />
          </div>
          <div className="movie-text">
            <Skeleton colors={{ background: '#5d5d5d', pulse: '#444' }} />
          </div>

          <div className="movie-actions">
            <Skeleton
              colors={{ background: '#5d5d5d', pulse: '#444' }}
              width="90"
            />
            <Skeleton
              colors={{ background: '#5d5d5d', pulse: '#444' }}
              width="90"
            />
          </div>
        </div>
      </li>
    ))}
  </>
);

export default MovieLoading;
