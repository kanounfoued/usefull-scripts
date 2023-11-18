import { POLYNOM_CHAR } from "./PolyEnum.mjs";
import Polynom from "./Polynom.mjs";

export default class PolyCreator {
  string_poly;
  polynomial;

  constructor(string_poly = ``) {
    this.string_poly = string_poly.trim();
    this.polynomial = [];
  }

  create() {
    let i = 0;

    const getFactor = () => {
      // X
      // -X
      // -1*X
      // 1
      // X + 1
      // X^2
      let char = this.string_poly[i];

      if (char === POLYNOM_CHAR.X) return "1";

      let expression = ``;

      while (char !== POLYNOM_CHAR.X && i < this.string_poly.length) {
        if (char === POLYNOM_CHAR.MULTIPLICATION) {
          i++;
          break;
        }

        expression += char;
        i++;
        char = this.string_poly[i];
      }

      if (expression === POLYNOM_CHAR.PLUS || expression === POLYNOM_CHAR.MINUS)
        return `${expression}1`;
      return expression;
    };

    const getExponent = () => {
      let char = this.string_poly[i];

      if (char === POLYNOM_CHAR.PLUS || char === POLYNOM_CHAR.MINUS) return "1";

      let expression = ``;

      while (
        char !== POLYNOM_CHAR.PLUS &&
        char !== POLYNOM_CHAR.MINUS &&
        i < this.string_poly.length
      ) {
        if (char === POLYNOM_CHAR.POWER || char === POLYNOM_CHAR.X) {
          i++;
          char = this.string_poly[i];
          continue;
        }

        expression += char;
        i++;
        char = this.string_poly[i];
      }

      if (expression === ``) return `1`;
      return expression;
    };

    while (i < this.string_poly.length) {
      const factor = +getFactor();

      let power = 0;
      if (this.string_poly[i] === POLYNOM_CHAR.X) {
        i++;
        power = +getExponent();
      }

      this.polynomial.push(new Polynom(factor, power));
    }
  }
}
