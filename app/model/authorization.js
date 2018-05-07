'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const Authorization = app.model.define('authorization', {
    id: { // 自增长id，主键，整形
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { //
      type: Sequelize.STRING(24),
      allowNull: false,
    },
    provider: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    uid: {
      type: Sequelize.STRING(24),
      allowNull: false,
      unique: true,
    },
  });

  return Authorization;
};
