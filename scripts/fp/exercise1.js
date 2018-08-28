import R from 'ramda';

//Currying exercises

const match = R.curry((what, s) => s.match(what));
const replace = R.curry((what, replacement, s) => s.replace(what, replacement));
const filter = R.curry((f, xs) => xs.filter(f));
const map = R.curry((f, xs) => xs.map(f));

match(/r/g, 'hello world'); // [ 'r' ]
const hasLetterR = match(/r/g); // x => x.match(/r/g)
hasLetterR('hello world'); // [ 'r' ]
hasLetterR('just j and s and t etc'); // null
filter(hasLetterR, ['rock and roll', 'smooth jazz']); // ['rock and roll']
const removeStringsWithoutRs = filter(hasLetterR); // xs => xs.filter(x => x.match(/r/g))
removeStringsWithoutRs(['rock and roll', 'smooth jazz', 'drum circle']); // ['rock and roll', 'drum circle']
const noVowels = replace(/[aeiou]/ig); // (r,x) => x.replace(/[aeiou]/ig, r)
const censored = noVowels('*'); // x => x.replace(/[aeiou]/ig, '*')


const ds = {
    childNodes: ['a','b','c']
}
const ds1 = {
    childNodes: ['d','e','f']
}

const allTheChildren = x => x.childNodes;
const atc = R.map(allTheChildren);
// console.error("fltc", R.flatten(atc([ds,ds1])));


// CURRY EXERCISES

// Refactor to remove all arguments by partially applying the function.
// const words = str => split(' ', str);

const split = R.curry((delimiter, str) => str.split(delimiter));
const bySpaces = split(' ');
const splitPhraseBySpaces = bySpaces('this is taking me a while');
// console.error("sps", splitPhraseBySpaces);


// filterQs :: [String] -> [String]
// const filterQs = xs => filter(x => x.match(/q/i), xs);

// const filter1 = R.curry((f, xs) => xs.filter(f));
const match1 = R.curry((what, x) => x.match(what));

const matchQ = match1(/q/i);
const filterQs = R.filter(matchQ);
const applyFilterQs = filterQs(['out','quasimodo','pepper','q mag']);
// console.error("afq", applyFilterQs);


// Considering the following function:
const keepHighest = (x, y) => (x >= y ? x : y);
// Refactor `max` to not reference any arguments using the helper function `keepHighest`.
// // max :: [Number] -> Number
// const max = xs => reduce((acc, x) => (x >= acc ? x : acc), -Infinity, xs);

const maxReduce = R.curry((f, xs) => xs.reduce(f));
const reduceToHighest = maxReduce(keepHighest);
const findMax = reduceToHighest([3,56,234,90]);


// COMPOSITION

const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const shout = R.compose(exclaim, toUpperCase);
shout('send in the clowns'); // "SEND IN THE CLOWNS!"


const head = x => x[0];
const reverse = R.reduce((acc, x) => [x].concat(acc), []);
const last = R.compose(head, reverse);
const res = last(['jumpkick', 'roundhouse', 'uppercut']); // 'uppercut'
// console.error("l", res);


// previously we'd have to write two composes, but since it's associative,
// we can give compose as many fn's as we like and let it decide how to group them.
const arg = ['jumpkick', 'roundhouse', 'uppercut'];
const lastUpper = R.compose(toUpperCase, head, reverse);
const loudLastUpper = R.compose(exclaim, toUpperCase, head, reverse);
// console.error("lu", lastUpper(arg));
// console.error("llu", loudLastUpper(arg));

// pointfree shit
const snakeCase = R.compose(R.replace(/\s+/ig, '_'), R.toLower);
// console.error("sC", snakeCase('David De Diego'));

const initials = R.compose(R.join('. '), R.map(R.compose(toUpperCase, head)), R.split(' '));
// console.error("initials", initials('hunter stockton thompson')); // 'H. S. T';


// debugging

const trace = R.curry((tag, x) => {
    console.log(tag, x);
    return x;
});

const dasherize = R.compose(
    R.join('-'),
    R.map(R.toLower),
    // trace('after split'),
    R.split(' '),
    // R.replace(/\s{2,}/ig, ' '),
);
// console.error("dasherize", dasherize('The world is a vampire'));

// const g = x => x.length;
// const f = x => x === 4;
// const isFourLetterWord = R.compose(f, g);
// console.error("dave is four letter word", isFourLetterWord('dave'));

// const g = x => x.length;
// const equalsNumber = R.curry((x, y) => x === y);
// // const isFourLetterWord = R.compose(equalsNumber(4), g);
const isFourLetterWord = R.compose(R.equals(4), R.length);
// console.error("dave is four letter word", isFourLetterWord('dave'));

// EXERCISES

// Car app
// {
//     name: 'Aston Martin One-77',
//         horsepower: 750,
//     dollar_value: 1850000,
//     in_stock: true,
// }
// Use `compose()` to rewrite the function below.
// // isLastInStock :: [Car] -> Boolean
// const isLastInStock = (cars) => {
//     const lastCar = last(cars);
//     return prop('in_stock', lastCar);
// };


const cars = [
    {
        name: 'Aston Martin fastest',
        horsepower: 72250,
        dollar_value: 1850000,
        in_stock: false,
    },
    {
        name: 'Aston Martin One-77',
        horsepower: 750,
        dollar_value: 1850000,
        in_stock: false,
    },
    {
        name: 'Aston Martin One-87',
        horsepower: 950,
        dollar_value: 2850000,
        in_stock: false,
    },

];


const isLastInStock = R.compose(R.prop('in_stock'),R.last);

// console.error("isLastInStock", isLastInStock(cars));

//
// Use the helper function `average` to refactor `averageDollarValue` as a composition.
// // averageDollarValue :: [Car] -> Int
//     const averageDollarValue = (cars) => {
//     const dollarValues = map(c => c.dollar_value, cars);
//     return average(dollarValues);
// };

const average = xs => R.reduce(R.add, 0, xs) / xs.length;
// console.error("average", average([1,2,3,4]));


const averageDollarValue = R.compose(average, R.map(R.prop('dollar_value')));
// console.error("averageDollarValue", averageDollarValue(cars));


// Refactor `fastestCar` using `compose()` and other functions in pointfree-style. Hint, the
//     `flip` function may come in handy.
// // fastestCar :: [Car] -> String
// const fastestCar = (cars) => {
//     const sorted = sortBy(car => car.horsepower, cars);
//     const fastest = last(sorted);
//     return concat(fastest.name, ' is the fastest');
// };

const fastestCarMessage = R.compose(R.concat('is the fastest '), R.prop('name'));
// console.error("x", fastestMessage(cars[0]));


const fastestCar = R.compose(
    fastestCarMessage,
    R.last,
    R.sortBy(R.prop('horsepower'))
);
console.error("fastestCar::", fastestCar(cars));

// CH6 Declarative Coding









