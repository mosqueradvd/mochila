import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  email: null,
  isAuthenticated: false
}

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    setCurrentUser (state, { payload: { name, email } }) {
      state.name = name
      state.email = email
      state.isAuthenticated = true
    }
  }
})

export const {
  setCurrentUser
} = loginSlice.actions

export const getCurrentUser = (state) => state.login

export default loginSlice.reducer
