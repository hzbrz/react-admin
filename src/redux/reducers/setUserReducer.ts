import { User } from "../../models/user"

// have to set an initialState for reducers
const initialState = {
  user: new User()
}

// redcer takes the intial state and the action(s)
export const setUserReducer = (state = initialState, action: { type: string, user: User }) => {
  // using the action type we manage state
  switch (action.type) {
    case 'SET_USER':
      // whole goal of redux is to have immutable state, so we return a new state and not change it
      return { ...state, user: action.user }
  
    default:
      return state;
  }
}