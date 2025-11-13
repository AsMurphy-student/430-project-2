const models = require('../models');

const { Championship } = models;

const championshipsPage = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Championship.find(query).select('name').lean().exec();

    return res.render('championshipsPage', { championships: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving championships!' });
  }
};

// const makeDomo = async (req, res) => {
//   if (!req.body.name || !req.body.age) {
//     return res.status(400).json({ error: 'Both name and age are required!' });
//   }

//   const domoData = {
//     name: req.body.name,
//     age: req.body.age,
//     owner: req.session.account._id,
//   };

//   try {
//     const newDomo = new Domo(domoData);
//     await newDomo.save();
//     return res.json({ redirect: '/maker' });
//   } catch (err) {
//     console.log(err);
//     if (err.code === 11000) {
//       return res.status(400).json({ error: 'Domo already exists!' });
//     }
//     return res.status(500).json({ error: 'An error occured making domo!' });
//   }
// };

module.exports = {
  championshipsPage,
};
