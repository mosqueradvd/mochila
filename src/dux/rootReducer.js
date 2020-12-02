import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import organizationsReducer from './organizationsSlice'

const rootReducer = combineReducers({
  user: userReducer,
  organizations: organizationsReducer
})

export default rootReducer
