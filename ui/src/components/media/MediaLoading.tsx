import React from 'react';
import Skeleton from '@charie/react-skeleton-preload';

const MediaLoading: React.FC = () => (
  <>
    {[...Array(20)].map((e, i) => (
      <li className="media-item" key={`loading-${i + 1}`}>
        <div className="media-poster-loading">
          <Skeleton colors={{ background: '#5d5d5d', pulse: '#444' }} />
        </div>
        <div className="media-info">
          <h2>
            <Skeleton colors={{ background: '#5d5d5d', pulse: '#444' }} />
          </h2>
          <div className="media-text">
            <Skeleton colors={{ background: '#5d5d5d', pulse: '#444' }} />
          </div>
          <div className="media-text">
            <Skeleton colors={{ background: '#5d5d5d', pulse: '#444' }} />
          </div>

          <div className="media-actions">
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

export default MediaLoading;
