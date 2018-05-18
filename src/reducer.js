export const FETCH_ALL = 'tsoka/FETCH_ALL';
export const FETCH_ALL_SUCCESS = 'tsoka/FETCH_ALL_SUCCESS';
export const FETCH_ALL_FAIL = 'tsoka/FETCH_ALL_FAIL';

export const FETCH_SINGLE_INFO = 'tsoka/FETCH_SINGLE';
export const FETCH_SINGLE_SUCCESS = 'tsoka/FETCH_SINGLE_SUCCESS';
export const FETCH_SINGLE_FAIL = 'tsoka/FETCH_SINGLE_FAIL';

export const FETCH_PAYMENTS = 'tsoka/FETCH_PAYMENTS';
export const FETCH_PAYMENTS_SUCCESS = 'tsoka/FETCH_PAYMENTS_SUCCESS';
export const FETCH_PAYMENTS_FAIL = 'tsoka/FETCH_PAYMENTS_FAIL';

export const SET_SELECTION = 'tsoka/selection/SET';

export const ADD_TO_CART = 'tsoka/cart/ADD';
export const REMOVE_FROM_CART = 'tsoka/cart/REMOVE';
export const FILTER_CART = 'tsoka/cart/FILTER';

export const APPLY_TO_CART = 'tsoka/cart/APPLY_TO_CART';
export const APPLY_TO_CART_SUCCESS = 'tsoka/cart/APPLY_TO_CART_SUCCESS';
export const APPLY_TO_CART_FAIL = 'tsoka/cart/APPLY_TO_CART_FAIL';

export const GET_MEMBER_INFO = 'tsoka/members/DETAILS';
export const GET_MEMBER_SUCCESS = 'tsoka/members/DETAILS_SUCCESS';
export const GET_MEMBER_FAIL = 'tsoka/members/DETAILS_FAIL';

export const FB_USER_LOGIN = 'tsoka/member/FB_LOGIN';

export const USER_LOGIN = 'tsoka/member/LOGIN';
export const USER_LOGIN_SUCCESS = 'tsoka/member/LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'tsoka/member/LOGIN_FAIL';

export const USER_LOGOUT = 'tsoka/member/LOGOUT';

export const USER_REGISTER = 'tsoka/member/REGISTER';
export const USER_REGISTER_SUCCESS = 'tsoka/member/REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'tsoka/member/REGISTER_FAIL';

export const CONFIRM_CODE = 'tsoka/member/CONFIRM_CODE';
export const CONFIRM_CODE_SUCCESS = 'tsoka/member/CONFIRM_CODE_SUCCESS';
export const CONFIRM_CODE_FAIL = 'tsoka/member/CONFIRM_CODE_FAIL';

export const FETCH_CLIENT_TOKEN = 'tsoka/braintree/CLIENT_TOKEN';
export const FETCH_CLIENT_TOKEN_SUCCESS = 'tsoka/braintree/CLIENT_TOKEN_SUCCESS';
export const FETCH_CLIENT_TOKEN_FAIL = 'tsoka/braintree/CLIENT_TOKEN_FAIL';


const initialState = {
  accommodations: [],
  places: [],
  place: [],
  blog_posts: [],
  memberInfo: {},
  cart: {
    items: {
      rooms: [],
      events: [],
      activities: [],
      transport: [],
    },
    filter: 'All',
  },
  selections: {
    place: null,
    accommodation: null,
    room: null,
    blog: null,
  },
  user: {
    id: null,
    loggedIn: false,
    failedAuth: false,
    login: null,
    fbLogin: false,
    error: null,
    confirmationCode: null,
    payments: [],
    braintree: {
      clientToken: null,
    },
  },
  loading: false,
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

    case FETCH_PAYMENTS:
      return {
        ...state,
        loading: true,
      }
    case FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          payments: action.payload.data,
        },
        loading: false,
      }
    case FETCH_PAYMENTS_FAIL:
      return {
        ...state,
        user: {
          ...state.user,
          payments: [],
        },
        loading: false,
      }

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

    case APPLY_TO_CART:
      return {
        ...state,
        loading: true,
      }
    case APPLY_TO_CART_SUCCESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: {
            ...state.cart.items,
            rooms: [],
            events: [],
            activities: [],
            transport: [],
          },
          filter: 'All',
        },
        loading: false,
      }
    case APPLY_TO_CART_FAIL:
      return {
        ...state,
        loading: false,
      }


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


    case FB_USER_LOGIN:
      return {
        ...state,
        user: {
          ...state.user,
          login: action.payload.userData.credentials.userId,
          id: action.payload.userData.credentials.userId,
          loggedIn: true,
          fbLogin: true,
        },
      };
    case USER_LOGIN:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          loggedIn: true,
          fbLogin: false,
          login: action.meta.previousAction.payload.login,
          id: action.payload.data,
        },
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          failedAuth: true,
        },
      };

    case USER_LOGOUT:
      return {
        ...state,
        user: {
          ...state.user,
          id: null,
          login: null,
          loggedIn: false,
          fbLogin: false,
          failedAuth: false,
        },
      };

    case USER_REGISTER:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          confirmationCode: action.payload.data.code,
          login: action.payload.data.email,
        },
        loading: false,
      }
    case USER_REGISTER_FAIL:
      return {
        ...state,
        user: {
          ...state.user,
          error: action.error.response.data,
        },
        loading: false,
      }

    case CONFIRM_CODE: {
      return {
        ...state,
        loading: true,
      };
    }
    case CONFIRM_CODE_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          loggedIn: true,
        },
      };
    }
    case CONFIRM_CODE_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }

    case FETCH_CLIENT_TOKEN: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_CLIENT_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          braintree: {
            ...state.user.braintree,
            clientToken: action.payload.data,
          },
        },
      };
    }
    case FETCH_CLIENT_TOKEN_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }  

    default: return state;
  }
}

export function login(login, password) {
  return {
    type: USER_LOGIN,
    payload: {
      login,
      password,
      request: {
        url: `/member_login.php?login=${login}&password=${password}`,
      }
    }
  }
}

export function fbLogin(userData) {
  return {
    type: FB_USER_LOGIN,
    payload: {
      userData,
    },
  };
}

export function logout() {
  return {
    type: USER_LOGOUT,
  };
}

export function register({ fName, lName, userName, email, phone, password, cPassword }) {
  return {
    type: USER_REGISTER,
    payload: {
      request: {
        method: 'post',
        data: { fName, lName, userName, email, phone, password, cPassword },
        url: '/member_register.php',
      }
    },
  };
}

export function confirmRegistrationCode({ login, code }) {
  return {
    type: CONFIRM_CODE,
    payload: {
      request: {
        url: `/confirm_code.php?login=${login}&code=${code}`,
      },
    },
  };
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

export function fetchPayments(userId) {
  return {
    type: FETCH_PAYMENTS,
    payload: {
      request: {
        url: `fetch_payments.php?userId=${userId}`,
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

export function applyToCart(items, user) {
  return {
    type: APPLY_TO_CART,
    payload: {
      request: {
        method: 'post',
        data: {
          items,
          userID: user.id,
        },
        url: '/apply_to_cart.php',
      }
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

export function fetchClientToken() {
  return {
    type: FETCH_CLIENT_TOKEN,
    payload: {
      request: {
        url: '/braintree/client_token.php',
      }
    }
  }
}
