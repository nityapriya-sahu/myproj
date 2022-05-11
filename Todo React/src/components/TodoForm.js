import React, {useState, useEffect} from 'react';



function TodoForm(props) {
  //console.log(props)
  //debugger
  // const [inputData, setInputData] = useState("");
  // const [toggleSubmit, setToggleSubmit] = useState(true);
  // const [items, setItems] = useState(getLocalItmes());
  // const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (isNaN(props.inputData) === false) {
      alert("Fill the data");
      props.setToggleSubmit(true);
    } else if (props.inputData && !props.toggleSubmit) {
      props.setItems(
        props.items.map((elem) => {
          if (elem.id === props.isEditItem) {
            return { ...elem, name: props.inputData };
          }
          return elem;
        })
      );
      props.setToggleSubmit(true);
      props.setInputData("");
      props.setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: props.inputData,
      };
      props.setItems([...props.items, allInputData]);
      props.setInputData("");
    }
    
  };

  useEffect(() => {    
    window.localStorage.setItem("lists", JSON.stringify(props.items));
  });


  return(
    <div>
      <div class="input-group mb-5 mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Add Items.."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={props.inputData}
                onChange={(e) => props.setInputData(e.target.value)}
              ></input>
              <div class="input-group-append">
                {props.toggleSubmit ? (
                  <button
                    className="btn btn-outline-primary"
                    title="Add Item"
                    onClick={addItem}
                    style={{
                      backgroundColor: "aqua"
                    }}
                  >
                    <b>Add</b>
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-success"
                    title="Update Item"
                    onClick={addItem}
                    style={{
                      backgroundColor: "green",
                      color: 'white'
                    }}
                  >
                    Save
                  </button>
                )}
              </div><br></br>
            </div>
    </div>
    
  );

  

}
// const getLocalItmes = () => {
//   let list = localStorage.getItem("lists");
//   if (list) {
//     return JSON.parse(localStorage.getItem("lists"));
//   } else {
//     return [];
//   }
// };

export default TodoForm;

