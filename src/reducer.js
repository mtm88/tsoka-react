export const FETCH_ALL = 'tsoka/FETCH_ALL';
export const FETCH_ALL_SUCCESS = 'tsoka/FETCH_ALL_SUCCESS';
export const FETCH_ALL_FAIL = 'tsoka/FETCH_ALL_FAIL';

export const FETCH_SINGLE_INFO = 'tsoka/FETCH_SINGLE';
export const FETCH_SINGLE_SUCCESS = 'tsoka/FETCH_SINGLE_SUCCESS';
export const FETCH_SINGLE_FAIL = 'tsoka/FETCH_SINGLE_FAIL';

export const GET_MEMBER_INFO = 'tsoka/members/DETAILS';
export const GET_MEMBER_SUCCESS = 'tsoka/members/DETAILS_SUCCESS';
export const GET_MEMBER_FAIL = 'tsoka/members/DETAILS_FAIL';

const initialState = {
  accommodations: [],
  places: [],
  place: [],
  memberInfo: {},
};

const devMode = env === 'development';

import './config';

export default function reducer(state = initialState, action) {
  let data;

  switch (action.type) {
    case FETCH_ALL:
      return { ...state, loading: true };
    case FETCH_ALL_SUCCESS:
      data = {};
      data[action.payload.config.reduxSourceAction.table] = action.payload.data;
      return { ...state, loading: false, ...data };
    case FETCH_ALL_FAIL:
      if (devMode) {
        console.error(`Error while fetching ${action.error.config.reduxSourceAction.table}`);
      }
      return {
        ...state,
        loading: false,
        error: `Error while fetching ${action.error.config.reduxSourceAction.table}`,
      };

    case FETCH_SINGLE_INFO:
      return { ...state, loading: true };
    case FETCH_SINGLE_SUCCESS:
      data = {};
      data[action.payload.config.reduxSourceAction.recordType] = action.payload.data;
      return { ...state, loading: false, ...data };
    case FETCH_SINGLE_FAIL:
      if (devMode) {
        console.error(`Error while fetching ${action.error.config.reduxSourceAction.recordType} details`);
      }
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
      if (devMode) {
        console.error('Error while fetching member details');
      }
      return {
        ...state,
        loading: false,
        error: 'Error while fetching member details',
      };

    default: return state;
  }
}

export function list(table, searchProp = 'name', text = '') {
  return {
    type: FETCH_ALL,
    table,
    payload: {
      request: {
        url: `/fetch_all.php?table=${table}&searchProp=${searchProp}&value=${text}`,
      },
    },
  };
}

export function getSingle(table, recordType, id, prop) {
  return {
    type: FETCH_SINGLE_INFO,
    recordType,
    payload: {
      request: {
        url: `/fetch_all.php?table=${table}&searchProp=${prop || 'id'}&value=${id}`,
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
