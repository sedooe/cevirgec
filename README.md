# Cevirgec

Personal Vocabulary Trainer

# Run the App on Development

Run these two commands simultaneously in different console tabs.

  $ npm run hot-server
  $ npm run start-hot

or run two servers with one command

  $ npm run dev


# Development Installation

## sqlite3 problem

  Error: Please install sqlite3 package manually
      at new ConnectionManager (/home/sedat/Desktop/projects/cevirgec-rewrite/node_modules/sequelize/lib/dialects/sqlite/connection-manager.js:25:13)
      at new SqliteDialect (/home/sedat/Desktop/projects/cevirgec-rewrite/node_modules/sequelize/lib/dialects/sqlite/index.js:12:28)
      at new Sequelize (/home/sedat/Desktop/projects/cevirgec-rewrite/node_modules/sequelize/lib/sequelize.js:233:18)
      at Object.<anonymous> (/home/sedat/Desktop/projects/cevirgec-rewrite/backend/Sequelize.js:12:19)
      at Module._compile (module.js:556:32)
      at loader (/home/sedat/Desktop/projects/cevirgec-rewrite/node_modules/babel-register/lib/node.js:144:5)
      at Object.require.extensions.(anonymous function) [as .js] (/home/sedat/Desktop/projects/cevirgec-rewrite/node_modules/babel-register/lib/node.js:154:7)
      at Module.load (module.js:473:32)
      at tryModuleLoad (module.js:432:12)
      at Function.Module._load (module.js:424:3)
      at Module.require (module.js:483:17)
      at require (internal/module.js:20:19)
      at Object.<anonymous> (/home/sedat/Desktop/projects/cevirgec-rewrite/backend/model/User.js:9:17)
      at Module._compile (module.js:556:32)
      at loader (/home/sedat/Desktop/projects/cevirgec-rewrite/node_modules/babel-register/lib/node.js:144:5)
      at Object.require.extensions.(anonymous function) [as .js] (/home/sedat/Desktop/projects/cevirgec-rewrite/node_modules/babel-register/lib/node.js:154:7)
      at Module.load (module.js:473:32)
      at tryModuleLoad (module.js:432:12)
      at Function.Module._load (module.js:424:3)
      at Module.require (module.js:483:17)
      at require (internal/module.js:20:19)
      at Object.<anonymous> (/home/sedat/Desktop/projects/cevirgec-rewrite/backend/dao/UserDao.js:9:14)


Solution: http://electron.atom.io/docs/tutorial/using-native-node-modules/ -- 15.10.2016
