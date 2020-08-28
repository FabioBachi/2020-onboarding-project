import React, { useEffect, useState } from 'react';
import ModalVideo from 'react-modal-video';

import store from '../../store';

type Props = {
  media: Media;
};

const MediaItem: React.FC<Props> = ({ media }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [video, setVideo] = useState<Video | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const onClickVideo = () => {
    setLoading(true);
    window.dispatchEvent(
      new CustomEvent('onVideoDemand', {
        detail: { mediaId: media.id, type: store.getState().media.mediaType },
      })
    );
  };

  // Executed only once
  useEffect(() => {
    // Listens to a onLoadVideo event to show it into the modal.
    window.addEventListener('onLoadVideo', (event: any) => {
      if (event.detail.mediaId === media.id) {
        setLoading(false);

        if (event.detail.video) {
          setVideo(event.detail.video);
          setShowVideo(true);
        } else {
          window.dispatchEvent(
            new CustomEvent('onError', {
              detail: { message: 'No video was found for this media.' },
            })
          );
        }
      }
    });
  }, []);

  return (
    <li className="media-item">
      {media.posterPath ? (
        <img alt={media.title} src={media.posterPath} />
      ) : (
        <span />
      )}
      <div className="media-info">
        <h2>{media.title}</h2>
        <div className="media-text">{`Release date: ${media.releaseDate}`}</div>
        <div className="media-text">{`${media.voteAverage}⭐`}</div>

        <div className="media-actions">
          {!isLoading ? (
            <button className="media-bt" onClick={onClickVideo} type="button">
              Watch trailer
            </button>
          ) : (
            <div className="media-trailer-loading">Loading ...</div>
          )}
          <a
            href={media.url}
            target="_blank"
            rel="noreferrer"
            className="media-bt"
          >
            Open media
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

export default MediaItem;
