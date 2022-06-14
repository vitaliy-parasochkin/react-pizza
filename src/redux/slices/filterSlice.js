import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярністю (за спаданням)",
    sortProperty: "rating",
  },
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const selectSortType = (state) => state.filter.sort.sortProperty;
export const selectCategoryId = (state) => state.filter.categoryId;
export const selectCurrentPage = (state) => state.filter.currentPage;
export const selectSearchValue = (state) => state.filter.searchValue;

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
