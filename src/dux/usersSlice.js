import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  current: null,
  isLoading: false
}

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const response = await fetch('/api/users')
  return await response.json()
})

export const fetchUserById = createAsyncThunk('users/fetchById', async (id) => {
  const response = await fetch(`/api/users/${id}`)
  return await response.json()
})

export const createUser = createAsyncThunk('users/create', async (data) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  })

  return await response.json()
})

export const updateUser = createAsyncThunk('users/update', async ({ id, data }) => {
  const response = await fetch(`/api/users/${id}`, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  return await response.json()
})

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
    }
  }
})

export default usersSlice.reducer
