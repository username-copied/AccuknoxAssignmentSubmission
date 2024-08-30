import { createSlice } from "@reduxjs/toolkit";
import categoriesData from "../../components/categories.json";

const initialState = {
  xyz: categoriesData.categories,
  selectedCategoryId: 1,
  selectedWidgetsInfo: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
    setWidgetsInfo: (state, action) => {
      state.selectedWidgetsInfo = action.payload;
    },
    removeSelectedWidget: (state, action) => {
      const widgetId = action.payload;
      state.selectedWidgetsInfo = state.selectedWidgetsInfo.filter(
        (widget) => widget.id !== widgetId
      );
    },
  },
});

export const { selectCategory, setWidgetsInfo, removeSelectedWidget } =
  categorySlice.actions;
export default categorySlice.reducer;
