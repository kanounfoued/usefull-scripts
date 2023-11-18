import PolyCreator from "./PolyCreator.mjs";
import PolyValidator from "./PolyValidator.mjs";
// Rational Zero Theorem

const syntax = `100X+10`;
const p_v = new PolyValidator(syntax);
const p_c = new PolyCreator(syntax);
const is_valid = p_v.validate();

if (is_valid) {
  p_c.create();
  console.log(p_c.polynomial);
}
