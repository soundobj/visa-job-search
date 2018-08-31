// babel-node scripts/fp/exercise2.js
// Containers, Functors
import { curry, compose, map } from 'ramda';

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
    getIsNothing() {
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
// console.error("nothing", nothing.getIsNothing());


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
// getTwenty :: Account -> Maybe(String)
const getTwenty = compose(map(finishTransaction), withdraw(20));
console.error("getTwenty", getTwenty({ balance: 200.00 }));
// console.error("getTwenty", getTwenty({ balance: 10.00 }));
