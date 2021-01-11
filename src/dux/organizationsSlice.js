import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as API from 'apiClient/organizations'

const initialState = {
  data: [],
  current: null,
  isLoading: false
}

export const fetchOrganizations = createAsyncThunk('organizations/all', () => API.getAll())
export const fetchOrganizationById = createAsyncThunk('organizations/id', (id) => API.getOne(id))
export const createOrganization = createAsyncThunk('organizations/create', (data) => API.create(data))
export const updateOrganization = createAsyncThunk('organizations/update', ({ id, data }) => API.update({ id, data }))

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

export default organizationsSlice.reducer
