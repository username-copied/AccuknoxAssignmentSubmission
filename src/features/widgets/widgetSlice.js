// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   categories: {}
// };

// const widgetSlice = createSlice({
//   name: 'widgets',
//   initialState,
//   reducers: {
//     replaceWidgets: (state, action) => {
//       const { category, widgets } = action.payload;
//       if (!state.categories[category]) {
//         state.categories[category] = [];
//       }
//       state.categories[category].push(...widgets);
//     },
//     removeWidget: (state, action) => {
//       const { category, widgetId } = action.payload;
//       if (state.categories[category]) {
//         state.categories[category] = state.categories[category].filter(widget => widget.id !== widgetId);
//         if (state.categories[category].length === 0) {
//           delete state.categories[category];
//         }
//       }
//     },
//   },
// });

// export const { replaceWidgets, removeWidget } = widgetSlice.actions;
// export default widgetSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: {}
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    replaceWidgets: (state, action) => {
      const { category, widgets } = action.payload;
      if (!state.categories[category]) {
        state.categories[category] = [];
      }
      state.categories[category].push(...widgets);
    },
    removeWidget: (state, action) => {
      const { category, widgetId } = action.payload;
      if (state.categories[category]) {
        state.categories[category] = state.categories[category].filter(widget => widget.id !== widgetId);
        if (state.categories[category].length === 0) {
          delete state.categories[category];
        }
      }
    },
  },
});

export const { replaceWidgets, removeWidget } = widgetSlice.actions;
export default widgetSlice.reducer;
