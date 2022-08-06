const loadTable = () => {
  const mainTable = document.querySelector('.main__table');
  const tbody = document.querySelector('.tbody');
  const tableButton = document.querySelectorAll('.table__button button');
  const tableTitle = document.querySelector('.table__title');

  // Load Year (2021, 2022)
  tableButton.forEach(item => {
    item.addEventListener('click', () => {
      // console.log(item);
      // item.classList.toggle('active-btn');
      // tableTitle.style.display = 'block;'

      // console.log(item.classList.contains('year-2021-btn'));

      if (item.classList.contains('year-2021-btn')) {
        mainTable.style.display = 'block';

        const currentBtn = item;

        if (!currentBtn.classList.contains('active-btn')) {
          tableButton.forEach(item => {
            item.classList.remove('active-btn');
            item.disabled = false;
          });

          currentBtn.classList.add('active-btn');
          item.disabled = true;
        };

        const url = './db/register-of-certificates-2021.json';
        fetch(url)
        .then(response => {
          return response.json();
          // if (response.ok) {
          //   response.json();
          // } else {
          //   throw new Error('Дані були завантаженні з помилкою!')
          // }
        })
        .then(data => renderTable(data))
        .catch(error => console.log(error))
      };

    })
  });

  // OnButtonClick
  // const onButtonClick = () => {

  // }

  // Render Table
  const renderTable = (data) => {
    data.forEach(item => {

      localStorage.setItem('table', JSON.stringify(item));

      const { id, name, promotion_form, promotion_topic, volume_in_hours, date_of_issue, account } = item;

      const tableRow = document.createElement('tr');
      tableRow.classList.add('table__row');
      tableRow.innerHTML = `
        <tbody>
          <tr>
            <td id="id-number">${id}</td>
            <td>${name}</td>
            <td id="form-qual">${promotion_form}</td>
            <td>${promotion_topic}</td>
            <td>${volume_in_hours}</td>
            <td id="date-cert">${date_of_issue}</td>
            <td id="sequence_number">${account}</td>
          </tr>
        </tbody>
      `;

      tbody.append(tableRow);

    });

    // const loadMoreTableBtn = document.createElement('button');
    // loadMoreTableBtn.TextContent = "<button type='button'>Завантажити ще</button>";
    // loadMoreTableBtn.classList.add('load-more-table-btn');
    // mainTable.append(loadMoreTableBtn);
  };
};

loadTable();

// year2021Btn.addEventListener('click', () => {
//   // console.log('click1');
//   mainTable.style.display = 'flex';

//   year2021Btn.classList.add('active-btn');

//   const renderTable = (data) => {
//     data.forEach(item => {
//       // console.log(item);
//       localStorage.setItem('table', JSON.stringify(item));
  
//       const { name, education, development, credit, date, sequence_number } = item;
  
//       const tableRow = document.createElement('tr');
//       tableRow.classList.add('table__row');
//       tableRow.innerHTML = `
//         <tbody>
//           <tr>
//             <td>${name}</td>
//             <td>${education}</td>
//             <td>${development}</td>
//             <td>${credit}</td>
//             <td>${date}</td>
//             <td>${sequence_number}</td>
//           </tr>
//         </tbody>
//       `;
  
//       tbody.append(tableRow);
  
//       // console.log(tbody);
//     });
//   };

//   fetch('./db/register-of-certificates.json')
//   .then(response => response.json())
//   .then(data => renderTable(data))
//   .catch(error => console.log(error))

//   year2021Btn.disabled = true;

// });


