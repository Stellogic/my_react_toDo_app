import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 1. 定义数据 (DATA)
const DATA = [
  { id: "todo-0", name: "吃饭", completed: true },
  { id: "todo-1", name: "睡觉", completed: false },
  { id: "todo-2", name: "打豆豆", completed: false },
  { id: "todo-3", name: "原神", completed: true},
];

// 2. 渲染 App (只写这一次)，并把数据传进去
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 把 DATA 传给 App 的 props参数的tasks 属性 */}
    <App tasks={DATA} />
  </StrictMode>,
)