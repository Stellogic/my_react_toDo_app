// src/components/Todo.jsx
function Todo(props) {
  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)}/>
        {/*这里我们像传入toggleTaskCompleted的参数是id，而不是事件。如果写成toggleTaskCompleted，默认传入事件；如果写成toggleTaskCompleted（props.id)，直接执行。因此写成匿名箭头函数形式。但是，实际上还是会传入（e）(第一个括号），只是这里我们没有用这个参数。)*/}
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn">
          {props.name} <span className="visually-hidden">{props.name}</span>
        </button>
        <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}>{/* 这里props.id就是我们要删除的id，这里利用了闭包 */}
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </li>
  );
}

export default Todo;