'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const User = app.model.define('user', {
    id: { // 自增长id，主键，整形
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: { // 用户名
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: { // 密码，sha256加密
      type: Sequelize.STRING(24),
    },
    role: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    enabled: { // 是否禁用
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    phoneNum: {
      type: Sequelize.STRING(24),
    },
    email: {
      type: Sequelize.STRING(24),
    },
    sex: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    nick_name: { // 昵称
      type: Sequelize.STRING(24),
    },
    avatar: { // 用户头像
      type: Sequelize.STRING(24),
    },
  });

  User.associate = function() {
    app.model.User.hasMany(app.model.Authorization, { as: 'authorizations' });
  };

  return User;
};
