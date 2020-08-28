import React from 'react';
import { connect } from 'react-redux';

import MediaItem from './MediaItem';
import MediaLoading from './MediaLoading';
import { toggleLoading } from '../../store/ducks/media';

interface Props {
  loading?: boolean;
  media: Media[];
}

const MediaList: React.FC<Props> = ({ loading, media }: Props) => {
  return media && media.length ? (
    <ul id="media-list">
      {!loading ? (
        media.map((item: Media) => (
          <MediaItem key={`media-${item.id}`} media={item} />
        ))
      ) : (
        <MediaLoading />
      )}
    </ul>
  ) : (
    <div className="no-items">No media found.</div>
  );
};

MediaList.defaultProps = { loading: false };

const mapStateToProps = ({ media }: StoreState) => ({
  loading: media.loading,
});

const mapDispatchToProps = { toggleLoading };

export default connect(mapStateToProps, mapDispatchToProps)(MediaList);
