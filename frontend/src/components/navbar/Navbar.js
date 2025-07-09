import React, { useState } from "react";
import "./Navbar.css";
import DisplayIcon from "../../Assets/dis.svg";
import DownIcon from "../../Assets/down.svg";
import { useSelector, useDispatch } from "react-redux";
import { setGrouping, setOrdering } from "../../store/kanbanSlice";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { grouping: selectedGrouping, ordering: selectedOrdering } =
    useSelector((state) => state.kanban);

  const toggleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const changeGrouping = (event) => {
    dispatch(setGrouping(event.target.value));
    toggleDropdownOpen();
  };

  const changeOrdering = (event) => {
    dispatch(setOrdering(event.target.value));
    toggleDropdownOpen();
  };

  return (
    <div className="nav">
      <div className="wrapper">
        <div className="dropdown-cont">
          <div className="dropdown" onClick={toggleDropdownOpen}>
            <div className="img-cont">
              <img src={DisplayIcon} alt="Display Icon" />
            </div>
            <div className="dropdown-text">Display</div>
            <div className="img-cont">
              <img src={DownIcon} alt="Down Icon" />
            </div>
          </div>
          {dropdownOpen && (
            <div className="menu">
              <div className="group">
                <p>Grouping</p>
                <select
                  value={selectedGrouping}
                  onChange={changeGrouping}
                  name="group"
                  id="group"
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="order">
                <p>Ordering</p>
                <select
                  value={selectedOrdering}
                  onChange={changeOrdering}
                  name="order"
                  id="order"
                >
                  <option value="title">Title</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
