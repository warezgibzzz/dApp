import showMessage from '../../src/components/message';

describe('showMessage', () => {
  it('should be visible with loading set', () => {
    const handler = showMessage('success', 'It was successful', 2);
    handler();
  });
});
