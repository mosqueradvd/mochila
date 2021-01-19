import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as API from 'apiClient/projects'

const initialState = {
  data: [],
  current: null,
  isLoading: false
}

export const fetchProjects = createAsyncThunk('projects/fetchAll', () => API.getAll())
export const fetchProjectById = createAsyncThunk('projects/fetchById', (id) => API.getOne(id))
export const createProject = createAsyncThunk('projects/create', (data) => API.create(data))
export const updateProject = createAsyncThunk('projects/update', ({ id, data }) => API.update({ id, data }))

export const updateProjectStatus = createAsyncThunk('projects/updateProjectStatus', ({ id, projectStatus }) => API.updateProjectStatus({ id, projectStatus }))

const projectsSlice = createSlice({
  name: 'projectsSlice',
  initialState,
  extraReducers: {
    [fetchProjects.pending]: (state, action) => {
      state.isLoading = true
    },
    [fetchProjects.fulfilled]: (state, action) => {
      state.data = action.payload
      state.isLoading = false
    },
    [fetchProjectById.pending]: (state, action) => {
      state.isLoading = true
    },
    [fetchProjectById.fulfilled]: (state, action) => {
      state.current = action.payload
      state.isLoading = false
    },
    [createProject.pending]: (state, action) => {
      state.isLoading = true
    },
    [createProject.fulfilled]: (state, action) => {
      state.data.push(action.payload)
      state.isLoading = false
    },
    [updateProject.pending]: (state, action) => {
      state.isLoading = true
    },
    [updateProject.fulfilled]: (state, action) => {
      const { id, ...rest } = action.payload
      const index = state.data.findIndex((project) => project.id === id)

      if (index >= 0) {
        state.data[index] = { id, ...rest }
      }

      state.isLoading = false
    },
    [updateProjectStatus.pending]: (state, action) => {
      state.isLoading = true
    },
    [updateProjectStatus.fulfilled]: (state, action) => {
      const { id, ...rest } = action.payload
      const index = state.data.findIndex((project) => project.id === id)

      if (index >= 0) {
        state.data[index] = { id, ...rest }
      }

      state.isLoading = false
    }
  }
})
export const getCurrentUser = (state) => state.user

export default projectsSlice.reducer
