// import json from 'edit-json-file';
// import { afterAll, beforeAll, describe, expect, test } from 'vitest';
// import { articleSchema } from './schemas/article';

// const data = json(`${__dirname}/data.json`);

// beforeAll(() => {
//   data.set('articles', []);
//   data.save();
// });

// afterAll(() => {
//   data.save();
// });

// function getRawData(path: string) {
//   return json(`${__dirname}/${path}`).get('articles');
// }

// function buildData(category: string, language = 'en') {
//   return () => {
//     const raw = getRawData(`${category}.json`);
//     const articles = articleSchema
//       .array()
//       .parse(raw)
//       .map(article => ({ ...article, category, language }));

//     expect(articles.length).toBeGreaterThan(30);
//     data.append('articles', articles);
//   };
// }

// function _test(category: string, language = 'en') {
//   test(category, buildData(category, language));
// }

// describe.only('fetch', () => {
//   _test('bitcoin');
//   _test('football', 'fr');
//   _test('politics');
//   _test('stocks', 'fr');
//   _test('cinema', 'fr');
//   _test('nba', 'es');
//   _test('video games');
//   _test('music', 'fr');
//   _test('tech');
// });

export {};
