import { fileURLToPath } from 'url';
import { dirname } from 'path';


const rootDirectory = dirname(fileURLToPath(import.meta.url));
export default rootDirectory;

