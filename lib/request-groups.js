/**
 * Request list of group ids.
 */

const request = require('request');
const _ = require('lodash');
const chalk = require('chalk');

const error = chalk.red.bold;

const host = 'https://graph.facebook.com';

module.exports = p => {
  const { token } = p;
  const url = `${host}/me/groups?access_token=${token}`;

  request(url, (error, response, body) => {
    const list = JSON.parse(body);

    if (error) {
      console.error(error(error));
      process.exit(1);
    }
    else if (list.error) {
      console.error(error(list.error));
      process.exit(1);
    }

    const formatted = list.data.map(item => ({
      [item.id]: item.name
    }));

    console.log(formatted);
  });
}
