$(document).ready(function () {
  // 헤더
  const header = $(".header"),
    mainMenu = $(".mainMenu"),
    nav = $(".header nav"),
    mainMenuLi = $(".mainMenu > li"),
    subMenu = $(".subMenu");

  let headerHeight = header.outerHeight();
  let subMenuHeight = 0;
  for (i = 0; i < subMenu.length; i++) {
    if (subMenu.eq(i).outerHeight() > subMenuHeight) {
      subMenuHeight = subMenu.eq(i).outerHeight();
    }
  }
  nav.mouseenter(function () {
    header.css("height", `${headerHeight + subMenuHeight}px`);
  });
  nav.mouseleave(function () {
    header.css("height", `${headerHeight}px`);
  });

  $(window).resize(function () {
    header.css("height", "");
    headerHeight = header.outerHeight();
  });

  // nav.mouseenter(function () {
  //   // header.css("height", `${headerHeight + subMenuHeight}px`);
  //   subMenu.stop().slideDown();
  // });
  // nav.mouseleave(function () {
  //   // header.css("height", `${headerHeight}px`);
  //   subMenu.stop().slideUp();
  // });

  // $(window).resize(function () {
  //   header.css("height", "");
  //   headerHeight = header.outerHeight();
  // });

  // 모바일 메뉴
  const mbBtn = $(".header .mb-btn"),
    mbMenu = $(".mb-menu"),
    mbMainMenu = $(".mb-mainMenu"),
    mbMainMenuLi = $(".mb-mainMenu > li"),
    mbMainMenuA = $(".mb-mainMenu > li > a"),
    mbSubMenu = $(".mb-subMenu"),
    mbClose = $(".mbMenu_close");

  mbBtn.click(function () {
    mbMenu.addClass("on");
  });
  mbClose.click(function () {
    mbMenu.removeClass("on");
    mbSubMenu.hide();
    mbMainMenuLi.removeClass("on");
  });

  // 모바일 메뉴 아코디언
  // mbMainMenuLi.click(function (e) {
  //   e.preventDefault();
  //   $(this).find(mbSubMenu).stop().slideToggle();
  //   $(this).siblings("li").find(mbSubMenu).slideUp();
  //   $(this).siblings("li").removeClass("on");
  //   $(this).toggleClass("on");
  // });

  $.each(mbMainMenuLi, function (index, item) {
    let depth1 = $(this).find(".mb-mainMenu-a");
    depth1.click(function (e) {
      e.preventDefault();
      let temp = $(this).hasClass("on");
      if (temp) {
        $(this).removeClass("on");
        $(this).next().stop().slideUp();
      } else {
        mbMainMenuA.removeClass("on");
        $(this).addClass("on");
        mbSubMenu.stop().slideUp();
        $(this).next().stop().slideDown();
      }
    });
  });

  // 리사이즈될 때
  $(window).resize(function () {
    if ($(window).width() >= 1040) {
      mbBtn.removeClass("on");
      mbMenu.removeClass("on");
      mbMainMenuLi.removeClass("on");
      mbSubMenu.hide();
    }
  });

  // 베스트메뉴 탭메뉴
  const tabList = $(".tabList li"),
    tabPanel = $(".tabPanel");

  tabList.click(function (e) {
    e.preventDefault();
    // tabPanel.hide();
    tabList.removeClass("on");
    $(this).addClass("on");
    let targetIdx = $(this).index();
    tabPanel.removeClass("focus");
    tabPanel.eq(targetIdx).addClass("focus");
  });
  tabList.eq(0).trigger("click");

  // 브랜드 글자
  const philosophy = $(".brand .philosophy"),
    brandDiv = $(".brand .container div");
  brandDiv.mouseover(function () {
    philosophy.removeClass("on");
    $(this).addClass("on");
  });
  brandDiv.mouseout(function () {
    $(this).removeClass("on");
    philosophy.addClass("on");
  });

  // ===== gotop =====
  $(".gotop").click(function () {
    $("html").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  // 스와이퍼
  let swVisual = new Swiper(".sw-visual", {
    loop: true,
    speed: 2000,
    effect: "fade",
    autoplay: {
      delay: 2500,
      // disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  let swMbVisual = new Swiper(".sw-mb-visual", {
    loop: true,
    speed: 3000,
    autoplay: {
      delay: 2500,
      // disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // 비주얼 스와이퍼 플레이 버튼
  const visualPause = $(".pause-btn"),
    visualPlay = $(".play-btn");

  visualPause.click(function () {
    $(this).toggleClass("play");
    let temp = $(this).hasClass("play");
    if (temp) {
      swVisual.autoplay.stop();
      swMbVisual.autoplay.stop();
    } else {
      swVisual.autoplay.start();
      swMbVisual.autoplay.start();
    }
  });

  function initializeSwiper01() {
    // 현재 Swiper 인스턴스가 있으면 파괴
    if (window.menuSwiper) {
      window.menuSwiper.destory(true, true);
    }
    let swNewMenuOption = {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 30,
      centeredSlides: false,
      navigation: {
        prevEl: ".sw-newMenu-prev",
        nextEl: ".sw-newMenu-next",
      },
      breakpoints: {
        0: {
          slidesPerView: "auto",
          spaceBetween: 10,
        },
        460: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        780: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        980: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 4,
        },
      },
    };

    // 화면 너비에 따라 centeredSlides 설정
    if (window.innerWidth < 460) {
      swNewMenuOption.centeredSlides = true;
    }
    // Swiper 인스턴스 생성
    window.menuSwiper = new Swiper(".sw-newMenu", swNewMenuOption);
  }
  // 최초 실행
  initializeSwiper01();

  // 화면 크기 변경 시 Swiper 재초기화
  let resizeTimer01;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer01);
    resizeTimer01 = setTimeout(initializeSwiper, 250);
  });

  function initializeSwiper02() {
    // 현재 Swiper 인스턴스가 있으면 파괴
    if (window.bestmenuSwiper) {
      window.bestmenuSwiper.destory(true, true);
    }
    let swBestMenuOption = {
      loop: true,
      observer: true,
      observeParents: true,
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: false,
      navigation: {
        prevEl: ".sw-bestMenu-prev",
        nextEl: ".sw-bestMenu-next",
      },
      breakpoints: {
        0: {
          slidesPerView: "auto",
          spaceBetween: 0,
          loop: false,
          centeredSlides: true,
        },
        580: {
          slidesPerView: "auto",
          spaceBetween: 5,
          loop: false,
          centeredSlides: true,
        },
        680: {
          slidesPerView: 2,
          spaceBetween: 10,
          loop: true,
          centeredSlides: false,
        },
        1040: {
          slidesPerView: 2,
          spaceBetween: 10,
          loop: true,
          centeredSlides: false,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          centeredSlides: false,
        },
      },
    };

    // 화면 너비에 따라 centeredSlides 설정
    if (window.innerWidth < 460) {
      swBestMenuOption.centeredSlides = true;
    }
    // Swiper 인스턴스 생성
    window.menuSwiper = new Swiper(".sw-bestMenu", swBestMenuOption);
  }
  // 최초 실행
  initializeSwiper02();

  // 화면 크기 변경 시 Swiper 재초기화
  let resizeTimer02;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer02);
    resizeTimer02 = setTimeout(initializeSwiper, 250);
  });

  // AOS
  AOS.init({
    once: true,
    duration: 1000,
    easing: "ease-in",
  });
});
