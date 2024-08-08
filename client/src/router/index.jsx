import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { navbarData } from "../data/NavbarOptions";
import { lolSearchBarData, osuSearchBarData, tftSearchBarData } from "../data/SearchBarOptions"
import { lolSidebarData, osuSidebarData, tftSidebarData } from "../data/SidebarOptions";
import App from "../App";
import ContentDisplay from "../components/ContentDisplay/ContentDisplay";
import LOLUserProfile from "../components/LeagueOfLegends/LOLUserProfile";
import SearchBar from "../components/SearchBar/SearchBar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App navbarData={navbarData} />,
    children: [
      {
        index: true,
        element: <Navigate to="/lol" />,
      },
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
            element: <SearchBar searchBarData={lolSearchBarData} />,
          },
          {
            path: "user/:riotID",
            element: <LOLUserProfile />,
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
            element:  <SearchBar searchBarData={osuSearchBarData} />,
          },
        ],
      },
      {
        path: "tft",
        element: (
          <ContentDisplay sidebarData={tftSidebarData}>
            <Outlet />
          </ContentDisplay>
        ),
        children : [
          {
            index: true,
            element: <SearchBar searchBarData={tftSearchBarData} />
          },
        ]
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to="/lol" />,
  },
]);
