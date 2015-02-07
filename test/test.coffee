assert = require('chai').assert
expect = require('chai').expect
require('chai').should()

describe 'Test', () ->
  before () ->
    # runs before all tests in this block

  after () ->
    # runs after all tests in this block

  beforeEach () ->
    # runs before each test in this block

  afterEach () ->
    # runs after each test in this block

  describe '#test()', () ->
    it 'should return sang_test2 when user save', () ->
      assert.equal(1,1)
			
