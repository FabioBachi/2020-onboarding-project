interface MediaActionPayload {
  loading?: boolean;
  mediaType?: string;
  selectedSorting?: string;
}

interface MediaAction {
  payload: MediaActionPayload;
  type: string;
}
