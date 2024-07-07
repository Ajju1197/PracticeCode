let operationState = 0; // 0: addition, 1: subtraction, 2: multiplication, 3: division

function validateInput(event) {
  const input = event.target;
  const value = input.value;

  // Use regex to allow only numeric input and period (.)
  if (/[^0-9.]/g.test(value)) {
    input.value = value.replace(/[^0-9.]/g, '');
  }
}

function performCalculation() {
  const inputElement1 = document.getElementById('input1');
  const inputElement2 = document.getElementById('input2');

  if (!inputElement1 || !inputElement2) {
    alert('Input elements not found.');
    return;
  }

  let input1 = parseFloat(inputElement1.value);
  let input2 = parseFloat(inputElement2.value);

  if (isNaN(input1) || isNaN(input2)) {
    alert('Both input 1 and input 2 fields are required and must be numeric.');
    return;
  }

  let result;
  const calcButton = document.getElementById('calcButton');

  switch (operationState) {
    case 0:
      result = input1 + input2;
      calcButton.textContent = 'Subtract';
      break;
    case 1:
      result = input1 - input2;
      calcButton.textContent = 'Multiply';
      break;
    case 2:
      result = input1 * input2;
      calcButton.textContent = 'Division';
      break;
    case 3:
      if (input2 === 0) {
        alert('Please enter a non-zero value for Input 2');
        return;
      }
      result = input1 / input2;
      calcButton.textContent = 'Add';
      break;
  }

  // Update calculation state for the next button click
  operationState = (operationState + 1) % 4;

  // Display result
  document.getElementById('result').value = result;
}

function clearFields() {
  document.getElementById('input1').value = '';
  document.getElementById('input2').value = '';
  document.getElementById('result').value = '';
  document.getElementById('calcButton').textContent = 'Add';
  operationState = 0;
}