/**
 * Request group facebook feed.
 */

const chalk = require('chalk');
const _ = require('lodash');
const request = require('request');
const moment = require('moment');
const fs = require('fs');

const warning = chalk.yellow;
const success = chalk.bold.green;
const datestamp = moment().format('YYYYMMDD:HH:mm:ss');
const host = 'https://graph.facebook.com'
const q = 'fields=message,updated_time,id,comments{created_time,from{id},message,id,likes{id},comments{created_time,from{id},message,id,likes{id},comments{created_time,from{id},message,id,likes{id}}}},from{id},link,caption,created_time,likes{id}&limit=100';

let program = {};
let posts = [];

function createJSON() {
  const filename = _.isBoolean(program.download)
    ? `posts-${datestamp}.json`
    : program.download;

  fs.writeFile(
    `downloads/${filename}`,
    JSON.stringify(posts, null, 2),
    err => {
      if (err) return err;

      console.log(success('%s created.'), filename);
    });
}

function creatUrl(program) {
  const { group, token } = program;

  return `${host}/${group}/feed?${q}&access_token=${token}`;
}

function getFeed(url) {
  request(url, (error, response, body) => {
    const posts = JSON.parse(body);

    if (error) {
      console.error(error);

      process.exit();
    }
    else if (posts.error) {
      console.error(posts.error);
      process.exit();
    }

    update(posts.feed ? posts.feed : posts);
  });
}

function update(feed) {
  const { data } = feed;

  posts.push(...data);

  console.log(success('posts updated: %s'), posts.length);

  const { paging } = feed;

  if (paging && paging.next) {
    console.log(warning('requesting next page: %s'), paging.next);
    getFeed(paging.next);
  }
  else {
    createJSON();
  }
}

module.exports = p => {
  program = p;

  getFeed(creatUrl(program));
}
