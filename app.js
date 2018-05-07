'use strict';

const assert = require('assert');

module.exports = app => {
  if (app.config.env === 'local') {
    app.beforeStart(function* () {
      yield app.model.sync({
        // force: true,
      });
    });
  }
  app.passport.verify(async (ctx, user) => {
    // 检查用户
    assert(user.provider, 'user.provider should exists');
    if (ctx.isAuthenticated()) {
      let myUser;
      if (ctx.query && ctx.query.action) {
        const action = ctx.query.action;
        if (action === 'bind') {
          myUser = await ctx.service.user.bind(ctx.user.id, user);
          return myUser;
        }
      }
      myUser = await ctx.model.User.findOne({
        include: ['authorizations'],
        where: {
          id: ctx.user.id,
        },
      });
      return myUser;
    }
    if (user.provider === 'local') {
      const existsUser = await ctx.model.User.findOne({
        include: ['authorizations'],
        where: {
          user_name: user.username,
        },
      });
      if (existsUser) {
        if (existsUser.password === user.password) {
          return existsUser;
        }
        return null;
      }
    }
    const auth = await ctx.model.Authorization.findOne({
      where: {
        uid: user.id,
        provider: user.provider,
      },
    });
    if (auth) {
      const existsUser = await ctx.model.User.findOne({
        include: ['authorizations'],
        where: {
          id: auth.user_id,
        },
      });
      if (existsUser) {
        ctx.logger.warn('existsUser:' + JSON.stringify(existsUser));
        return existsUser;
      }
    }
    // 调用 service 注册新用户
    const newUser = await ctx.service.user.register(user);
    ctx.logger.warn('newUser:' + JSON.stringify(newUser));
    return newUser;
  });

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
    const myUser = JSON.stringify(user);
    return myUser;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
    const myUser = JSON.parse(user);
    const existsUser = await ctx.model.User.findOne({
      include: ['authorizations'],
      where: {
        id: myUser.id,
      },
    });
    return existsUser;
  });
};