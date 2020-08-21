import React, { useEffect, useState } from 'react';
import ModalVideo from 'react-modal-video';

type Props = {
  movie: Movie;
};

const Movie: React.FC<Props> = ({ movie }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [video, setVideo] = useState<Video | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const onClickVideo = () => {
    setLoading(true);
    window.dispatchEvent(
      new CustomEvent('onVideoDemand', { detail: { movieId: movie.id } })
    );
  };

  // Executed only once
  useEffect(() => {
    // Listens to a onLoadVideo event to show it into the modal.
    window.addEventListener('onLoadVideo', (event: any) => {
      if (event.detail.movieId === movie.id) {
        setLoading(false);
        setVideo(event.detail.video);
        setShowVideo(true);
      }
    });
  }, []);

  return (
    <li className="movie-item">
      {movie.posterPath ? (
        <img alt={movie.title} src={movie.posterPath} />
      ) : (
        <span />
      )}
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <div className="movie-text">{`Release date: ${movie.releaseDate}`}</div>
        <div className="movie-text">{`${movie.voteAverage}⭐`}</div>

        <div className="movie-actions">
          {!isLoading ? (
            <button className="movie-bt" onClick={onClickVideo} type="button">
              Watch trailer
            </button>
          ) : (
            <div className="movie-trailer-loading">Loading ...</div>
          )}
          <a
            href={movie.url}
            target="_blank"
            rel="noreferrer"
            className="movie-bt"
          >
            Open movie
          </a>
        </div>
      </div>

      {showVideo && video ? (
        <ModalVideo
          channel={video.site.toLowerCase() === 'youtube' ? 'youtube' : 'vimeo'}
          isOpen={video && showVideo}
          onClose={() => setShowVideo(false)}
          videoId={video.key}
          vimeo={{ autoplay: true }}
          youtube={{ autoplay: '1' }}
        />
      ) : null}
    </li>
  );
};

export default Movie;
