const portionSize = 10; // Кол-во записей на странице
let currentPage = 1;  // Начальная страница
let dataRow = data.length;  // Указываем кол-во строк таблцы
let counter = 0;  // Устанавливаем счетчик для определения направления
const columnsInputs = document.querySelectorAll('.columns-input');  // Инпуты для скрытия колонок
const headers = document.querySelectorAll('th');
const submitButton = document.getElementById('submitButton');  
const modalElem = document.querySelector('.modal');
const overlayElem = document.querySelector('.overlay');
const closeButton = document.getElementById('closeButton');
let tbody = document.querySelector('#tbody');

window.onload = function() {
let deployAllTable = function() {  // Создаем таблицу
  for (let i = 0; i < dataRow; i++) {
      let tr = document.createElement('tr');
      let td;        
      let name = data[i].name.firstName;
      let lastName = data[i].name.lastName;
      let about = data[i].about;
      let eyeColor = data[i].eyeColor;
      
      tbody.appendChild(tr);
      td = document.createElement('td');
      td.classList.add('data-firstName');
      td.classList.add('col-1');
      td.innerHTML = name;
      tr.appendChild(td);

      td = document.createElement('td');
      td.classList.add('data-lastName');
      td.classList.add('col-2');
      td.innerHTML = lastName;
      tr.appendChild(td);

      td = document.createElement('td');
      td.classList.add('data-about');
      td.classList.add('col-3');
      td.innerHTML = about;         
      tr.appendChild(td);

      td = document.createElement('td');
      td.classList.add('data-eyeColor');
      td.classList.add('col-4');
      td.style.background = eyeColor;
      td.innerHTML = eyeColor;
      tr.appendChild(td);
  }
  let dataTableRow = document.querySelectorAll('tr');
  let headers = document.querySelectorAll('th');
  data.forEach.call(headers, function(header, index) {
  header.addEventListener('click', function() {
    sortColumn(index,dataTableRow);
  })
  })
  changePage(currentPage);  // Отрисовываем начальную страницу таблицы
}

deployAllTable();

let dataTableRow = tbody.querySelectorAll('tr');

// Устанавливаем слушатель событий на строки
for (let i = 0; i < dataTableRow.length; i++) {  
  dataTableRow[i].addEventListener('click', function() {
    dataTableRow[i].classList.add('active'); 
    editRow(dataTableRow[i]);  // Вызываем функцию редактирования строки и передаем строку, которую будем изменять
  })
}

// Редактирование строки
let editRow = function(row,e) {  
  modalElem.classList.add('active');  // Задаем класс для модального окна
  overlayElem.classList.add('active');
  inputElems = document.querySelectorAll('.modal__input');
  let firstName = row.querySelector('.data-firstName').textContent;  // Получаем содержимое ячеек 
  let lastName = row.querySelector('.data-lastName').textContent;
  let about = row.querySelector('.data-about').textContent;
  let eyeColor = row.querySelector('.data-eyeColor').textContent;
  for (let i = 0; i < dataTableRow.length; i++) {
    if (dataTableRow[i].classList.contains('active')) {
      inputElems[0].placeholder = firstName;  // Устанавливаем placeHolder для каждого инпута
      inputElems[1].placeholder = lastName
      inputElems[2].placeholder = about
      inputElems[3].placeholder = eyeColor
    }
  }
}


// Слушатель событий на кнопке модального окна
submitButton.addEventListener('click', () => {
  let newFirstName = inputElems[0].value; // Сохраняем значение инпутов
  let newLastName = inputElems[1].value;
  let newAbout = inputElems[2].value;
  let newEyeColor = inputElems[3].value;

  for (let i = 0; i < dataTableRow.length; i++) {
    if (dataTableRow[i].classList.contains('active')) {
      if (newFirstName) {   // Если в инпуте есть какое-то значение, то изменяем содержимое ячейки
        dataTableRow[i].querySelector('.data-firstName').textContent = newFirstName;
      } if (newLastName) {
        dataTableRow[i].querySelector('.data-lastName').textContent = newLastName;
      } if (newAbout) {
        dataTableRow[i].querySelector('.data-about').textContent = newAbout;
      } if (newEyeColor) {
        dataTableRow[i].querySelector('.data-eyeColor').textContent = newEyeColor;
        dataTableRow[i].querySelector('.data-eyeColor').style.background = '';
        dataTableRow[i].querySelector('.data-eyeColor').style.background = newEyeColor;
        if (!dataTableRow[i].querySelector('.data-eyeColor').style.background || newEyeColor === 'white') {  // Если данные из ячейки нельзя преобразовать в фоновый цвет || фон = белый
          dataTableRow[i].querySelector('.data-eyeColor').style.color = 'black'; 
        } else {
          dataTableRow[i].querySelector('.data-eyeColor').style.color = 'white'; 
        }
        if (newEyeColor === 'black') {
          dataTableRow[i].querySelector('.data-eyeColor').style.color = 'white';
        }
      }
      dataTableRow[i].classList.remove('active');
    }
  }

  inputElems[0].value = '';  // Очищаем значение инпутов
  inputElems[1].value = '';
  inputElems[2].value = '';
  inputElems[3].value = '';
  
  modalElem.classList.remove('active');  // Убираем класс после окончания редактирования строки
  overlayElem.classList.remove('active');
})

let closemodal = function() {
  for (let i = 0; i < dataRow; i++) {
    if (dataTableRow[i].classList.contains('active')) {
      dataTableRow[i].classList.remove('active');
      modalElem.classList.remove('active');
      overlayElem.classList.remove('active');
    }
  }
  inputElems[0].value = '';  // Очищаем значение инпутов
  inputElems[1].value = '';
  inputElems[2].value = '';
  inputElems[3].value = '';
}

// При закрытии модального окна сбрасываем класс active
closeButton.addEventListener('click', () => {  
  closemodal();  
})

// Функция для установки слушателя событий на заголовки таблицы
data.forEach.call(headers, function(header, index) {  
  header.addEventListener('click', function() {
    // Функция выполняющая сортировку
    if (counter % 2 === 1) {   // Направление в зависимости от счетчика
      counter++;
      let A_z = false; 
      sortColumn(index, A_z);  // Вызываем функцию сортировки и передаем номер столбца и направление
    } else if (counter % 2 != 1) {
      counter++;
      let A_z = true;
      sortColumn(index, A_z);
    }
  })
})

// Функция сортировки таблицы по значению
let sortColumn = function(index, A_z) {  
  let newRows = Array.from(dataTableRow);  
  
  [...tbody.getElementsByTagName('tr')].forEach((tr) => {  
    tr.style.display='none'; // Скрываем все строки
  });
  newRows.sort(function(rowA, rowB) { 
  let cellA = rowA.querySelectorAll('td')[index].innerHTML;
  let cellB = rowB.querySelectorAll('td')[index].innerHTML;

  if (A_z) {  // Проверяем направление сортировки
    if (cellA > cellB) {
      return 1;
    } else if (cellA < cellB) {
      return -1;
    } else if (cellA === cellB) {
      return 0;
    }
  } else if (!A_z) {
    if (cellA > cellB) {
      return -1;
    } else if (cellA < cellB) {
      return 1;
    } else if (cellA === cellB) {
      return 0;
    }
  }
  });

  // Удаляем строки из таблицы
  data.forEach.call(dataTableRow, function(row) {  
    tbody.removeChild(row);
  });

  // Добавление новых строк
  newRows.forEach(function(newRow) {
    newRow.style.display = ''; 
    tbody.appendChild(newRow);
    changePage(currentPage);
  })
}


// На каждый инпут вешаем слушатель события, который вызывает функцию
columnsInputs.forEach((columnsInput)=> {
  columnsInput.addEventListener('change', (e)=> {
    index = e.target.dataset.index;  // Передаем номер столбца, который нужно скрыть/показать
    hideColumn(index);
  })
})

// Функция скрытия/показа столбца
function hideColumn(index) {
  
  switch (index) { 
    case '1' : {  
      let columnItems = document.querySelectorAll('.col-1'); 
      columnItems.forEach((item)=> { 
        item.classList.toggle('hidden');  // Каждой ячейке столбца добавляем/удаляем класс для отображения   
      })
      break;
    }
    case '2' : {
      let columnItems = document.querySelectorAll('.col-2');
      columnItems.forEach((item)=> {
        item.classList.toggle('hidden');
      })
      break;
    }
    case '3' : {
      let columnItems = document.querySelectorAll('.col-3');
      columnItems.forEach((item)=> {
        item.classList.toggle('hidden');
      })
      break;
    }
    case '4' : {
      let columnItems = document.querySelectorAll('.col-4');
      columnItems.forEach((item)=> {
        item.classList.toggle('hidden');
      })
      break;
    }
  }
}


}

// Функция для отображения страницы, которую мы передаем функции
function changePage(page) {
  
  let btnNext = document.getElementById('btnNext');
  let btnPrev = document.getElementById('btnPrev');
  let pageSpan = document.getElementById('page');
  
  [...tbody.getElementsByTagName('tr')].forEach((tr) => {
    tr.style.display='none'; // Скрываем все строки
  });

  // Строки которые удовлетворяют условию отображаем в таблице
  for (let i = (page - 1) * portionSize; i < (page * portionSize); i++) {  
    if (tbody.rows[i]) {
      tbody.rows[i].style.display='';
    } else {
      continue;
    }
  }

  // Выводим страницу на которой находимся + общ. кол-во страниц
  pageSpan.innerHTML = page + '/' + numPages();

  // Скрываем кнопки в зависимости от страницы на которой мы находимся
  if (page === 1) {
    btnPrev.style.visibility = 'hidden'
  } else {
    btnPrev.style.visibility = 'visible'
  }

  if (page === numPages()) {
    btnNext.style.visibility = 'hidden';
  } else {
    btnNext.style.visibility = 'visible';
  }
}

// Функция для отображения пред. страницы
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    changePage(currentPage);  
  }
}

// Функция для отображения след. страницы
function nextPage() {
  if (currentPage < numPages()) {
    currentPage++;
    changePage(currentPage);  
  }
}

function numPages() {
  return Math.ceil((tbody.rows.length - 1) / portionSize);
}










