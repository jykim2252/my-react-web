const express = require('express')

const app = express()
const PORT = 3001
const HOST = '127.0.0.1'

// 이메일 정규식 (기본 이메일 형식 검증)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// JSON 파싱 미들웨어 (요청 크기 제한: 10kb)
app.use(express.json({ limit: '10kb' }))

// 서버 상태 확인 API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Express 서버가 정상적으로 실행 중입니다.',
    timestamp: new Date().toISOString(),
  })
})

// 문의 접수 및 입력값 검증 API
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {}

  // 1. 타입 안전성 검사 (문자열이 아닌 입력값 방어)
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string'
  ) {
    return res.status(400).json({
      success: false,
      message: '이름, 이메일, 문의 내용은 문자열 형식이어야 합니다.',
    })
  }

  // 2. 앞뒤 공백 제거
  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const trimmedMessage = message.trim()

  // 3. 필드별 유효성 검증
  if (!trimmedName) {
    return res.status(400).json({
      success: false,
      message: '이름을 입력해 주세요.',
    })
  }

  if (!trimmedEmail) {
    return res.status(400).json({
      success: false,
      message: '이메일을 입력해 주세요.',
    })
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({
      success: false,
      message: '올바른 이메일 형식을 입력해 주세요.',
    })
  }

  if (!trimmedMessage) {
    return res.status(400).json({
      success: false,
      message: '문의 내용을 입력해 주세요.',
    })
  }

  if (trimmedMessage.length < 10) {
    return res.status(400).json({
      success: false,
      message: `문의 내용은 앞뒤 공백을 제외하고 10자 이상 입력해야 합니다. (현재 ${trimmedMessage.length}자)`,
    })
  }

  // 개인정보를 로그에 남기지 않고 성공 응답 반환
  return res.status(200).json({
    success: true,
    message: '문의가 정상적으로 접수되었습니다.',
  })
})

// 잘못된 JSON 요청 본문 파싱 에러 핸들러
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: '올바르지 않은 JSON 요청 형식입니다.',
    })
  }
  if (err && err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: '요청 본문 크기가 허용치(10KB)를 초과했습니다.',
    })
  }
  return next(err)
})

// 127.0.0.1 루프백 주소에서만 수신
app.listen(PORT, HOST, () => {
  console.log(`[Express] 서버가 http://${HOST}:${PORT} 에서 실행 중입니다.`)
})
