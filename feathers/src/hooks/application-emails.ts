// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import app from '../app';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    await app.service('emails').create({params: {query: {method: 'sendSubmissionConfirmation'}}});
    await app.service('emails').create({params: {query: {method: 'sendLettersOfRecommendation'}}});
    return context;
  };
};
