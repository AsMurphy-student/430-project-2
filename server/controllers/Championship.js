const fs = require('fs');
const { JSDOM } = require('jsdom');
const models = require('../models');

const { Championship } = models;

const championshipsPage = async (req, res) => {
  try {
    // console.log(req.session.account.championships);
    const query = { owner: req.session.account._id };
    const docs = await Championship.find(query).select('name').lean().exec();

    return res.render('championships', { championships: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving championships!' });
  }
};

function extractData(table) {
  return Array.from(table).map((row) => {
    const cells = row.cells;
    return cells.map((cell) => cell.textContent.trim()).join(",");
  });
}

const addRace = async (req, res) => {
  try {
    const query = { owner: req.session.account._id, name: req.body.name };
    const championshipToAddTo = await Championship.find(query).select('name').lean().exec();

    const htmlContent = fs.readFileSync(`${__dirname}/race.html`, 'utf8');
    const domOfRace = new JSDOM(htmlContent);
    const tables = domOfRace.window.document.querySelectorAll('table');
    // tables.forEach((table) => {
    //   console.log(table.outerHTML);
    // });
    console.log(tables[4].outerHTML);

    // return res.render('championships', { championships: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving championships!' });
  }
};

const makeChampionship = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Championship name is required!' });
  }

  const championshipData = {
    name: req.body.name,
    owner: req.session.account._id,
  };

  try {
    const newChampionship = new Championship(championshipData);
    await newChampionship.save();
    return res.json({ redirect: '/championships' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Championship already exists!' });
    }
    return res
      .status(500)
      .json({ error: 'An error occured making championship!' });
  }
};

module.exports = {
  championshipsPage,
  makeChampionship,
  addRace,
};
