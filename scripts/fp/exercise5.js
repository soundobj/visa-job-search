// Asynchronous Task exercise
import fs from 'fs';
import { split, head } from 'ramda';
import { task } from 'folktale/concurrency'

// readFile :: String -> Task Error String
const readFile = filename => task((reject, result) => {
    fs.readFile(filename, (err, data) => (err ? reject(err) : result(data)));
});

const file = readFile('./mocks/metamorphosis').map(split('\n')).map(head);

console.error("file", file);
