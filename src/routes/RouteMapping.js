'use strict';
/**
 * 這裡做route的Mapping
 * @path: url
 * @enable: 代表要不要載入這個url
 * @method: 就是htttp的method
 * @prefix: 連動到{@service}
 * @modules: 會自動去讀取src/service/{@prefix}/Controller 資料夾內的目標資料夾內的Controller.js檔案
 * @beforeHandler: 會自動去爬src/beforeHandler 資料夾內指定的函數如果要預先做特殊處理可以在這裡先指定,會結合內部的beforeHandler
*/
exports.v1 = [
    { path: '/test/test', enable: true, method: 'GET', module: 'test/test', endpoint: 'test', beforeHandler: [] },
    { path: '/q/q', enable: true, method: 'GET', module: 'q/q', endpoint: 'q', beforeHandler: [] },
];
// exports.v2 = [
//     {path: '/example', enable: true, method: 'GET', module: 'test/example', endpoint: 'test', beforeHandler: []},
// ];
