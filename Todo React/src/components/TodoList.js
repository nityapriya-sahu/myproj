import React, {useState, useEffect} from 'react';

function TodoList(props) {
  // const [inputData, setInputData] = useState("");
  // const [toggleSubmit, setToggleSubmit] = useState(true);
  // const [items, setItems] = useState(getLocalItmes());
  // const [isEditItem, setIsEditItem] = useState(null);

  // add data to localStorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(props.items));
  });

  const editItem = (id) => {
    let newEditItem = props.items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);

    props.setToggleSubmit(false);

    props.setInputData(newEditItem.name);

    props.setIsEditItem(id);
  };

   // delete the items
   const deleteItem = (index) => {
     //debugger
    const updateditems = props.items.filter((elem) => {
      return index !== elem.id;
    });

    props.setItems(updateditems);
    props.setToggleSubmit(true);
    props.setInputData("");
  };

  // remove all
  const removeAll = () => {
    props.setItems([]);
  };

  return(
    <div>
      <div className="showItems">
              {props.items.map((elem) => {
                return (
                  <div className="d-flex" key={elem.id}>
                    <h3 class="col-8">{elem.name}</h3>
                    <div className="">
                      <button
                        className="btn btn-outline-secondary"
                        title="Edit Item"
                        onClick={() => editItem(elem.id)}
                        style={{
                          backgroundColor: "greenyellow",
                          
                        }}
                      >
                        <b>Edit</b>
                      </button>
                      <button
                        className="btn btn-outline-dark"
                        title="Delete Item"
                        onClick={() => deleteItem(elem.id)}
                        style={{
                          backgroundColor: "maroon",
                          color: "white",
                          marginLeft: "1rem"
                        }}
                      >
                        <b>Delete</b>
                      </button><br></br><br></br>
                    </div>
                  </div>
                );
              })}
              {props.items.length ===  0 ? (
                <div
                  class="container-fluid"
                  style={{ backgroundColor: "#c5e1e6", height: "50px" }}
                >
                  <h3
                    style={{
                      color: "blue",
                      textAlign: "center",
                      justifyContent: "center",
                      //marginTop: "20%"
                    }}
                  >
                    No Data
                  </h3>
                </div>
              ) : (
                <button
                  className="btn btn-danger mt-2"
                  data-sm-link-text="Remove All"
                  onClick={removeAll}
                  // style={{ marginLeft: "12rem" }}
                  style={{
                    marginTop: "3rem",
                    backgroundColor: "red",
                    color: "black"
                    
                  }}
                >
                  <b>Remove All</b>
                </button>
              )}
            </div>
    </div>
  )
}
// const getLocalItmes = () => {
//   let list = localStorage.getItem("lists");
//   if (list) {
//     return JSON.parse(localStorage.getItem("lists"));
//   } else {
//     return [];
//   }
// };

export default TodoList;
