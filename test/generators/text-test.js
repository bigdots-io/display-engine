var assert = require('assert');
var DotGenerator = require('../../../dot-generator/index');
var fs = require('fs');

function updateFixture(fileName, result) {
  fs.writeFile(`./test/fixtures/text/${fileName}.json`, JSON.stringify(result, null, 2), 'utf-8');
}

var refreshFixtures = false;

describe('Generating dots from text', function() {

  var dotGenerator = new DotGenerator();

  describe('text formatting', function() {
    var textOptions = {
      text: 'HI ROY',
      font: 'system-6',
      color: '#FFFFFF',
      alignment: 'left'
    };

    it('renders a space between words when appropiate', function() {
      var result = dotGenerator.text(textOptions),
          fixtureName = 'spaces-between-words';

      if(refreshFixtures) {
        updateFixture(fixtureName, result);
        assert.equal(true, false)
      } else {
        assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
      }
    });

    it('renders text with letter spacing size', function() {
      textOptions.spaceBetweenLetters = 2;

      var result = dotGenerator.text(textOptions),
          fixtureName = 'spaces-between-letters';

      if(refreshFixtures) {
        updateFixture(fixtureName, result);
        assert.equal(true, false)
      } else {
        assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
      }
    });
  });

  describe('setting colors', function() {
    var textOptions = {
      text: 'HI',
      font: 'system-6',
      color: '#FFFFFF',
      alignment: 'left'
    };

    it('renders the supplied text color', function() {
      textOptions.color = '#ff0000';

      var result = dotGenerator.text(textOptions),
          fixtureName = 'text-color';

      if(refreshFixtures) {
        updateFixture(fixtureName, result);
        assert.equal(true, false)
      } else {
        assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
      }
    });

    it('renders the supplied background color', function() {
      textOptions.backgroundColor = '#ff0000';
      textOptions.color = '#FFFFFF';

      var result = dotGenerator.text(textOptions),
          fixtureName = 'background-color';

      if(refreshFixtures) {
        updateFixture(fixtureName, result);
        assert.equal(true, false)
      } else {
        assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
      }
    });
  });

  describe('setting fixed dimensions', function() {
    var textOptions = {
      text: 'HI',
      font: 'system-6',
      color: '#FFFFFF',
      alignment: 'left'
    };

    it('honors the height and cuts off text if necessary', function() {
      textOptions.height = 4;

      var result = dotGenerator.text(textOptions),
          fixtureName = 'fixed-height';

      if(refreshFixtures) {
        updateFixture(fixtureName, result);
        assert.equal(true, false)
      } else {
        assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
      }
    });

    // TODO: Fix!
    // it('honors the width and cuts off text if necessary', function() {
    //   textOptions.width = 6;
    //
    //   var result = dotGenerator.text(textOptions),
    //       fixtureName = 'fixed-width';
    //
    //   if(refreshFixtures) {
    //     updateFixture(fixtureName, result);
    //     assert.equal(true, false)
    //   } else {
    //     assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
    //   }
    // });
  });

  describe('text alignment', function() {
    var textOptions = {
      text: 'HI',
      width: 30,
      font: 'system-6',
      color: '#FFFFFF',
      alignment: 'left'
    };

    it('returns left aligned text', function() {
      textOptions.alignment = 'left';

      var result = dotGenerator.text(textOptions),
          fixtureName = 'left-aligned';

      if(refreshFixtures) {
        updateFixture(fixtureName, result);
        assert.equal(true, false)
      } else {
        assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
      }
    });

    it('returns right aligned text', function() {
      textOptions.alignment = 'right';

      var result = dotGenerator.text(textOptions),
          fixtureName = 'right-aligned';

      if(refreshFixtures) {
        updateFixture(fixtureName, result);
        assert.equal(true, false)
      } else {
        assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
      }
    });

    it('returns center aligned text', function() {
      textOptions.alignment = 'center';

      var result = dotGenerator.text(textOptions),
          fixtureName = 'center-aligned';

      if(refreshFixtures) {
        updateFixture(fixtureName, result);
        assert.equal(true, false)
      } else {
        assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
      }
    });
  });

  describe('positioning the textbox', function() {
    var textOptions = {
      text: 'HI',
      width: 20,
      font: 'system-6',
      color: '#FFFFFF',
      alignment: 'left'
    };

    it('defaults to coordinate 0,0', function() {
      textOptions.alignment = 'left';

      var result = dotGenerator.text(textOptions),
          fixtureName = 'default-offset';

      if(refreshFixtures) {
        updateFixture(fixtureName, result);
        assert.equal(true, false)
      } else {
        assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
      }
    });

    it('returns offset text to the starting row and column', function() {
      textOptions.startingRow = 3;
      textOptions.startingColumn = 5;

      var result = dotGenerator.text(textOptions),
          fixtureName = 'custom-offset';

      if(refreshFixtures) {
        updateFixture(fixtureName, result);
        assert.equal(true, false)
      } else {
        assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
      }
    });

    it('returns an offset background color when supplied', function() {
      textOptions.backgroundColor = '#ff0000';
      textOptions.color = '#FFFFFF';
      textOptions.startingRow = 3;
      textOptions.startingColumn = 5;

      var result = dotGenerator.text(textOptions),
          fixtureName = 'offset-background-color';

      if(refreshFixtures) {
        updateFixture(fixtureName, result);
        assert.equal(true, false)
      } else {
        assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
      }
    });
  });

  describe('text wrapping', function() {
    var textOptions = {
      text: 'HI ROY',
      width: 21,
      font: 'system-6',
      color: '#FFFFFF'
    };

    describe('when set left align', function() {
      beforeEach(function() {
        textOptions.wrap = 'wrap';
        textOptions.alignment = 'left';
      });

      it('returns wrapped text left aligned', function() {
        var result = dotGenerator.text(textOptions),
            fixtureName = 'wrapped-left-aligned';

        if(refreshFixtures) {
          updateFixture(fixtureName, result);
          assert.equal(true, false)
        } else {
          assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
        }
      });
    });

    describe('when set to right align', function() {
      beforeEach(function() {
        textOptions.wrap = 'wrap';
        textOptions.alignment = 'right';
      });

      it('returns wrapped text right aligned', function() {
        var result = dotGenerator.text(textOptions),
            fixtureName = 'wrapped-right-aligned';

        if(refreshFixtures) {
          updateFixture(fixtureName, result);
          assert.equal(true, false)
        } else {
          assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
        }
      });
    });

    describe('when set to center align', function() {
      beforeEach(function() {
        textOptions.wrap = 'wrap';
        textOptions.alignment = 'center';
      });

      it('returns wrapped text center aligned', function() {
        var result = dotGenerator.text(textOptions),
            fixtureName = 'wrapped-center-aligned';

        if(refreshFixtures) {
          updateFixture(fixtureName, result);
          assert.equal(true, false)
        } else {
          assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
        }
      });
    });

    describe('when a word is too long for the textbox width', function() {
      beforeEach(function() {
        textOptions.wrap = 'wrap';
        textOptions.alignment = 'left';
      });

      it('returns a hypenated word across two lines', function() {
        textOptions.text = 'ROUGH';

        var result = dotGenerator.text(textOptions),
            fixtureName = 'hypenated';

        if(refreshFixtures) {
          updateFixture(fixtureName, result);
          assert.equal(true, false)
        } else {
          assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
        }
      });

      it('returns a hypenated word across as many lines as needed', function() {
        textOptions.text = 'DISHWASHER';

        var result = dotGenerator.text(textOptions),
            fixtureName = 'hypenated-multi-line';

        if(refreshFixtures) {
          updateFixture(fixtureName, result);
          assert.equal(true, false)
        } else {
          assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
        }
      });
    });
  });
});
