'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RethinkDBMutation = exports.RethinkDBQuery = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.promise = promise;
exports.connect = connect;

var _rethinkdbdash = require('rethinkdbdash');

var _rethinkdbdash2 = _interopRequireDefault(_rethinkdbdash);

var _classAutobind = require('class-autobind');

var _classAutobind2 = _interopRequireDefault(_classAutobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function promise(fn) {
  return new Promise(function (resolve, reject) {
    return fn(resolve, reject);
  });
}

function connect(options) {
  return (0, _rethinkdbdash2.default)(options);
}

var RethinkDBQuery = exports.RethinkDBQuery = function () {
  function RethinkDBQuery() {
    _classCallCheck(this, RethinkDBQuery);

    (0, _classAutobind2.default)(this);
  }

  _createClass(RethinkDBQuery, [{
    key: 'resolve',
    value: function resolve(params) {
      return Array.isArray(params.args) ? this.findManyById(_extends({}, params, { args: { id: params.args } })) : this.findById(params);
    }
  }, {
    key: 'findAll',
    value: function findAll(_ref) {
      var args = _ref.args,
          databases = _ref.databases,
          models = _ref.models;

      var r = databases.rethinkdb;
      var TABLE = this.table;
      return promise(function (resolve, reject) {
        r.table(TABLE).run().then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'findById',
    value: function findById(_ref2) {
      var query = _ref2.query,
          args = _ref2.args,
          databases = _ref2.databases,
          models = _ref2.models;

      var r = databases.rethinkdb;
      var obj = args || query;
      var TABLE = this.table;

      return promise(function (resolve, reject) {
        r.table(TABLE).get(obj.id).run().then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'findManyById',
    value: function findManyById(_ref3) {
      var query = _ref3.query,
          args = _ref3.args,
          databases = _ref3.databases,
          models = _ref3.models;

      var r = databases.rethinkdb;
      var obj = args || query;
      var TABLE = this.table;

      return promise(function (resolve, reject) {
        var _r$table;

        (_r$table = r.table(TABLE)).getAll.apply(_r$table, _toConsumableArray(obj.map(function (i) {
          return i.id;
        }))).run().then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }]);

  return RethinkDBQuery;
}();

var RethinkDBMutation = exports.RethinkDBMutation = function () {
  function RethinkDBMutation() {
    _classCallCheck(this, RethinkDBMutation);

    (0, _classAutobind2.default)(this);
  }

  _createClass(RethinkDBMutation, [{
    key: 'create',
    value: function create(_ref4) {
      var args = _ref4.args,
          databases = _ref4.databases,
          models = _ref4.models;

      var r = databases.rethinkdb;
      var TABLE = this.table;

      return promise(function (resolve, reject) {
        r.table(TABLE).insert(args).run().then(function (response) {
          resolve(response);
        }).error(function (err) {
          console.log('Error occurred inserting data into tables.', err);
          reject(err);
        });
      });
    }
  }, {
    key: 'remove',
    value: function remove(_ref5) {
      var args = _ref5.args,
          databases = _ref5.databases,
          models = _ref5.models;

      var r = databases.rethinkdb;
      var id = args.id;
      var TABLE = this.table;

      return promise(function (resolve, reject) {
        r.table(TABLE).getAll(id).delete().run().then(function (response) {
          var __result = response.deleted === 1 ? 'success' : 'failed';

          resolve({ __result: __result });
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'update',
    value: function update(_ref6) {
      var args = _ref6.args,
          databases = _ref6.databases,
          models = _ref6.models;

      var r = databases.rethinkdb;
      var id = args.id;
      var TABLE = this.table;

      return promise(function (resolve, reject) {
        r.table(TABLE).get(id).update(args).run().then(function (response) {
          resolve();
        }).catch(function (error) {
          reject(error);
        });
      });
    }

    // createMany
    // deleteMany
    // removeMany
    // updateMany

  }]);

  return RethinkDBMutation;
}();
//# sourceMappingURL=rethinkdb-database.js.map