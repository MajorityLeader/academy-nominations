// This hook generates the "unique application ID", mainly used for accepting letters of recommendation.
import { Hook, HookContext } from '@feathersjs/feathers';
import { customAlphabet } from 'nanoid';
import { alphanumeric } from 'nanoid-dictionary';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    context.data.uac = `UA-MD05-${customAlphabet(alphanumeric, 10)}`;
    return context;
  };
};
