let a = ""; //first number
let b = ""; //second number
let o = ""; //operator
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operator = ["+", "-", "×", "÷", "%"]; // delete, secret-cat

//Display
const out = document.querySelector(".calc-screen p");

function clearAll() {
  a = "";
  b = "";
  o = "";
  finish = false;
  out.textContent = 0;
}

document.querySelector(".btn.clear").onclick = () => {
  console.log("0");
  clearAll();
};

document.querySelector(".btn.secret-cat").onclick = ()=>{
    console.log('Cat!');
    out.textContent = "^о‿о^";
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
    if (b === "" && o === "") {
      a += key;
      out.textContent = a;
      console.log(a);
    /*
    Если оператор а и б заполнены и finish = true(результат получен), 
    то а остаётся со значением предыдущего результата, а б принимает новое значение.cer
    а финиш обновляется, т.е. ждёт получения нового результата для переменной а.
    */
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
      out.textContent = b;
      console.log(b);
    } 
    // Ввод второго числа после выбора первого и нажатия по оператору
    else {
      b += key;
      out.textContent = b;
      console.log(b);
    }
  }
  /*
  Если список операторов содержит значение выбранного оператора, то о примет это значение.
  return помогает выйти из блока выполнения условий.
  */
  if (operator.includes(key)) {
    o = key;
    out.textContent = o;
    return;
  }

  //Если нажато =, то переменные преобразуются в number и в зависимости от оператора выполняется вычисление.
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
        break;
    }
    finish = true;
    out.textContent = a;
    console.log(a, b, o);
  }
};
