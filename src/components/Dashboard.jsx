import React, { useState, useEffect, useRef } from "react";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { removeWidget } from "../features/widgets/widgetSlice";
import { toggleMenu } from "../features/menu/menuSlice";
import "./dashboard.css";
import "./navbar.css";

import categoryData from "../components/categories.json";
import { removeSelectedWidget } from "../features/category/categorySlice";

import { SlRefresh } from "react-icons/sl";
import { GoClockFill } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const selectedWidgetsInfo = useSelector(
    (state) => state.category.selectedWidgetsInfo
  );
  const categories = useSelector((state) => state.category.xyz);
  const widgets = useSelector((state) => state.widgets.categories);

  const [filteredDataByCategory, setFilteredDataByCategory] = useState([]);

  // Refs for scrolling to widgets
  const widgetRefs = useRef({});

  const getCategoryWidgetCount = (categoryName) => {
    const category = categoryData.categories.find(
      (cat) => cat.categoryName === categoryName
    );
    if (category) {
      return category.widgets.length;
    } else {
      return 0; // Or handle the case when the category is not found
    }
  };

  const handleToggle = () => {
    dispatch(toggleMenu());
  };

  const handleRemoveWidget = (category, widgetId) => {
    dispatch(removeSelectedWidget(widgetId));
    dispatch(removeWidget({ category, widgetId }));
  };

  const handleSearch = (searchTerm) => {
    // Check if the search term matches any widget name
    const foundWidget = filteredDataByCategory.some((category) =>
      category.items.some((widget) => {
        if (
          widget.widgetName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          // Scroll to the widget
          widgetRefs.current[widget.id].scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      })
    );
    if (!foundWidget) {
      alert("Widget not found");
    }
  };

  const renderEmptyCards = (categoryName, widgetsCount) => {
    const emptyCards = [];
    const cnt = getCategoryWidgetCount(categoryName);
    let cardsToAdd = 0;
    if (widgetsCount === cnt) {
      cardsToAdd = 0;
    } else {
      cardsToAdd = 1;
    }

    for (let i = 0; i < cardsToAdd; i++) {
      emptyCards.push(
        <div
          key={`empty-${categoryName}-${i}`}
          className="widget empty-card"
          style={{
            padding: "10px",
            width: "28vw",
            height: "250px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={handleToggle} className="button emptyCardBtn">
            &#43; Add Widget
          </button>
        </div>
      );
    }
    return emptyCards;
  };

  useEffect(() => {
    const temp = [];
    Object.keys(widgets).forEach((t) => {
      widgets[t]?.forEach((widget) => {
        temp.push({
          ...widget,
          categoryName: t,
        });
      });
    });

    setFilteredDataByCategory(
      categories.map((category) => {
        return {
          categoryName: category.categoryName,
          items: temp.filter(
            (item) => item.categoryName === category.categoryName
          ),
        };
      })
    );
  }, [selectedWidgetsInfo]);

  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <div className="container">
        <SideMenu />
        <div className="bar">
          <h3 className="title">CNAPP Dashboard</h3>
          <button onClick={handleToggle} className="button">
            Add Widget &#43;
          </button>
          <div className="Logo">
            <SlRefresh />
          </div>
          <div className="Logo colon">&#8942;</div>
          <div className="dropdown-div">
            <div className="dropdown-logo">
              <GoClockFill />
            </div>
            <div className="dropdown-menu">
              <select id="services" className="dropdown-select">
                <option value="two" className="days">
                  Last 2 days
                </option>
                <option value="seven" className="days">
                  Last 7 days
                </option>
                <option value="week" className="days">
                  Last Week
                </option>
              </select>
            </div>
          </div>
        </div>

        {filteredDataByCategory?.map((data, index) => (
          <div key={index} className="category">
            <h2>{data.categoryName}</h2>
            <div className="widget-container">
              {data.items?.map((widget) => (
                <div
                  key={widget.id}
                  className="widget"
                  ref={(el) => (widgetRefs.current[widget.id] = el)}
                >
                  <div className="widgetTitle">
                    <h3>{widget.widgetName}</h3>
                    <button
                      className="widgetRemoveButton"
                      onClick={() =>
                        handleRemoveWidget(widget.categoryName, widget.id)
                      }
                    >
                      <RxCross2 />
                    </button>
                  </div>

                  {/* <div>{widget.categoryName}</div> */}
                  <img
                    src={widget.image}
                    alt={widget.name}
                    style={{ width:"80%",maxHeight:"150px" }}
                  />
                </div>
              ))}
              {renderEmptyCards(data.categoryName, data.items.length)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
