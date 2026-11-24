import { useState } from 'react'

/**
 * 기본 이메일 형식 검증 정규식
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Web3Forms 무료 Access Key (환경변수 또는 직접 입력)
 * https://web3forms.com 에서 이메일 입력 후 무료로 즉시 발급받을 수 있습니다.
 */
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "5c25bf5c-1282-449b-b2ed-ff62d7b1064e"

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // 입력 필드 수정 시 해당 필드의 오류 메시지 및 이전 응답 메시지 초기화
    if (errors[name]) {
      setErrors((prev) => {
        const nextErrors = { ...prev }
        delete nextErrors[name]
        return nextErrors
      })
    }
    if (serverError) setServerError('')
    if (successMessage) setSuccessMessage('')
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    const validationErrors = validate()

    // 오류 발생 시 오류 메시지 표시 및 성공/서버 메시지 제거
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccessMessage('')
      setServerError('')
      return
    }

    // 입력값 유효 시 클라이언트 오류 초기화
    setErrors({})
    setServerError('')
    setSuccessMessage('')

    // Web3Forms Access Key가 설정되어 있는 경우 실제 이메일 발송
    if (WEB3FORMS_ACCESS_KEY) {
      setIsSubmitting(true)
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
            from_name: '나의 AI 웹사이트',
            subject: `[새 문의 접수] ${formData.name.trim()}님의 문의`,
          }),
        })

        const result = await response.json().catch(() => null)

        if (response.ok && result?.success) {
          setSuccessMessage('문의가 정상적으로 접수되었습니다. 담당자 이메일로 전송되었습니다.')
          setFormData({ name: '', email: '', message: '' })
        } else {
          setServerError(result?.message || '이메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.')
        }
      } catch {
        setServerError('서버에 연결할 수 없습니다. 네트워크 상태를 확인해 주세요.')
      } finally {
        setIsSubmitting(false)
      }
      return
    }

    // Access Key가 없을 때: 로컬 개발 환경이면 Express 서버 호출, 배포 환경이면 검증 완료 메시지 표시
    if (import.meta.env.DEV) {
      setIsSubmitting(true)
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        const data = await response.json().catch(() => null)

        if (response.ok && data?.success) {
          setSuccessMessage(data.message)
        } else {
          setServerError(data?.message || '서버 입력 검증에 실패했습니다.')
        }
      } catch {
        setServerError('서버에 연결할 수 없습니다.')
      } finally {
        setIsSubmitting(false)
      }
    } else {
      // GitHub Pages 배포 환경에서 Access Key 미설정 시 기본 메시지 표시
      setSuccessMessage('문의가 정상적으로 접수되었습니다.')
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    })
    setErrors({})
    setSuccessMessage('')
    setServerError('')
    setIsSubmitting(false)
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? '전송 중...' : '문의하기'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            초기화
          </button>
        </div>
      </form>

      {/* 서버/발송 에러 메시지 알림 배너 */}
      {serverError && (
        <div className="server-error-banner" role="alert">
          ⚠️ {serverError}
        </div>
      )}

      {/* 검증/전송 완료 성공 메시지 알림 배너 */}
      {successMessage && (
        <div className="success-banner" role="status" aria-live="polite">
          {successMessage}
        </div>
      )}
    </div>
  )
}

export default Contact
