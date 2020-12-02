import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  email: null,
  isAuthenticated: false
}

const userSlice = createSlice({
  name: 'userSlice',
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
} = userSlice.actions

export const getCurrentUser = (state) => state.user

export default userSlice.reducer
