import { Link } from 'react-router-dom'

const navStyle = {
  padding: 'var(--space-4) 0',
  fontSize: '0.85rem',
  color: 'var(--color-text-muted)',
}

const listStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--space-2)',
  listStyle: 'none',
  margin: 0,
  padding: 0,
}

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
}

const linkStyle = {
  color: 'var(--color-green-700)',
  textDecoration: 'none',
}

export default function Breadcrumbs({ trail = [] }) {
  return (
    <nav aria-label="Breadcrumb" style={navStyle}>
      <ol style={listStyle}>
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1
          return (
            <li key={`${item.label}-${index}`} style={itemStyle}>
              {isLast ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.to} style={linkStyle}>
                  {item.label}
                </Link>
              )}
              {!isLast && <span aria-hidden="true">›</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
