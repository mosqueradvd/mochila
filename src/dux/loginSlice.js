import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: null,
  userEmail: null,
  organizationId: null,
  userRole: null,
  isAuthenticated: null,
  userStatus: null,
  isAuthorized: null,
  unAuthorizedUser: null
}

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    setCurrentUser (state, { payload: { userName, userEmail, organizationId, userRole, userStatus } }) {
      state.userName = userName
      state.userEmail = userEmail
      state.organizationId = organizationId
      state.userRole = userRole
      state.isAuthenticated = true
      state.isAuthorized = true
      state.userStatus = userStatus
    },
    setUnauthorizedUser: (state, { payload: { unAuthorizedUser } }) => {
      state.isAuthorized = false
      state.unAuthorizedUser = unAuthorizedUser
    }
  }
})

export const {
  setCurrentUser,
  setUnauthorizedUser
} = loginSlice.actions

export const getCurrentUser = (state) => state.login

export default loginSlice.reducer
