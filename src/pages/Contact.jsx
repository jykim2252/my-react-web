import { useState } from 'react'

/**
 * 기본 이메일 형식 검증 정규식
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // 입력 필드 수정 시 해당 필드의 오류 메시지 제거
    if (errors[name]) {
      setErrors((prev) => {
        const nextErrors = { ...prev }
        delete nextErrors[name]
        return nextErrors
      })
    }
  }

  const validate = () => {
    const nextErrors = {}

    // 1. 이름 검증: 공백만 입력하거나 비워두면 오류
    if (!formData.name.trim()) {
      nextErrors.name = '이름을 입력해 주세요.'
    }

    // 2. 이메일 검증: 필수 입력 및 유효한 이메일 형식
    const trimmedEmail = formData.email.trim()
    if (!trimmedEmail) {
      nextErrors.email = '이메일을 입력해 주세요.'
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      nextErrors.email = '올바른 이메일 형식을 입력해 주세요. (예: user@example.com)'
    }

    // 3. 문의 내용 검증: 앞뒤 공백 제외 10자 이상
    const trimmedMessage = formData.message.trim()
    if (!trimmedMessage) {
      nextErrors.message = '문의 내용을 입력해 주세요.'
    } else if (trimmedMessage.length < 10) {
      nextErrors.message = `문의 내용은 앞뒤 공백을 제외하고 10자 이상 입력해야 합니다. (현재 ${trimmedMessage.length}자)`
    }

    return nextErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validate()

    // 오류 발생 시 오류 메시지 표시 및 성공 메시지 제거
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccessMessage('')
      return
    }

    // 모든 입력이 유효할 때 성공 메시지 표시
    setErrors({})
    setSuccessMessage('입력 검증이 완료되었습니다. 실제 문의는 전송되지 않았습니다.')
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    })
    setErrors({})
    setSuccessMessage('')
  }

  return (
    <div className="page-card">
      <div className="page-icon">✉️</div>
      <h1 className="page-title">문의하기</h1>
      <p className="page-description">
        궁금한 점이나 의견이 있으시면 아래 폼을 작성해 주세요.
      </p>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {/* 이름 입력 필드 */}
        <div className="form-group">
          <label htmlFor="user-name">
            이름 <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            id="user-name"
            name="name"
            type="text"
            className={`input-field ${errors.name ? 'input-error' : ''}`}
            placeholder="이름을 입력해 주세요"
            value={formData.name}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'user-name-error' : undefined}
          />
          {errors.name && (
            <p id="user-name-error" className="error-message" role="alert">
              ⚠️ {errors.name}
            </p>
          )}
        </div>

        {/* 이메일 입력 필드 */}
        <div className="form-group">
          <label htmlFor="user-email">
            이메일 <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            id="user-email"
            name="email"
            type="email"
            className={`input-field ${errors.email ? 'input-error' : ''}`}
            placeholder="example@domain.com"
            value={formData.email}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'user-email-error' : undefined}
          />
          {errors.email && (
            <p id="user-email-error" className="error-message" role="alert">
              ⚠️ {errors.email}
            </p>
          )}
        </div>

        {/* 문의 내용 textarea */}
        <div className="form-group">
          <label htmlFor="user-message">
            문의 내용 <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <textarea
            id="user-message"
            name="message"
            className={`textarea-field ${errors.message ? 'input-error' : ''}`}
            placeholder="문의하실 내용을 10자 이상 입력해 주세요."
            rows={5}
            value={formData.message}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'user-message-error' : undefined}
          />
          {errors.message && (
            <p id="user-message-error" className="error-message" role="alert">
              ⚠️ {errors.message}
            </p>
          )}
        </div>

        {/* 버튼 그룹: 문의하기 및 초기화 */}
        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            문의하기
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            초기화
          </button>
        </div>
      </form>

      {/* 검증 완료 성공 메시지 */}
      {successMessage && (
        <div className="success-banner" role="status" aria-live="polite">
          {successMessage}
        </div>
      )}
    </div>
  )
}

export default Contact
