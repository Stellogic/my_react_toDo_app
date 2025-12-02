import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import {nanoid} from "nanoid";
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,//返回未完成的
  completed: (task) => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);
function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter,setFilter] = useState('All');
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

  function editTask(id, newName){
    let updatedTasks = tasks.map((task) => {
      if(task.id == id){
        return {...task,name : newName};
      }else{
        return task;
      }
    })
    setTasks(updatedTasks);
  }
  const taskList = tasks?.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id = {task.id}
      name = {task.name}
      completed = {task.completed}
      key = {task.id }
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask = {editTask}
    />       
  ))
  // 先筛选（filter），得到符合筛选器filter的新数组，之后再对新数组执行map，进行渲染
  //利用一个筛选器对象，属于声明式编程


  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key = {name}
      name = {name}
      isPressed = {name === filter}
      setFilter = {setFilter}//把修改状态的函数传递过去
    />
  ))
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{taskList.length} {taskList.length !== 1 ? "tasks" : "task"} remaining</h2>
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