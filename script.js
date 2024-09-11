let a = ""; //first number
let b = ""; //second number
let o = ""; //operator
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operator = ["+", "-", "×", "÷", "%"]; //C, delete, secret-cat

//Display
const out = document.querySelector(".calc-screen p");

function clearAll() {
  a = "";
  b = "";
  o = "";
  finish = false;
  out.textContent = 0;
}

const clear = document.querySelector(".btn.clear");
clear.onclick = () => {
  console.log("Clear push");
  clearAll();
};

document.querySelector(".buttons").onclick = (event) => {
  //Pressed not button
  if (!event.target.classList.contains("btn")) return;
  //Pressed clear button
  if (event.target.classList.contains("clear")) return;
  //get current button
  const key = event.target.textContent;
  // out.textContent = "";
  //if 0-9 or ., add value to a and print on the screen;
  if (digit.includes(key)) {
    //Если 2 число пустое и оператор не выбран, заполняем 1 число
    if (b === "" && o === "") {
      a += key;
      out.textContent = a;
      console.log(a);
      //Если а и б + финиш не пустые, то
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
      out.textContent = b;
      console.log(b);
    } else {
      b += key;
      out.textContent = b;
      console.log(b);
    }
  }
  //if pressed operator, add value to o
  if (operator.includes(key)) {
    o = key;
    out.textContent = o;
    return;
  }

  if (key === "=") {
    let num_a = Number(a);
    let num_b = Number(b);
    if (b === "") b = a;
    switch (o) {
      case "+":
        a = num_a + num_b;
        break;
      case "-":
        a = num_a - num_b;
        break;
      case "×":
        a = num_a * num_b;
        break;
      case "÷":
        if (num_b === 0) {
          out.textContent = "ERROR";
          a = "";
          b = "";
          o = "";
          return;
        }
        a = num_a / num_b;
        break;
      case "%":
        a = (num_a / num_b) * 100;
        out.textContent = a;
        break;
    }
    finish = true;
    out.textContent = a;
    console.log(a, b, o);
  }
};

//Получение нажатой кнопки
