import { ALWAYS_TIME, interpret } from '@bemedev/x-test';
import { describe, test } from 'vitest';
import { articles } from '~data';
import { advanceByTime, useTestConfig } from '~fixtures';
import { articlesSchema } from '~types';
import { FechArticlesJSON_Machine } from './machine';

const { start, send, context, stop, matches } = interpret(
  FechArticlesJSON_Machine,
);

useTestConfig();

describe('Workflow 1', () => {
  test('#01: Start the machine', () => {
    start();
    context(undefined, ctx => ctx.articles);
  });

  test('#02: Query the machine', () => {
    send({ type: 'QUERY', source: 'CNN' });
  });

  test('#03: AdvanceTime', () => advanceByTime(1));

  test('#04: Get the all JSON data', () => {
    const expecteds = articlesSchema.parse(articles);
    context('CNN', ctx => ctx.source);
    context(expecteds, ctx => ctx.articles);
    matches('language');
  });

  test('#05: The current state is "language"', () => {
    matches('language');
  });

  test('#06: AdvanceTime', () => advanceByTime(ALWAYS_TIME));

  test('#07: The current state is "category"', () => {
    matches('category');
  });

  test('#08: AdvanceTime', () => advanceByTime(ALWAYS_TIME));

  test('#09: The current state is "from"', () => {
    matches('from');
  });

  test('#10: AdvanceTime', () => advanceByTime(ALWAYS_TIME));

  test('#11: The current state is "to"', () => {
    matches('to');
  });

  test('#12: AdvanceTime', () => advanceByTime(ALWAYS_TIME));

  test('The current state is "source"', () => {
    matches('source');
  });

  test('#13: AdvanceTime', () => advanceByTime(ALWAYS_TIME));

  test.fails('#14: Received data is not all JSON data', () => {
    const expecteds = articlesSchema.parse(articles);
    context(expecteds, ctx => ctx.articles);
  });

  test('#15: Data are filtered', () => {
    const expecteds = articlesSchema
      .parse(articles)
      .filter(data => data.source === 'CNN');
    context(expecteds, ctx => ctx.articles);
  });

  test('#16: The current state is "success"', () => {
    matches('success');
  });

  test('#17: Stop the machine', () => {
    stop();
  });
});
