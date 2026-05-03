import { useLocation } from "react-router-dom"

export default function NotFound() {
  const location = useLocation()

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 py-20">
      <h1 className="text-8xl font-black tracking-tighter text-zinc-100">404</h1>
      <p className="text-sm font-medium text-zinc-400">This page could not be found.</p>
      <p className="font-mono text-xs text-zinc-600">{location.pathname}</p>
    </div>
  )
}
