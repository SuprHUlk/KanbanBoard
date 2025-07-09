import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  grouping: "status",
  ordering: "priority",
  apiData: {},
  groups: [],
  sortedData: {},
};

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    setGrouping: (state, action) => {
      state.grouping = action.payload;
    },
    setOrdering: (state, action) => {
      state.ordering = action.payload;
    },
    setApiData: (state, action) => {
      state.apiData = action.payload;
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setSortedData: (state, action) => {
      state.sortedData = action.payload;
    },
  },
});

export const {
  setGrouping,
  setOrdering,
  setApiData,
  setGroups,
  setSortedData,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
