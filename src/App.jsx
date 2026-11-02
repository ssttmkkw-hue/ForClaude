import { useEffect, useState } from 'react'
import './App.css'

// 数据存在手机本地（localStorage），关掉 app 再打开还在
function load(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v === null ? fallback : JSON.parse(v)
  } catch {
    return fallback
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* 隐私模式等情况下忽略 */
  }
}

export default function App() {
  const [count, setCount] = useState(() => load('count', 0))
  const [todos, setTodos] = useState(() =>
    load('todos', [
      { id: 1, text: '建一个 GitHub 仓库', done: true },
      { id: 2, text: '接上 Netlify 自动部署', done: false },
    ]),
  )
  const [draft, setDraft] = useState('')

  useEffect(() => save('count', count), [count])
  useEffect(() => save('todos', todos), [todos])

  const addTodo = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setTodos([...todos, { id: Date.now(), text, done: false }])
    setDraft('')
  }

  const toggle = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const remove = (id) => setTodos(todos.filter((t) => t.id !== id))

  return (
    <main className="app">
      <h1>待办</h1>
      <p className="sub">计数器 + 待办清单，数据保存在本机</p>

      <section className="card">
        <h2>计数器</h2>
        <button onClick={() => setCount(count + 1)}>点了 {count} 次</button>
      </section>

      <section className="card">
        <h2>待办清单</h2>
        <form onSubmit={addTodo} className="row">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="写点什么…"
          />
          <button type="submit">添加</button>
        </form>
        <ul>
          {todos.map((t) => (
            <li key={t.id} className={t.done ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggle(t.id)}
                />
                {t.text}
              </label>
              <button className="x" onClick={() => remove(t.id)} aria-label="删除">
                ×
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
