import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  current: null,
  isLoading: false
}

export const fetchOrganizations = createAsyncThunk('organizations/fetchAll', async () => {
  const response = await fetch('/api/organizations')
  return await response.json()
})

export const fetchOrganizationById = createAsyncThunk('organizations/fetchById', async (id) => {
  const response = await fetch(`/api/organizations/${id}`)
  return await response.json()
})

export const createOrganization = createAsyncThunk('organizations/create', async (data) => {
  const response = await fetch('/api/organizations', {
    method: 'POST',
    body: JSON.stringify(data)
  })

  return await response.json()
})

export const updateOrganization = createAsyncThunk('organizations/update', async (id, data) => {
  const response = await fetch(`/api/organizations/${id}`, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  return await response.json()
})

const organizationsSlice = createSlice({
  name: 'organizationsSlice',
  initialState,
  extraReducers: {
    [fetchOrganizations.pending]: (state, action) => {
      state.isLoading = true
    },
    [fetchOrganizations.fulfilled]: (state, action) => {
      state.data = action.payload
      state.isLoading = false
    },
    [fetchOrganizationById.pending]: (state, action) => {
      state.isLoading = true
    },
    [fetchOrganizationById.fulfilled]: (state, action) => {
      state.current = action.payload
      state.isLoading = false
    },
    [createOrganization.pending]: (state, action) => {
      state.isLoading = true
    },
    [createOrganization.fulfilled]: (state, action) => {
      state.data.push(action.payload)
      state.isLoading = false
    },
    [updateOrganization.pending]: (state, action) => {
      state.isLoading = true
    },
    [updateOrganization.fulfilled]: (state, action) => {
      const { id, ...rest } = action.payload
      const index = state.data.findIndex((organization) => organization.id === id)

      if (index >= 0) {
        state.data[index] = { id, ...rest }
      }

      state.isLoading = false
    }
  }
})

export const {
  setCurrentUser
} = organizationsSlice.actions

export const getCurrentUser = (state) => state.user

export default organizationsSlice.reducer
