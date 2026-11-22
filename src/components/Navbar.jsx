import { NavLink } from 'react-router'

function Navbar() {
  const navItems = [
    { to: '/', label: '홈' },
    { to: '/about', label: '소개' },
    { to: '/practice', label: 'React 실습' },
    { to: '/contact', label: '문의' },
  ]

  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-icon">🤖</span>
          <span className="brand-text">나의 AI 웹사이트</span>
        </NavLink>

        <nav className="nav-menu" aria-label="메인 내비게이션">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
