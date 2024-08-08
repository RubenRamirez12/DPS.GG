import { thunkGetUser as LOLThunkGetUser } from "../store/LeagueOfLegends";
import { thunkGetUser as TFTThunkGetUser } from "../store/TeamFightTactics";
import LOLSearchImage from "../assets/LOLBackground.png";
import TFTSearchImage from "../assets/TFTBackground.png";

export const lolSearchBarData = {
  searchThunk: LOLThunkGetUser,
  redirectURL: "/lol/user",
  image: LOLSearchImage,
  placeHolder: "Search Yourself",
};

export const osuSearchBarData = {
  searchThunk: LOLThunkGetUser,
  redirectURL: "/osu/user",
  image: LOLSearchImage,
  placeHolder: "This is osu Search",
};

export const tftSearchBarData = {
  searchThunk: TFTThunkGetUser,
  redirectURL: "/tft/user",
  image: TFTSearchImage,
  placeHolder: "This is not osu Search",
};
