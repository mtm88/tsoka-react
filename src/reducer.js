export const GET_ACCOMODATIONS = 'tsoka/accomodations/LOAD';
export const GET_ACCOMODATIONS_SUCCESS = 'tsoka/accomodations/LOAD_SUCCESS';
export const GET_ACCOMODATIONS_FAIL = 'tsoka/accomodations/LOAD_FAIL';

export default function reducer(state = { accomodations: [] }, action) {
  switch (action.type) {
    case GET_ACCOMODATIONS:
      return { ...state, loading: true };
    case GET_ACCOMODATIONS_SUCCESS:
      return { ...state, loading: false, accomodations: action.payload.data };
    case GET_ACCOMODATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching accomodations',
      };
    default: return state;
  }
}

export function listAccomodations() {
  return {
    type: GET_ACCOMODATIONS,
    payload: {
      request: {
        url: '/fetch_all.php?table=accomodations',
      },
    },
  };
}
