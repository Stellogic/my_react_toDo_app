import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
function App(props) {
    const taskList = props.tasks?.map((task) => (//？是可选链，如果tasks是空的等，直接停止
    <Todo
      id={task.id}        // 传 ID
      name={task.name}    // 传名字
      completed={task.completed} // 传完成状态
      key={task.id}       // ⚠️ 重要：这是给 React 看的身份证，必须唯一
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form />
      <div className="filters btn-group stack-exception">
      <FilterButton name="All" isPressed={true}/>
      <FilterButton name="Active" isPressed={false}/>    
      <FilterButton name="Completed" isPressed={false}/>
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
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