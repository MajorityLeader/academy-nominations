
import uac from '../../hooks/uac';
import emailAfterApplicationSubmission from '../../hooks/email-after-application-submission';
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
    create: [emailAfterApplicationSubmission()],
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
