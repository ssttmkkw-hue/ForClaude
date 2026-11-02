import { useState } from 'react'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([
    { id: 1, text: '建一个 GitHub 仓库', done: true },
    { id: 2, text: '接上 Netlify 自动部署', done: false },
  ])
  const [draft, setDraft] = useState('')

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
      <h1>React Hello Demo</h1>
      <p className="sub">一个用来跑通「建仓库 → Netlify 部署」流程的小项目</p>

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
