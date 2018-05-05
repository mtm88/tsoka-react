export const FETCH_ALL = 'tsoka/FETCH_ALL';
export const FETCH_ALL_SUCCESS = 'tsoka/FETCH_ALL_SUCCESS';
export const FETCH_ALL_FAIL = 'tsoka/FETCH_ALL_FAIL';

export const FETCH_SINGLE_INFO = 'tsoka/FETCH_SINGLE';
export const FETCH_SINGLE_SUCCESS = 'tsoka/FETCH_SINGLE_SUCCESS';
export const FETCH_SINGLE_FAIL = 'tsoka/FETCH_SINGLE_FAIL';

export const SET_SELECTION = 'tsoka/selection/SET';

export const ADD_TO_CART = 'tsoka/cart/ADD';
export const REMOVE_FROM_CART = 'tsoka/cart/REMOVE';
export const FILTER_CART = 'tsoka/cart/FILTER';

export const GET_MEMBER_INFO = 'tsoka/members/DETAILS';
export const GET_MEMBER_SUCCESS = 'tsoka/members/DETAILS_SUCCESS';
export const GET_MEMBER_FAIL = 'tsoka/members/DETAILS_FAIL';

const initialState = {
  accommodations: [],
  places: [],
  place: [],
  memberInfo: {},
  // cart: {
  //   items: {
  //     rooms: [],
  //     events: [],
  //     activities: [],
  //     transport: [],
  //   },
  //   filter: 'All',
  // },
  cart: {
    items: {
      events: [],
      activities: [],
      transport: [],
      rooms: [
        {
          type: 'room',
          item: {
            id: '1',
            acco_id: '1',
            type: '1',
            price: '120.00',
            image: 'Tsoka_1_900540900_x2.jpg',
            description: 'The cheapest first class rooms',
            created: '2018-01-24',
            modified: '2018-01-24 23:23:52',
            key: '1'
          },
          startDate: '03/05/2018',
          endDate: '03/05/2018',
          noOfPeople: 2,
          noOfRooms: 3
        },
      ]
    },
    filter: 'All',
  },
  selections: {
    place: null,
    accommodation: null,
    room: null,
  }
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

    case SET_SELECTION:
      const selections = state.selections;
      selections[action.payload.scope] = action.payload.selection;
      return {
        ...state,
        selections,
      }

    case ADD_TO_CART:
      const itemType = action.payload.type;

      return {
        ...state,
        cart: {
          ...state.cart,
          items: {
            ...state.cart.items,
            [itemType]: [
              ...state.cart.items[itemType],
              action.payload,
            ],
          },
        },
      };

    case REMOVE_FROM_CART:
      const type = action.payload.type;
      const modifiedType = state.cart.items[type];
      const requestedElToRemove = modifiedType.findIndex(({ item: { id } }) => id === action.payload.index.toString());

      return {
        ...state,
        cart: {
          ...state.cart,
          items: {
            ...state.cart.items,
            [type]: state.cart.items[type].filter(((item, index) => index !== requestedElToRemove)),
          }
        },
      };

    case FILTER_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          filter: action.payload.filter,
        },
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

export function setSelection(scope, selection) {
  return {
    type: SET_SELECTION,
    payload: {
      scope,
      selection,
    }
  }
}

export function addToCart({ type, item, startDate, endDate, noOfPeople, noOfRooms }) {
  item.key = item.id;
  return {
    type: ADD_TO_CART,
    payload: {
      type, item, startDate, endDate, noOfPeople, noOfRooms,
    }
  }
}

export function removeFromCart(type, index) {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      type,
      index,
    },
  };
}

export function filterCart(filter) {
  return {
    type: FILTER_CART,
    payload: {
      filter,
    }
  }
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
