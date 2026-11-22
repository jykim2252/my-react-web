import { useState } from 'react'

function Contact() {
  const [name, setName] = useState('')
  const [submittedName, setSubmittedName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    setSubmittedName(trimmed)
  }

  const handleReset = () => {
    setName('')
    setSubmittedName('')
  }

  return (
    <div className="page-card">
      <div className="page-icon">✉️</div>
      <h1 className="page-title">문의하기</h1>
      <p className="page-description">
        이름을 입력하시면 환영 메시지를 표시합니다. (실제 서버로 전송되지 않습니다)
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user-name">이름</label>
          <input
            id="user-name"
            type="text"
            className="input-field"
            placeholder="이름을 입력해 주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            등록하기
          </button>
          {submittedName && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              다시 작성
            </button>
          )}
        </div>
      </form>

      {submittedName && (
        <section className="welcome-banner" role="status">
          <h3>🎉 환영합니다!</h3>
          <p>
            <strong>{submittedName}</strong>님, 문의해 주셔서 진심으로 감사드립니다!
          </p>
          <span className="notice-tag">서버 전송 없이 로컬 상태로 안전하게 표시되었습니다.</span>
        </section>
      )}
    </div>
  )
}

export default Contact
