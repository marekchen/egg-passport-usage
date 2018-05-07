'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  router.get('/', controller.home.index);
  router.get('/passport/success', controller.passport.success);
  router.post('/passport/register', controller.passport.register);

  const localStrategy = app.passport.authenticate('local', {
    successRedirect: '/passport/success',
  });
  app.router.post('/passport/local', localStrategy);

  const weiboToken = app.passport.authenticate('weibo-token', {
    successRedirect: '/passport/success',
  });
  router.get('/passport/weibo-token', weiboToken);

  const weixinToken = app.passport.authenticate('weixin-token', {
    successRedirect: '/passport/success',
  });
  router.get('/passport/weixin-token', weixinToken);

  app.router.get('/logout', 'user.logout');
};