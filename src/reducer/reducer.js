import {
  HANDLE_CHANGE,
  TOGGLE_ERROR,
  TOGGLE_LOADING,
  SET_REQUESTS,
  SET_USER,
  SET_FOLLOWERS,
  SET_REPOS,
} from './actionTypes' 
export const reducer =(state, action)=> {


 switch(action.type) {
 case TOGGLE_ERROR:
  return {
   ...state,
   error: action.payload
  }
  case TOGGLE_LOADING: 
  return {
   ...state,
   isLoading: action.payload
  }
  case HANDLE_CHANGE:
   return {
    ...state,
    user: action.payload
   }
   case SET_REQUESTS:
    return {
      ...state,
      remainingRequests: action.payload
    }
  case SET_USER: 
  return {
    ...state,
    githubUser: action.payload,
  }
  case SET_FOLLOWERS:
   return {
    ...state,
    followers: action.payload
   }
   case SET_REPOS:
    return {
     ...state,
     repos: action.payload
    }
  default: throw new Error(`no matching type ${action.type} found`)
 }
}
