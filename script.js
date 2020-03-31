const box = document.querySelector('.box');
const reset = document.getElementById('reset');
const win = document.querySelector('.win');

for (let i = 0; i < 100; i++) {
  const newDiv = document.createElement('div');
  box.appendChild(newDiv).classList.add('cell');
}

function foo(){
  //do nothing
}

const allCell = document.querySelectorAll('.cell');
let counter = 1;

reset.addEventListener('click', () => {
  allCell.forEach(cell => {
    counter = 1;
    cell.removeAttribute('data-x');
    cell.removeAttribute('style');
    cell.textContent = '';
    win.textContent = '';
  });
});

function redToLightblue(){
  allCell.forEach(cell => {
    if(cell.style.background === 'red'){
      cell.style.background = 'lightblue';
    }
  });
}

function checkLose(){
  let lose = true;
  allCell.forEach(cell => {
    if(cell.style.background === 'lightgrey'){
      lose = false;
    }
  });
  return lose;
}

function clearBg(){
  allCell.forEach(cell => {
    if(cell.style.background === 'lightgrey'){
      cell.removeAttribute('style');
    }
  });
}

//index - клетка на которую нажали
//indexSecond - клетка, на которую можно будет нажать
function getElement(index, n){
  allCell.forEach((cell, indexSecond) => {
    if(index + n === indexSecond){
      try{
        cell.dataset.x = 111;
        if(cell.style.background !== 'lightblue'){
          cell.style.background = 'lightgrey';
        }
      }
      catch(e){
        foo();
      }
    }
  });
}

allCell.forEach((cell, index) => {
  cell.addEventListener('click', function(){
        
    if(counter === 1 ||
      (cell.style.background !== 'lightblue' &&
      cell.style.background !== 'red' &&
      cell.hasAttribute('data-x'))){

      clearBg();  
      redToLightblue();  
        
      this.textContent = counter;
      this.style.background = 'red';
        
      if (counter === 1) {
        cell.dataset.x = 0;
      }else{
        for (let i = 0; i < allCell.length; i++) {
          allCell[i].removeAttribute('data-x');
        }
      cell.dataset.x = 0;
      }

      if(index % 10 === 0){
        getElement(index, -8);
        getElement(index, -19);
        getElement(index, 12);
        getElement(index, 21);
      }else if(index % 10 === 1){
        getElement(index, -8);
        getElement(index, -19);
        getElement(index, -21);
        getElement(index, 12);
        getElement(index, 19);
        getElement(index, 21);
      }else if(index % 10 === 8){
        getElement(index, -12);
        getElement(index, -19);
        getElement(index, -21);
        getElement(index, 8);
        getElement(index, 19);
        getElement(index, 21);
      }else if(index % 10 === 9){
        getElement(index, -12);
        getElement(index, -21);
        getElement(index, 8);
        getElement(index, 19);
      }else{
        getElement(index, -8);
        getElement(index, -12);
        getElement(index, -19);
        getElement(index, -21);
        getElement(index, 8);
        getElement(index, 12);
        getElement(index, 19);
        getElement(index, 21);
      }
      counter++;

      if(checkLose() && counter === 101){
        win.textContent = 'You have won!!!';
      }else if(checkLose() && counter < 101){
        win.textContent = 'You have lose ((';
      }
    }
  });
});