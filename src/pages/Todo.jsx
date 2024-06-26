import React, {useState, useReducer} from 'react'

const styles = {
    container: {
        display: 'flex',
        border: '2px solid black',
    },
    innerContainer: {
        border: '2px solid gray',
        flex: 1,
    },
    delBtn: {
        background: 'red',
        margin: '10px',
        color: 'white',
    }
}

const initialTodos = [
    {
      id: 1,
      title: "Initial",
      complete: false,
    },
];

const reducer = (state, action) => {

    switch (action.type) {
        case 'COMPLETED':
            return state.map((todo) => {
                if(todo.id === action.id){
                    return {...todo, complete: !todo.complete};
                }else{
                    return todo;
                }
            });


        case 'ADD_TASK':
            return [...state, {id: action.id, title: action.title, complete: false}];


        case 'DEL':
            return state.filter((todo) => {
                if(todo.id != action.id){
                    return todo;    
                }
            })


        default:
            return state;
    }
    
}

function Todo() {

    const [todos, dispatch] = useReducer(reducer, initialTodos);
    const [newTask, setNewTask] = useState('');

    function handleAddTask(){
        dispatch({ type: "ADD_TASK", id: todos.length+1, title: newTask });
        setNewTask('');
    }
    function handleComplete(todo){
        dispatch({ type: "COMPLETED", id: todo.id });
    }
    function handleDelete(id){
        dispatch({ type: "DEL", id: id });
    }

  return (
    <div>
        <h1>Todo List</h1>

        <div style={styles.container}>

            <div style={styles.innerContainer}>
                <h1>Add Todo</h1>
                <div style={styles.addTodo}>
                    <input type="text" onChange={(e) => {setNewTask(e.target.value)}} value={newTask}/>
                    <button onClick={handleAddTask}>Add Task</button>
                </div>  
            </div>

            <div style={styles.innerContainer}>
                <h1>list</h1>
                {todos.map((todo) => (
                    <div key={todo.id}>
                    <label>
                        <input
                        type="checkbox"
                        checked={todo.complete}
                        onChange={() => handleComplete(todo)}
                        />
                        {todo.title}
                    </label>
                    <span style={styles.delBtn} onClick={() => handleDelete(todo.id)}> Delete</span>
                    </div>
                ))}

            </div>

        </div>

    </div>
  )
}

export default Todo