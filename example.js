/* eslint-disable no-unused-expressions */
let lunar;
process.env.DEV === 'true' ? lunar = require('./index') : lunar = require('./main');

const data = lunar(
  '2019', '07', '07'
)
  // .setChineseAge('壬子')
  .getSolarTermDistance();
// // console.log(`年=> ${data.chineseYear}, 十神=> ${data.chineseYearTenGod}`); // 年=> 辛丑, 十神=> 印
// // console.log(`月=> ${data.chineseMonth}, 十神=> ${data.chineseMonthTenGod}`); // 月=> 庚寅, 十神=> ㄗ
// // console.log(`日=> ${data.chineseDay}, 十神=> ${data.chineseDayTenGod}`); // 日=> 壬辰, 十神=> 比
// // console.log(`時=> ${data.chineseTime}, 十神=> ${data.chineseTimeTenGod}`); // 時=> 庚子, 十神=> ㄗ
// console.log(`農曆月=> ${data.lunarMonth}, 農曆日=> ${data.lunarDay}`);
// console.log(`國曆月=> ${data.month}, 國曆日=> ${data.day}`);
console.log(data);
// DEV
// const lunar = require('./index');

// console.log(lunar().getJson());｀