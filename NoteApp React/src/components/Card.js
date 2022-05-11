import React, { useState } from "react";
import EditTask from "../modals/EditTask";

const Card = ({
  taskObj,
  index,
  deleteTask,
  updateListArray,
  checkboxVal,
  setCheckboxVal,
  checkboxStyle,
  setCheckedColor,
}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  const checkboxClick = (e) => {
    
      console.log(e);
    if (checkboxVal) {
      setCheckboxVal(true);
      
    } else {
      setCheckboxVal(false);
      setCheckedColor("card-wrapper-chk");
      
    }
    
  };

  return (
    <div class="card-wrapper mr-5">
      <div class="task-holder">
        <span
          class="card-header"
          style={{
            "background-color": "",
            "border-radius": "10px",
          }}
        >
          {taskObj.Name}
        </span>

        <p className="mt-3">{taskObj.Description}</p>

        <div class={checkboxStyle}>
            <label><b>Done:</b></label>
            <input type="checkbox" id="chkbx" onClick={checkboxClick}></input>
        </div>

        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          <i
            class="far fa-edit mr-3"
            style={{
              color: "black",
              cursor: "pointer",
            }}
            onClick={() => setModal(true)}
          ></i>
          <i
            class="fas fa-trash-alt"
            style={{
              color: "black",
              cursor: "pointer",
            }}
            onClick={handleDelete}
          ></i>
        </div>
      </div>
      <EditTask
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </div>
  );
};

export default Card;
