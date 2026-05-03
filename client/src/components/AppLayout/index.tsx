import Navbar from "./Navbar"
import SearchBar from "../General/SearchBar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

export default function AppLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <div className="border-b border-zinc-800 px-4 py-2">
        <SearchBar />
      </div>
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  )
}
