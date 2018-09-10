// Exercises Tupperware chapter
import { compose, head, curry, concat, add, prop, map, length, identity } from 'ramda';
import { Maybe, Either, Left, IO, id, Right } from 'monet';

// 1 - Use `add` and `map` to make a function that increments a value inside a functor.
const initialVal = Maybe.of(1);
// console.error("increment", initialVal.map(add(1)));

// 2 - Given const user = { id: 2, name: 'Albert', active: true };
// Use `safeProp` and `head` to find the first initial of the user.
const user = {id: 2, name: 'Albert', active: true};
// const safeProp = curry((p, obj) => compose(Maybe.of, prop(p))(obj));
const safeProp = curry((p, obj) => compose(Maybe.of, prop(p))(obj));
// initial :: User -> Maybe String
const initial = compose(map(head), safeProp('name'));
// console.error("initial", initial(user));

// 3 - Given the following helper functions:

const left = a => new Left(a);
// showWelcome :: User -> String
const showWelcome = compose(concat('Welcome '), prop('name'));
// checkActive :: User -> Either String User
const checkActive = function checkActive(user) {
  return user.active
    ? Either.of(user)
    : left('Your account is not active');
};

const activeUser = {id: 2, name: 'Peter', active: true};
// Write a function that uses `checkActive` and `showWelcome` to grant access or return
// the error.
// eitherWelcome :: User -> Either String String
const eitherWelcome = compose(map(showWelcome), checkActive);
// console.error("eitherWelcome", eitherWelcome(activeUser));

// 4 -

// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = curry((f, g, e) => {
  let result;

  switch (e.isRightValue) {
    case false:
      result = f(e.value);
      break;
    case true:
      result = g(e.value);
      break;
// No Default
  }
  return result;
});

const validateActiveUserOK = {id: 2, name: 'Peter', active: true};
const validateActiveUserNotOK = {id: 2, name: 'Jo', active: true};
// validateUser :: (User -> Either String ()) -> User -> Either String User
const validateUser = curry((validate, user) => validate(user).map(_ => user));
// save :: User -> IO User  // @TODO: check why spread operator ... is not working when building the IO payload
const save = user => new IO(() => ({ user: user, saved: true }));
// Exercise
// Write a function `validateName` which checks whether a user has a name longer than 3
// characters or return an error message. Then use `either`, `showWelcome` and `save` to
// write a `register` function to signup and welcome a user when the validation is ok.
//   Remember either's two arguments must return the same type.
const success = (res) => {
  return new IO(() => `Logged succesfully ${res.effectFn().user}`)
};

const isNameLongerThan3letters = x => length(x) > 3 ? Either.of(x) : left('user name is too short');
// validateName :: User -> Either String ()
const validateName = compose(isNameLongerThan3letters, prop('name'));
const noGood = (res) => {
  return new IO(() => `Could not log in: ${res}`);
};

const signUp =  compose(success, save);

// register :: User -> IO String
const registerBook = compose(either(noGood, signUp), validateName);
const successRegister = registerBook(validateActiveUserOK);
const notSuccessRegister = registerBook(validateActiveUserNotOK);
// console.error("sr", successRegister.effectFn());
// console.error("nsr", notSuccessRegister.effectFn());

// ============ BOOK solution ================

const validateNameB = ({ name }) => (name.length > 3
    ? Either.of(null)
    : left('Your name need to be > 3')
);

const saveB = user => new IO(() => ({ ...user, saved: true }));

const saveAndWelcome = compose(map(showWelcome), saveB);

const registerBookE = compose(
  either(IO.of, saveAndWelcome),
  validateUser(validateNameB),
);

console.error("rgb", registerBookE(validateActiveUserNotOK).effectFn());
console.error("rgb", registerBookE(validateActiveUserOK).effectFn());
