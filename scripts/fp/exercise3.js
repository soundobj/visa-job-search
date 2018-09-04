/* TYPE LIFTING exercise */ 
import { Maybe } from 'monet';
import { liftFN } from 'ramda-adjunct';

﻿const userInputA = '1';
const userInputB = '2';

const add = (a, b) => a + b;

// safeParseInt :: (Any, Number) -> Maybe Number
const safeParseInt = (value, radix = 10) => {
    const parsed = parseInt(value, radix);
    return isNaN(parsed) ? Maybe.Nothing() : Maybe.Some(parsed);
};

const a = safeParseInt(userInputA); //=> Maybe.Some(1)
const b = safeParseInt(userInputB); //=> Maybe.Some(2)

// addM :: Apply Number => Number -> Number -> Number
const addM = liftFN(2, add);
console.error("added", addM(a, b)); //=> Maybe.Some(3);
