import { formatSeconds } from './formatSeconds';

describe('format seconds', () => {
  it('should format 60 seconds to 1:00', () => {
    expect(formatSeconds(60)).toBe('1:00');
  });
  it('should format 0 seconds as 0:00', () => {
    expect(formatSeconds(0)).toBe('0:00');
  });
});
