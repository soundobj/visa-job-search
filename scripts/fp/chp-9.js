import { curry, compose, prop, split, last, map, add, contains, chain, append, join } from 'ramda';
import { Maybe, IO, Either, Left } from 'monet';
import either from './utils/either';

// safeProp :: String -> Object -> Maybe a
const safeProp = curry((p, obj) => compose(Maybe.of, prop(p))(obj));

const user = {
  id: 1,
  name: 'Albert',
  address: {
    street: {
      number: 22,
      name: 'Walnut St',
    },
  },
};

// 1- Use `safeProp` and `map/join` or `chain` to safely get the street name when given a user
// @TODO: check why when a property is wrong eg 'adresssss' there is an exception, it should return a Left
// getStreetName :: User -> Maybe String
const getStreetName = safeProp('address', user)
  .chain(address => safeProp('street', address))
  .chain(street => safeProp('name', street))
  .join();

// console.error("sp", getStreetName);

/* 2 - Use getFile to get the filepath, remove the directory and keep only the basename, then
purely log it. Hint: you may want to use `split` and `last` to obtain the basename from a
filepath.

*/

// getFile :: () -> IO String
const getFile = () => IO.of('/home/mostly-adequate/ch9.md');
// pureLog :: String -> IO ()
const pureLog = str => new IO(() => console.log(str));
const basename = compose(last, split('/'));
const logFilename = compose(chain(pureLog), map(basename), getFile);
// logFilename().effectFn();


/**
 * 3 - Use `validateEmail`, `addToMailingList` and `emailBlast` to create a function which adds
 * a new email to the mailing list if valid, and then notify the whole list.
 */
const left = a => new Left(a);

const mailingList = ['jamique@gmail.com', 'soundobj@yahoo.com'];

// validateEmail :: Email -> Either String Email
const validateEmail = email => {
  return contains('@', email)
    ? Either.of(email)
    : left('invalid email');
};

// addToMailingList :: Email -> IO([Email])
const addToMailingList = curry((list, email) => {
  return IO.of(append(email, list))
});

const appliedAddToMailingList = addToMailingList(mailingList);

// emailBlast :: [Email] -> IO ()
const emailBlast = list => new IO(() => console.log(`sending email to list: ${join(',', list)}`) );

//@TODO: use either to fork depending on Maybe value
const joinMailingList = compose(
  map(compose(chain(emailBlast), appliedAddToMailingList)),
  validateEmail,
);

const res = joinMailingList('peter@be.me');
console.error("res", res);

// example of manipulating IO list
// const IOChain = IO.of(['1','2','3'])
//   .chain(list => IO.of(append('4', list)));
// console.error("IOChain", IOChain.effectFn());