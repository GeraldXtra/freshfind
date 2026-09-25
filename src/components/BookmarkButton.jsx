import { useBookmarks } from '../context/BookmarksContext'
import '../styles/bookmark-button.css'

export default function BookmarkButton({ type, id, label }) {
  const { isSaved, toggle } = useBookmarks()
  const saved = isSaved(type, id)

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    toggle(type, id)
  }

  return (
    <button
      type="button"
      className={saved ? 'bookmark-button is-saved' : 'bookmark-button'}
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from bookmarks` : `Save ${label}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  )
}
