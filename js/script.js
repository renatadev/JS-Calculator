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
  }

  //operations that the calculator class can perform - functions
  clear() {

  }

  delete() {

  }

  appendNumber(number) {

  }

  chooseOperation(operation) {

  }

  compute() {

  }

  updateDisplay() {
    
  }

}
