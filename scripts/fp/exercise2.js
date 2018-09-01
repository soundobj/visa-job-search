// babel-node scripts/fp/exercise2.js
// Containers, Functors
import { curry, compose, map, concat, add, toString } from 'ramda';

class Container { // AKA identity
    constructor(x) {
        this.$value = x;
    }
    static of(x) {
        return new Container(x);
    }
}

// adding the map method converts Container into a Functor
// (a -> b) -> Container a -> Container b
Container.prototype.map = function (f) {
    return Container.of(f(this.$value));
};

class Maybe {
    static of(x) {
        return new Maybe(x);
    }
    get isNothing() {
        return this.$value === null || this.$value === undefined;
    }
    constructor(x) {
        this.$value = x;
    }
    map(fn) {
        return this.isNothing ? this : Maybe.of(fn(this.$value));
    }
    // inspect() {
    //     return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`;
    // }
}


const nothing = Maybe.of();
// console.error("nothing", nothing.isNothing());


// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = curry((amount, { balance }) =>
    Maybe.of(balance >= amount ? { balance: balance - amount } : null));
// This function is hypothetical, not implemented here... nor anywhere else.
// updateLedger :: Account -> Account
const updateLedger = account => account;
// remainingBalance :: Account -> String
const remainingBalance = balance => balance === null ? null :`Your balance is $${balance.balance}`;
// finishTransaction :: Account -> String
const finishTransaction = compose(remainingBalance, updateLedger);

const maybe = curry((v, f, m) => {
    if (m.isNothing) {
        return v;
    }
    return f(m.$value);
});

/*
*
*/

// getTwenty :: Account -> Maybe(String)
const getTwenty = compose(maybe('You\'re broke!', finishTransaction), withdraw(20));
// console.error("balance 200", getTwenty({ balance: 200.00 }));
// console.error("balance 10", getTwenty({ balance: 10.00 }));

// EITHER

class Either {
    static of(x) {
        return new Right(x);
    }
    constructor(x) {
        this.$value = x;
    }
}
class Left extends Either {
    map(f) {
        return this;
    }
    inspect() {
        return `Left(${this.$value})`;
    }
}
class Right extends Either {
    map(f) {
        return Either.of(f(this.$value));
    }
    inspect() {
        return `Right(${this.$value})`;
    }
}
const left = x => new Left(x);

const moment = require('moment');
// getAge :: Date -> User -> Either(String, Number)
const getAge = curry((now, user) => {
    const birthDate = moment(user.birthDate, 'YYYY-MM-DD');
    return birthDate.isValid()
        ? Either.of(now.diff(birthDate, 'years'))
        : left('Birth date could not be parsed');
});
// console.error("EITHER Right getAge:", getAge(moment(), { birthDate: '2005-12-12' }));
// console.error("EITHER Left getAge:", getAge(moment(), { birthDate: 'July 4, 2001' }));

// fortune :: Number -> String
const fortune = compose(concat('If you survive, you will be '), toString, add(1));
// zoltar :: User -> Either(String, _)
const zoltar = compose(map(fortune), getAge(moment()));
console.error("right:", zoltar({ birthDate: '2005-12-12' }));
console.error("left:", zoltar({ birthDate: 'balloons!' }));
