import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import {nanoid} from "nanoid";
function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  function addTask(name){
    const newTask = {
      id : "todo-" + nanoid(),
      name : name,
      completed : false
    }
    setTasks([...tasks, newTask]);//根据不可变原则，传入一个新的数组
  }
  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map((task) => {
      if(id === task.id){
        return {...task,completed : !task.completed}
      }
      else{
        return task;
      }
    })
    setTasks(updatedTasks);
    console.log(updatedTasks);
  }
  function deleteTask(id){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  const taskList = tasks?.map((task) => (
    <Todo
      id = {task.id}
      name = {task.name}
      completed = {task.completed}
      key = {task.id }
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />       
  ))
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
      <FilterButton name="All" isPressed={true}/>
      <FilterButton name="Active" isPressed={false}/>    
      <FilterButton name="Completed" isPressed={false}/>
      </div>
      <h2 id="list-heading">{tasks.length} {tasks.length !== 1 ? "tasks" : "task"} remaining</h2>
      {/* ===表示严格相等，要求类型和值都相等，!==就是类型和值有一个不同就不相等。==可能会被自动转换类型 */}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}

      </ul>
    </div>
  );
}

export default App;