import { NUM_EXPRESSION, POLYNOM_CHAR } from "./PolyEnum.mjs";

export default class PolyValidator {
  constructor(poly_string) {
    this.poly_string = poly_string;
    this.stack = [];
  }

  is_valid_at_the_end(char, i) {
    if (i === this.poly_string.length - 1)
      return char === POLYNOM_CHAR.X || /[0-9]/.test(char);

    return true;
  }

  is_valid_x() {
    const stack = this.stack;
    const last_char = stack[stack.length - 1];

    if (stack.length === 0) return true;

    if (
      last_char !== POLYNOM_CHAR.MINUS &&
      last_char !== POLYNOM_CHAR.PLUS &&
      last_char !== POLYNOM_CHAR.MULTIPLICATION &&
      !NUM_EXPRESSION.test(last_char)
    )
      return false;

    return true;
  }

  is_valid_power() {
    return this.stack[this.stack.length - 1] === POLYNOM_CHAR.X;
  }

  is_valid_multiplication_operator() {
    return NUM_EXPRESSION.test(this.stack[this.stack.length - 1]);
  }

  is_valid_plus_minus_operator() {
    const stack = this.stack;

    return (
      stack[stack.length - 1] === POLYNOM_CHAR.X ||
      NUM_EXPRESSION.test(stack[stack.length - 1])
    );
  }

  is_valid_zero() {
    const stack = this.stack;
    let last_digit_at = stack.length - 1;

    while (last_digit_at > 0 && stack[last_digit_at] === POLYNOM_CHAR.ZERO) {
      last_digit_at--;
    }

    return /[1-9]/.test(stack[last_digit_at]);
  }

  validate() {
    // X
    // number
    // +number, -number
    // +/-X
    // +/- number X
    // +/- number X

    let i = 0;

    while (i < this.poly_string.length) {
      const char = this.poly_string[i];
      console.log(char);

      switch (char) {
        case POLYNOM_CHAR.ZERO:
          if (!this.is_valid_zero()) return false;
          break;

        case POLYNOM_CHAR.PLUS:
        case POLYNOM_CHAR.MINUS:
          if (this.stack.length === 0) break;

          if (!this.is_valid_plus_minus_operator()) return false;
          break;

        case POLYNOM_CHAR.POWER:
          if (!this.is_valid_power()) return false;
          break;

        case POLYNOM_CHAR.X:
          if (!this.is_valid_x()) return false;
          break;

        case POLYNOM_CHAR.MULTIPLICATION:
          if (!this.is_valid_multiplication_operator()) return false;
          break;

        // default:
        //   return false;
      }

      this.stack.push(char);
      i++;
    }

    return this.is_valid_at_the_end(this.poly_string[i - 1], i - 1);
  }
}
