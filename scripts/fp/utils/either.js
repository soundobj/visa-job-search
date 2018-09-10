import { curry } from 'ramda';
// either :: (a -> c) -> (b -> c) -> Either a b -> c
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