'use strict';

const debug = require('debug')('egg-passport-weixin-token');
const assert = require('assert');
const Strategy = require('passport-weixin');

module.exports = app => {
  const config = app.config.passportWeixin;
  config.passReqToCallback = true;
  assert(config.key, '[egg-passport-weixin] config.passportWeiXin.key required');
  assert(config.secret, '[egg-passport-weixin] config.passportWeiXin.secret required');
  config.clientID = config.key;
  config.clientSecret = config.secret;

  app.passport.use('weixin-token', new Strategy(config, (req, accessToken, refreshToken, params, profile, done) => {
    const user = {
      provider: 'weixin',
      id: profile.id,
      name: profile.username,
      displayName: profile.displayName,
      photo: profile.photos && profile.photos[0] && profile.photos[0].value,
      accessToken,
      refreshToken,
      params,
      profile,
    };
    debug('%s %s get user: %j', req.method, req.url, user);

    // let passport do verify and call verify hook
    app.passport.doVerify(req, user, done);
  }));
};
