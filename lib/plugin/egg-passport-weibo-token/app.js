'use strict';

const debug = require('debug')('egg-passport-weibo-token');
const assert = require('assert');
const Strategy = require('passport-weibo-token');

module.exports = app => {
  const config = app.config.passportWeibo;
  config.passReqToCallback = true;
  assert(config.key, '[egg-passport-weibo] config.passportWeibo.key required');
  assert(config.secret, '[egg-passport-weibo] config.passportWeibo.secret required');
  config.clientID = config.key;
  config.clientSecret = config.secret;
  app.passport.use(new Strategy(config, (req, accessToken, refreshToken, profile, done) => {
    const user = {
      provider: 'weibo',
      id: profile.id,
      name: profile._json && profile._json.name,
      displayName: profile.displayName,
      photo: profile._json && profile._json.avatar_hd && profile._json.avatar_hd.replace('http://', 'https://'),
      accessToken,
      refreshToken,
      profile,
    };
    debug('%s %s get user: %j', req.method, req.url, user);

    // let passport do verify and call verify hook
    app.passport.doVerify(req, user, done);
  }));
};
