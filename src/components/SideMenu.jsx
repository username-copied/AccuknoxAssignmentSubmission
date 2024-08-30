import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu, closeMenu } from "../features/menu/menuSlice";
import { replaceWidgets, removeWidget } from "../features/widgets/widgetSlice";
import "./SideMenu.css";
import {
  selectCategory,
  setWidgetsInfo,
} from "../features/category/categorySlice";

const SideMenu = () => {
  const isOpen = useSelector((state) => state.menu.isOpen);
  const { xyz, selectedCategoryId } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const selectedCategory = xyz.find(
    (category) => category.id === selectedCategoryId
  );

  const handleToggle = () => {
    dispatch(toggleMenu());
  };

  const handleClose = () => {
    dispatch(closeMenu());
  };

  const handleCheckboxChange = (widgetId) => {
    setSelectedWidgets((prevSelected) => {
      if (prevSelected.includes(widgetId)) {
        return prevSelected.filter((id) => id !== widgetId);
      } else {
        return [...prevSelected, widgetId];
      }
    });
  };

  const handleAddSelectedWidgets = () => {
    const selectedWidgetsInt = selectedWidgets.map(Number);
    const selectedWidgetsInfo = [];

    xyz.forEach((category) => {
      const tempArr = [];
      category.widgets?.forEach((widget) => {
        if (selectedWidgetsInt.includes(Number(widget.id))) {
          selectedWidgetsInfo.push({
            categoryName: category.categoryName,
            widgetId: widget.id,
            widgetName: widget.widgetName,
            description: widget.description,
            image: widget.image,
          });
          tempArr.push(widget);
        }
      });
      dispatch(
        replaceWidgets({
          category: category.categoryName,
          widgets: tempArr,
        })
      );
    });

    dispatch(setWidgetsInfo(selectedWidgetsInfo));
    setSelectedWidgets([]);
    dispatch(closeMenu());
  };

  const handleRemoveWidget = (widgetId) => {
    dispatch(
      removeWidget({ category: selectedCategory.categoryName, widgetId })
    );
  };

  return (
    <div>
      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <div className="title-sideMenu">
          <div className="title-sideMenu-div">Add Widgets</div>
          <button className="title-sideMenu-btn" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="tagline-sideMenu">
          Personalize your dashboard by adding the following widgets
        </div>

        <div className="menu-content">
          <ul className="category-list">
            {xyz.map((category) => (
              <li
                key={category.id}
                className={`category-item ${
                  category.id === selectedCategoryId ? "active" : ""
                }`}
              >
                <button
                  onClick={() => dispatch(selectCategory(category.id))}
                  className="category-button"
                >
                  {category.categoryName}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="menu-section">
          <ul className="widget-list">
            {selectedCategory?.widgets.map((widget) => (
              <div key={widget.id} className="checkBox-div">
                <input
                  type="checkbox"
                  checked={selectedWidgets.includes(widget.id)}
                  onChange={() => handleCheckboxChange(widget.id)}
                />
                <label className="label-widget">{widget.widgetName}</label>
              </div>
            ))}
            {isOpen && (
              <button
                className=" sideMenuBtn"
                onClick={handleAddSelectedWidgets}
              >
                Submit
              </button>
            )}
            {isOpen && (
              <button
                className="button sideMenuCancelBtn"
                onClick={() => setSelectedWidgets([])}
              >
                Cancel
              </button>
            )}
          </ul>
        </div>
      </div>

      {isOpen && <div className="overlay" onClick={handleClose}></div>}
    </div>
  );
};

export default SideMenu;
