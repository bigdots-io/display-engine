export {};
// image(url, callbacks) {
//   new ImageExploder(url).process(callbacks);
// }
// export const generateColor = (
//   options: MacroColorConfig,
//   dimensions: Dimensions
// ): GeneratedDots => {
//   const generatedDots: GeneratedDots = { dots: [], ...dimensions };
//   for (var y = 0; y < dimensions.height; y++) {
//     for (var x = 0; x < dimensions.width; x++) {
//       generatedDots.dots.push({
//         y: y + options.startingRow,
//         x: x + options.startingColumn,
//       });
//     }
//   }
//   return generatedDots;
// };
// export const generateText = (
//   options: MacroTextConfig,
//   dimensions: Dimensions
// ): GeneratedDots => {
//   const message = new Message(options.text, options.font, {
//     spaceBetweenLetters: options.spaceBetweenLetters,
//     spaceBetweenLines: options.spaceBetweenLines,
//     alignment: options.alignment,
//     wrap: options.wrap,
//     width: options.width || dimensions.width,
//   });
//   return message.render();
// };
