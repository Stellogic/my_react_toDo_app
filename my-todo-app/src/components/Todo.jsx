// src/components/Todo.jsx
import { useState } from "react";
function Todo(props) {
  const [isEditing,setEditing] = useState(false);
  const [newName,setNewName] = useState('');
  function handleChange(e){
    setNewName(e.target.value);
  }
  function handeleSubmit(e){
    e.preventDefault()//组织刷新，否则数据消失
    props.editTask(props.id,newName);
    setNewName("");
    setEditing(false);
  }
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)}/>
        {/*这里我们像传入toggleTaskCompleted的参数是id，而不是事件。如果写成toggleTaskCompleted，默认传入事件；如果写成toggleTaskCompleted（props.id)，直接执行。因此写成匿名箭头函数形式。但是，实际上还是会传入（e）(第一个括号），只是这里我们没有用这个参数。)*/}
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit<span className="visually-hidden">Edit {props.name}</span>
        </button>
        <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}>{/* 这里props.id就是我们要删除的id，这里利用了闭包 */}
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>

  )

  const editingTemplate = (
  <form className="stack-small" onSubmit={handeleSubmit}>
    {/*表单有回撤提交的机制。因此这种提交事件都绑定在表单上最好 */}
    <div className="form-group">
      <label className="todo-label" htmlFor={props.id}>
        New name for {props.name}
      </label>
      {/* 暂时只是个普通的输入框，下一阶段我们要把它的 value 和 state 绑定 */}
      <input id={props.id} className="todo-text" type="text" value={newName} onChange={handleChange}/>
      {/*在jsx中，value表示强制input显示什么。value和onChange一般连起来用。好处数据源确定就是newName */}
    </div>
    <div className="btn-group">
      {/* 👇 关键点：点击 Cancel，把开关设为 false，界面瞬间变回 View 模式 */}
      <button
        type="button"
        className="btn todo-cancel"
        onClick={() => setEditing(false)}
      >
        Cancel
        <span className="visually-hidden">renaming {props.name}</span>
      </button>
      <button type="submit" className="btn btn__primary todo-edit">
        Save
        <span className="visually-hidden">new name for {props.name}</span>
      </button>
    </div>
  </form>

  )
  return (
    <li className="todo">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}

export default Todo;