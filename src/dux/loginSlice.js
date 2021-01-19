import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: null,
  userEmail: null,
  organizationId: null,
  userRole: null,
  isAuthenticated: false,
  userStatus: null
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
      state.userStatus = userStatus
    }
  }
})

export const {
  setCurrentUser
} = loginSlice.actions

export const getCurrentUser = (state) => state.login

export default loginSlice.reducer
