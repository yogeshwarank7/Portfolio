import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia?.(query)
    if (!mql) return

    const onChange = () => setMatches(Boolean(mql.matches))
    onChange()
    mql.addEventListener?.('change', onChange)
    return () => mql.removeEventListener?.('change', onChange)
  }, [query])

  return matches
}

