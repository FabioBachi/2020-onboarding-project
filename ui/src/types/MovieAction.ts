interface MovieActionPayload {
  loading?: boolean;
  selectedSorting?: string;
}

interface MovieAction {
  payload: MovieActionPayload;
  type: string;
}
