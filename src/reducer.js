export const GET_ACCOMODATIONS = 'tsoka/accomodations/ALL';
export const GET_ACCOMODATIONS_SUCCESS = 'tsoka/accomodations/ALL_SUCCESS';
export const GET_ACCOMODATIONS_FAIL = 'tsoka/accomodations/ALL_FAIL';

export const GET_ACCOMMODATION_INFO = 'tsoka/accomodations/DETAILS';
export const GET_ACCOMMODATION_SUCCESS = 'tsoka/accomodations/DETAILS_SUCCESS';
export const GET_ACCOMMODATION_FAIL = 'tsoka/accomodations/DETAILS_FAIL';

export const GET_MEMBER_INFO = 'tsoka/members/DETAILS';
export const GET_MEMBER_SUCCESS = 'tsoka/members/DETAILS_SUCCESS';
export const GET_MEMBER_FAIL = 'tsoka/members/DETAILS_FAIL';

const initialState = {
  accomodations: [],
  accoDetails: {},
  memberInfo: {},
};

export default function reducer(state = initialState, action) {
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

    case GET_ACCOMMODATION_INFO:
      return { ...state, loading: true };
    case GET_ACCOMMODATION_SUCCESS:
      return { ...state, loading: false, accoDetails: action.payload.data };
    case GET_ACCOMMODATION_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching accommodation details',
      };

    case GET_MEMBER_INFO:
      return { ...state, loading: true };
    case GET_MEMBER_SUCCESS:
      return { ...state, loading: false, memberInfo: action.payload.data };
    case GET_MEMBER_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching member details',
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

export function getAccoDetails(accoId) {
  return {
    type: GET_ACCOMMODATION_INFO,
    payload: {
      request: {
        url: `/fetch.php?table=accommodations&id=${accoId}`,
      },
    },
  };
}

export function getMember(memberId) {
  return {
    type: GET_MEMBER_INFO,
    payload: {
      request: {
        url: `/fetch.php?table=members&id=${memberId}`,
      },
    },
  };
}
