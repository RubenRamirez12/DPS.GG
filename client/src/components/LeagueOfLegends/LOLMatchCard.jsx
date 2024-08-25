import "./LOLMatchCard.css";
import { LOLriotKDA, riotMatchTime } from "../../utility/helperFunctions.js";


export default function LOLMatchCard({ match, user }) {
  let currentUser = match.players.find(
    (player) => player.riotPUUID === user.puuid
  );

  let blueTeam = match.players.filter(player => player.teamId === 100)
  let redTeam = match.players.filter(player => player.teamId === 200)

  return (
    
    <div className="lol-match-card">
      <div className="lol-match-card__game-info">
        <div className="lol-match-card__game-mode">
          {match.matchDetails.gameMode}
        </div>
        <div className="lol-match-card__date">date</div>
        <div className="lol-match-card__W-L-time">
          {riotMatchTime(match.matchDetails.gameLength)}
        </div>
      </div>
      <div className="lol-match-card__champion-loadout">
        <div className="lol-match-card__champion-icon">
          <div className="lol-match-card__champion-level">
            {currentUser.championLevel}
          </div>
          <img
            className="lol-match-card__champion-icon-settings"
            src={currentUser.championImage}
            alt="Champion Icon"
          />
        </div>
        <div className="lol-match-card__spell-rune">
          <div className="lol-match-card__spell-1">
            <img
              className="lol-match-card__spell-2-settings"
              src={currentUser.summoner1Url}
            />
          </div>
          <div className="lol-match-card__spell-2">
            <img
              className="lol-match-card__spell-2-settings"
              src={currentUser.summoner2Url}
            />
          </div>
          <div className="lol-match-card__rune-1">
            <img
              className="lol-match-card__rune-1-settings"
              src={currentUser.summoner2Url}
            />
          </div>
          <div className="lol-match-card__rune-2">
            <img
              className="lol-match-card__rune-2-settings"
              src={currentUser.summoner2Url}
            />
          </div>
        </div>
      </div>
      <div className="lol-match-card__column-one">
        <div className="lol-match-card__kda">
          <div className="lol-match-card__kills">{currentUser.kills}</div>
          <div className="lol-match-card__kda-slash-one">/</div>
          <div className="lol-match-card__deaths">{currentUser.deaths}</div>
          <div className="lol-match-card__kda-slash-two">/</div>
          <div className="lol-match-card__assists">{currentUser.assists}</div>
        </div>
        <div className="lol-match-card__column-two">
          <div className="lol-match-card__kda">
            {LOLriotKDA(
              currentUser.kills,
              currentUser.deaths,
              currentUser.assists
            )}
          </div>
          <div className="lol-match-card__kda-text"> KDA</div>
        </div>
        <div className="lol-match-card__column-three">
          <div>{currentUser.creepScore} CS 1.2</div>
        </div>
        <div className="lol-match-card__column-four">
          {currentUser.visionScore} vision
        </div>
      </div>
      <div className="lol-match-card__match-items">
        <div className="lol-match-card__item-1">
          <img src={currentUser.item0Url}></img>
        </div>
        <div className="lol-match-card__item-2">
          <img src={currentUser.item1Url}></img>
        </div>
        <div className="lol-match-card__item-3">
          <img src={currentUser.item2Url}></img>
        </div>
        <div className="lol-match-card__item-4">
          <img src={currentUser.item6Url}></img>
        </div>
        <div className="lol-match-card__item-5">
          <img src={currentUser.item4Url}></img>
        </div>
        <div className="lol-match-card__item-6">
          <img src={currentUser.item5Url}></img>
        </div>
        <div className="lol-match-card__item-7">
          <img src={currentUser.item3Url}></img>
        </div>
        <div className="lol-match-card__item-8">
          <img src={currentUser.item7Url}></img>
        </div>
      </div>

      <div className="lol-match-card__other-users">
        <div className="lol-match-card__player-0">
        </div>
        {match.players.map(player => {
          return(
            <div className="lol-match-card__player">
              {`${player.riotIDGameName}#${player.riotIDTagline}`}
            </div>
          )
        })}
        <div className="lol-match-card__player-1"></div>
        <div className="lol-match-card__player-2"></div>
        <div className="lol-match-card__player-3"></div>
        <div className="lol-match-card__player-4"></div>
        <div className="lol-match-card__player-5"></div>
        <div className="lol-match-card__player-6"></div>
        <div className="lol-match-card__player-7"></div>
        <div className="lol-match-card__player-8"></div>
        <div className="lol-match-card__player-9"></div>
      </div>
    </div>
  );
}
//{match.matchDetails.matchId}
//src={user.summonerInfo.profileIconUrl}
//src={currentUser.championImage}
