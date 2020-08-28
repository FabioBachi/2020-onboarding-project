import React from 'react';
import Toggle from 'react-toggle';
import { connect } from 'react-redux';

import { changeMediaType } from '../../store/ducks/media';
import { MediaType } from '../../types/MediaType';

interface MediaTypeSelectorProps {
  loading?: boolean;
  mediaType?: string;
}

const mapDispatchToProps = {
  changeMedia: changeMediaType,
};

type Props = MediaTypeSelectorProps & typeof mapDispatchToProps;

const MediaTypeSelector: React.FC<Props> = ({
  changeMedia,
  loading,
  mediaType,
}: Props) => {
  const onChange: () => void = (): void => {
    const newType: MediaType =
      mediaType === MediaType.Movie ? MediaType.TV : MediaType.Movie;

    changeMedia(newType);

    window.dispatchEvent(
      new CustomEvent('onMediaTypeChange', {
        detail: { type: newType },
      })
    );
  };

  return (
    <div id="media-type-selector">
      <div className="label">Movies</div>
      <Toggle
        defaultChecked={mediaType === MediaType.TV}
        disabled={loading === true}
        icons={false}
        id="media-type"
        onChange={onChange}
      />
      <div className="label">TV Series</div>
    </div>
  );
};

const mapStateToProps = ({ media }: StoreState) => ({
  loading: media.loading,
  mediaType: media.mediaType,
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaTypeSelector);
