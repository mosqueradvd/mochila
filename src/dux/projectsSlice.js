import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  current: null,
  isLoading: false
}

export const fetchProjects = createAsyncThunk('projects/fetchAll', async () => {
  const response = await fetch('/api/projects')
  return await response.json()
})

export const fetchProjectById = createAsyncThunk('projects/fetchById', async (id) => {
  const response = await fetch(`/api/projects/${id}`)
  return await response.json()
})

export const createProject = createAsyncThunk('projects/create', async (data) => {
  const response = await fetch('/api/projects', {
    method: 'POST',
    body: JSON.stringify(data)
  })

  return await response.json()
})

export const updateProject = createAsyncThunk('projects/update', async ({ id, data }) => {
  const response = await fetch(`/api/projects/${id}`, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  return await response.json()
})

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
    }
  }
})
export const getCurrentUser = (state) => state.user

export default projectsSlice.reducer
