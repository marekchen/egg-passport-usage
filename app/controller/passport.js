'use strict';

const Controller = require('egg').Controller;

class PassportController extends Controller {
  async register() {
    const ctx = this.ctx;
    const user = {
      username: ctx.request.body.username,
      password: ctx.request.body.password,
      provider: 'local',
    };
    await ctx.service.user.register(user);
    ctx.response.body = {
      ok: true,
    };
  }
  async success() {
    this.ctx.body = 'success';
  }
}

module.exports = PassportController;