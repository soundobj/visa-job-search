// Asynchronous Task exercise
import { split, head, composeP } from 'ramda';

// readFile :: String -> Task Error String
const readFile = filename => new Promise((resolve, reject) => {
    setTimeout(() => resolve('bli\nblo'), 1000);
});

const file = composeP(head, split('\n'), readFile);

file('bla').then(x => console.error("end", x));
