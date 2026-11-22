function About() {
  const techStack = [
    {
      title: 'React',
      badge: 'UI Library',
      color: '#0284c7',
      description:
        '사용자 인터페이스(UI)를 구축하기 위한 대표적인 선언형 JavaScript 라이브러리입니다. 컴포넌트 단위 개발과 Virtual DOM 기반의 효율적인 렌더링을 제공합니다.',
    },
    {
      title: 'Vite',
      badge: 'Build Tool',
      color: '#7c3aed',
      description:
        '네이티브 ES 모듈(ESM)을 기반으로 한 차세대 프론트엔드 빌드 도구입니다. 번들링 없는 즉각적인 개발 서버 구동과 Rollup 기반의 초고속 프로덕션 빌드를 지원합니다.',
    },
    {
      title: 'Antigravity',
      badge: 'AI Pair Programmer',
      color: '#2563eb',
      description:
        'Google DeepMind 기술을 바탕으로 개발된 풀스택 AI 에이전트입니다. 코드 작성, 버그 수정, 아키텍처 설계, 빌드 및 배포 검증까지 개발 라이프사이클 전반을 협업합니다.',
    },
  ]

  return (
    <div className="page-card">
      <div className="page-icon">💡</div>
      <h1 className="page-title">기술 스택 소개</h1>
      <p className="page-description">
        본 프로젝트를 구성하는 핵심 기술 요소인 React, Vite, 그리고 Antigravity AI의 역할입니다.
      </p>

      <div className="about-list">
        {techStack.map((tech) => (
          <article key={tech.title} className="about-item">
            <div className="about-header">
              <h2>{tech.title}</h2>
              <span className="badge" style={{ backgroundColor: tech.color }}>
                {tech.badge}
              </span>
            </div>
            <p>{tech.description}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default About
