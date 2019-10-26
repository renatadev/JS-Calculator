//Access all elements from the DOM

const numberKeys = document.querySelectorAll('[data-number]');
const operationKeys = document.querySelectorAll('[data-operation]');
const equalsKey = document.querySelector('[data-equals]');
const deleteKey = document.querySelector('[data-delete]');
const allClearKey = document.querySelector('[data-all-clear]');
const prevOp = document.querySelector('[data-previous-operand]');
const currOp = document.querySelector('[data-current-operand]');


// Calculator class - containing all the inputs and functions for the calculator
//Display of outputs

class Calculator {
  //where to place the display for the calculator
  constructor(prevOp, currOp) {
    this.prevOp = prevOp;
    this.currOp = currOp;
    this.clear(); //Clear all inputs and set them to default value to start with
  }

  //operations that the calculator class can perform - functions
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1); //Chop off the last char(num) from the str
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return; // stop appending a "." if it has already been added
    this.currentOperand = this.currentOperand.toString() + number.toString(); //convert to str to properly append them - use + to add at the end
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return; //do nothing
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand; //once we're done typing the current num, pass it into the prev
    this.currentOperand = ''; // so we clear the current so we can type it again
  }

  compute() {
    let computation; //result of our compute func
    const prev = parseFloat(this.previousOperand); //convert to a num
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return; // cancel the func if NaN
    switch (this.operation) {
    case '÷':
        computation = prev / current;
        break;
    case '×':
        computation = prev * current;
        break;
    case '-':
        computation = prev - current;
        break;
    case '+':
        computation = prev + current;
        break;
      default:
        return;
    }
    this.currentOperand = Math.round(computation * 1000) / 1000; //set current operant to the result of the computation
    this.operation = undefined;
    this.previousOperand = '';
  }

  //helper function to update display func
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]); //1.convert to num from str // 2.split between float and integer //3. get the first part
    const decimalDigits = stringNumber.split('.')[1]; //4. get the nums(decimals) after the split
    let integerDisplay;
    //Integers display
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('fr-FR', { maximumFractionDigits: 0 }); //Used french to match with GB numering system (no commas, and dots for decimals)
    }
    //Decimals display
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currOp.innerText = this.currentOperand;
    if (this.operation != null) {
      this.prevOp.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.prevOp.innerText = '';
    }
  }
}

// Create the calculator

const calculator = new Calculator(prevOp, currOp);

numberKeys.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationKeys.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsKey.addEventListener('click', button => {
  calculator.compute() // when we click "=" we call the compute function
  calculator.updateDisplay()
})

allClearKey.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteKey.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

// Keyboard input 
document.onkeydown = function(e) {
  switch (e.keyCode) { // find a way to loop through the keys instead to avoid such a long and repetitive code
    case 48:
        calculator.appendNumber("0")
        calculator.updateDisplay()
        break;
      case 49:
          calculator.appendNumber("1")
          calculator.updateDisplay()
          break;
      case 50:
          calculator.appendNumber("2")
          calculator.updateDisplay()
          break;
      case 51:
          calculator.appendNumber("3")
          calculator.updateDisplay()
          break;
      case 52:
          calculator.appendNumber("4")
          calculator.updateDisplay()
          break;
      case 53:
          calculator.appendNumber("5")
          calculator.updateDisplay()
          break;
      case 54:
          calculator.appendNumber("6")
          calculator.updateDisplay()
          break;
      case 55:
          calculator.appendNumber("7")
          calculator.updateDisplay()
          break;
      case 56:
          calculator.appendNumber("8")
          calculator.updateDisplay()
          break;
      case 57:
          calculator.appendNumber("9")
          calculator.updateDisplay()
          break;
     // add the operation keys here
  }
  calculator.updateDisplay()
  return;
};