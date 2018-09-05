// IO exercises
import { IO, Maybe } from 'monet';
import { prop, split , compose, map, filter, equals, last, head} from 'ramda';

const window = {
    innerWidth: 400,
    location: {
        href: 'http//localhost:8080/blog/posts?searchTerm=wafflehouse'
    }
};

const ioWindow = new IO(() => window);
const iw = ioWindow.map(win => win.innerWidth);
// IO(1430)
const href = ioWindow
    .map(prop('location'))
    .map(prop('href'))
    .map(split('/'));

console.error("iw", iw.effectFn());
console.error("href", href.effectFn());

// url :: IO String
const url = new IO(() => window.location.href);
// toPairs :: String -> [[String]]
// we partially apply the function argument to map so when we pass the data ie the outcome of the split & on a string
const toPairs = compose(map(split('=')), split('&'));
// params :: String -> [[String]]
const params = compose(toPairs, last, split('?'));
// findParam :: String -> IO Maybe [String]
const findParam = key =>
    map(compose(Maybe.of, filter(compose(equals(key), head)), params), url);
// -- Impure calling code ----------------------------------------------
// run it by calling $value()!
const fp = findParam('searchTerm');//.$value();
// Just([['searchTerm', 'wafflehouse']])

console.error("fp", fp.effectFn());