import app from '../../src/app';

describe('\'Applications\' service', () => {
  it('registered the service', () => {
    const service = app.service('applications');
    expect(service).toBeTruthy();
  });
});
