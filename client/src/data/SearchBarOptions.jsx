import { thunkGetUser as LOLThunkGetUser } from "../store/LeagueOfLegends";
import { thunkGetUser as TFTThunkGetUser } from "../store/TeamFightTactics";
import { thunkSearchUser as OSUThunkSearchUser } from "../store/Osu";
import LOLSearchImage from "../assets/LOLBackground.png";
import TFTSearchImage from "../assets/TFTBackground.png";
import OSUSearchImage from "../assets/OSUBackground.png"

export const lolSearchBarData = {
  searchThunk: LOLThunkGetUser,
  redirectURL: "/lol/user",
  image: LOLSearchImage,
  placeHolder: "Search Yourself",
};

export const osuSearchBarData = {
  searchThunk: OSUThunkSearchUser,
  redirectURL: "/osu/user",
  image: OSUSearchImage,
  placeHolder: "Circle Clicker Query",
};

export const tftSearchBarData = {
  searchThunk: TFTThunkGetUser,
  redirectURL: "/tft/user",
  image: TFTSearchImage,
  placeHolder: "This is not osu Search",
};
