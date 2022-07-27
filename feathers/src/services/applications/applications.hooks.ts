
import uac from '../../hooks/uac';
import applicationEmails from '../../hooks/application-emails';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [uac()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [applicationEmails()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
