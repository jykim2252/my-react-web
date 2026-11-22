const CURRENT_YEAR = new Date().getFullYear()

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-title">나의 AI 웹사이트 개발 실습</p>
        <p className="footer-copy">
          © {CURRENT_YEAR} React + Vite + Antigravity. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
