'uses strict';

const config = require('./config/index');
const program = require('commander');
const { version } = require('./package.json');
const has = require('lodash.has');
const Log4js = require('log4js');
const MongoConnection = require('./infra/mongo');

if (has(config, 'logging')) {
  Log4js.configure(config.logging);
  global.logger = Log4js.getLogger();;
}

function increaseVerbosity(v, total) {
  return total + 1;
}

program
  .version(version)
  .option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
  .option('-l, --log', 'Log to a file')
  .description('Polls BBB Commands');

program
  .command('populate:db')
  .description('Populate DB People and Polls')
  .option('--drop', 'Drop collections before inserting')

  // function to execute when command is uses
  .action(async function populateDB(options) {
    logger.info('Starting')

    const conn = await MongoConnection(global.logger, config.db);
    const db = conn.db(config.db.dbName);

    if (options.drop) {
      logger.info('dropping')
      await Promise.all([
        db.collection('person').deleteMany({}),
        db.collection('polls').deleteMany({})
      ]);
    }

    logger.info('Inserting person and polls');
    await Promise.all([
      db.collection('person').insertMany(require('./infra/db-seed/person.json')),
      db.collection('polls').insertMany(require('./infra/db-seed/polls.json'))
    ]);

    logger.info('Creating indexes');
    await db.collection("person").createIndex({ "$**": "text", "name": 1 })

    logger.info('Done.');
  });

// allow commander to parse `process.argv`
program.parse(process.argv);
