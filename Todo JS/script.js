window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    const removeAll_section = document.querySelector("#removeAll_section");
    var removeButtonFlag = true;

    let localItems = JSON.parse(localStorage.getItem('localItem'))
    if(localItems === null){
        taskList = []
    }else{
        taskList = localItems;
        removeButtonFlag = false;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value.trim();
        if(task == undefined || task == null || task == ""){
            document.getElementById("error_message").innerHTML = "MUST INPUT SOME DATA";

        }else{
            document.getElementById("error_message").innerHTML = "";
            taskList.push(task)
            localStorage.setItem('localItem', JSON.stringify(taskList));
            loadDataFromLocalStorage();
        }
    });
    function loadDataFromLocalStorage(){
        document.getElementById("tasks").innerHTML = "";
        for(let i = 0; i < taskList.length; i++){
            const task_el = document.createElement('div');
            task_el.classList.add('task');

            const task_content_el = document.createElement('div');
            task_content_el.classList.add('content');


            task_el.appendChild(task_content_el);

            const task_input_el = document.createElement('input');
            task_input_el.classList.add('text');

            task_input_el.type = 'text';
            task_input_el.value = taskList[i];
            task_input_el.id = taskList[i];

            task_input_el.setAttribute('readonly', 'readonly');
            task_content_el.appendChild(task_input_el);


            const task_actions_el = document.createElement('div');
            task_actions_el.classList.add('actions');


            const task_edit_el = document.createElement('button');
            task_edit_el.classList.add('edit');

            task_edit_el.id = i;
            task_edit_el.innerText = 'Edit';

            const task_delete_el = document.createElement('button');
            task_delete_el.classList.add('delete');


            task_delete_el.id = taskList[i];
            task_delete_el.innerText = 'Delete';

            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);

            task_el.appendChild(task_actions_el);
            list_el.appendChild(task_el);

            input.value = '';

            task_edit_el.addEventListener('click', (e) =>{
                
                if(task_edit_el.innerText.toLowerCase() == "edit"){
                    task_edit_el.innerText = "Save";
                    task_input_el.removeAttribute("readonly");
                    task_input_el.appendChild = "Save"
                    task_input_el.focus();
                }else{
                    task_edit_el.innerText = "Edit";
                    let val = task_input_el.value;
                    val = val.trim();
                    const id = e.currentTarget.id;
                    if(val == ""){
                        let oldval = task_input_el.id;
                        val = oldval;

                    }
                    let taskList_temp = JSON.parse(localStorage.getItem("localItem"));
                    taskList_temp[id] = val;
                    localStorage.setItem('localItem', JSON.stringify(taskList_temp));
                    taskList = JSON.parse(localStorage.getItem('localItem'));
                    task_input_el.setAttribute("readonly", "readonly");
                    loadDataFromLocalStorage();
                }
            });

            task_delete_el.addEventListener('click', (e) =>{
                
                const id = e.currentTarget.id;
                let taskList = JSON.parse(localStorage.getItem("localItem"));
                let index = taskList.indexOf(id);
                taskList.splice(index, 1);
                localStorage.setItem('localItem', JSON.stringify(taskList));
                list_el.removeChild(task_el);
                if(taskList.length == 0){
                    document.getElementById("removeAll_section").innerHTML = "";
                }
                location.reload();
            });
        }
        createRemoveAllElement();
        if(taskList.length == 0){
            document.getElementById("empty_msg").innerHTML = "NO DATA IN THE LIST";

        }else{
            document.getElementById("empty_msg").innerHTML = "";
        }
    }


    function createRemoveAllElement(){
        if(localItems.length > 0 && !removeButtonFlag){
            
            const remove_div = document.createElement('div');
            const remove_btn = document.createElement('button');
            remove_btn.classList.add('removeAll');
            remove_btn.innerText = 'Remove All';
            remove_div.appendChild(remove_btn);

            removeAll_section.appendChild(remove_div);

            remove_div.onclick = function() {
                let temp_list = JSON.parse(localStorage.getItem("localItem"));
                temp_list = [];
                localStorage.setItem('localItem', JSON.stringify(temp_list));

            }
            removeButtonFlag = true;
        }
    }

    loadDataFromLocalStorage();
});




function removeAllData(){
    temp_data = [];
    localStorage.setItem('localitem', JSON.stringify(temp_data));
    location.reload();
    
    
}