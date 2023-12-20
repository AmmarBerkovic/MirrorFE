import { NumberIncrementPipe } from './number-increment.pipe';

describe('NumberIncrementPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberIncrementPipe();
    expect(pipe).toBeTruthy();
  });
});
