import React, {useState} from "react";


const Todo = ({text,todo, todos, setTodos})=>{

    const [edit, setEdit] = useState(false);
    const [todoText, setTodoText] = useState(todo.text);

    /** 
     * Event Handlers
     **/ 

    const editChangeHandler =(e) => {
        setTodoText(e.target.value);
    };
    

    const editHandler = () => {
        setEdit(!edit);
        console.log("value of edit is "+ todo.edit);
    };

    const editSubmitHandler = (id) => {
        const editedList = todos.map((oneTodo) => {
          if (oneTodo.id === id) {
            console.log(id);
            oneTodo.text = todoText;
          }
          return oneTodo;
        });
        localStorage.setItem("todos", JSON.stringify(editedList));
        setTodos(editedList);
        editHandler();
        console.log(todoText, id);
    };

    
    const deleteHandler = ()=>{
        setTodos(todos.filter((el) => el.id !== todo.id))
    }

    const completeHandler = ()=> {
        setTodos(todos.map((item)=>{
            if(item.id === todo.id){
                return{
                    ...item, completed: !item.completed
                }
            }
            return item;
        }))
    }


    return (
        <div className="todo">
            {
                !edit? (
                    <>
                        <li className= {`todo-item ${todo.completed ? "completed" : ""}`}  > {text} </li>
                        <button onClick={completeHandler} className="complete-btn" >
                            <i className="fas fa-check"> </i>
                        </button>

                        <button onClick={deleteHandler} className="trash-btn" >
                            <i className="fas fa-trash"> </i>
                        </button>

                        <button onClick={editHandler} className="edit-btn" > Edit </button>
                    </> 
                ) : (
                    <>
                        <input
                            type="text"
                            defaultValue={todoText}
                            className = "todoEdit-input"
                            name="todo"
                            onChange = {editChangeHandler}
                        />
                        <button className="complete-btn form-btn" onClick={editHandler}>Cancel</button>
                        <button className="trash-btn" type="submit" onClick={()=>editSubmitHandler(todo.id)}>
                            Save
                        </button>
                    </>

                )
            }
        </div>      

    );
};

export default Todo;
