import { MediaType } from '../../types/MediaType';

export const Types = {
  CHANGE_MEDIA_TYPE: 'media/CHANGE_MEDIA_TYPE',
  CHANGE_SORTING: 'media/CHANGE_SORTING',
  TOGGLE_LOADING: 'media/TOGGLE_LOADING',
};

const INITIAL_STATE: MediaActionPayload = {
  loading: true,
  mediaType: 'movie',
  selectedSorting: 'voteAverage',
};

export default function reducer(state = INITIAL_STATE, action: MediaAction) {
  switch (action.type) {
    case Types.CHANGE_MEDIA_TYPE:
      return { ...state, mediaType: action.payload.mediaType };

    case Types.CHANGE_SORTING:
      return { ...state, selectedSorting: action.payload.selectedSorting };

    case Types.TOGGLE_LOADING:
      return { ...state, loading: action.payload.loading };

    default:
      return state;
  }
}

export const changeMediaType = (mediaType: MediaType) => ({
  type: Types.CHANGE_MEDIA_TYPE,
  payload: { mediaType },
});

export const changeSorting = (sortBy: string) => ({
  type: Types.CHANGE_SORTING,
  payload: { selectedSorting: sortBy },
});

export const toggleLoading = (loading: boolean) => ({
  type: Types.TOGGLE_LOADING,
  payload: { loading },
});
