const models = require('../../models');

const { Finishes } = models;

const parseRaceSession = (table) => {
  const finishPosSchemas = [];
  const elements = table.querySelectorAll('td');
  // elements.forEach((element) => {
  //   console.log(element.innerHTML);
  // });
  for (let i = 9; i < elements.length; i += 9) {
    const newFinish = new Finishes.FinishPositionModel({
      driverName: elements[i + 3].innerHTML.replace(/(\r\n|\n|\r)/g, '').replaceAll('\t', ''),
      carNumber: parseInt(elements[i + 2].innerHTML, 10),
      interval: elements[i + 4].innerHTML.replace(/(\r\n|\n|\r)/g, '').replaceAll('\t', ''),
      lapsLed: parseInt(elements[i + 6].innerHTML.replace(/\*$/, ''), 10),
      lapsCompleted: parseInt(elements[i + 5].innerHTML, 10),
      status: elements[i + 8].innerHTML.replace(/(\r\n|\n|\r)/g, '').replaceAll('\t', ''),
    });
    finishPosSchemas.push(newFinish);
  }
  return finishPosSchemas;
};

module.exports = parseRaceSession;
