import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { AlertDialog } from '@arterial/dialog';
import { connect } from 'react-redux';

import './assets/scss/main.scss';

import Filters from './components/layout/Filters';
import Header from './components/layout/Header';
import MediaList from './components/media/MediaList';
import { changeSorting, toggleLoading } from './store/ducks/media';
import { MediaType } from './types/MediaType';

interface MediaProps {
  genres: Genre[];
  media: Media[];
  mediaType?: string;
  selectedGenres: number[];
  selectedSorting: string;
}

const mapDispatchToProps = {
  changeSorting,
  toggleLoading,
};

type Props = MediaProps & typeof mapDispatchToProps;

const MediaSuggestion: React.FC<Props> = ({
  genres,
  media: mediaProps,
  mediaType,
  selectedGenres,
  selectedSorting,
  ...props
}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [media, setMedia] = useState<Array<Media>>(mediaProps);

  // Executed only once
  useEffect(() => {
    props.changeSorting(selectedSorting);

    // Listens to a onLoadMedia event to show them into the UI.
    window.addEventListener('onLoadMedia', (event: any) => {
      setMedia(event.detail.media);
      props.toggleLoading(false);
    });

    // Listen to errors triggered by the Backbone app.
    window.addEventListener('onError', (event: any) => {
      setError(
        event.detail && event.detail.message
          ? event.detail.message
          : 'Please check your connection and try again in a moment.'
      );
      props.toggleLoading(false);
    });
  }, []);

  return (
    <div
      id="media-suggestion"
      className={classNames({
        movie: mediaType === MediaType.Movie,
        tv: mediaType === MediaType.TV,
      })}
    >
      <Header />
      <Filters genres={genres} selectedGenres={selectedGenres} />
      <MediaList media={media} />

      <AlertDialog
        title="Ops, something went wrong."
        content={error}
        confirmingButtonLabel="Close"
        onClose={() => setError(null)}
        open={error !== null}
      />
    </div>
  );
};

const mapStateToProps = ({ media }: StoreState) => ({
  mediaType: media.mediaType,
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaSuggestion);
