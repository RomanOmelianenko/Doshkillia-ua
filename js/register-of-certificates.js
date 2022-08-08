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

  // Load Year (2021, 2022)
  tableButton.forEach((item) => {
    item.addEventListener("click", () => {

      if (item.classList.contains("year-2021-btn")) {
        onButton2021(item);
      } else if (item.classList.contains("year-2022-btn")) {
        // onButton2022(item);
      }
      
    });
  });

  // Render Table
  const renderTable = (data) => {
    data.forEach((item) => {
      localStorage.setItem("table", JSON.stringify(item));

      const {
        id,
        name,
        promotion_form,
        promotion_topic,
        volume_in_hours,
        date_of_issue,
        account,
      } = item;

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
      // console.log(tbody);

      // Scroll
      scroll();
    });
  };

  // Change data array
  const changeData = (data) => {
    const startStack = (count - 1) * stack;
    const endStack = stack * count; 

    renderTable(sliceArray(data, startStack, endStack));

    if (data.length > endStack) {
      count += 1;
    } else {
      loadMoreBtn.style.display = 'none';
    }
  };

  // Slice array
  const sliceArray = (data, start, end) => {
    const newArray = data.slice(start, end);
    return newArray;
  };

  // Get Certificate Array 2021
  const getData2021 = () => {
    const url = "./db/certificates-2021.json";
    fetch(url)
    .then((response) => {
      return response.json();
      // if (response.ok) {
      //   response.json();
      // } else {
      //   throw new Error('Дані були завантаженні з помилкою!')
      // }
    })
    .then((data) => changeData(data))
    .catch((error) => console.log(error));
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

  // Click Button-2021
  const onButton2021 = (item) => {
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

      getData2021();
    // }
  };

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

  loadMoreBtn.addEventListener('click', getData2021);
};

loadTable();
