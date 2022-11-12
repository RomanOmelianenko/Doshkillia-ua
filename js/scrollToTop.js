// function scrollToTop() {
  const scrollTop = document.querySelector(".scrollTop");

  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollTop.style.display = "block";
    } else {
      scrollTop.style.display = "none";
      scrollTop.style.pointerEvents = "auto";
    }
  }

  scrollTop.addEventListener('click', event => {
    scrollTop.style.pointerEvents = "none";
    scrollToTop(1000);
  })

  function scrollToTop (duration) {
    // cancel if already on top
    if (document.scrollingElement.scrollTop === 0) return;

    const totalScrollDistance = document.scrollingElement.scrollTop;
    let scrollY = totalScrollDistance, oldTimestamp = null;

    function step (newTimestamp) {
      if (oldTimestamp !== null) {
        // if duration is 0 scrollY will be -Infinity
        scrollY -= totalScrollDistance * (newTimestamp - oldTimestamp) / duration;
        if (scrollY <= 0) return document.scrollingElement.scrollTop = 0;
        document.scrollingElement.scrollTop = scrollY;
      }
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }
// };

// scrollTop();
