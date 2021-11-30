const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');
const valueEl = document.querySelector('.value');
const additionEl = document.querySelector('.addition');
const substractionEl = document.querySelector('.substraction');
const multiplicatorEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');
const decimalEl = document.querySelector('.decimal');

const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const numberElArray = [number0El, number1El, number2El, number3El, number4El, number5El, number6El, number7El, number8El, number9El];

let valueStrInMemory = null;
let operatorInMemory = null;

const getValueAsStr = () => valueEl.textContent.split(',').join('');

const getValueAsNum = () =>{
  return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) =>{
  if(valueStr[valueStr.length - 1] === '.'){
    valueEl.textContent+='.';
    return;
  }

  const [wholeNumStr, decimalStr] = valueStr.split('.');
  if (decimalStr){
    valueEl.textContent = parseFloat(wholeNumStr).toLocaleString()+ '.' + decimalStr;
  } else {
    valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

const handleNumberClick = (numStr) => {
  const currentValueStr = getValueAsStr();
  if (currentValueStr === '0'){
    setStrAsValue(numStr);
  } else{
    setStrAsValue(currentValueStr + numStr);
  }
};

const getResultOfOperationAsStr = () =>{
  const currentValueNum = getValueAsNum();
  const  valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory==='addition'){
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === 'substraction'){
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === 'multiplication'){
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === 'division'){
    newValueNum = valueNumInMemory / currentValueNum;
  }
  return newValueNum.toString();
};

const handleoperatorClick = (operation) =>{
  const currentValueStr = getValueAsStr();

  if(!valueStrInMemory){
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue('0');
    return;
  }
  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue('0');
};

//Add Event Listeners to functions
acEl.addEventListener('click', ()=>{
  setStrAsValue('0');
  valueStrInMemory = null;
  operatorInMemory = null;
});
pmEl.addEventListener('click', ()=>{
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();

  if(currentValueStr === '-0'){
    setStrAsValue('0');
    return;
  }
  if (currentValueNum >=0){
    setStrAsValue('-' + currentValueStr);
  } else {
    setStrAsValue(currentValueStr.substring(1));
  }
});
percentEl.addEventListener('click', () =>{
  const currentValueNum = getValueAsNum();
  const newvalueNum = currentValueNum /100;
  setStrAsValue(newvalueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
});

//add event listenners to operators
additionEl.addEventListener('click', () =>{
  handleoperatorClick('addition');
})
substractionEl.addEventListener('click', () =>{
  handleoperatorClick('substraction');
})
multiplicatorEl.addEventListener('click', () =>{
  handleoperatorClick('multiplication');
})
divisionEl.addEventListener('click', () =>{
  handleoperatorClick('division');
});
equalEl.addEventListener('click', () =>{
  if(valueStrInMemory){
    setStrAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null;
    operatorInMemory = null
  }
});

//Add Event listeners to numbers and decimals
for (let i = 0; i<numberElArray.length; i++){
  const numberEl = numberElArray[i];
  numberEl.addEventListener('click', () =>{
    handleNumberClick(i.toString());
  });
}
decimalEl.addEventListener('click', () =>{
  const currentValueStr = getValueAsStr();
  if(!currentValueStr.includes('.')){
    setStrAsValue(currentValueStr+ '.');
  }
});
