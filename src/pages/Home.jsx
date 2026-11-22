import { useState } from 'react'

function Home() {
  const [greetingMessage, setGreetingMessage] = useState('')

  const handleGreet = () => {
    setGreetingMessage('안녕하세요! Antigravity AI로 만든 웹사이트입니다.')
  }

  return (
    <div className="page-card">
      <div className="page-icon">🚀</div>
      <h1 className="page-title">나의 AI 웹사이트에 오신 것을 환영합니다.</h1>
      <p className="page-description">
        React, Vite, 그리고 Antigravity AI 에이전트를 활용하여 제작한 반응형 멀티 페이지 웹 애플리케이션입니다.
      </p>

      <section className="greeting-section">
        <button className="btn btn-primary greet-btn" onClick={handleGreet}>
          인사하기
        </button>
        {greetingMessage && (
          <div className="greeting-message" role="status">
            {greetingMessage}
          </div>
        )}
      </section>

      <div className="feature-grid">
        <div className="feature-item">
          <h3>⚡ 빠른 성능</h3>
          <p>Vite 번들러 기반의 초고속 HMR 및 빌드 성능을 제공합니다.</p>
        </div>
        <div className="feature-item">
          <h3>🧩 컴포넌트 기반</h3>
          <p>React 19와 React Router를 활용한 유연한 멀티 페이지 아키텍처입니다.</p>
        </div>
        <div className="feature-item">
          <h3>🤖 AI 개발 협업</h3>
          <p>Antigravity 에이전트와 함께 기획, 구현, 검증을 신속하게 진행했습니다.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
