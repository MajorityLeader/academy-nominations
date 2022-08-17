import { customAlphabet } from 'nanoid';
import { alphanumeric } from 'nanoid-dictionary';

const id = customAlphabet(alphanumeric, 11);

export default id;
