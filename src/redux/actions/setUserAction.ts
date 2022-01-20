import { User } from "../../models/user";

// paren in arrow func. to return an object
export const setUser = (user: User) => ({
  // for every action we need a type which we will use to identify the action
  type: 'SET_USER',
  user
})