
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [greetingMessage, setGreetingMessage] = useState('')

  const handleGreet = () => {
    setGreetingMessage('안녕하세요! Antigravity AI로 만든 웹사이트입니다.')
  }

  return (
    <main className="container">
      <div className="logo">🚀</div>

      <h1>나의 AI 웹사이트 개발 실습</h1>
      <p className="welcome-text">환영합니다!</p>

      <p className="subtitle">React + Vite + Antigravity로 만든 웹사이트입니다.</p>

      <section className="greeting-section">
        <button className="greet-btn" onClick={handleGreet}>
          인사하기
        </button>
        {greetingMessage && (
          <div className="greeting-message" role="status">
            {greetingMessage}
          </div>
        )}
      </section>

      <section className="counter">
        <p>버튼 클릭 횟수</p>
        <h2>{count}</h2>
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
      </section>

      <footer>React 실습 프로젝트</footer>
    </main>
  )
}

export default App
