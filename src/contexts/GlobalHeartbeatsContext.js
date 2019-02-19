'use strict';

const heartbeats = require('heartbeats');

/**
 * 創建全局心跳, 叫做GHeartbeats
 * 預設一秒
 * @static
 * @param {number} number
 * @return {string[]}
 * @memberof GHeartbeats
 */
exports.initializeGlobalHeartbeats = (number = 1000) => {
    return heartbeats.createHeart(number, 'GHeartbeats');
};

/**
 * 取得所有已經創建的心跳
 * @static
 * @return {string[]}
 * @memberof GHeartbeats
 */
exports.getAllHeartbeats = () => {
    return heartbeats.hearts;
};

/**
 * 用名字取得心跳
 * @static
 * @param {string} name
 * @return {*}
 * @memberof GHeartbeats
 */
exports.getHeartbeatByName = (name) => {
    return heartbeats.heart(name);
};

/**
 * 取得目前為止這棵心跳的年齡
 *
 * @static
 * @param {string} name
 * @return {*}
 * @memberof GHeartbeats
 */
exports.getHeartbeatAge = (name) => {
    return heartbeats.heart(name).age;
};

/**
 * 創造GHeartbeats心跳下一個Pulse可以計算時間距離
 * 使用missedBeats()可以計算出, 當時創造時到目前為止經過的時間(秒)
 * 使用lag() 可以取得真正的時間間隔
 * 使用beat() 可以跟當前心跳同步
 * 使用kill() 刪除這個flag
 * @static
 * @param {string} pulseName
 * @return {
 *         kill: () => void,
 *         beat: () => void,
 *         missedBeats: number,
 *         lag: number
 *        }
 * @memberof GHeartbeats
 */
exports.createPulse = (pulseName) => {
    return heartbeats.heart('GHeartbeats').createPulse(pulseName);
};

/**
 * 刪除GHeartbeats下指定的pulse
 *
 * @static
 * @param {string} pulseName
 * @returns
 * @memberof GHeartbeats
 */
exports.killPulse = (pulseName) => {
    return heartbeats.heart('GHeartbeats').pulse(pulseName);
};

/**
 * 創造一個循環執行的函數(匿名隨機配名)
 * @static
 * @param {number} beatInterval 執行的間隔,單位是秒
 * @param {number} options 執行的次數,如果輸入0就不會停下來
 * @param {(count: number, last: boolean) => any} fun callback的函數
 * 第一個參數是目前已經第幾次,
 * 第二個參數是給予判斷是不是最後一次, 如果options填入0, 那就永遠都不會是true
 * @returns {{ kill: () => never }} 回傳的event可以選擇使用kill()殺死
 * @memberof GHeartbeats
 */
exports.createEvent = (beatInterval, options, fun) => {
    return heartbeats.heart('GHeartbeats').createEvent(beatInterval,
            { countTo: options}, (count, last) => {
                fun(count, last);
            });
};

/**
 * 創造一個循環執行的非同步函數(匿名隨機配名)
 * @static
 * @param {number} beatInterval 執行的間隔,單位是秒
 * @param {number} options 執行的次數,如果輸入0就不會停下來
 * @param {(count: number, last: boolean) => any} fun callback的函數
 * 第一個參數是目前已經第幾次,
 * 第二個參數是給予判斷是不是最後一次, 如果options填入0, 那就永遠都不會是true
 * @returns {{ kill: () => never }} 回傳的event可以選擇使用kill()殺死
 * @memberof GHeartbeats
 */
exports.createEventAsync = (beatInterval, options, fun) => {
    return heartbeats.heart('GHeartbeats').createEvent(beatInterval,
            { countTo: options}, async (count, last) => {
                await fun(count, last);
            });
};

/**
 * 創造一個循環執行的函數(可以取名)
 * @static
 * @param {string } [eventName] 賦予它一個名字
 * @param {number} beatInterval 執行的間隔,單位是秒
 * @param {number} options 執行的次數,如果輸入0就不會停下來
 * @param {(count: number, last: boolean) => any} fun callback的函數
 * 第一個參數是目前已經第幾次,
 * 第二個參數是給予判斷是不是最後一次, 如果options填入0, 那就永遠都不會是true
 * @returns {{ kill: () => never }} 回傳的event可以選擇使用kill()殺死
 * @memberof GHeartbeats
 */
exports.createEventWithName = (name, beatInterval, options, fun) => {
    return heartbeats.heart('GHeartbeats').createEvent(beatInterval,
            { countTo: options, name}, (count, last) => {
                fun(count, last);
            });
};
