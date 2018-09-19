import { Maybe, IO, Reader } from 'monet';
import { Future } from 'fluture';
import readJson from './utils/readJson';
import { add, curry } from 'ramda';
import Identity from './utils/Identity';


// @TODO: cannot use ap as in the book see example below using monet monads.
// const res = IO.of(2).chain(two => IO.of(3).map(add(two)));
// console.error("res", res.effectFn());
//
//
// const identity = Identity.of(2).map(add).ap(Identity.of(3));
// console.error("identity", identity);


// readJson('./mocks/users.json').then(res => {
//   console.error("data", res);
// })

const showEventsForUser = curry((user, events, users) => {
    console.error("user", user);
    console.error("events", events);
    console.error("users", users);
});

const getUsers = Future((rej, res) => {
  readJson('./mocks/users.json').then(data => res(data))
});

const getEvents = Future((rej, res) => {
  readJson('./mocks/events.json').then(data => res(data))
});

Future.of(showEventsForUser(1)).ap(getUsers).ap(getEvents).fork(console.log, console.error);


// getUsers.fork(console.log, console.error);