import { createBrowserRouter } from "react-router-dom"

import AppLayout from "./components/AppLayout"
import Home from "./components/home"

import LolLayout from "./components/lol/LolLayout"
import LolHome from "./components/lol/LolHome"

import OsuLayout from "./components/osu/OsuLayout"
import OsuHome from "./components/osu/OsuHome"

import TftLayout from "./components/tft/TftLayout"
import TftHome from "./components/tft/TftHome"

import NotFound from "./components/General/NotFound"

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/lol",
        element: <LolLayout />,
        children: [
          { index: true, element: <LolHome /> },
          // { path: "summoner/:name", element: <Summoner /> },
          // { path: "champions", element: <Champions /> },
          // { path: "champions/:championId", element: <ChampionDetail /> },
          // { path: "items", element: <Items /> },
          // { path: "items/:itemId", element: <ItemDetail /> },
          { path: "*", element: <NotFound /> },
        ],
      },

      {
        path: "/osu",
        element: <OsuLayout />,
        children: [
          { index: true, element: <OsuHome /> },
          { path: "*", element: <NotFound /> },
        ],
      },

      {
        path: "/tft",
        element: <TftLayout />,
        children: [
          { index: true, element: <TftHome /> },
          { path: "*", element: <NotFound /> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
])
