import { SearchResult, typeLabel } from "../types"
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api"

export * from "./home.helpers"
export * from "./lol.helpers"
export * from "./osu.helpers"
export * from "./tft.helpers"

export function Result({ item }: { item: SearchResult }) {
  return (
    <div className="flex items-center gap-3">
      {item.icon && (
        <img src={item.icon} className="h-7 w-7 shrink-0 rounded-md object-cover" alt={item.name} />
      )}
      <div className="flex flex-col">
        <span className="text-foreground text-sm font-medium">{item.name}</span>
        {item.subtitle && <span className="text-xs text-zinc-500">{item.subtitle}</span>}
      </div>
      <span className="ml-auto text-xs text-zinc-600">{typeLabel[item.type]}</span>
    </div>
  )
}

export const render = (item: SearchResult) => <Result item={item} />

export async function get(path: string) {
  const res = await fetch(`${BASE_URL}${path}`)

  if (!res.ok) {
    throw new Error(`${res.status}`)
  }

  return res.json()
}
