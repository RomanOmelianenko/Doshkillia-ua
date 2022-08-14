const loadTable = () => {
  const mainTable = document.querySelector(".main__table");
  const tbody = document.querySelector(".tbody");
  const tableButton = document.querySelector(".table__button button");
  const loadMoreBtn = document.querySelector(".load-more-btn");

  let stack = 50;
  let count = 1;

  // Используум пакет seamless-scroll-polyfill для кроссбраузерности (теперь во всех браузерахбудет работать плавный скрол)
  seamless.polyfill();

  // 1. Click Button (2021-2022)
  const onButton = () => {
    mainTable.style.display = "block";
    tableButton.classList.add("active-btn");
    tableButton.disabled = true;

    getData();
  };

  // 2. Get Certificate Array (2021 - 2022)
  const getData = () => {

    const url = './db/certificates-2021-2022.json';
    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      localStorage.setItem('table-2021-2022', JSON.stringify(data));
      changeData();
    })
    .catch((error) => console.log(error));
  };

  // 3. Change data array
  const changeData = () => {
      const dataLocalGet = JSON.parse(localStorage.getItem('table-2021-2022'));
      const startStack = (count - 1) * stack;
      const endStack = stack * count; 
  
      renderTable(sliceArray(dataLocalGet, startStack, endStack));
  
      if (dataLocalGet.length > endStack) {
        count += 1;
      } else {
        loadMoreBtn.style.display = 'none';
      }
  };

  // 4. Slice array
  const sliceArray = (data, start, end) => {
    const newArray = data.slice(start, end);
    return newArray;
  };

  // 5. Render Table
  const renderTable = (data) => {
    data.forEach(item => {
      const { id, name, promotion_form, promotion_topic, volume_in_hours, date_of_issue, account } = item;

      const tableRow = document.createElement("tr");
      tableRow.classList.add("table__row");
      tableRow.innerHTML = `
        <td id="id-number">${id}</td>
        <td>${name}</td>
        <td id="form-qual">${promotion_form}</td>
        <td id="theme">${promotion_topic}</td>
        <td id="volume-in-hours">${volume_in_hours}</td>
        <td id="date-cert">${date_of_issue}</td>
        <td id="sequence_number">${account}</td>
      `;

      tbody.append(tableRow);
    });

    scroll();
  };

  const scroll = () => {
    if (loadMoreBtn) {
      seamless.scrollIntoView(loadMoreBtn, {
        behavior: "smooth",
        block: "end",
      });
      // Другий спосіб скролу
      // window.scrollTo({
      //   top: document.documentElement.offsetHeight,
      //   behavior: 'smooth',
      // });
    } 
    else {
      seamless.scrollIntoView(tbody, {
        behavior: "smooth",
        block: "end",
      });
    }
  };

  tableButton.addEventListener("click", onButton);
  loadMoreBtn.addEventListener('click', changeData);
};

loadTable();
