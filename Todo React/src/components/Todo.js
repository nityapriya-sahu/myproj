//----------------------------------------------------------------------------//

import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'


const Todo = () => {
  //debugger

  const [inputData, setInputData] = useState("");
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [items, setItems] = useState(getLocalItmes());
  const [isEditItem, setIsEditItem] = useState(null);
  
  // useEffect(() => {
  //   localStorage.setItem("lists", JSON.stringify(items));
  // });

  return (
    <>
      <div
        class="card col-lg-5 col-md-9 col-sm-18 col-xs-15 mt-5"
        
      >
        <div class="row justify-content-center align-items-center main-row"><br></br>
          <b>TODO-List</b>
          <div className="card-body" style={{ padding: "-3px" }}><br></br>
            <TodoForm 
              inputData={inputData}
              setInputData={setInputData}
              toggleSubmit={toggleSubmit}
              setToggleSubmit={setToggleSubmit}
              items={items}
              setItems={setItems}
              isEditItem={isEditItem}
              setIsEditItem={setIsEditItem}
              ></TodoForm>
            <TodoList
              items={items}
              setItems={setItems}
              setInputData={setInputData}
              setToggleSubmit={setToggleSubmit}
              setIsEditItem={setIsEditItem}
              ></TodoList>
            
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
  
  
};
const getLocalItmes = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
export default Todo;
