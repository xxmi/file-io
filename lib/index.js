'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('log4js').getLogger('file-io.js');

/**
 * 读取文件
 * @param filePath 文件路径
 * @param fileName 文件名
 * @param json 是否为 json ，默认 ：false
 * @returns {*}
 */
module.exports.readFileSync = function (filePath, fileName, json = false) {
    let fullPath = path.resolve(filePath, fileName);
    let exists = fs.existsSync(fullPath);
    if (!exists) {
        logger.error(`Not exist file : ${fullPath}`);
        return new Error(`Not exist file : ${fullPath}`);
    }
    let data = fs.readFileSync(fullPath, 'utf-8');
    if (json) {
        try {
            return JSON.parse(data);
        } catch (e) {
            logger.error(`${fullPath} , not json`);
            logger.error(e);
            return new Error(`${fullPath} , not json`);
        }
    }
    return data;
};

/**
 * 写文件
 * @param filePath 文件路径
 * @param fileName 文件名
 * @param data 数据
 * @param json 是否为 JSON ，默认：false
 * @returns {*}
 */
module.exports.writeFileSync = function (filePath, fileName, data, json = false) {
    let exists = fs.existsSync(filePath);
    if (!exists) {
        logger.info(`Not exist file ${filePath}, Create ${filePath} directory `);
        fs.mkdirSync(filePath);
    }
    if (json) {
        try {
            data = JSON.stringify(data);
        } catch (e) {
            logger.error(`${data} , not json`);
            logger.error(e);
            return new Error(`${data} , not json`);
        }
    }
    fs.writeFileSync(path.resolve(filePath, fileName), data, 'utf-8');
    logger.info(`${path.resolve(filePath, fileName)} write success`);
    return true;
};