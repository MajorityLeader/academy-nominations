import assert from 'assert';
import app from '../../src/app';

describe('\'recommendations\' service', () => {
  it('registered the service', () => {
    const service = app.service('recommendations');

    assert.ok(service, 'Registered the service');
  });
});
