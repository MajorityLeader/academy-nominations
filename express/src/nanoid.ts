import { customAlphabet } from 'nanoid';
import { alphanumeric } from 'nanoid-dictionary';

const id = customAlphabet(alphanumeric, 32);

export default id;
