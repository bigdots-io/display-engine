var assert = require('assert');
var DotGenerator = require('../../../dot-generator/index');

describe('Generating dots from image', function() {

  var dotGenerator = new DotGenerator();

  describe('from url', function() {
    it('should render an image', function(done) {
      dotGenerator.image('./test/fixtures/image/green-ball.png', {
        onSuccess: (dots) => {
          assert.deepEqual(require('./fixtures/image/png'), dots)
          done();
        }
      });
    });

    it('should render an animated image', function(done) {
      dotGenerator.image('./test/fixtures/image/icon-laugh.gif', {
        onSuccess: (dots) => {
          assert.deepEqual(require('./fixtures/image/animated-gif'), dots)
          done();
        }
      });
    });
  });
});
