import React, { useState, useReducer, useContext } from 'react'
import reducer from './Reducer'
import axios from 'axios'

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from './Action'
const initialState = {
  isLoading: false,
  showAlert: false,
  alertString: ' ',
  alertType: ' ',
  user: null,
  token: null,
  userLocation: '',
  jobLocation: '',
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })

    try {
      const registerDeatils = await axios.post(
        '/api/v1/auth/register',
        currentUser
      )
      console.log(registerDeatils)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const UseAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState }
