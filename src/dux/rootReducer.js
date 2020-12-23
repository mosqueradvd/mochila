import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from './loginSlice'
import organizationsReducer from './organizationsSlice'
import projectsReducer from './projectsSlice'
import usersReducer from './usersSlice'

const rootReducer = combineReducers({
  login: loginReducer,
  organizations: organizationsReducer,
  projects: projectsReducer,
  users: usersReducer
})

export default rootReducer
