import React, {useState, useEffect} from  'react';
import './App.css';

// Importing Components
import Form from "./components/Form"
import TodoList from "./components/TodoList";

function App() {

  //State Stuff
  const [inputText, setInputText]= useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setfilteredTodos] = useState([]);

  // Run Once when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);

  // Use Effect
  useEffect(() => {
    
    // Handler to filter task according to their state of completion and also to display all the task
    
    switch(status){
      case 'completed':
        setfilteredTodos(todos.filter( todo => todo.completed=== true));
        break;
      case 'uncompleted':
        setfilteredTodos(todos.filter( todo => todo.completed=== false));
        break;
      default:
        setfilteredTodos(todos);
        break;
    }

    // Save to Local Storage
      localStorage.setItem("todos", JSON.stringify(todos));
    
  }, [todos, status]);

  
  // Function to get Todos stored in local storage
  const getLocalTodos = () =>{
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    }
    else {
       let localTodos = JSON.parse(localStorage.getItem("todos"));
       setTodos(localTodos);
    }
  }

  return (
    <div className="App ">
      <header>
        <h1>Todo App</h1>
      </header>

      <Form  setStatus={setStatus} inputText={inputText} setInputText={setInputText} todos={todos} setTodos={setTodos}  />
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />

    </div>
  );
}

export default App;
