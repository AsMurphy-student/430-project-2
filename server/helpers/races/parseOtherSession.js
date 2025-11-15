const models = require('../../models');

const { Starts } = models;

const parseOtherSession = (table) => {
  const startPosSchemas = [];
  const elements = table.querySelectorAll('td');
  for (let i = 4; i < elements.length; i += 4) {
    const speedStr = elements[i + 3].innerHTML;
    const newQuali = new Starts.StartPositionModel({
      driverName: elements[i + 2].innerHTML.replace(/(\r\n|\n|\r)/g, '').replaceAll('\t', ''),
      carNumber: parseInt(elements[i + 1].innerHTML, 10),
      speed: parseFloat(speedStr.slice(0, -4)),
    });
    startPosSchemas.push(newQuali);
  }
  return startPosSchemas;
};

module.exports = parseOtherSession;
