function clickTab() {
  const tabsBtn = document.querySelectorAll('.tabs__nav-btn');
  const tabsItems = document.querySelectorAll('.main__tabs');
  const headerBackgroundColor = document.querySelector('.header');
  const mainBackgroundColor = document.querySelectorAll('.main__tabs-item');

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
      };
      
      // Background-Color
      mainBackgroundColor.forEach(item => {
        
        const currentItem = item.getAttribute('data-item-id');
        if (currentItem === tabId) {
          switch (currentItem) {
            case '#tab-1': 
              headerBackgroundColor.style.background = "#dedfd9";
              item.style.background = 'linear-gradient(to right, #b8926e, #d0ae8b, #d0ad91)';     
              break;
    
            case '#tab-2':
              headerBackgroundColor.style.background = '#e7d6bc';
              item.style.background = '#e7d6bc';
              break;
    
            case '#tab-3':
              headerBackgroundColor.style.background = '#ffffe0';
              item.style.background = '#ffffe0';
              break;
    
            case '#tab-4':
              headerBackgroundColor.style.background = 'linear-gradient(to bottom, #ffffe0, #fff)';
              item.style.background = 'linear-gradient(to bottom, #fff, #ffffe0)';
              break;
    
            case '#tab-5':
              headerBackgroundColor.style.background = 'linear-gradient(to top, #e6ecef, #add8e6, #69c7e6, #10ace0)';
              item.style.background = 'linear-gradient(to bottom, #add8e6, #69c7e6, #10ace0)';
              break;
    
            case '#tab-6':
              headerBackgroundColor.style.background = 'linear-gradient(to right, #00e0f0, #00ccce, #00b1b3, #00a7bf)';
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
  // document.querySelector('.tabs__nav-btn:nth-child(6)').click();
};

clickTab();