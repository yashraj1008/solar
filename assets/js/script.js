//------------------------- Preloader
$(function () {
  setTimeout(() => {
    $(".preloader").fadeOut("slow");
  }, 1000);
});
// ------------------------- scroll header
$(document).ready(function () {
  $(".navbar-anchor").on("click", function (e) {
    e.preventDefault();
    var $menu = $(this).next(".ul-design");
    var $allMenus = $(".ul-design.show");
    if ($menu.hasClass("show")) {
      $menu.css({
        transform: "translateY(15px)",
        opacity: "0",
      });
      setTimeout(function () {
        $menu.removeClass("show");
      }, 350);
    } else {
      $allMenus.each(function () {
        $(this).css({
          transform: "translateY(15px)",
          opacity: "0",
        });
        setTimeout(() => $(this).removeClass("show"), 350);
      });
      $menu.addClass("show").css({
        transform: "translateY(0)",
        opacity: "1",
      });
    }
  });
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".li-nav").length) {
      $(".ul-design.show").each(function () {
        $(this).css({
          transform: "translateY(15px)",
          opacity: "0",
        });
        setTimeout(() => $(this).removeClass("show"), 350);
      });
    }
  });
});
// ------------------------------- Header scroll Active
$(window).on("scroll", function () {
  const scrollTop = parseInt($(this).scrollTop(), 0);
  if (scrollTop > 0) {
    $("[data-header]").addClass("active");
  } else {
    $("[data-header]").removeClass("active");
  }
});
// ------------------------- menu open close
$(document).ready(function () {
  $(".menu-design").click(function () {
    $("#menu").addClass("active");
  });

  $(".close-btn").click(function () {
    $("#menu").removeClass("active");
  });

  $(".menu-anhor").click(function () {
    $(".menu-anhor p, .menu-anhor i").css("color", "");
    $(this).find("p, i").css("color", "#9FD456");
  });
});
// ----------------------- drop down open close
$(document).ready(function () {
  $(".menu-anhor").click(function () {
    let $clickedDropdown = $(this).next(".under-menu-li");
    let $clickedIcon = $(this).find("i");
    let isOpen = $clickedDropdown.hasClass("open");

    // Close other open dropdowns
    $(".under-menu-li.open")
      .not($clickedDropdown)
      .each(function () {
        let $otherDropdown = $(this);
        let $otherIcon = $otherDropdown.prev(".menu-anhor").find("i");

        $otherDropdown.animate(
          { height: 0, paddingTop: 0, paddingBottom: 0, opacity: 0 },
          500,
          "swing",
          function () {
            $otherDropdown.removeClass("open");
          }
        );
        $otherIcon.css({
          transition: "transform 0.4s ease",
          transform: "rotate(0deg)",
        });
      });

    if (isOpen) {
      // Close clicked dropdown
      $clickedDropdown.animate(
        { height: 0, paddingTop: 0, paddingBottom: 0, opacity: 0 },
        500,
        "swing",
        function () {
          $clickedDropdown.removeClass("open");
        }
      );
      $clickedIcon.css({
        transition: "transform 0.4s ease",
        transform: "rotate(0deg)",
      });
    } else {
      // Open clicked dropdown
      $clickedDropdown.css({
        height: "auto",
        paddingTop: 40,
        paddingBottom: 20,
      });
      let fullHeight = $clickedDropdown.outerHeight();

      $clickedDropdown.css({
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 0,
      });

      $clickedDropdown
        .addClass("open")
        .animate(
          { height: fullHeight, paddingTop: 40, paddingBottom: 20, opacity: 1 },
          500,
          "swing",
          function () {
            $clickedDropdown.css("height", "auto");
          }
        );

      $clickedIcon.css({
        transition: "transform 0.4s ease",
        transform: "rotate(45deg)",
      });
    }
  });
});

// ------------------------ smoth scroll
$(document).ready(function () {
  const $body = $("body");
  const $jsScroll = $(".js-scroll");
  const speed = 0.02;
  let offset = 0;
  let raf;
  if ($jsScroll.length) {
    function setBodyHeight() {
      const height = $jsScroll[0].getBoundingClientRect().height;
      $body.css("height", Math.floor(height) + "px");
    }
    setBodyHeight();
    $(window).on("resize", setBodyHeight);
    function smoothScroll() {
      offset += (window.pageYOffset - offset) * speed;
      $jsScroll.css("transform", `translateY(-${offset}px) translateZ(0)`);
      raf = requestAnimationFrame(smoothScroll);
    }
    smoothScroll();
  }
});
// ----------------------- left counter dersign
$(document).ready(function () {
  let counterStarted = false;
  function isInViewport($el) {
    if ($el.length === 0) return false; // element exists ke nai check
    let elementTop = $el.offset().top;
    let elementBottom = elementTop + $el.outerHeight();
    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }
  function startCounter() {
    $(".count").each(function () {
      let $this = $(this);
      let startNumber = 0;
      let target = parseInt($this.data("number"), 10);
      let counter = setInterval(function () {
        startNumber++;
        $this.text(startNumber);
        if (startNumber >= target) {
          clearInterval(counter);
        }
      }, 150);
    });
  }
  $(window).on("scroll load", function () {
    let $aboutData = $(".about-data"); // element cache karo
    if ($aboutData.length && !counterStarted && isInViewport($aboutData)) {
      counterStarted = true;
      startCounter();
    }
  });
});
// ---------------------- Second counter
$(document).ready(function () {
  var started = false;
  function isInViewport($el) {
    var rect = $el[0].getBoundingClientRect();
    return (
      rect.top < (window.innerHeight || $(window).height()) && rect.bottom >= 0
    );
  }
  function startCounter() {
    $(".counter-js").each(function () {
      var $counter = $(this);
      var count = 0;
      var target = parseInt($counter.data("count"), 10);
      function updateCount() {
        if (count < target) {
          count++;
          $counter.text(count);
          setTimeout(updateCount, 10);
        } else {
          $counter.text(target);
        }
      }
      updateCount();
    });
  }
  $(window).on("scroll", function () {
    if (!started) {
      var $triggerElements = $(".bihind-the-squre");
      $triggerElements.each(function () {
        if (isInViewport($(this))) {
          started = true;
          setTimeout(function () {
            startCounter();
          }, 2000);
          return false;
        }
      });
    }
  });
});
// --------------------- appointment slider
$(document).ready(function () {
  var images = [
    "assets/images/appointment/image-1.png",
    "assets/images/appointment/image-2.png",
    "assets/images/appointment/image-3.png",
    "assets/images/appointment/image-4.png",
  ];
  var index = 0;
  var $div = $(".main-div-appoint");
  $div.css("background-image", "url(" + images[index] + ")");
  setInterval(function () {
    index = (index + 1) % images.length;
    $div.css("background-image", "url(" + images[index] + ")");
  }, 3000);
});
// --------------------- Date time
$(function () {
  $("#datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    duration: "fast",
  });
});
$(document).ready(function () {
  $("#datepicker").on("change keyup", function () {
    if ($(this).val().trim() !== "") {
      $(".data-relative").show();
    } else {
      $(".data-relative").show();
    }
  });
});
// ------------------ Succes slider
$(document).ready(function () {
  $(".design-slick-succes-main").slick({
    centermode: true,
    slidesToShow: 4,
    centerPadding: "40px",
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    speed: 2000,
    autoplay: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1290,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});
// ------------------ testimonail all slider
$(document).ready(function () {
  $(".testimonial-detail").slick({
    centerMode: true,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    speed: 800,
    dots: true,
    fade: true,
    autoplay: true,
    cssEase: "linear",
    asNavFor: ".image-testimonail-slide",
  });
  $(".image-testimonail-slide").slick({
    centerMode: true,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    speed: 800,
    fade: true,
    autoplay: true,
    cssEase: "linear",
    asNavFor: ".testimonial-detail",
  });
});
// -------------------------- FAQ Section Design
$(document).ready(function () {
  $(".faq-question").click(function () {
    let parent = $(this).parent();
    $(".faq-question p").css("color", "");
    $(".data-open-faq").css("display", "flex");
    $(".data-close-faq").hide();
    if (!parent.hasClass("active")) {
      $(".faq-item").removeClass("active");
      $(".faq-answer").slideUp(300);
      $(".line-faq").slideUp(300);
      parent.addClass("active");
      parent.find(".faq-answer").slideDown(300);
      parent.find(".line-faq").slideDown(300);
      $(this).find("p").css("color", "#9FD456");
      $(this).find(".data-open-faq").hide();
      $(this).find(".data-close-faq").css("display", "flex");
    } else {
      parent.removeClass("active");
      parent.find(".faq-answer").slideUp(300);
      parent.find(".line-faq").slideUp(300);
      $(this).find(".data-open-faq").css("display", "flex");
      $(this).find(".data-close-faq").hide();
    }
  });
});
// --------------------- video-popup
$(document).ready(function () {
  $(".popup-youtube").magnificPopup({
    type: "iframe",
  });
});
/*----------------------- Whole Page Scrolling Animation -----------------------------*/
$(document).ready(function () {
  let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      $(entry.target).toggleClass("show", entry.isIntersecting);
    });
  });
  let hiddenElements = $(
    ".fade_up, .fade_down, .zoom_in, .zoom_out, .fade_right, .fade_left, .flip_left, .flip_right, .flip_up, .flip_down"
  );
  hiddenElements.each(function () {
    observer.observe(this);
  });
});
// --------------------- separate scroll
$(window).on("scroll", function () {
  const scrollTop = parseInt($(this).scrollTop(), 10);
  if (scrollTop > 5) {
    $("[data-header]").addClass("active");
  } else {
    $("[data-header]").removeClass("active");
  }
});
// ------------- signle team-progress design
$(document).ready(function () {
  let progressAnimated = false;
  function isInViewport($el) {
    if ($el.length === 0) return false;
    let elementTop = $el.offset().top;
    let elementBottom = elementTop + $el.outerHeight();
    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }
  function startProgress() {
    setTimeout(function () {
      $(".progress-bar").each(function () {
        var $this = $(this);
        var percent = $this.data("percent");
        var $percentText = $this.closest(".skill-box").find(".skill-percent");
        var progressWidth = $this.closest(".progress").width();
        $this.animate(
          { width: percent + "%" },
          {
            duration: 1500,
            step: function (now) {
              $percentText.text(Math.floor(now) + "%");
              var moveX = (now / 100) * (progressWidth - 30);
              $percentText.css("transform", "translateX(" + moveX + "px)");
            },
            complete: function () {
              $percentText.text(percent + "%");
            },
          }
        );
      });
    }, 100);
  }
  $(window).on("scroll resize", function () {
    let $target = $(".data-term-team");
    if ($target.length && !progressAnimated && isInViewport($target)) {
      progressAnimated = true;
      startProgress();
    }
  });
});
// ----------------------------------- FAQ data
$(document).ready(function () {
  $(".question-design-li").on("click", function (e) {
    e.preventDefault();
    $(".question-design-li").removeClass("active");
    $(this).addClass("active");
  });
});
// ------------------------ testimonail loader
$(function () {
  $(".seprate-test").slice(0, 9).show();
  $("body").on("click touchstart", ".load-more", function (e) {
    e.preventDefault();
    $(".seprate-test:hidden").slice(0, 3).slideDown();
    if ($(".seprate-test:hidden").length == 0) {
      $(".load-more").css("visibility", "hidden");
      $(".data-spot-testimonial").css("display", "none");
    }
    $("html,body").animate(
      {
        scrollTop: $(this).offset().top,
      },
      1000
    );
  });
});
// ------------------------ project-1 loader
$(function () {
  $(".data-project-1").slice(0, 9).show();
  $("body").on("click touchstart", ".load-more", function (e) {
    e.preventDefault();
    $(".data-project-1:hidden").slice(0, 3).slideDown();
    if ($(".data-project-1:hidden").length == 0) {
      $(".load-more").css("visibility", "hidden");
      $(".data-spot-testimonial").css("display", "none");
    }
    $("html,body").animate(
      {
        scrollTop: $(this).offset().top,
      },
      1000
    );
  });
});
// ------------------------ project-2 loader
$(function () {
  $(".project-two").slice(0, 9).show();
  $("body").on("click touchstart", ".load-more", function (e) {
    e.preventDefault();
    $(".project-two:hidden").slice(0, 3).slideDown();
    if ($(".project-two:hidden").length == 0) {
      $(".load-more").css("visibility", "hidden");
      $(".data-spot-testimonial").css("display", "none");
    }
    $("html,body").animate(
      {
        scrollTop: $(this).offset().top,
      },
      1000
    );
  });
});
// -------------------- project three slider
$(function () {
  var $slider = $(".slideshow .slider"),
    maxItems = $(".item", $slider).length,
    dragging = false,
    tracking,
    rightTracking;
  var $sliderRight = $(".slideshow")
    .clone()
    .addClass("slideshow-right")
    .appendTo($(".split-slideshow"));
  var rightItems = $(".item", $sliderRight).toArray();
  var reverseItems = rightItems.reverse();
  $(".slider", $sliderRight).html("");
  for (var i = 0; i < maxItems; i++) {
    $(reverseItems[i]).appendTo($(".slider", $sliderRight));
  }
  $(".slideshow-right .slider").slick({
    swipe: false,
    vertical: true,
    arrows: false,
    infinite: true,
    speed: 950,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    initialSlide: maxItems - 1,
  });
  if ($(".slideshow-text").length) {
    $(".slideshow-text").slick({
      swipe: false,
      vertical: true,
      arrows: false,
      infinite: true,
      speed: 900,
      cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    });
  }
  $slider.addClass("slideshow-left");
  $(".slideshow-left")
    .slick({
      vertical: true,
      verticalSwiping: true,
      arrows: false,
      infinite: true,
      dots: true,
      speed: 1000,
      cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      var rightSlider = $(".slideshow-right .slider");
      var textSlider = $(".slideshow-text");
      if (
        currentSlide > nextSlide &&
        nextSlide === 0 &&
        currentSlide === maxItems - 1
      ) {
        rightSlider.slick("slickGoTo", -1);
        textSlider.length && textSlider.slick("slickGoTo", maxItems);
      } else if (
        currentSlide < nextSlide &&
        currentSlide === 0 &&
        nextSlide === maxItems - 1
      ) {
        rightSlider.slick("slickGoTo", maxItems);
        textSlider.length && textSlider.slick("slickGoTo", -1);
      } else {
        rightSlider.slick("slickGoTo", maxItems - 1 - nextSlide);
        textSlider.length && textSlider.slick("slickGoTo", nextSlide);
      }
    })
    .on("mousewheel", function (event) {
      event.preventDefault();
      if (event.deltaY < 0) {
        $(this).slick("slickNext");
      } else {
        $(this).slick("slickPrev");
      }
    })
    .on("mousedown touchstart", function () {
      dragging = true;
      tracking = $(".slick-track", $slider).css("transform");
      tracking = tracking !== "none" ? parseInt(tracking.split(",")[5]) : 0;
      rightTracking = $(".slideshow-right .slick-track").css("transform");
      rightTracking =
        rightTracking !== "none" ? parseInt(rightTracking.split(",")[5]) : 0;
    })
    .on("mousemove touchmove", function () {
      if (dragging) {
        var newTracking = $(".slideshow-left .slick-track").css("transform");
        newTracking =
          newTracking !== "none" ? parseInt(newTracking.split(",")[5]) : 0;
        var diffTracking = newTracking - tracking;
        $(".slideshow-right .slick-track").css({
          transform:
            "matrix(1, 0, 0, 1, 0, " + (rightTracking - diffTracking) + ")",
        });
      }
    })
    .on("mouseleave touchend mouseup", function () {
      dragging = false;
    });
});
// ----------------------------- Project Four
$(function () {
  const cols = 3;
  const $main = $("#main");
  let parts = [];
  let current = 0;
  let playing = false;
  $.each(images, function (i, imgObj) {
    $("<img/>")[0].src = imgObj.src;
  });
  for (let col = 0; col < cols; col++) {
    let $part = $("<div>")
      .addClass("part")
      .css("--x", (-100 / cols) * col + "vw");
    let $section = $("<div>").addClass("section");
    let $img = $("<img>").attr("src", images[current].src);
    $section.append($img);
    if (col === Math.floor(cols / 2)) {
      let $text = $("<a>")
        .addClass("project-four-text")
        .attr("href", "single-projects.html")
        .text(images[current].text);
      $section.append($text);
    }
    $part.append($section);
    $main.append($part);
    parts.push($part);
  }
  let animOptions = { duration: 2.3, ease: "power4.inOut" };
  function go(dir) {
    if (playing) return;
    playing = true;
    if (current + dir < 0) current = images.length - 1;
    else if (current + dir >= images.length) current = 0;
    else current += dir;
    function up($part, $next) {
      $part.append($next);
      gsap.to($part[0], {
        ...animOptions,
        y: -window.innerHeight,
        onComplete: function () {
          $part.children().first().remove();
          gsap.set($part[0], { y: 0 });
        },
      });
    }
    function down($part, $next) {
      $part.prepend($next);
      gsap.set($part[0], { y: -window.innerHeight });
      gsap.to($part[0], {
        ...animOptions,
        y: 0,
        onComplete: function () {
          $part.children().last().remove();
          playing = false;
        },
      });
    }
    $.each(parts, function (i, $part) {
      let $next = $("<div>").addClass("section");
      let $img = $("<img>").attr("src", images[current].src);
      $next.append($img);
      if (i === Math.floor(cols / 2)) {
        let $text = $("<a>")
          .addClass("project-four-text")
          .attr("href", "single-projects.html")
          .text(images[current].text);
        $next.append($text);
      }
      if ((i - Math.max(0, dir)) % 2) down($part, $next);
      else up($part, $next);
    });
  }
  $(window).on("keydown", function (e) {
    if (["ArrowDown", "ArrowRight"].includes(e.key)) go(1);
    else if (["ArrowUp", "ArrowLeft"].includes(e.key)) go(-1);
  });
  let startY,
    endY,
    clicked = false;
  function mousedown(e) {
    clicked = true;
    startY = e.clientY || e.originalEvent.touches?.[0]?.clientY;
  }
  function mouseup(e) {
    endY = e.clientY || endY;
    if (clicked && startY && Math.abs(startY - endY) >= 40) {
      go(startY - endY > 0 ? 1 : -1);
      clicked = false;
      startY = null;
      endY = null;
    }
  }
  $(window)
    .on("mousedown touchstart", mousedown)
    .on("touchmove", function (e) {
      if (clicked) endY = e.originalEvent.touches?.[0]?.clientY;
    })
    .on("mouseup touchend", mouseup);
  let scrollTimeout;
  $(window).on("wheel mousewheel", function (e) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      let deltaY = e.originalEvent.deltaY || e.originalEvent.wheelDelta * -1;
      if (deltaY < -40) go(-1);
      else if (deltaY >= 40) go(1);
    }, 50);
  });
});
let images = [
  { src: "assets/images/project-3/image-1.png", text: "Residential Solar" },
  { src: "assets/images/project-3/image-2.png", text: "Commercial Solar" },
  { src: "assets/images/project-3/image-3.png", text: "Solar Panel" },
  { src: "assets/images/project-3/image-4.png", text: "Hybrid Solar" },
];
// ------------------------------------------ about-detail
$(document).ready(function () {
  $(".deright-sport").slick({
    centermode: false,
    slidesToShow: 4,
    infinite: true,
    arrows: false,
    autoplay: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1290,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
});
// ------------------------ blog-1 loader
$(function () {
  $(".data-blog-1").slice(0, 9).css("display", "flex");
  $("body").on("click touchstart", ".load-more", function (e) {
    e.preventDefault();
    $(".data-blog-1:hidden")
      .slice(0, 3)
      .css({ display: "flex", opacity: 0 })
      .hide()
      .slideDown(400)
      .animate({ opacity: 1 }, { queue: false, duration: 400 });
    if ($(".data-blog-1:hidden").length <= 0) {
      $(".load-more").css("visibility", "hidden");
      $(".data-spot-testimonial").hide();
    }
    $("html, body").animate(
      {
        scrollTop: $(this).offset().top,
      },
      1000
    );
  });
});
// ----------------------------------------- project 2
(function () {
  var $$ = function (selector, context) {
    var context = context || document;
    var elements = context.querySelectorAll(selector);
    return [].slice.call(elements);
  };
  function _fncSliderInit($slider, options) {
    var prefix = ".fnc-";
    var $slidesCont = $slider.querySelector(prefix + "slider__slides");
    var $slides = $$(prefix + "slide", $slider);
    var $controls = $$(prefix + "nav__control", $slider);
    var $controlsBgs = $$(prefix + "nav__bg", $slider);
    var $progressAS = $$(prefix + "nav__control-progress", $slider);
    var numOfSlides = $slides.length;
    var curSlide = 1;
    var sliding = false;
    var slidingAT =
      +parseFloat(getComputedStyle($slidesCont)["transition-duration"] || 0) *
      1000;
    var slidingDelay =
      +parseFloat(getComputedStyle($slidesCont)["transition-delay"] || 0) *
      1000;
    var autoSlidingActive = false;
    var autoSlidingTO;
    var autoSlidingDelay = 5000;
    var autoSlidingBlocked = false;
    var $activeSlide;
    var $activeControlsBg;
    var $prevControl;
    function setIDs() {
      $slides.forEach(function ($slide, index) {
        $slide.classList.add("fnc-slide-" + (index + 1));
      });
      $controls.forEach(function ($control, index) {
        $control.setAttribute("data-slide", index + 1);
        $control.classList.add("fnc-nav__control-" + (index + 1));
      });
      $controlsBgs.forEach(function ($bg, index) {
        $bg.classList.add("fnc-nav__bg-" + (index + 1));
      });
    }
    setIDs();
    function afterSlidingHandler() {
      var prevSlide = $slider.querySelector(".m--previous-slide");
      var prevNavBg = $slider.querySelector(".m--previous-nav-bg");
      if (prevSlide)
        prevSlide.classList.remove("m--active-slide", "m--previous-slide");
      if (prevNavBg)
        prevNavBg.classList.remove("m--active-nav-bg", "m--previous-nav-bg");
      $activeSlide.classList.remove("m--before-sliding");
      if ($activeControlsBg)
        $activeControlsBg.classList.remove("m--nav-bg-before");
      $prevControl.classList.remove("m--prev-control");
      $prevControl.classList.add("m--reset-progress");
      var triggerLayout = $prevControl.offsetTop;
      $prevControl.classList.remove("m--reset-progress");
      sliding = false;
      var layoutTrigger = $slider.offsetTop;
      if (autoSlidingActive && !autoSlidingBlocked) {
        setAutoslidingTO();
      }
    }
    function performSliding(slideID) {
      if (sliding) return;
      sliding = true;
      window.clearTimeout(autoSlidingTO);
      curSlide = slideID;
      $prevControl = $slider.querySelector(".m--active-control");
      if ($prevControl) {
        $prevControl.classList.remove("m--active-control");
        $prevControl.classList.add("m--prev-control");
      }
      var newControl = $slider.querySelector(
        prefix + "nav__control-" + slideID
      );
      if (newControl) newControl.classList.add("m--active-control");
      $activeSlide = $slider.querySelector(prefix + "slide-" + slideID);
      $activeControlsBg = $slider.querySelector(prefix + "nav__bg-" + slideID);
      var oldSlide = $slider.querySelector(".m--active-slide");
      var oldNavBg = $slider.querySelector(".m--active-nav-bg");
      if (oldSlide) oldSlide.classList.add("m--previous-slide");
      if (oldNavBg) oldNavBg.classList.add("m--previous-nav-bg");
      $activeSlide.classList.add("m--before-sliding");
      if ($activeControlsBg)
        $activeControlsBg.classList.add("m--nav-bg-before");
      var layoutTrigger = $activeSlide.offsetTop;
      $activeSlide.classList.add("m--active-slide");
      if ($activeControlsBg)
        $activeControlsBg.classList.add("m--active-nav-bg");
      setTimeout(afterSlidingHandler, slidingAT + slidingDelay);
    }
    function controlClickHandler() {
      if (sliding) return;
      if (this.classList.contains("m--active-control")) return;
      if (options.blockASafterClick) {
        autoSlidingBlocked = true;
        $slider.classList.add("m--autosliding-blocked");
      }
      var slideID = +this.getAttribute("data-slide");
      performSliding(slideID);
    }
    $controls.forEach(function ($control) {
      $control.addEventListener("click", controlClickHandler);
    });
    function setAutoslidingTO() {
      window.clearTimeout(autoSlidingTO);
      var delay = +options.autoSlidingDelay || autoSlidingDelay;
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 1;
      autoSlidingTO = setTimeout(function () {
        performSliding(curSlide);
      }, delay);
    }
    if (options.autoSliding || +options.autoSlidingDelay > 0) {
      if (options.autoSliding === false) return;
      autoSlidingActive = true;
      setAutoslidingTO();
      $slider.classList.add("m--with-autosliding");
      var triggerLayout = $slider.offsetTop;
      var delay = +options.autoSlidingDelay || autoSlidingDelay;
      delay += slidingDelay + slidingAT;
      $progressAS.forEach(function ($progress) {
        $progress.style.transition = "transform " + delay / 1000 + "s";
      });
    }
    var firstControl = $slider.querySelector(".fnc-nav__control:first-child");
    if (firstControl) firstControl.classList.add("m--active-control");
  }
  var fncSlider = function (sliderSelector, options) {
    var $sliders = $$(sliderSelector);
    $sliders.forEach(function ($slider) {
      _fncSliderInit($slider, options);
    });
  };
  window.fncSlider = fncSlider;
})();
document.addEventListener("DOMContentLoaded", function () {
  fncSlider(".example-slider", { autoSlidingDelay: 4000 });
  var $demoCont = document.querySelector(".demo-cont");
  document.querySelectorAll(".fnc-slide__action-btn").forEach(function ($btn) {
    $btn.addEventListener("click", function () {
      if ($demoCont) $demoCont.classList.toggle("credits-active");
    });
  });
  var creditsCloseBtn = document.querySelector(".demo-cont__credits-close");
  if (creditsCloseBtn) {
    creditsCloseBtn.addEventListener("click", function () {
      if ($demoCont) $demoCont.classList.remove("credits-active");
    });
  }
  var blendingBtn = document.querySelector(".js-activate-global-blending");
  if (blendingBtn) {
    blendingBtn.addEventListener("click", function () {
      var slider = document.querySelector(".example-slider");
      if (slider) slider.classList.toggle("m--global-blending-active");
    });
  }
});
// -------------------- slider Comming soon
$(".slider-coming").slick({
  draggable: true,
  arrows: false,
  dots: false,
  fade: true,
  speed: 1200,
  infinite: true,
  cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
  autoplay: true,
  autoplaySpeed: 1000,
  pauseOnHover: false,
});
// ------------------------------------ comming soon Time counter
$(function () {
  var targetDate = new Date(Date.UTC(2026, 3, 1));
  // Long date format
  var options = { year: "numeric", month: "long", day: "numeric" };
  var longDate = targetDate.toLocaleDateString("en-US", options);
  $("#long-date").text(longDate);
  var now = new Date();
  window.days = daysBetween(now, targetDate);
  var secondsLeft = secondsDifference(now, targetDate);
  window.hours = Math.floor(secondsLeft / 60 / 60);
  secondsLeft = secondsLeft - window.hours * 60 * 60;
  window.minutes = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft - window.minutes * 60;
  window.seconds = Math.floor(secondsLeft);
  startCountdown();
});
var interval;
function daysBetween(date1, date2) {
  var one_day = 1000 * 60 * 60 * 24;
  return Math.round((date2 - date1) / one_day);
}
function secondsDifference(date1, date2) {
  var one_day = 1000 * 60 * 60 * 24;
  var difference = (date2 - date1) / one_day;
  var offset = difference - Math.floor(difference);
  return offset * (60 * 60 * 24);
}
function startCountdown() {
  $("#input-container").hide();
  $("#countdown-container").show();
  displayValue("#js-days", window.days);
  displayValue("#js-hours", window.hours);
  displayValue("#js-minutes", window.minutes);
  displayValue("#js-seconds", window.seconds);
  interval = setInterval(function () {
    if (window.seconds > 0) {
      window.seconds--;
      displayValue("#js-seconds", window.seconds);
    } else if (window.minutes > 0) {
      window.minutes--;
      window.seconds = 59;
      updateValues("minutes");
    } else if (window.hours > 0) {
      window.hours--;
      window.minutes = 59;
      window.seconds = 59;
      updateValues("hours");
    } else {
      window.days--;
      window.hours = 23;
      window.minutes = 59;
      window.seconds = 59;
      updateValues("days");
    }
  }, 1000);
}
function updateValues(context) {
  if (context === "days") {
    displayValue("#js-days", window.days);
    displayValue("#js-hours", window.hours);
    displayValue("#js-minutes", window.minutes);
    displayValue("#js-seconds", window.seconds);
  } else if (context === "hours") {
    displayValue("#js-hours", window.hours);
    displayValue("#js-minutes", window.minutes);
    displayValue("#js-seconds", window.seconds);
  } else if (context === "minutes") {
    displayValue("#js-minutes", window.minutes);
    displayValue("#js-seconds", window.seconds);
  }
}
function displayValue(target, value) {
  var newDigit = $("<span></span>");
  $(newDigit).text(pad(value)).addClass("new");
  $(target).prepend(newDigit);
  $(target).find(".current").addClass("old").removeClass("current");
  setTimeout(function () {
    $(target).find(".old").remove();
    $(target).find(".new").addClass("current").removeClass("new");
  }, 900);
}
function pad(number) {
  return ("0" + number).slice(-2);
}
// ------------------------------ scrolll Btn
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#scroll").fadeIn().css("display", "flex");
    } else {
      $("#scroll").fadeOut();
    }
  });
  $("#scroll").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});
/*------------------------------------- Index main background home slider-------------------------------------*/
$(document).ready(function () {
  $(".video-slider-slider")
    .slick({
      dots: false,
      fade: true,
      speed: 1000,
      cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
      arrows: false,
      autoplay: true,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 1299,
          settings: {
            arrows: false,
          },
        },
      ],
    })
    .on("init", function () {
      $(".slick-active .slide-content").css({
        opacity: "1",
        transform: "translateY(0)",
      });
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      $(
        '.slick-slide[data-slick-index="' + currentSlide + '"] .slide-content'
      ).css({
        opacity: "0",
        transform: "translateY(30px)",
      });
    })
    .on("afterChange", function (event, slick, currentSlide) {
      $(
        '.slick-slide[data-slick-index="' + currentSlide + '"] .slide-content'
      ).css({
        opacity: "1",
        transform: "translateY(0)",
      });
    });
});
// ---------------------- trelxt
$(document).ready(function () {
  var $textElements = $(".title-about");
  function updateTextProgress() {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    $textElements.each(function () {
      var $el = $(this);
      var elOffset = $el.offset().top;
      var elHeight = $el.outerHeight();
      var start = elOffset - windowHeight * 0.8;
      var end = elOffset - windowHeight * 0.2;
      var progress = (scrollTop - start) / (end - start);
      progress = Math.max(0, Math.min(1, progress));
      $el.css("background-size", progress * 100 + "% 100%");
    });
  }
  $(window).on("scroll resize", updateTextProgress);
  updateTextProgress();
});
// ---------------------------------- services-detail-title
$(document).ready(function () {
  var $textElements = $(".services-detail-title");
  function updateTextProgress() {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    $textElements.each(function () {
      var $el = $(this);
      var elOffset = $el.offset().top;
      var elHeight = $el.outerHeight();
      var start = elOffset - windowHeight * 0.8;
      var end = elOffset - windowHeight * 0.2;
      var progress = (scrollTop - start) / (end - start);
      progress = Math.max(0, Math.min(1, progress));
      $el.css("background-size", progress * 100 + "% 100%");
    });
  }
  $(window).on("scroll resize", updateTextProgress);
  updateTextProgress();
});
// ---------------------------------------- Click data Offered
document.addEventListener("DOMContentLoaded", function () {
  const currentPage =
    window.location.pathname.split("/").pop() || "index-slider.html";
  const menuLinks = document.querySelectorAll(".ul-nav a");
  menuLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (
      linkHref === currentPage ||
      (currentPage === "" && linkHref === "index-slider.html") ||
      (linkHref !== "#" &&
        linkHref !== "javascript:void(0);" &&
        currentPage.includes(linkHref))
    ) {
      link.classList.add("active");
      const parentLi = link.closest(".ul-design")?.previousElementSibling;
      if (parentLi && parentLi.tagName === "A") {
        parentLi.classList.add("active");
      }
    }
  });
});
