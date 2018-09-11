import { curry } from 'ramda';
/**
 * @function either
 * @param {function} f the function to apply to the value e if isRightValue
 * @param {function} g the function to apply to the value e  if not isRightValue
 * @param {Either} e value inside the Either
 * @requires https://www.npmjs.com/package/ramda
 * @requires https://www.npmjs.com/package/monet
 * either :: (a -> c) -> (b -> c) -> Either a b -> c
 */
export default curry((f, g, e) => {
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