import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: null,
  userEmail: null,
  organizationId: null,
  userRol: null,
  isAuthenticated: false
}

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    setCurrentUser (state, { payload: { userName, userEmail, organizationId, userRol } }) {
      state.userName = userName
      state.userEmail = userName
      state.organizationId = organizationId
      state.userRol = userRol
      state.isAuthenticated = true
    }
  }
})

export const {
  setCurrentUser
} = loginSlice.actions

export const getCurrentUser = (state) => state.login

export default loginSlice.reducer
