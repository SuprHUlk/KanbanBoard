import "./Card.css";

function Card(props) {
  return (
    <div className="card">
      <div className="wrapper">
        <div key={props.id} className="card-details">
          <div className="card-header">
            <p id="card-id">{props.id}</p>
            {props.grouping !== "user" && (
              <div className="circles">
                <div className="circle">{props.user.name[0]}</div>
                <div
                  className="nested-circle"
                  style={{
                    backgroundColor: props.available === true ? "green" : "red",
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="title-wrapper">
            {props.grouping !== "status" && (
              <div className="img-cont">
                <img src={props.getStatusIcon(props.status)} alt="img" />
              </div>
            )}

            <p id="card-title">{props.title}</p>
          </div>
          <div className="tag-wrapper">
            {props.grouping !== "priority" && (
              <div className="img-cont">
                <img
                  src={
                    props.iconsListPriority[
                      props.toPriorityName(props.priority)
                    ]
                  }
                  alt="img"
                />
              </div>
            )}
            <div id="card-feature">
              <div className="dot"></div>
              {props.tag}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
