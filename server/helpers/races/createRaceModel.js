const { JSDOM } = require('jsdom');
const parseOtherSession = require('./parseOtherSession');
const parseRaceSession = require('./parseRaceSession');

const models = require('../../models');

const { Race } = models;

const getTableTitles = (tables) => {
  const tableNameArray = [];
  tables.forEach((table) => {
    const prevSib = table.previousElementSibling.previousElementSibling;
    const text = prevSib.innerHTML.trim();
    if (text !== '') {
      tableNameArray.push(text);
    } else {
      tableNameArray.push(table.previousElementSibling.innerHTML.trim());
    }
  });
  return tableNameArray;
};

const createRaceModel = (htmlString, raceNumber) => {
  const domOfRace = new JSDOM(htmlString);
  const tables = domOfRace.window.document.querySelectorAll('table');
  const tableNames = getTableTitles(tables);

  // console.log(Race.RaceSchema);

  const newRace = new Race.RaceModel({
    raceNumber,
  });

  let startsArray = [];
  let finishesArray = [];

  tables.forEach((table, index) => {
    if (tableNames[index] === 'Session: Qualifying') startsArray = parseOtherSession(table);
    else if (tableNames[index] === 'OFFICIAL STANDINGS') finishesArray = parseRaceSession(table);
  });

  newRace.startPositions = startsArray;
  console.log(newRace);
};

module.exports = createRaceModel;
