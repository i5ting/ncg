assert = require('chai').assert
expect = require('chai').expect
require('chai').should()
model = require('../models/index')
User = require('../models/index').UserModel
# mongoose config
mongoose = require('mongoose')
connectionString = 'mongomodels://127.0.0.1:17017/guojiang'

options =
  models:
    native_parser: true
  server:
    auto_reconnect: true
    poolSize: 5
  # replset: rs_name: 'myReplicaSetName'
  user: 'guojia'
  pass: 'guojia.ng'

mongoose.connect connectionString, options, (err, res) ->
  if err
    console.log('[mongoose log] Error to: ' + connectionString + '. ' + err)
  else
    console.log('[mongoose log] Successfully connected to: ' + connectionString)

models = mongoose.connection
models.on 'error', console.error.bind(console, 'mongoose connection error:')
models.once 'open', () ->
  # yay!
console.log('mongoose open success')

testUser = new User
  username: 'sang_test4'
  password: 'Password123'
  

describe 'UserModel', () ->
  before () ->
    # runs before all tests in this block
    # User.remove {}, (err)->
    # testUser = new User
  #     username: 'default_user',
  #     password: 'Password123'
  #   testUser.save (err,user) ->
  #     if err
  #       throw err
  #     else
  #       console.log 'add mock data default_user ok'

  after () ->
    # runs after all tests in this block

  beforeEach () ->
    # runs before each test in this block

  afterEach () ->
    # runs after each test in this block

  describe '#test()', () ->
    it 'should return sang_test2 when user save', (done) ->
      
      testUser.save (err, user) ->
        if err
          throw err
        else
          assert.equal(user.username, 'sang_test4')
          done()
  describe '#finmodelsyName()', () ->
    it 'should return sang_test2 when user finmodelsyName()', (done) ->
      testUser.find_by_name (err, users) ->
        # console.dir users
        if err
          throw err
        else
          assert.equal(users[0].username, 'sang_test4')
          done()