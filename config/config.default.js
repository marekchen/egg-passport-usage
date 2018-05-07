'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525656477708_7114';

  // add your config here
  config.middleware = [];

  exports.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'platform-management',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'havehave',
  };

  config.security = {
    csrf: {
      ignore: '/passport',
    },
  };

  config.passportWeibo = {
    key: '948975021',
    secret: '91dbe522054ba8d4c02b1e3ac72799a9',
  };

  config.passportQq = {
    key: '101435528',
    secret: '4816da96391b0172acba031645e2a475',
  };

  config.passportWeixin = {
    key: 'wx91dba24c246fd144',
    secret: 'afe85b6a805bc9da0197d874687f2db8',
  };

  config.passportWeiXin = {
    clientID: 'wx91dba24c246fd144',
    secret: 'afe85b6a805bc9da0197d874687f2db8',
    callbackURL: '/auth/weixin/callback',
    scope: 'snsapi_userinfo',
  };

  return config;
};