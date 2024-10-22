import { useState, useEffect } from "react";
import "./List.css";

import Card from "./card/Card";

import ThreeDotIcon from "../../assets/three.svg";
import AddIcon from "../../assets/add.svg";
import HighPIcon from "../../assets/highP.svg";
import LowPIcon from "../../assets/lowP.svg";
import MedPIcon from "../../assets/medP.svg";
import NoPIcon from "../../assets/noP.svg";
import UrgentPOIcon from "../../assets/urgentPO.svg";

import DoneIcon from "../../assets/done.svg";
import InProgressIcon from "../../assets/in-progress.svg";
import ToDoIcon from "../../assets/To-do.svg";
import BacklogIcon from "../../assets/backlog.svg";
import CancelIcon from "../../assets/cancel.svg";

function List(props) {
  const [data, setData] = useState({});

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

  useEffect(() => {
    if (Object.keys(props.sortedData).length !== 0) {
      setData(props.sortedData);
    }
  }, [props.sortedData]);
  return (
    <div className="list">
      <div className="wrapper">
        {Object.keys(data).map((key) => (
          <div key={key} className="list-group">
            <div className="list-header">
              <div className="list-details">
                <div className="key-name-wrapper">
                  <div className="img-cont">
                    {props.selectedGrouping === "priority" ? (
                      <img
                        src={iconsListPriority[toPriorityName(key)]}
                        alt="Add Icon"
                      />
                    ) : props.selectedGrouping === "user" ? (
                      <div className="circles">
                        <div className="circle">{key[0]}</div>
                        <div
                          className="nested-circle"
                          // style={{
                          //   backgroundColor:
                          //     data[key][0].user.available === true
                          //       ? "green"
                          //       : "red",
                          // }}
                        ></div>
                      </div>
                    ) : props.selectedGrouping === "status" ? (
                      <img src={getStatusIcon(key)} alt="Add Icon" />
                    ) : (
                      <></>
                    )}
                  </div>
                  {props.selectedGrouping === "priority" ? (
                    <p id="key-name">{toPriorityName(key)}</p>
                  ) : (
                    <p id="key-name">{key}</p>
                  )}
                </div>
                <p id="key-length">{data[key].length}</p>
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
              {data[key].map((ticket) => (
                <Card
                  key={ticket.id}
                  grouping={props.selectedGrouping}
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
