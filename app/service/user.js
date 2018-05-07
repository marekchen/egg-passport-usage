'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async find(uid) {
    const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    return user;
  }

  async unbind(provider, user_id) {
    return await this.ctx.model.Authorization.delete({
      user_id,
      provider,
    });
  }

  async bind(user_id, user) {
    return await this.ctx.model.Authorization.create({
      user_id,
      provider: user.provider,
      uid: user.id,
    }).then(() => {
      return this.ctx.model.User.findOne({
        include: ['authorizations'],
        where: {
          id: user_id,
        },
      });
    });
  }

  async register(user) {
    const sequelize = this.app.model;
    if (user.provider === 'local') {
      return await this.ctx.model.User.create({
        user_name: user.username,
        nick_name: user.username,
        password: user.password,
      });
    }
    let user_id;
    return await sequelize.transaction(t => {
      return this.ctx.model.User.create({
        user_name: `${user.provider}_${user.name}`,
        nick_name: user.displayName,
        avatar: user.photo,
      }, {
        transaction: t,
      }).then(db_user => {
        user_id = db_user.id;
        return this.ctx.model.Authorization.create({
          user_id: db_user.id,
          provider: user.provider,
          uid: user.id,
        }, {
          transaction: t,
        });
      });
    }).then(() => {
      return this.ctx.model.User.findOne({
        include: ['authorizations'],
        where: {
          id: user_id,
        },
      });
    });
  }
}

module.exports = UserService;