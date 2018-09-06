// Asynchronous Task exercise
// https://vimeo.com/106008027 monad a day Future
import { split, head, composeP } from 'ramda';
import { Future } from 'fluture';

// fake file read
const readFile = () => new Promise((resolve) => {
    setTimeout(() => resolve('bli\nblo'), 1000);
});

const file = composeP(head, split('\n'), readFile);
// file.then(x => console.error("end", x));


// USING THE FLUTURE Future Mondad
const readFileF = Future((rej, res) => {
    setTimeout(res, 1000, 'bli\nblo');
});

readFileF.map(split('\n')).map(head).fork(console.log, console.error);


