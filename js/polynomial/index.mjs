import Polynom from "./Polynom.mjs";
import PolyCreator from "./PolyCreator.mjs";
import PolyValidator from "./PolyValidator.mjs";
// Rational Zero Theorem

// Polynom rules
// ^ define the power.
// 2X or 2*X define the mutiplication.

// const p = new PolyCreator(`-X^-3`);
const p = new PolyValidator(`1X+1`);
console.log(p.validate());
// console.log(p.polynomial);

// [ (+/-)?(number)?X?(^)?(number)? ]
