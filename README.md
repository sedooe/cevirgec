# Cevirgec

Personal Vocabulary Trainer

# Run the App on Development

Enable debug output:

	export DEBUG=*,-babel

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

Solution:

	./node_modules/.bin/electron-rebuild

http://electron.atom.io/docs/tutorial/using-native-node-modules/ -- 15.10.2016

# Development Notes

Following this advice: https://twitter.com/dan_abramov/status/790581793397305345

# Boilerplate Repo

https://github.com/chentsulin/electron-react-boilerplate

We forked at https://github.com/chentsulin/electron-react-boilerplate/tree/84e04776701c5fd71b8bac876899d1c9cfdb5b20.

# License

You can use this program free of charge.

Cevirgec  Copyright (C) 2015  Kod Gemisi Ltd. <foss@kodgemisi.com>
This program comes with ABSOLUTELY NO WARRANTY; for details type see LICENSE file.
This is free software, and you are welcome to redistribute it
under certain conditions; see LICENSE file for details.

GNU GPL v3 https://www.gnu.org/licenses/gpl-3.0.en.html
