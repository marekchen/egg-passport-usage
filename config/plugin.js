'use strict';

// had enabled by egg
// exports.static = true;

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};

exports.passportWeibo = {
  enable: true,
  package: 'egg-passport-weibo',
};

exports.passportWeixin = {
  enable: true,
  package: 'egg-passport-weixin',
};

const path = require('path');
exports.passportWeiboToken = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-passport-weibo-token'),
};

exports.passportWeixinToken = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-passport-weixin-token'),
};
