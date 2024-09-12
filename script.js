let first = "";
let second = "";
let operator = "";
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operators = {
  Plus: "+",
  Minus: "-",
  Multi: "×",
  Division: "÷",
  Percent: "%",
};

//Display
const out = document.querySelector(".calc-screen p");

function clearAll() {
  first = "";
  second = "";
  operator = "";
  finish = false;
  out.textContent = 0;
}

document.querySelector(".btn.clear").onclick = () => {
  clearAll();
};

document.querySelector(".btn.secret-cat").onclick = () => {
  out.textContent = "^о‿о^";
};

let charArray;
let popped_char;
document.querySelector(".btn.delete").onclick = () => {
  if (second === "" && finish === false) {
    charArray = first.split("");
    popped_char = charArray.pop();
    first = charArray.join().toString().replaceAll(",", "");
    out.textContent = first;
  } else if (first !== "" && finish === false) {
    charArray = second.split("");
    popped_char = charArray.pop();
    second = charArray.join().toString().replaceAll(",", "");
    out.textContent = second;
  } else {
    //TODO:сделать возможность удалять из результата(a)
    charArray = first.split("");
    popped_char = charArray.pop();
    first = charArray.join().toString().replaceAll(",", "");
  }
};

function sum(a, b) {
  return +a + +b;
}

function minus(a, b) {
  return +a - +b;
}

function multiply(a, b) {
  return +a * +b;
}

function division(a, b) {
  return +a / +b;
}

function percentage(percent, total) {
  return ((percent / 100) * total).toFixed(2);
}

//Все действия происходят в классе buttons;
document.querySelector(".buttons").onclick = (event) => {
  //Pressed not button
  if (!event.target.classList.contains("btn")) return;
  //Pressed clear button
  if (event.target.classList.contains("clear")) return;
  //Получить значение нажатой кнопки
  const key = event.target.textContent;
  //Если список диджит содержит значение нажатой кнопки, то выполняется след блок команд внутри if
  if (digit.includes(key)) {
    //Если 2 число пустое и оператор не выбран, заполняем 1 число
    if (second === "" && operator === "") {
      first += key;
      out.textContent = first;
      /*
    Если оператор а и б заполнены и finish = true(результат получен), 
    то а остаётся со значением предыдущего результата, а б принимает новое значение
    а финиш обновляется, т.е. ждёт получения нового результата для переменной а.
    */
    } else if (first !== "" && second !== "" && finish) {
      second = key;
      finish = false;
      out.textContent = second;
    }
    // Ввод второго числа после выбора первого и нажатия по оператору
    else {
      second += key;
      out.textContent = second;
    }
  }
  /*
  Если список операторов содержит значение выбранного оператора, то о примет это значение.
  return помогает выйти из блока выполнения условий.
  */
  if (Object.values(operators).includes(key)) {
    operator = key;
    out.textContent = operator;
    return;
  }

  //Если = уже нажали, то переменные преобразуются в number и в зависимости от оператора выполняется вычисление.
  if (key === "=") {
    if (second === "") second = first;
    switch (operator) {
      case operators.Plus:
        first = sum(first, second);
        break;
      case operators.Minus:
        first = minus(first, second);
        break;
      case operators.Multi:
        first = multiply(first, second);
        break;
      case operators.Division:
        if (second === "0") {
          out.textContent = "ERROR";
          first = "";
          second = "";
          operator = "";
          return;
        }
        first = division(first, second);
        break;
      case operators.Percent:
        first = percentage(first, second);
        break;
    }

    finish = true;
    first = String(first);
    out.textContent = first;
  }
};
