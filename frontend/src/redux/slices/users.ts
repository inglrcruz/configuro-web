import { createSlice } from '@reduxjs/toolkit'

export const state = {
  token: null,
  loading: false,
  dialogConfig: null,
  list: []
}

export const userSlice = createSlice({
  name: "users",
  initialState: state,
  reducers: {
    changeStage: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { changeStage } = userSlice.actions
