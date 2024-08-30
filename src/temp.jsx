<div className='bar'>
        <h3 className='title'>CNAPP Dashboard</h3>
        <button className='button'> Add Widget &#43;</button>
        <div className='Logo'><SlRefresh /></div>
        <div className='Logo colon'>&#8942;</div>
        <div className='dropdown-div'>
          <div className='dropdown-logo'><GoClockFill /></div>
          <div className='dropdown-menu'>
            <select id="services" className="dropdown-select">
                <option value="web-development">Last 2 days</option>
                <option value="app-development">Last 7 days</option>
                <option value="seo">Last Week</option>
            </select>
          </div>
        </div>
</div>

import { SlRefresh } from "react-icons/sl";
import { GoClockFill } from "react-icons/go";





////


{
  "[object Object],[object Object],[object Object]": {
      "1": true,
      "3": true
  }
}

////

{
  "1": true,
  "3": true
}


//// add widgets functions:

{/* {widgetsData
            .reduce((categories, widget) => {
              if (!categories.includes(widget.category)) {
                categories.push(widget.category);
              }
              return categories;
            }, [])
            .map((categoryName) => (
              <div key={categoryName} className="category-selection">
                <div className="text-3xl text-red">{categoryName}</div>
                {widgetsData
                  .filter((widget) => widget.category === categoryName)
                  .map((widget) => (
                    <div key={widget.id} className="widget-selection">
                      <input
                        type="checkbox"
                        checked={
                          selectedWidgets[categoryName]?.[widget.id] || false
                        }
                        onChange={() =>
                          handleCheckboxChange(categoryName, widget.id)
                        }
                      />
                      <label>{widget.name}</label>
                    </div>
                  ))}
                <button
                  className="button"
                  onClick={() => handleAddSelectedWidgets(categoryName)}
                >
                  Submit
                </button>
              </div>
            ))} */}