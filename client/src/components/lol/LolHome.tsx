import SearchBar from "@/components/General/SearchBar"

export default function LolHome() {
  return (
    <div
      className="relative flex h-full min-h-screen items-center justify-center"
      style={{
        backgroundImage: "url('/lol/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 flex w-full flex-col items-center gap-4">
        <h1 className="text-3xl font-black tracking-tight text-zinc-100">League of Legends</h1>
        <p className="text-sm text-zinc-400">Search for a summoner, champion, or item</p>
        <SearchBar />
      </div>
    </div>
  )
}
