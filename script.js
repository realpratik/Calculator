/*

AC function to clear 
// Del function to delete 
//equals to button to display result
//operator function 
//function to append numbers to action

  /* to clear 
    ****JavaScript access******
      Reading the values of these attributes out in 
      JavaScript is also very simple. You could use 
      getAttribute() with their full HTML name to 
      read them, but the standard defines a simpler way: 
      a DOMStringMap you can read out via a dataset property.

      To get a data attribute through the dataset object,
      get the property by the part of the attribute 
      name after data- (note that dashes are converted
      to camelCase se).
  
  */


class Calculator {
  constructor(previousOperandTextElement,currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement; 
    this.clear();
  } 


  clear(){
    this.currentOperand = " ";
    this.previousOperand= " ";
    this.operation = undefined;

  }

  /* for deleting a single number */
  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
 /**
  * How do you slice in JavaScript?
  The slice() method extracts parts of a string and returns the extracted parts in a
  new string. Use the start and end parameters to specify the part of the string you want
  to extract. The first character has the position 0, the second has position 1, and so on. Use a
  negative number to select from the end of the string.

  **/


  }

  /* to add number to the string when user clicks/inputs number */
  appendNumber(number){
    if(number === "." && this.currentOperand.includes(".")) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
  
  }

  chooseOperation(operation){ 
    if(this.currentOperand === "") return ;
    if(this.previousOperand !==  "") {
      this.compute()
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = " ";

  }

  compute(){
    let  computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return
    switch(this.operation) {
      case '+': 
        computation = prev + current
        break;
      case '*': 
        computation = prev * current
        break;
      case '-': 
        computation = prev - current
        break;
      case '/': 
        computation = prev / current
        break;
      default: 
        return
    }
    this.currentOperand = computation
    this.previousOperand = " "
    this.operation = undefined 
  }


  getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay 
    if(isNaN(integerDigits)){
      integerDisplay = " "
     } else {
      //Use of localString() is to insert commas
      // no decimal places allowed in the second part of the array 
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionsDigits: 0 })
    }
    if(decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay 
    }
  }

  /*  to update the value inside of the output */
  updateDisplay(){
    this.currentOperandTextElement.innerText = 
    this.getDisplayNumber(this.currentOperand)
    if(this.operation != null) {
      this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText= ""
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");


const calculator =  new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
});

operationButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
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