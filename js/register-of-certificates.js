const loadTable = () => {
  const mainTable = document.querySelector(".main__table");
  const tbody = document.querySelector(".tbody");
  const tableButton = document.querySelectorAll(".table__button button");
  const loadMoreBtn = document.querySelector(".load-more-btn");

  let stack = 50;
  let count = 1;
  // let step = 0;

   // Используум пакет seamless-scroll-polyfill для кроссбраузерности (теперь во всех браузерах будет работать плавный скрол)
   seamless.polyfill();

  // 1. Load Year (2021, 2022)
  tableButton.forEach((item) => {
    item.addEventListener("click", (e) => {
      // console.log(e.target.textContent);
      // console.log(item);

      if (e.target.textContent === '2021' || e.target.textContent === '2022') {
        onButton(item);
        // console.log('2021', item);
      } 
      // else if (e.target.textContent === '2022') {
      //   // console.log('click 2022');
      //   onButton(item);
      //   // console.log('2022', item);
      // }

      // if (item.classList.contains("year-2021-btn")) {
      //   onButton2021(item);
      // } else if (item.classList.contains("year-2022-btn")) {
      //   // onButton2022(item);
      // }
      
    });
  });

  // 2. Click Button (2021-2022)
  const onButton = (item) => {
    // if (item.classList.contains("year-2021-btn")) {
      mainTable.style.display = "block";

      const currentBtn = item;

      if (!currentBtn.classList.contains("active-btn")) {
        tableButton.forEach((item) => {
          item.classList.remove("active-btn");
          item.disabled = false;
        });

        currentBtn.classList.add("active-btn");
        item.disabled = true;
      }

      getData(item);
    // }
  };

  // 3. Get Certificate Array (2021 - 2022)
  const getData = (item) => {
    const itemTextContent = item.textContent;
    // switch (item.textContent) {
    //   case '2021': 
    //     url = "./db/certificates-2021.json";
    //     break;

    //   case '2022': 
    //     url = "./db/certificates-2022.json";
    //     break;

    //   default:
    //     console.log('Жодна з умов не відповідає switch');
    // };

    const url = `./db/certificates-${itemTextContent}.json`;
    fetch(url)
    .then((response) => {
      return response.json();
      // if (response.ok) {
      //   response.json();
      // } else {
      //   throw new Error('Дані були завантаженні з помилкою!')
      // }
    })
    .then((data) => {
      localStorage.setItem(`table-${itemTextContent}`, JSON.stringify(data));
      changeData(itemTextContent);
    })
    .catch((error) => console.log(error));
  };

  // 4. Change data array
  const changeData = (itemTextContent) => {
    // console.log(itemTextContent);
    const dataLocalGet = JSON.parse(localStorage.getItem('table-2021'));
    // console.log(dataLocalGet);

    const startStack = (count - 1) * stack;
    const endStack = stack * count; 

    renderTable(sliceArray(dataLocalGet, startStack, endStack));

    if (dataLocalGet.length > endStack) {
      count += 1;
    } else {
      loadMoreBtn.style.display = 'none';
    }
  };

  // 5. Slice array
  const sliceArray = (data, start, end) => {
    // console.log(data);
    const newArray = data.slice(start, end);
    return newArray;
  };

  // 6. Render Table
  const renderTable = (data) => {
    // console.log(data);
    
    if (localStorage.getItem('table-2021')) {
      // console.log('дані є');
      data.forEach((item) => {

        const { id, name, promotion_form, promotion_topic, volume_in_hours, date_of_issue, account } = item;
  
        const tableRow = document.createElement("tr");
        tableRow.classList.add("table__row");
        tableRow.innerHTML = `
            <tr>
              <td id="id-number">${id}</td>
              <td>${name}</td>
              <td id="form-qual">${promotion_form}</td>
              <td id="theme">${promotion_topic}</td>
              <td id="volume-in-hours">${volume_in_hours}</td>
              <td id="date-cert">${date_of_issue}</td>
              <td id="sequence_number">${account}</td>
            </tr>
        `;
  
        tbody.append(tableRow);
  
        scroll();
      });
    } else {
      // console.log('дані відсутні');
    }
  };

  // Get Certificate Array 2022
  // const getData2022 = () => {
  //   const url = "./db/certificates-2022.json";
  //   fetch(url)
  //   .then((response) => {
  //     return response.json();
  //     // if (response.ok) {
  //     //   response.json();
  //     // } else {
  //     //   throw new Error('Дані були завантаженні з помилкою!')
  //     // }
  //   })
  //   .then((data) => changeData(data))
  //   .catch((error) => console.log(error));
  // };

  // Click Button-2022
  // const onButton2022 = (item) => {
  //   // if (item.classList.contains("year-2021-btn")) {
  //     mainTable.style.display = "block";

  //     const currentBtn = item;

  //     if (!currentBtn.classList.contains("active-btn")) {
  //       tableButton.forEach((item) => {
  //         item.classList.remove("active-btn");
  //         item.disabled = false;
  //       });

  //       currentBtn.classList.add("active-btn");
  //       item.disabled = true;
  //     }

  //     getData2022();
  //   // }
  // };

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
    // else {
    //   seamless.scrollIntoView(tbody, {
    //     behavior: "smooth",
    //     block: "end",
    //   });
    // }
  };

  loadMoreBtn.addEventListener('click', changeData);
};

loadTable();
