import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { searchBarConfigs } from "@/lib/search"

export default function SearchBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const base = location.pathname.split("/")[1]
  const config = searchBarConfigs[base] ?? searchBarConfigs["home"]

  useEffect(() => {
    setQuery("")
    setResults([])
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setOpen(false)
      return
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true)

      const res = await config.search(query)

      setResults(res)

      setOpen(res.length > 0)

      setLoading(false)
    }, 300)
  }, [query, config])

  const handleFocus = async () => {
    if (config.eager) {
      setLoading(true)

      const res = await config.search(query)

      setResults(res)

      setOpen(true)

      setLoading(false)
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={config.placeholder}
        className="text-foreground w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm transition-colors placeholder:text-zinc-500 focus:border-[var(--game-primary)] focus:outline-none"
      />
      {loading && (
        <div className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-zinc-500">...</div>
      )}
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl">
          {results.map((item, i) => (
            <li
              key={i}
              onClick={() => {
                config.onSelect(item, navigate)
                setOpen(false)
                setQuery("")
              }}
              className="cursor-pointer px-4 py-2.5 text-sm transition-colors hover:bg-zinc-800"
            >
              {config.renderResult(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
