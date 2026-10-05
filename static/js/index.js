(function () {
  "use strict";

  function initCarousel(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll(".slide"));
    var dotsWrap = root.querySelector(".carousel-dots");
    var prev = root.querySelector(".carousel-nav.prev");
    var next = root.querySelector(".carousel-nav.next");
    var legend = root.id
      ? Array.prototype.slice.call(document.querySelectorAll('[data-carousel="' + root.id + '"]'))
      : [];
    var current = 0;
    var inView = false;

    root.tabIndex = 0;

    var dots = slides.map(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", "Slide " + (i + 1) + " of " + slides.length);
      dot.addEventListener("click", function () { go(i); });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function syncVideos() {
      slides.forEach(function (slide, i) {
        var video = slide.querySelector("video");
        if (!video) return;
        if (i === current && inView) {
          if (video.preload === "none") video.preload = "auto";
          var playing = video.play();
          if (playing && playing.catch) playing.catch(function () {});
        } else {
          video.pause();
        }
      });
    }

    function go(index) {
      var changed = index !== current;
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var active = i === current;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
        dots[i].classList.toggle("is-active", active);
        dots[i].setAttribute("aria-current", active ? "true" : "false");
      });
      legend.forEach(function (el) {
        el.setAttribute("aria-current", Number(el.dataset.slide) === current ? "true" : "false");
      });
      if (changed) {
        var video = slides[current].querySelector("video");
        if (video) video.currentTime = 0;
      }
      syncVideos();
    }

    prev.addEventListener("click", function () { go(current - 1); });
    next.addEventListener("click", function () { go(current + 1); });

    legend.forEach(function (el) {
      el.addEventListener("click", function () { go(Number(el.dataset.slide)); });
    });

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { go(current - 1); e.preventDefault(); }
      if (e.key === "ArrowRight") { go(current + 1); e.preventDefault(); }
    });

    var touchX = null;
    root.addEventListener("touchstart", function (e) {
      touchX = e.touches[0].clientX;
    }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
      touchX = null;
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        syncVideos();
      }, { threshold: 0.25 }).observe(root);
    } else {
      inView = true;
    }

    go(0);
  }

  Array.prototype.forEach.call(document.querySelectorAll(".carousel"), initCarousel);
})();
