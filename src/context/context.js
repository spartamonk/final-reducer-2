import React, { useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import { reducer } from '../reducer/reducer'
import axios from 'axios'
import {
  HANDLE_CHANGE,
  HANDLE_SUBMIT,
  TOGGLE_ERROR,
  TOGGLE_LOADING,
  SET_REQUESTS,
  SET_USER,
  SET_FOLLOWERS,
  SET_REPOS,
} from '../reducer/actionTypes'
const rootUrl = 'https://api.github.com'
const GithubContext = React.createContext()

const initialState = {
  githubUser: mockUser,
  followers: mockFollowers,
  repos: mockRepos,
  remainingRequests: 0,
  user: '',
  isLoading: false,
  error: {
    isError: false,
    errorMsg: '',
  },
}
const GithubProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const toggleError = (isError = false, errorMsg = '') => {
    dispatch({ type: TOGGLE_ERROR, payload: { isError, errorMsg } })
  }
  const toggleLoading = (isLoading = false) => {
    dispatch({ type: TOGGLE_LOADING, payload: isLoading })
  }
  const handleChange = (value) => {
    dispatch({ type: HANDLE_CHANGE, payload: value })
  }
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then((response) => {
        let { remaining } = response.data.rate

        dispatch({ type: SET_REQUESTS, payload: remaining })
        if (remaining === 0) {
          toggleError(true, 'you have used all your hourly requests')
        }
      })
      .catch((error) => console.log(error))
  }
  const fetchUser = async () => {
    toggleLoading(true)
    toggleError()
    const response = await axios(`${rootUrl}/users/${state.user}`).catch(
      (error) => console.log(error)
    )
    if (response) {
      const { data } = response
      dispatch({ type: SET_USER, payload: data })
      const { followers_url, login } = data
      // axios(`${followers_url}?per_page=100`).then(response=> {
      //  dispatch({type: SET_FOLLOWERS, payload: response.data})
      // }).catch(error=> console.log(error));
      // axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(response=> {
      //  dispatch({type: SET_REPOS, payload: response.data})
      // }).catch(error=>console.log(error))
      await Promise.allSettled([
        axios(`${followers_url}?per_page=100`),
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
      ])
        .then((response) => {
          const [followers, repos] = response
          const state = 'fulfilled'
          if (followers.status === state) {
            dispatch({ type: SET_FOLLOWERS, payload: followers.value.data })
          }
          if (repos.status === state) {
            dispatch({ type: SET_REPOS, payload: repos.value.data })
          }
        })
        .catch((error) => console.log(error))
    } else {
      toggleError(true, 'There Is No User With That Username')
    }
    toggleLoading()
    checkRequests()
  }
  useEffect(checkRequests, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    if (state.user) {
      fetchUser()
    }
  }
  return (
    <GithubContext.Provider
      value={{
        ...state,
        toggleError,
        toggleLoading,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

const useGlobalContext = () => {
  return React.useContext(GithubContext)
}

export { GithubProvider, useGlobalContext }
