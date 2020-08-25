export const Types = {
  TOGGLE_LOADING: 'movies/TOGGLE_LOADING',
  CHANGE_SORTING: 'movies/CHANGE_SORTING',
};

const INITIAL_STATE: MovieActionPayload = {
  loading: true,
  selectedSorting: 'voteAverage',
};

export default function reducer(state = INITIAL_STATE, action: MovieAction) {
  switch (action.type) {
    case Types.TOGGLE_LOADING:
      return { ...state, loading: action.payload.loading };

    case Types.CHANGE_SORTING:
      return { ...state, selectedSorting: action.payload.selectedSorting };

    default:
      return state;
  }
}

export const Creators = {
  changeSorting: (sortBy: string) => ({
    type: Types.CHANGE_SORTING,
    payload: { selectedSorting: sortBy },
  }),

  toggleLoading: (loading: boolean) => ({
    type: Types.TOGGLE_LOADING,
    payload: { loading },
  }),
};
