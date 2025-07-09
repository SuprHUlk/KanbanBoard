import React from "react";
import "./List.css";
import Card from "./card/Card";
import { useSelector } from "react-redux";

import ThreeDotIcon from "../../Assets/three.svg";
import AddIcon from "../../Assets/add.svg";
import HighPIcon from "../../Assets/highP.svg";
import LowPIcon from "../../Assets/lowP.svg";
import MedPIcon from "../../Assets/medP.svg";
import NoPIcon from "../../Assets/noP.svg";
import UrgentPOIcon from "../../Assets/urgentPO.svg";

import DoneIcon from "../../Assets/done.svg";
import InProgressIcon from "../../Assets/in-progress.svg";
import ToDoIcon from "../../Assets/To-do.svg";
import BacklogIcon from "../../Assets/backlog.svg";
import CancelIcon from "../../Assets/cancel.svg";

function List() {
  const { sortedData, grouping: selectedGrouping } = useSelector(
    (state) => state.kanban
  );

  const iconsListPriority = {
    "Urgent Priority": UrgentPOIcon,
    "High Priority": HighPIcon,
    "Medium Priority": MedPIcon,
    "Low Priority": LowPIcon,
    "No Priority": NoPIcon,
  };

  const getStatusIcon = (status) => {
    if (status === "Backlog") return BacklogIcon;
    if (status === "In progress") return InProgressIcon;
    if (status === "Todo") return ToDoIcon;
    if (status === "Done") return DoneIcon;
    return CancelIcon;
  };

  const toPriorityName = (priority) => {
    if (priority === 4) return "Urgent Priority";
    if (priority === 3) return "High Priority";
    if (priority === 2) return "Medium Priority";
    if (priority === 1) return "Low Priority";
    return "No Priority";
  };

  return (
    <div className="list">
      <div className="wrapper">
        {Object.keys(sortedData).map((key) => (
          <div key={key} className="list-group">
            <div className="list-header">
              <div className="list-details">
                <div className="key-name-wrapper">
                  <div className="img-cont">
                    {selectedGrouping === "priority" ? (
                      <img
                        src={iconsListPriority[toPriorityName(key)]}
                        alt="Add Icon"
                      />
                    ) : selectedGrouping === "user" ? (
                      <div className="circles">
                        <div className="circle">{key[0]}</div>
                        <div className="nested-circle"></div>
                      </div>
                    ) : selectedGrouping === "status" ? (
                      <img src={getStatusIcon(key)} alt="Add Icon" />
                    ) : (
                      <></>
                    )}
                  </div>
                  {selectedGrouping === "priority" ? (
                    <p id="key-name">{toPriorityName(key)}</p>
                  ) : (
                    <p id="key-name">{key}</p>
                  )}
                </div>
                <p id="key-length">{sortedData[key].length}</p>
              </div>
              <div className="options">
                <div className="img-cont">
                  <img src={AddIcon} alt="Add Icon" />
                </div>
                <div className="img-cont">
                  <img src={ThreeDotIcon} alt="Three Dot Icon" />
                </div>
              </div>
            </div>
            <div className="card-cont">
              {sortedData[key].map((ticket) => (
                <Card
                  key={ticket.id}
                  grouping={selectedGrouping}
                  id={ticket.id}
                  title={ticket.title}
                  tag={ticket.tag[0]}
                  user={ticket.user}
                  status={ticket.status}
                  available={ticket.user.available}
                  priority={ticket.priority}
                  getStatusIcon={getStatusIcon}
                  iconsListPriority={iconsListPriority}
                  toPriorityName={toPriorityName}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
