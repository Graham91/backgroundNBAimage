var express = require("express");
const getColors = require("get-image-colors");
const path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

const nbalogo = {
  AtlantaHawks: [
    "9168_atlanta_hawks-primary-2016",
    "https://i.imgur.com/cnCt0pi.png",
    "https://www.nba.com/teams/hawks",
  ],
  BostonCeltics: [
    "bostonceltics",
    "https://i.imgur.com/6BjmvB9.png",
    "https://www.nba.com/teams/celtics",
  ],
  BrooklynNets: [
    "137_brooklyn-nets-primary-2013",
    "https://i.imgur.com/Yo2SWH5.png",
    "https://www.nba.com/teams/nets",
  ],
  CharlotteHornets: [
    "1926_charlotte__hornets_-primary-2015",
    "https://i.imgur.com/q0F98Vr.png",
    "https://www.nba.com/teams/hornets",
  ],
  ChicagoBulls: [
    "chicagobulls",
    "https://i.imgur.com/nBXdIZa.png",
    "https://www.nba.com/teams/bulls",
  ],
  ClevelandCavaliers: [
    "6921_cleveland_cavaliers-primary-2018",
    "https://i.imgur.com/SQ8IRGe.png",
    "https://www.nba.com/teams/cavaliers",
  ],
  DallasMavericks: [
    "3463_dallas_mavericks-primary-2018",
    "https://i.imgur.com/IoHSBay.png",
    "https://www.nba.com/teams/mavericks",
  ],
  DenverNuggets: [
    "8926_denver_nuggets-primary-2019",
    "https://i.imgur.com/9UQCcCy.png",
    "https://www.nba.com/teams/nuggets",
  ],
  DetroitPistons: [
    "2164_detroit_pistons-primary-2018",
    "https://i.imgur.com/w8IdQ5o.png",
    "https://www.nba.com/teams/pistons",
  ],
  GoldenStateWarriors: [
    "3152_golden_state_warriors-primary-2020",
    "https://i.imgur.com/pjT1MT2.png",
    "https://www.nba.com/teams/warriors",
  ],
  HoustonRockets: [
    "6830_houston_rockets-primary-2020",
    "https://i.imgur.com/jVKqsCT.png",
    "https://www.nba.com/teams/rockets",
  ],
  IndianaPacers: [
    "4812_indiana_pacers-primary-2018",
    "https://i.imgur.com/cF7ZE6m.png",
    "https://www.nba.com/teams/pacers",
  ],
  LAClippers: [
    "5462_los_angeles_clippers-primary-2016",
    "https://i.imgur.com/TXXgQsL.png",
    "https://www.nba.com/teams/clippers",
  ],
  LALakers: [
    "Lakers",
    "https://i.imgur.com/uM89Dje.png",
    "https://www.nba.com/teams/lakers",
  ],
  MemphisGrizzlies: [
    "4373_memphis_grizzlies-primary-2019",
    "https://i.imgur.com/bR4g8sF.png",
    "https://www.nba.com/teams/grizzlies",
  ],
  MiamiHeat: [
    "maimiheat",
    "https://i.imgur.com/5Sojwa8.png",
    "https://www.nba.com/teams/heat",
  ],
  MilwaukeeBucks: [
    "8275_milwaukee_bucks-primary-2016",
    "https://i.imgur.com/l5Mk2y0.png",
    "https://www.nba.com/teams/bucks",
  ],
  MinnesotaTimberwolves: [
    "9669_minnesota_timberwolves-primary-2018",
    "https://i.imgur.com/8Kd7LHm.png",
    "https://www.nba.com/teams/timberwolves",
  ],
  NewOrleansPelicans: [
    "2681_new_orleans_pelicans-primary-2014",
    "https://i.imgur.com/qbQcmgr.png",
    "https://www.nba.com/teams/pelicans",
  ],
  NewYorkKnicks: [
    "knicks",
    "https://i.imgur.com/7G0Sipn.png",
    "https://www.nba.com/teams/knicks",
  ],
  OklahomaCityThunder: [
    "khmovcnezy06c3nm05ccn0oj2",
    "https://i.imgur.com/Kzzjylu.png",
    "https://www.nba.com/teams/thunder",
  ],
  OrlandoMagic: [
    "magic",
    "https://i.imgur.com/W0mpDPp.png",
    "https://www.nba.com/teams/magic",
  ],
  PhiladelphiaSixers: [
    "7034_philadelphia_76ers-primary-2016",
    "https://i.imgur.com/AJFWuzK.png",
    "https://www.nba.com/teams/sixers",
  ],
  PhoenixSuns: [
    "4370_phoenix_suns-primary-2014",
    "https://i.imgur.com/NyvEymP.png",
    "https://www.nba.com/teams/suns",
  ],
  PortlandTrailBlazers: [
    "9725_portland_trail_blazers-primary-2018",
    "https://i.imgur.com/9woaLrf.png",
    "https://www.nba.com/teams/blazers",
  ],
  SacramentoKings: [
    "4043_sacramento_kings-primary-2017",
    "https://i.imgur.com/bZf4Z8x.png",
    "https://www.nba.com/teams/kings",
  ],
  SanAntonioSpurs: [
    "2547_san_antonio_spurs-primary-2018",
    "https://i.imgur.com/pcan3JR.png",
    "https://www.nba.com/teams/kings",
  ],
  TorontoRaptors: [
    "4578_toronto_raptors-primary-2016",
    "https://i.imgur.com/fN1bg4o.png",
    "https://www.nba.com/teams/raptors",
  ],
  UtahJazz: [
    "6749_utah_jazz-primary-2017",
    "https://i.imgur.com/7l9QU1W.png",
    "https://www.nba.com/teams/jazz",
  ],
  WashingtonWizards: [
    "5671_washington_wizards-primary-2016",
    "https://i.imgur.com/IIGRDVX.png",
    "https://www.nba.com/teams/wizards",
  ],
};
// Routes
// =============================================================

app.get("/pictures", function (req, res) {
  var keys = [];
  for (var key in nbalogo) {
    keys.push(key);
  }
  function returninfo() {
    console.log(nbalogo);
    res.send(nbalogo);
  }
  let distancetraveled = 1;

  keys.forEach((element) => {
    let currentteam1 = nbalogo[element];
    let currentteam = "/NBAlogos/" + currentteam1[0] + ".png";
    let length = keys.length;

    getColors(path.join(__dirname, currentteam)).then((colors) => {
      let colorarray = colors.map((color) => color.hex());
      // console.log(colorarray);
      currentteam1.push(colorarray);
      distancetraveled++;
      if (distancetraveled === length) {
        console.log("worked");
        returninfo();
      } else {
        console.log("nice");
      }
    });
  });
});

// Syncing our sequelize models and then starting our Express app
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
