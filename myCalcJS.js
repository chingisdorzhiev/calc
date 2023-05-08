let x = "";
let y = "";
let sign = "";
let finish = false;

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const actions = ["+", "-", "X", "/"];
const outTop = document.querySelector(".calc-screen-top");
const outBot = document.querySelector(".calc-screen-bot");

function clearAll() {
  x = "";
  y = "";
  sign = "";
  finish = false;
  outTop.textContent = "";
  outBot.textContent = "0";
}

function changeFont(screen) {
  if (screen.textContent.length < 7) {
    screen.style.fontSize = "4rem";
  } else if (screen.textContent.length >= 7 && screen.textContent.length < 8) {
    screen.style.fontSize = "3.5rem";
  } else if (screen.textContent.length >= 8 && screen.textContent.length < 9) {
    screen.style.fontSize = "3rem";
  } else if (screen.textContent.length >= 9) {
    screen.style.fontSize = "2.5rem";
    if (screen.textContent.length >= 11) {
      screen.textContent = screen.textContent.substr(0, 11);
    }
  }
  return;
}

function setDecimal(screen) {
  if (+screen.textContent >= 1000) {
    let pos = Math.floor(+screen.textContent / 1000).toString().length;
    let str = "";
    str = `${screen.textContent.slice(0, pos)}'${screen.textContent.slice(
      pos
    )}`;
    if (+screen.textContent >= 1e6) {
      str = `${str.slice(0, pos - 3)}'${str.slice(pos - 3)}`;
      if (+screen.textContent >= 1e9) {
        str = `${str.slice(0, pos - 6)}'${str.slice(pos - 6)}`;
      }
    }
    screen.textContent = str;
  }
  return;
}

document.querySelector(".calc").onclick = (event) => {
  if (event.target.classList.contains("ac")) clearAll();
  if (!event.target.classList.contains("btn")) return;

  const key = event.target.textContent;

  if (digits.includes(key)) {
    if (outBot.textContent.length > 12) {
      return;
    }
    if (outBot.textContent === "0" && key === "0") {
      return;
    }
    if (x === "" && y === "" && sign === "-") {
      x = sign;
      sign = "";
      outBot.textContent = x;
    }
    if (y === "" && sign === "") {
      x += key;
      outBot.textContent = x;
    } else if (x !== "" && y !== "" && finish) {
      y = key;
      outBot.textContent = y;
      finish = false;
    } else {
      y += key;
      outBot.textContent = y;
    }
    outTop.textContent = `${x} ${sign} ${y}`;
    console.log(x, sign, y);
  }

  if (actions.includes(key)) {
    sign = key;
    outTop.textContent = `${x} ${sign} ${y}`;
    outBot.textContent = sign;
    console.log(x, sign, y);
  }

  if (key === "=") {
    if (y === "") {
      y = x;
    }
    switch (sign) {
      case "+":
        x = +x + +y;
        break;
      case "-":
        x = +x - +y;
        break;
      case "X":
        x = +x * +y;
        break;
      case "/":
        if (y === "0") {
          x = "";
          y = "";
          sign = "";
          outBot.textContent = "Error";
          return;
        }
        x = +x / +y;
        break;
    }
    finish = true;
    console.log(x, y, sign);
    outBot.textContent = x;
  }

  if (key === "+/-") {
    x = -+x;
    console.log(x, y, sign);
    outTop.textContent = x;
    outBot.textContent = x;
  }

  if (key === "%") {
    if (sign === "X") {
      y = +y / 100;
      x = +x * +y;
    }
    if (sign === "+" || sign === "-") {
      y = +x * (+y / 100);
      x = +x + +y;
    }
    finish = true;
    console.log(x, y, sign);
    outTop.textContent = x;
    outBot.textContent = x;
  }

  changeFont(outBot);
  setDecimal(outBot);
  setDecimal(outTop);
  return;
};
