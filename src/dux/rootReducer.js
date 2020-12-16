import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import organizationsReducer from './organizationsSlice'
import projectsReducer from './projectsSlice'

const rootReducer = combineReducers({
  user: userReducer,
  organizations: organizationsReducer,
  projects: projectsReducer
})

export default rootReducer
