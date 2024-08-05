import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import {
  lolSidebarData,
  osuSidebarData,
} from "../data/SidebarOptions"
import App from "../App";
import ContentDisplay from "../components/ContentDisplay/ContentDisplay";
import LOLSearch from "../components/LeagueOfLegends/LOLSearch";
import OsuSearch from "../components/Osu/OsuSearch";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "lol",
        element: (
          <ContentDisplay sidebarData={lolSidebarData}>
            <Outlet />
          </ContentDisplay>
        ),
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
        element: (
          <ContentDisplay sidebarData={osuSidebarData}>
            <Outlet />
          </ContentDisplay>
        ),
        children: [
          {
            index: true,
            element: <OsuSearch />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/lol" />,
  },
]);
