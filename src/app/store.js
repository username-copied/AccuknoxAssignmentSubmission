import { configureStore } from '@reduxjs/toolkit';
import widgetReducer from '../features/widgets/widgetSlice';
import menuReducer from '../features/menu/menuSlice';
import categorySlice from '../features/category/categorySlice';

export const store = configureStore({
  reducer: {
    widgets: widgetReducer,
    menu: menuReducer,
    category: categorySlice,
  },
});
