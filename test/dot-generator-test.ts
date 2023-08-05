import { describe, expect, test } from "@jest/globals";
import { generateText } from "../src/dot-generator";

import SpacesBetweenWordsFixture from "./fixtures/text/spaces-between-words.json";
import SpacesBetweenLettersFixture from "./fixtures/text/spaces-between-letters.json";
import LeftAlignedFixture from "./fixtures/text/left-aligned.json";
import CenterAlignedFixture from "./fixtures/text/center-aligned.json";
import RightAlignedFixture from "./fixtures/text/right-aligned.json";
import WrappedLeftAlignedFixture from "./fixtures/text/wrapped-left-aligned.json";
import WrappedRightAlignedFixture from "./fixtures/text/wrapped-right-aligned.json";
import WrappedCenterAlignedFixture from "./fixtures/text/wrapped-center-aligned.json";
import HypenatedFixture from "./fixtures/text/hypenated.json";
import HypenatedMultiLineFixture from "./fixtures/text/hypenated-multi-line.json";
import DefaultOffsetFixture from "./fixtures/text/default-offset.json";
import CustomOffsetFixture from "./fixtures/text/custom-offset.json";
import FixedHeightFixture from "./fixtures/text/fixed-height.json";

const dimensions = { width: 30, height: 30 };

describe("Dot Generators", () => {
  describe("generateText", function () {
    describe("text formatting", function () {
      test("renders a space between words when appropiate", function () {
        const textOptions = {
          text: "HI ROY",
          font: "system-6" as const,
          color: "#FFFFFF",
          wrap: "wrap",
          spaceBetweenLetters: 1,
          alignment: "left" as const,
          spaceBetweenLines: 1,
          startingColumn: 0,
          startingRow: 0,
        };

        var result = generateText(textOptions, { width: 50, height: 100 });
        expect(result).toEqual(SpacesBetweenWordsFixture);
      });

      test("renders text with letter spacing size", function () {
        const textOptions = {
          text: "HI ROY",
          font: "system-6" as const,
          color: "#FFFFFF",
          wrap: "wrap",
          spaceBetweenLetters: 2,
          alignment: "left" as const,
          spaceBetweenLines: 1,
          startingColumn: 0,
          startingRow: 0,
        };

        var result = generateText(textOptions, { width: 50, height: 100 });
        expect(result).toEqual(SpacesBetweenLettersFixture);
      });
    });

    // describe("setting colors", function () {
    //   var textOptions = {
    //     text: "HI",
    //     font: "system-6",
    //     color: "#FFFFFF",
    //     alignment: "left",
    //   };

    //   test("renders the supplied text color", function () {
    //     textOptions.color = "#ff0000";

    //     var result = dotGenerator.text(textOptions),
    //       fixtureName = "text-color";

    //     if (refreshFixtures) {
    //       updateFixture(fixtureName, result);
    //       assert.equal(true, false);
    //     } else {
    //       assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
    //     }
    //   });

    //   test("renders the supplied background color", function () {
    //     textOptions.backgroundColor = "#ff0000";
    //     textOptions.color = "#FFFFFF";

    //     var result = dotGenerator.text(textOptions),
    //       fixtureName = "background-color";

    //     if (refreshFixtures) {
    //       updateFixture(fixtureName, result);
    //       assert.equal(true, false);
    //     } else {
    //       assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
    //     }
    //   });
    // });

    describe("setting fixed dimensions", function () {
      // TODO: Fix!
      // test('honors the width and cuts off text if necessary', function() {
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

    describe("text alignment", function () {
      test("returns left aligned text", function () {
        const textOptions = {
          text: "HI",
          font: "system-6" as const,
          color: "#FFFFFF",
          wrap: "wrap",
          spaceBetweenLetters: 1,
          alignment: "left" as const,
          spaceBetweenLines: 1,
          startingColumn: 0,
          startingRow: 0,
        };

        const result = generateText(textOptions, { width: 30, height: 100 });
        expect(result).toEqual(LeftAlignedFixture);
      });

      test("returns right aligned text", function () {
        const textOptions = {
          text: "HI",
          font: "system-6" as const,
          color: "#FFFFFF",
          wrap: "wrap",
          spaceBetweenLetters: 1,
          alignment: "right" as const,
          spaceBetweenLines: 1,
          startingColumn: 0,
          startingRow: 0,
        };

        const result = generateText(textOptions, { width: 30, height: 100 });
        expect(result).toEqual(RightAlignedFixture);
      });

      test("returns center aligned text", function () {
        const textOptions = {
          text: "HI",
          font: "system-6" as const,
          color: "#FFFFFF",
          wrap: "wrap",
          spaceBetweenLetters: 1,
          alignment: "center" as const,
          spaceBetweenLines: 1,
          startingColumn: 0,
          startingRow: 0,
        };

        const result = generateText(textOptions, { width: 30, height: 100 });
        expect(result).toEqual(CenterAlignedFixture);
      });
    });

    describe("positioning the textbox", function () {
      test("returns offset text to the starting row and column", function () {
        const textOptions = {
          text: "HI",
          font: "system-6" as const,
          color: "#FFFFFF",
          wrap: "wrap",
          alignment: "left" as const,
          spaceBetweenLetters: 1,
          spaceBetweenLines: 1,
          startingRow: 3,
          startingColumn: 5,
        };

        const result = generateText(textOptions, { width: 20, height: 100 });
        expect(result).toEqual(CustomOffsetFixture);
      });

      //   test("returns an offset background color when supplied", function () {
      //     textOptions.backgroundColor = "#ff0000";
      //     textOptions.color = "#FFFFFF";
      //     textOptions.startingRow = 3;
      //     textOptions.startingColumn = 5;

      //     var result = dotGenerator.text(textOptions),
      //       fixtureName = "offset-background-color";

      //     if (refreshFixtures) {
      //       updateFixture(fixtureName, result);
      //       assert.equal(true, false);
      //     } else {
      //       assert.deepEqual(require(`./fixtures/text/${fixtureName}`), result);
      //     }
      //   });
    });

    describe("text wrapping", function () {
      describe("when set left align", function () {
        test("returns wrapped text left aligned", function () {
          const textOptions = {
            text: "HI ROY",
            font: "system-6" as const,
            color: "#FFFFFF",
            wrap: "wrap",
            alignment: "left" as const,
            spaceBetweenLetters: 1,
            spaceBetweenLines: 1,
            startingColumn: 0,
            startingRow: 0,
          };

          var result = generateText(textOptions, { width: 21, height: 100 });
          expect(result).toEqual(WrappedLeftAlignedFixture);
        });
      });

      describe("when set to right align", function () {
        test("returns wrapped text right aligned", function () {
          const textOptions = {
            text: "HI ROY",
            font: "system-6" as const,
            color: "#FFFFFF",
            wrap: "wrap",
            alignment: "right" as const,
            spaceBetweenLetters: 1,
            spaceBetweenLines: 1,
            startingColumn: 0,
            startingRow: 0,
          };

          var result = generateText(textOptions, { width: 21, height: 100 });
          expect(result).toEqual(WrappedRightAlignedFixture);
        });
      });

      describe("when set to center align", function () {
        test("returns wrapped text center aligned", function () {
          const textOptions = {
            text: "HI ROY",
            font: "system-6" as const,
            color: "#FFFFFF",
            wrap: "wrap",
            alignment: "center" as const,
            spaceBetweenLetters: 1,
            spaceBetweenLines: 1,
            startingColumn: 0,
            startingRow: 0,
          };

          var result = generateText(textOptions, { width: 21, height: 100 });
          expect(result).toEqual(WrappedCenterAlignedFixture);
        });
      });
    });

    describe("when a word is too long for the textbox width", function () {
      test("returns a hypenated word across two lines", function () {
        const textOptions = {
          text: "ROUGH",
          font: "system-6" as const,
          color: "#FFFFFF",
          wrap: "wrap",
          alignment: "left" as const,
          spaceBetweenLetters: 1,
          spaceBetweenLines: 1,
          startingColumn: 0,
          startingRow: 0,
        };

        var result = generateText(textOptions, { width: 21, height: 100 });
        expect(result).toEqual(HypenatedFixture);
      });

      test("returns a hypenated word across as many lines as needed", function () {
        const textOptions = {
          text: "DISHWASHER",
          font: "system-6" as const,
          color: "#FFFFFF",
          wrap: "wrap",
          alignment: "left" as const,
          spaceBetweenLetters: 1,
          spaceBetweenLines: 1,
          startingColumn: 0,
          startingRow: 0,
        };

        var result = generateText(textOptions, { width: 21, height: 100 });
        expect(result).toEqual(HypenatedMultiLineFixture);
      });
    });
  });
});
