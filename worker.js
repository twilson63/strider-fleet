var _ = require('underscore');

function shellCommand(config) {
  console.log(config);
  var command = _.template([
      "fleet remote add default --hub=<%= env.hub %> --secret=<%= env.secret %>",
      "<% _(env).each(function(value, key) { %>",
      "fleet remote set default --env.<%= key.toUpperCase() %>=<%= value %>",
      "<% }); %>",
      "fleet deploy",
      "fleet exec --drone=* -- npm install --production",
      "fleet exec --drone=* -- forever stop <%= env.app %>",
      "fleet exec --drone=* -- forever start -l /var/log/<%= env.app %>.log" +
      " --uid=<%= env.app.split('@')[0] %> -a -c shoreman <%= env.script %>"
    ].join('\n'))({ env: config })
  return {
    command: 'sh',
    args: ['-x', '-c', command]
  }
}

module.exports = {
  init: function (config, job, context, done) {
    done(null, {
      deploy: shellCommand(config)
    });
  }
};
