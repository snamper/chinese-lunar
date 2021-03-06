/* eslint-disable no-useless-constructor */
const AdvancedLunar = require('./AdvancedLunar');
const lunarTools = require('./tools');
const config = require('./config');
const moment = require('moment');

class ApplicationLunar extends AdvancedLunar {
  /**
   * 
   * @param {String} year 西元年 YYYY (ex: 2020, 1992)
   * @param {String} month 月 MM (ex: 01, 08, 12)
   * @param {String} day  日 DD (ex: 01, 08, 23, 28) 
   * @param {String} time 24小時制 TT (ex: 01, 03, 08, 23, 24)
   * @param {String} chineseAge 天干 (ex: 甲子, 丙戌, 癸亥)
   */
  constructor(year, month, day, chineseAge) {
    const {
      year: handlerYear,
      month: handlerMonth,
      day: handlerDay,
    } = lunarTools.setDate(year, month, day);

    super(handlerYear, handlerMonth, handlerDay, chineseAge);
    this.time = lunarTools.setTime();
    this.chineseTime = this.getChineseTime(lunarTools.setTime());
    this.solarTermDistance = this.getSolarTermDistance();
  }

  /**
   * 設定農曆轉公曆
   * @param {boolean} leap is true or false, the default is false
   * @returns {Object} this
   */
  lunarToSolar(leap = false) {
    const lunarPerMonthHasDays = this.getLunarPerMonthHasDays();
    const monthDay = config.lunarLeap[this.year - 1900][2];
    let day = 0;
    let month = parseInt(this.month, 10);
    if (leap) {
      month++;
    }
    for (let index = 0; index < month - 1; index++) {
      day += parseInt(lunarPerMonthHasDays[index], 10);
    }
    day += parseInt(this.day, 10) - 1;
    const yearMonthDay = moment(this.year + monthDay)
      .add(day, 'days')
      .format('YYYY-MM-DD').split('-');
    return new ApplicationLunar(yearMonthDay[0], yearMonthDay[1], yearMonthDay[2]);
  }

  /**
   * 設定天干地支年齡，能取得十神
   * @param {String} age 
   */
  setChineseAge(age) {
    this.chineseAge = age;
    this.chineseTimesTenGod = this.getChineseTimesTenGod(age);
    return this;
  }

  /**
   * 設定時間能取得時柱
   * @param {String} time 
   */
  setTime(time) {
    this.time = time;
    this.chineseTime = this.getChineseTime(time);
    return this;
  }

  /**
   * 取得時柱 十神
   * @param {String} time 
   * @param {String} chineseAge 
   * @returns {String} chineseTimeTenGod
   */
  getChineseTimeTenGod(chineseAge = this.chineseAge) {
    if (chineseAge === '請輸入年齡' || chineseAge === undefined) {
      return '請輸入年齡';
    }
    return lunarTools.findTenGod(chineseAge.split('')[0], this.chineseTime.split('')[0]);
  }

  /**
  * 取得年柱 十神
  * @param {String} chineseAge 
  * @returns {String} chineseYearTenGod
  */
  getChineseYearTenGod(chineseAge = this.chineseAge) {
    if (chineseAge === '請輸入年齡' || chineseAge === undefined) {
      return '請輸入年齡';
    }
    return lunarTools.findTenGod(chineseAge.split('')[0], this.chineseYear.split('')[0]);
  }

  /**
  * 取得月柱 十神
  * @param {String} chineseAge 
  * @returns {String} chineseMonthTenGod
  */
  getChineseMonthTenGod(chineseAge = this.chineseAge) {
    if (chineseAge === '請輸入年齡' || chineseAge === undefined) {
      return '請輸入年齡';
    }
    return lunarTools.findTenGod(chineseAge.split('')[0], this.chineseMonth.split('')[0]);
  }

  /**
   * 取得日柱 十神
   * @param {String} chineseAge 
   * @returns {String} chineseDayTenGod
   */
  getChineseDayTenGod(chineseAge = this.chineseAge) {
    if (chineseAge === '請輸入年齡' || chineseAge === undefined) {
      return '請輸入年齡';
    }
    return lunarTools.findTenGod(chineseAge.split('')[0], this.chineseDay.split('')[0]);
  }

  /**
   * 取得時柱
   * @param {String} time 01, 03, 22, 23 
   */
  getChineseTime(time = this.time) {
    if (time === '00' || time === '23') {
      return this.chineseTimes[0];
    } else if (time === '01' || time === '02') {
      return this.chineseTimes[1];
    } else if (time === '03' || time === '04') {
      return this.chineseTimes[2];
    } else if (time === '05' || time === '06') {
      return this.chineseTimes[3];
    } else if (time === '07' || time === '08') {
      return this.chineseTimes[4];
    } else if (time === '09' || time === '10') {
      return this.chineseTimes[5];
    } else if (time === '11' || time === '12') {
      return this.chineseTimes[6];
    } else if (time === '13' || time === '14') {
      return this.chineseTimes[7];
    } else if (time === '15' || time === '16') {
      return this.chineseTimes[8];
    } else if (time === '17' || time === '18') {
      return this.chineseTimes[9];
    } else if (time === '19' || time === '20') {
      return this.chineseTimes[10];
    }
    return this.chineseTimes[11];
  }

  /**
   * 取得十神
   * @param {string} chineseAge first word 
   * @param {string} decimalCycle chineseYear,chineseMonth,chineseDay,chineseTime
   * @returns {string} tenGod 傷, 食, 財, 才, 官, 殺, 印, ㄗ
   */
  getTenGod(_with, _life) {
    return lunarTools.findTenGod(_with, _life);
  }

  /**
   * 取得節氣前後資訊
   * @return {object}
   * { 
   *   previous: { 
   *     solarTerm: '春分',
   *     diffDistanceDay: 27,
   *     diffDistanceDetail: 26.50730324074074 
   *   },
   *   next: { 
   *     solarTerm: '穀雨',
   *     diffDistanceDay: 3,
   *     diffDistanceDetail: 3.948159722222222 
   *   } 
   * }
   */
  getSolarTermDistance() {
    const { previous, next } = this.parserFile;
    const previousArray = previous.split(' ');
    const nextArray = next.split(' ');

    const previousSolarTerm = previousArray[0].substring(5, 7);
    const nextSolarTerm = nextArray[0].substring(5, 7);

    const start = moment(this.year + this.month + this.day);
    const previousYYYYMMDD = previousArray[1].replace('日', '').split(/年|月/g);
    const previousHHMMSS = previousArray[2].split(/:/);
    const nextYYYYMMDD = nextArray[1].replace('日', '').split(/年|月/g);
    const nextHHMMSS = nextArray[2].split(/:/);

    const previousDay = moment(new Date(
      parseInt(previousYYYYMMDD[0], 10),
      parseInt(previousYYYYMMDD[1], 10) - 1,
      parseInt(previousYYYYMMDD[2], 10),
      parseInt(previousHHMMSS[0], 10),
      parseInt(previousHHMMSS[1], 10),
      parseInt(previousHHMMSS[2], 10),
    ));
    const preDistanceDay = previousDay.diff(start, 'hours', true);

    const nextDay = moment(new Date(
      parseInt(nextYYYYMMDD[0], 10),
      parseInt(nextYYYYMMDD[1], 10) - 1,
      parseInt(nextYYYYMMDD[2], 10),
      parseInt(nextHHMMSS[0], 10),
      parseInt(nextHHMMSS[1], 10),
      parseInt(nextHHMMSS[2], 10),
    ));
    const nextDistanceDay = nextDay.diff(start, 'hours', true);

    return {
      previous: {
        solarTerm: previousSolarTerm,
        diffDistanceDay: Math.abs(Math.floor(preDistanceDay / 24)),
        diffDistanceDetail: Math.abs(preDistanceDay / 24),
      },
      next: {
        solarTerm: nextSolarTerm,
        diffDistanceDay: Math.abs(Math.floor(nextDistanceDay / 24)),
        diffDistanceDetail: Math.abs(nextDistanceDay / 24),
      },
    };
  }

  /**
  * 取得Json格式
  */
  getJson() {
    return {
      ...super.getJson(),
      chineseTime: this.getChineseTime(),
      chineseTimeTenGod: this.getChineseTimeTenGod(),
      chineseYearTenGod: this.getChineseYearTenGod(),
      chineseMonthTenGod: this.getChineseMonthTenGod(),
      chineseDayTenGod: this.getChineseDayTenGod(),
      solarTermDistance: this.getSolarTermDistance(),
    };
  }
}

module.exports = ApplicationLunar;