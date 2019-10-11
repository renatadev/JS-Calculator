//Access all elements from the DOM

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');


// Calculator class - containing all the inputs and functions for the calculator
//Display of outputs

class Calculator {
  //where to place the display for the calculator
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
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
    this.currentOperand = computation; //set current operant to the result of the computation
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
    this.currentOperandText.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandText.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = '';
    }
  }
}

// Create the calculator

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute() // when we click "=" we call the compute function
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
