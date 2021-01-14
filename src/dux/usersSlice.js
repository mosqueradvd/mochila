import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as API from 'apiClient/users'

const initialState = {
  data: [],
  current: null,
  isLoading: false
}

export const fetchUsers = createAsyncThunk('users/all', () => API.getAll())
export const fetchUserById = createAsyncThunk('users/id', (id) => API.getOne(id))
export const createUser = createAsyncThunk('users/create', (data) => API.create(data))
export const updateUser = createAsyncThunk('users/update', ({ id, data }) => API.update({ id, data }))
export const updateUserStatus = createAsyncThunk('users/updateUserStatus', ({ id, userStatus }) => API.updateUserStatus({ id, userStatus }))

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.isLoading = true
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.data = action.payload
      state.isLoading = false
    },
    [fetchUserById.pending]: (state, action) => {
      state.isLoading = true
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.current = action.payload
      state.isLoading = false
    },
    [createUser.pending]: (state, action) => {
      state.isLoading = true
    },
    [createUser.fulfilled]: (state, action) => {
      state.data.push(action.payload)
      state.isLoading = false
    },
    [updateUser.pending]: (state, action) => {
      state.isLoading = true
    },
    [updateUser.fulfilled]: (state, action) => {
      const { id, ...rest } = action.payload
      const index = state.data.findIndex((user) => user.id === id)

      if (index >= 0) {
        state.data[index] = { id, ...rest }
      }

      state.isLoading = false
    },
    [updateUserStatus.pending]: (state, action) => {
      state.isLoading = true
    },
    [updateUserStatus.fulfilled]: (state, action) => {
      const { id, ...rest } = action.payload
      const index = state.data.findIndex((user) => user.id === id)

      if (index >= 0) {
        state.data[index] = { id, ...rest }
      }

      state.isLoading = false
    }
  }
})

export default usersSlice.reducer
