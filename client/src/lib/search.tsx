import { SearchConfig } from "./types"
import {
  render,
  homeSearch,
  homeSelect,
  lolSelect,
  lolSearch,
  lolSubmit,
  osuSelect,
  tftSelect,
} from "./helpers"

export const searchBarConfigs: Record<string, SearchConfig> = {
  home: {
    placeholder: "Search games...",
    eager: true,
    renderResult: render,
    search: homeSearch,
    onSelect: homeSelect,
  },

  lol: {
    placeholder: "Search summoners, champions, items… (Name#Tag)",
    renderResult: render,
    search: lolSearch,
    onSelect: lolSelect,
    onSubmit: lolSubmit,
  },

  osu: {
    placeholder: "Search players or maps...",
    renderResult: render,
    search: async (_q) => [],
    onSelect: osuSelect,
  },

  tft: {
    placeholder: "Search summoners, items... (Name#Tag)",
    renderResult: render,
    search: async (_q) => [],
    onSelect: tftSelect,
  },
}
