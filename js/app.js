function clickTab() {
  const tabsBtn = document.querySelectorAll('.tabs__nav-btn');
  const tabsItems = document.querySelectorAll('.main__tabs');
  const headerBackgroundColor = document.querySelector('.header');
  const mainBackgroundColor = document.querySelectorAll('.main__tabs-item');
  // console.log(mainBackgroundColor);

  tabsBtn.forEach(onTabClick);

  function onTabClick (item) {
    item.addEventListener('click', () => {
      const currentBtn = item;
      const tabId = currentBtn.getAttribute('data-tab');
      const currentTab = document.querySelector(tabId);

      if (!currentBtn.classList.contains('active')) {
        tabsBtn.forEach((item) => {
          item.classList.remove('active');
        });
    
        tabsItems.forEach((item) => {
          item.classList.remove('active');
        });
    
        currentBtn.classList.add('active');
        currentTab.classList.add('active');

        
        // if (currentBtn.classList.contains('active')) {
        //   headerBackgrondColor.style.background = 'red';
        // }

      };
      
      // Background-Color
      mainBackgroundColor.forEach(item => {
        // console.log(item);
        const currentItem = item.getAttribute('data-item-id');
        if (currentItem === tabId) {
          switch (currentItem) {
            case '#tab-1':
              // headerBackgroundColor.style.backgroundColor = '#f7e6ca';
              // headerBackgroundColor.style.backgroundColor = 'rgba(247, 230, 202, 0.5)';         
              // headerBackgroundColor.style.background ="#d6d7d1"; 
              headerBackgroundColor.style.background = "#dedfd9";
              // headerBackgroundColor.style.background = 'linear-gradient(to bottom, #fdfbfb, lightgrey)';
              // headerBackgroundColor.style.background = 'linear-gradient(to right, #828da1, #838b64, #dfe0da, #dfe0da)';     
              // item.style.backgroundColor = '#f7e6ca';
              // item.style.backgroundColor = '#d3b698';
              item.style.background = 'linear-gradient(to right, #b8926e, #d0ae8b, #d0ad91)';     
              // item.style.backgroundColor = '#f7e6ca';
              break;
    
            case '#tab-2':
              // headerBackgroundColor.style.backgroundColor = '#e4d4c5';
              // headerBackgroundColor.style.background = "#d8be99";
              headerBackgroundColor.style.background = '#e7d6bc';
              // headerBackgroundColor.style.backgroundImage = 'linear-gradient()';
              // headerBackgroundColor.style.backgroundImage = 'linear-gradient()';
              // item.style.backgroundColor = '#e4d4c5';
              // item.style.backgroundImage = 'linear-gradient(to right, #d9c19f, #e7d6bc, #e9ddc5)';
              item.style.background = '#e7d6bc';
              // item.style.backgroundImage = 'linear-gradient()';
              break;
    
            case '#tab-3':
              headerBackgroundColor.style.background = '#ffffe0';
              item.style.background = '#ffffe0';
              // headerBackgroundColor.style.background = 'linear-gradient(to bottom, #ffffe0, #fff)';
              // // item.style.backgroundColor = '#ffffe0';
              // item.style.background = 'linear-gradient(to bottom, #fff, #ffffe0)';
              break;
    
            case '#tab-4':
              // headerBackgroundColor.style.backgroundColor = 'yellow';
              headerBackgroundColor.style.background = 'linear-gradient(to bottom, #ffffe0, #fff)';
              // item.style.backgroundColor = '#ffffe0';
              item.style.background = 'linear-gradient(to bottom, #fff, #ffffe0)';
              break;
    
            case '#tab-5':
              // headerBackgroundColor.style.backgroundColor = 'lightblue';
              headerBackgroundColor.style.background = 'linear-gradient(to top, #e6ecef, #add8e6, #69c7e6, #10ace0)';
              // item.style.backgroundColor = 'lightblue';
              item.style.background = 'linear-gradient(to bottom, #add8e6, #69c7e6, #10ace0)';
              break;
    
            case '#tab-6':
              // headerBackgroundColor.style.backgroundColor = 'coral';
              headerBackgroundColor.style.background = 'linear-gradient(to right, #00e0f0, #00ccce, #00b1b3, #00a7bf)';
              // item.style.backgroundColor = '#ffffe0';
              item.style.background = 'linear-gradient(to right, #00a59e, #00ccce, #00a7bf)';
              break;

              default: 
                console.log('Что-то не идёт');
          };
        };
      });
    });
  };

  // Имитация первого клика (триггер)
  document.querySelector('.tabs__nav-btn').click();
  // document.querySelector('.tabs__nav-btn:nth-child(3)').click();
};

clickTab();