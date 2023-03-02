//Import dependencies
const fs = require("fs");
const XLSX = require("xlsx");
const Sequelize = require('sequelize');
//const {Sequelize} = require('sequelize');
const SSF = require("ssf");


let a = SSF.format('dd', 30153) + '.' + SSF.format('mm', 30153) + '.' + SSF.format('yyyy', 30153) + 'г.';
//console.log(typeof(a));
//console.log(a);

//Read the file into memory
const workbook = XLSX.readFile("files/rrr.xlsx");

//Convert the XLSX to JSON
let worksheets = [];
//console.log(workbook.SheetNames[0]);
worksheets[workbook.SheetNames[0]] = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
//console.log(worksheets[workbook.SheetNames[0]]);

for (let i = 0; i < 1610; i++) { // выведет 0, затем 1, затем 2
    if (worksheets[workbook.SheetNames[0]][i]['Дата утверждения'] != '-') 
        worksheets[workbook.SheetNames[0]][i]['Дата утверждения'] = SSF.format('dd', worksheets[workbook.SheetNames[0]][i]['Дата утверждения']) + '.' + SSF.format('mm', worksheets[workbook.SheetNames[0]][i]['Дата утверждения']) + '.' + SSF.format('yyyy', worksheets[workbook.SheetNames[0]][i]['Дата утверждения']) + 'г.';
    if (worksheets[workbook.SheetNames[0]][i]['Дата ввода в действие'] != '-')
        worksheets[workbook.SheetNames[0]][i]['Дата ввода в действие'] = SSF.format('dd', worksheets[workbook.SheetNames[0]][i]['Дата ввода в действие']) + '.' + SSF.format('mm', worksheets[workbook.SheetNames[0]][i]['Дата ввода в действие']) + '.' + SSF.format('yyyy', worksheets[workbook.SheetNames[0]][i]['Дата ввода в действие']) + 'г.';
    if (worksheets[workbook.SheetNames[0]][i]['Дата отмены действия'] != '-')
        worksheets[workbook.SheetNames[0]][i]['Дата отмены действия'] = SSF.format('dd', worksheets[workbook.SheetNames[0]][i]['Дата отмены действия']) + '.' + SSF.format('mm', worksheets[workbook.SheetNames[0]][i]['Дата отмены действия']) + '.' + SSF.format('yyyy', worksheets[workbook.SheetNames[0]][i]['Дата отмены действия']) + 'г.';
    //console.log(worksheets[workbook.SheetNames[0]][i]['Дата утверждения']);
    //console.log(worksheets[workbook.SheetNames[0]][i]['Дата ввода в действие']);
    //console.log(worksheets[workbook.SheetNames[0]][i]['Дата отмены действия']);
    //console.log('----------------');
    if (i == 1609) console.log(worksheets[workbook.SheetNames[0]][i]['Обозначение НД']);
}


/*const sequelize = new Sequelize(
  'reestr',
  'rush',
  'beeline5',
  {
    dialect: 'mariadb',
    host: '127.0.0.1',
  }
);*/
const sequelize = new Sequelize(
  'reestr',
  'login',
  'password',
  {
    dialect: 'mariadb',
    host: 'localhost',
    port: 3306,
    pool: {
            max: 5,
            min:0,
            idle: 20000,
            acquire: 20000
    },
    dialectOptions: {
            connectTimeout: 60000
    }
  }
);
//sequelize
//  .close()
//  .then(() => console.log('Closed.'))
//  .catch((err) =>
//    console.error('Close connection error: ', err)
//  )
//(async () => {
//    try {
//      await sequelize.authenticate();
//      console.log('Connection has been established successfully.');
//    } catch (error) {
//      console.error('Unable to connect to the database:', error);
//    };
//})();

//создание новой записи, если передать неполную модель, то недостающие поля будут null

class Ntd extends Sequelize.Model {}

Ntd.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    numberN: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    date_utv: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    date_vvod: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    old: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    inf: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    date_otm: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    obl: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'ntd' }
);

sequelize.sync().catch(err=> console.log(err));


//sequelize.close().then(() => console.log('Closed.'));
//sequelize.ntds.findAll()

for (let i = 0; i < 1610; i++) {
    Ntd
        .create({
        numberN: worksheets[workbook.SheetNames[0]][i]['Обозначение НД'],
        name: worksheets[workbook.SheetNames[0]][i]['Наименование НД'],
        date_utv: worksheets[workbook.SheetNames[0]][i]['Дата утверждения'],
        date_vvod: worksheets[workbook.SheetNames[0]][i]['Дата ввода в действие'],
        old: worksheets[workbook.SheetNames[0]][i]['Преемственность НД'],
        inf: worksheets[workbook.SheetNames[0]][i]['Сведения об изменениях'],
        date_otm: worksheets[workbook.SheetNames[0]][i]['Дата отмены действия'],
        obl: worksheets[workbook.SheetNames[0]][i]['Область распространения'],
        })
    .then((record) => console.log(record));
};

//numberN text, name text, date_utv text, date_vvod text, old text, inf text, date_otm text, obl text,
//sequelize.close().then(() => console.log('Closed.'));
