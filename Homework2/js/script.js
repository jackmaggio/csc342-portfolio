const calc_numbers = document.querySelectorAll("#calc-number");
const calc_operations = document.querySelectorAll("[id^=calc-operation]");
const calc_decimal = document.querySelector("#calc-decimal");
const calc_compute = document.querySelector("#calc-compute");
const calc_clear = document.querySelector("#calc-clear");
const calc_sign = document.querySelector("#calc-sign");
const calc_display = document.querySelector("#calc-display");
const clear_history = document.querySelector("#clear-history");
const history = document.querySelector("#history-content");

let currentValue = "0";
let previousValue = "";
let previousPreviousValue = "";

let currentOperation = "";
let previousOperation = "";
let previousPreviousOperation = "";

let lastInput = "";

clear_history.addEventListener("click", () => {
  history.innerHTML = "";
});

calc_numbers.forEach((calc_number) => {
  calc_number.addEventListener("click", () => {
    appendValue(calc_number.innerHTML);
  });
});

calc_operations.forEach((calc_operation) => {
  calc_operation.addEventListener("click", () => {
    updateOperation(calc_operation.innerHTML);
  });
});

calc_clear.addEventListener("click", () => clear());

calc_display.addEventListener("keypress", (e) => {
  console.log(e);
  e.preventDefault();
  if (!isNaN(e.key)) {
    appendValue(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    updateOperation(e.key);
  } else if (e.keyCode == 46 && !calc_display.value.includes(".")) {
    putDecimalPoint();
  } else if (e.keyCode === 13) {
    calculateExpression();
  }
});

calc_display.addEventListener("paste", (e) => e.preventDefault());

calc_decimal.addEventListener("click", () => {
  putDecimalPoint();
});

calc_sign.addEventListener("click", () => {
  removeOperationHighlight();
  if (calc_display.value == "Error") {
    return;
  }
  if (calc_display.value.includes("-")) {
    if (calc_display.value === "-") {
      calc_display.value = "";
    } else {
      calc_display.value = calc_display.value.substring(
        1,
        calc_display.value.length
      );
    }
  } else {
    if (
      lastInput === "+" ||
      lastInput === "-" ||
      lastInput === "*" ||
      lastInput === "/"
    ) {
      calc_display.value = "-";
      lastInput = "negative";
    } else {
      calc_display.value = "-" + calc_display.value;
    }
  }
});

calc_compute.addEventListener("click", () => {
  calculateExpression();
});

const putDecimalPoint = () => {
  removeOperationHighlight();
  if (!calc_display.value.includes(".")) {
    if (
      lastInput === "+" ||
      lastInput === "-" ||
      lastInput === "*" ||
      lastInput === "/"
    ) {
      calc_display.value = calc_decimal.innerHTML;
    } else {
      calc_display.value += calc_decimal.innerHTML;
    }
  }
  lastInput = "decimal";
};

const removeOperationHighlight = () => {
  calc_operations.forEach((operation) => {
    operation.classList.remove("clicked-operation");
  });
};

const updateHistory = (content) => {
  let item = document.createElement("li");
  item.className = "history-content-items";
  item.id = "history-content-items";
  item.innerHTML = content;
  item.addEventListener("click", () => {
    if (
      lastInput === "+" ||
      lastInput === "-" ||
      lastInput === "*" ||
      lastInput === "/" ||
      lastInput === ""
    ) {
      console.log("here");
      calc_display.value = item.innerHTML;
      removeOperationHighlight();
      lastInput = item.innerHTML;
    }
  });
  history.appendChild(item);
};

const updateDisplay = (value) => {
  if (isNaN(value) || value == "Infinity") {
    calc_display.value = "Error";
  } else {
    calc_display.value = currentValue;
    if (previousOperation === "") {
      updateHistory(value);
    }
  }
};

const calculateExpression = () => {
  removeOperationHighlight();
  if (lastInput === "=" || lastInput === "") {
    return;
  }
  switch (currentOperation) {
    case "+":
      currentValue = Number(currentValue) + Number(calc_display.value);
      break;
    case "-":
      currentValue = Number(currentValue) - Number(calc_display.value);
      break;
    case "*":
      if (previousValue !== "") {
        switch (previousOperation) {
          case "+":
            currentValue =
              Number(previousValue) +
              Number(currentValue) * Number(calc_display.value);
            break;
          case "-":
            currentValue =
              Number(previousValue) -
              Number(currentValue) * Number(calc_display.value);
            break;
        }
      } else {
        currentValue = Number(currentValue) * Number(calc_display.value);
      }
      break;
    case "/":
      if (previousValue !== "") {
        switch (previousOperation) {
          case "+":
            currentValue =
              Number(previousValue) +
              Number(currentValue) / Number(calc_display.value);
            break;
          case "-":
            currentValue =
              Number(previousValue) -
              Number(currentValue) / Number(calc_display.value);
            break;
        }
      } else {
        currentValue = Number(currentValue) / Number(calc_display.value);
      }
      break;
    case "":
      currentValue = lastInput;
      break;
  }
  currentOperation = "";
  previousOperation = "";
  previousValue = "";
  updateDisplay(currentValue);
  lastInput = "=";
};

const appendValue = (num) => {
  console.log(num);
  if (calc_display.value == "Error") {
    return;
  }
  if (
    lastInput === "+" ||
    lastInput === "-" ||
    lastInput === "*" ||
    lastInput === "/" ||
    lastInput === "" ||
    calc_display.value === "0"
  ) {
    if (calc_display.value === "-0") {
      calc_display.value = "-" + num;
    } else {
      calc_display.value = num;
    }
  } else {
    calc_display.value += num;
  }
  lastInput = num;
  removeOperationHighlight();
};

const updateOperation = (operation) => {
  console.log(operation);
  removeOperationHighlight();
  switch (operation) {
    case "+":
      document
        .querySelector("#calc-operation-add")
        .classList.add("clicked-operation");
      break;
    case "-":
      document
        .querySelector("#calc-operation-subtract")
        .classList.add("clicked-operation");
      break;
    case "*":
      document
        .querySelector("#calc-operation-multiply")
        .classList.add("clicked-operation");
      break;
    case "/":
      document
        .querySelector("#calc-operation-divide")
        .classList.add("clicked-operation");
      break;
  }
  if (
    lastInput === "+" ||
    lastInput === "-" ||
    lastInput === "*" ||
    lastInput === "/"
  ) {
    if (previousValue !== "") {
      if (lastInput === "*" || lastInput === "/") {
        if (operation === "+" || operation === "-") {
          if (previousOperation === "+") {
            currentValue = Number(previousValue) + Number(currentValue);
          } else {
            currentValue = Number(previousValue) - Number(currentValue);
          }
          previousValue = "";
          previousOperation = "";
          calc_display.value = currentValue;
        } else {
          calc_display.value = operation;
        }
      }
    } else {
      calc_display.value = operation;
    }
    currentOperation = operation;
    lastInput = operation;
    return;
  }
  lastInput = operation;
  switch (operation) {
    case "+":
      switch (currentOperation) {
        case "":
          currentValue = calc_display.value;
          calc_display.value = "+";
          break;
        case "+":
          currentValue = Number(currentValue) + Number(calc_display.value);
          updateDisplay(currentValue);
          break;
        case "-":
          currentValue = Number(currentValue) - Number(calc_display.value);
          updateDisplay(currentValue);
          break;
        case "*":
          console.log(currentOperation);
          if (previousValue !== "") {
            if (previousOperation === "+") {
              currentValue =
                Number(currentValue) * Number(calc_display.value) +
                Number(previousValue);
            } else if (previousOperation === "-") {
              currentValue =
                Number(previousValue) -
                Number(currentValue) * Number(calc_display.value);
            }
            previousValue = "";
            previousOperation = "";
            updateDisplay(currentValue);
          } else {
            currentValue = Number(currentValue) * Number(calc_display.value);
            updateDisplay(currentValue);
          }
          break;
        case "/":
          if (previousValue !== "") {
            if (previousOperation === "+") {
              currentValue =
                Number(currentValue) / Number(calc_display.value) +
                Number(previousValue);
            } else if (previousOperation === "-") {
              currentValue =
                Number(previousValue) -
                Number(currentValue) / Number(calc_display.value);
            }
            previousValue = "";
            previousOperation = "";
            updateDisplay(currentValue);
          } else {
            currentValue = Number(currentValue) / Number(calc_display.value);
            updateDisplay(currentValue);
          }
          break;
      }
      currentOperation = "+";
      break;
    case "-":
      switch (currentOperation) {
        case "":
          currentValue = calc_display.value;
          calc_display.value = "-";
          break;
        case "+":
          currentValue = Number(currentValue) + Number(calc_display.value);
          updateDisplay(currentValue);
          break;
        case "-":
          currentValue = Number(currentValue) - Number(calc_display.value);
          updateDisplay(currentValue);
          break;
        case "*":
          console.log(currentOperation);
          if (previousValue !== "") {
            if (previousOperation === "+") {
              currentValue =
                Number(currentValue) * Number(calc_display.value) +
                Number(previousValue);
            } else if (previousOperation === "-") {
              currentValue =
                Number(previousValue) -
                Number(currentValue) * Number(calc_display.value);
            }
            previousValue = "";
            previousOperation = "";
            updateDisplay(currentValue);
          } else {
            currentValue = Number(currentValue) * Number(calc_display.value);
            updateDisplay(currentValue);
          }
          break;
        case "/":
          if (previousValue !== "") {
            if (previousOperation === "+") {
              currentValue =
                Number(currentValue) / Number(calc_display.value) +
                Number(previousValue);
            } else if (previousOperation === "-") {
              currentValue =
                Number(previousValue) -
                Number(currentValue) / Number(calc_display.value);
            }
            previousValue = "";
            previousOperation = "";
            updateDisplay(currentValue);
          } else {
            currentValue = Number(currentValue) / Number(calc_display.value);
            updateDisplay(currentValue);
          }
          break;
      }
      currentOperation = "-";
      break;
    case "*":
      switch (currentOperation) {
        case "":
          currentValue = calc_display.value;
          calc_display.value = "*";
          break;
        case "+":
          previousValue = currentValue;
          previousOperation = "+";
          currentValue = calc_display.value;
          calc_display.value = "*";
          break;
        case "-":
          previousValue = currentValue;
          previousOperation = "-";
          currentValue = calc_display.value;
          calc_display.value = "*";
          break;
        case "*":
          currentValue = Number(currentValue) * Number(calc_display.value);
          updateDisplay(currentValue);
          break;
        case "/":
          currentValue = Number(currentValue) / Number(calc_display.value);
          updateDisplay(currentValue);
          break;
      }
      currentOperation = "*";
      break;
    case "/":
      switch (currentOperation) {
        case "":
          currentValue = calc_display.value;
          calc_display.value = "/";
          break;
        case "+":
          previousValue = currentValue;
          previousOperation = "+";
          currentValue = calc_display.value;
          calc_display.value = "/";
          break;
        case "-":
          previousValue = currentValue;
          previousOperation = "-";
          currentValue = calc_display.value;
          calc_display.value = "/";
          break;
        case "*":
          currentValue = Number(currentValue) * Number(calc_display.value);
          updateDisplay(currentValue);
          break;
        case "/":
          currentValue = Number(currentValue) / Number(calc_display.value);
          updateDisplay(currentValue);
          break;
      }
      currentOperation = "/";
      break;
  }
};
const clear = () => {
  calc_display.value = "0";
  currentValue = "";
  previousValue = "";
  previousPreviousValue = "";

  currentOperation = "";
  previousOperation = "";
  previousPreviousOperation = "";

  lastInput = "";

  removeOperationHighlight();
};
