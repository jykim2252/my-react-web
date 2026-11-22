import { useState } from 'react'

function Practice() {
  const [count, setCount] = useState(0)

  return (
    <div className="page-card">
      <div className="page-icon">⚙️</div>
      <h1 className="page-title">React 상태 관리 실습</h1>
      <p className="page-description">
        React의 핵심 훅(Hook)인 <code>useState</code>를 사용한 실시간 카운터 인터랙션입니다.
      </p>

      <section className="counter-box">
        <p className="counter-label">현재 버튼 클릭 횟수</p>
        <div className="counter-display">{count}</div>

        <div className="button-group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setCount((prev) => prev + 1)}
          >
            클릭하기 (+1)
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setCount(0)}
          >
            초기화
          </button>
        </div>
      </section>
    </div>
  )
}

export default Practice
