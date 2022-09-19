//import "./styles.css";

const HEIGHT = 500;
const WIDTH = 500;

const app = document.getElementById("app");
app.style.height = `${HEIGHT}px`;
app.style.width = `${WIDTH}px`;

function constrain(point, lowerBound, upperBound) {
  if (point < lowerBound - 5) return lowerBound + 5;

  if (point > upperBound - 5) return upperBound - 5;

  return point;
}

class Walker {
  constructor() {
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
  }

  step() {
    const direction = Math.floor(Math.random() * 4);

    if (direction === 0) this.x += 5;
    else if (direction === 1) this.x -= 5;
    else if (direction === 2) this.y += 5;
    else this.y -= 5;

    this.x = constrain(this.x, 0, WIDTH);
    this.y = constrain(this.y, 0, HEIGHT);
  }

  render() {
    const domElement = document.createElement("div");
    domElement.setAttribute("class", "walker");
    domElement.style.left = `${this.x}px`;
    domElement.style.top = `${this.y}px`;

    app.append(domElement);
  }
}

const walker = new Walker();

async function main() {
  let i = 0;

  while (i < 10000) {
    await new Promise((resolve) => {
      setTimeout(() => {
        walker.step();
        walker.render();

        resolve();
      }, 100);
    });

    i++;
  }
}

main();
