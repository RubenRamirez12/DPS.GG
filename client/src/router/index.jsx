import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import LOLMain from "../components/LeagueOfLegends/LOLMain";
import OsuMain from "../components/Osu/OsuMain";
import LOLSearch from "../components/LeagueOfLegends/LOLSearch";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "lol",
        element: <LOLMain />,
        children: [
          {
            index: true,
            element: <LOLSearch />,
          },
          {
            path: "user/:riotID",
            element: <h1>USER XXX</h1>,
          },
        ],
      },

      {
        path: "osu",
        element: <OsuMain />,
      },

    ],
  },
  {
    path: "*",
    element: <Navigate to="/lol" />,
  },
]);
