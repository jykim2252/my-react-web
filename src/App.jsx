
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="container">
      <div className="logo">🚀</div>

      <h1>나의 첫 번째 React 웹사이트</h1>

      <p>React + Vite + Antigravity로 만든 웹사이트입니다.</p>

      <section className="counter">
        <p>버튼 클릭 횟수</p>
        <h2>{count}</h2>
      </section>

      <div className="buttons">
        <button onClick={() => setCount(count + 1)}>
          클릭하기
        </button>

        <button
          className="reset"
          onClick={() => setCount(0)}
        >
          초기화
        </button>
      </div>

      <footer>React 실습 프로젝트</footer>
    </main>
  )
}

export default App
