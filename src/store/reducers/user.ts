import * as actions from '../actions/login';

const initialState: User = {
  id: '',
  name: '',
  mobile: '',
  avatar: '',
  authorities: []
};

export default function user(state = initialState, action: { type: string; payload: any }): User {
  switch (action.type) {
    case actions.LOGIN:
      return action.payload;
    case actions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
