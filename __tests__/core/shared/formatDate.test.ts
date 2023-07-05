import { formatDateTime } from "../../../src/core/shared/formatDate";

describe('formatDateTime', () => {
  it('returns formatted date and time string', () => {
    const date = new Date(Date.UTC(2023, 6, 5, 10, 30));
    expect(formatDateTime(date)).toBe('05/07/2023, 10:30');
  });

  it('returns formatted date and time string with leading zeros', () => {
    const date = new Date(Date.UTC(2023, 0, 1, 9, 5));
    expect(formatDateTime(date)).toBe('01/01/2023, 09:05');
  });
});
