export const encodeRiotID = (riotID) => {
  return riotID.replace("#", "-");
};

export const osuPlayTimeDisplay = (totalSecondsPlayed) => {
  const hours = Math.floor(totalSecondsPlayed / (60 * 60));
  const minutes = Math.floor((totalSecondsPlayed % (60 * 60)) / 60);
  const secondsLeft = totalSecondsPlayed % 60;

  const playTime = `${hours}h ${minutes}m ${secondsLeft}s`;
  return playTime;
};

const osuDateFormat = (dateArray) => {
  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  const year = Number(dateArray[0]);
  const month = months[Number(dateArray[1])];
  const day = Number(dateArray[2]);
  return `${year} ${month} ${day}`;
};

export const osuJoinDateDisplay = (date) => {
  let timeStampArray = date.split(" ");
  let tempDate = timeStampArray[0];
  const timeStamp = timeStampArray[1];
  tempDate = tempDate.split("-");
  const finalDate = osuDateFormat(tempDate);
  return `${finalDate} at ${timeStamp}`;
};

export const riotMatchTime = (seconds) => {
  const riotMinutes = Math.floor((seconds % (60 * 60)) / 60)
  const riotSeconds = seconds % 60


  return `${riotMinutes}:${riotSeconds}`
}

export const LOLriotKDA = (kills, deaths, assists) => {
  if (deaths === 0) {
    return 'Perfect';
  }

  const riotKDA = (kills + assists) / deaths;
  return riotKDA.toFixed(2);
}

// export const LOLriotCS = (creepScore, seconds2) => {
//   if (seconds2 === 0) {
//     return 'N/A'; 
//   }

//   const CSRiotminutes = seconds2 / 60;
//   const csPerMinute = creepScore / CSRiotminutes;
  
//   return `( ${csPerMinute.toFixed(2)})`;
// }
