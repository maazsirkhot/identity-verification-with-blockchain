/**
 * Template Name: MyResume - v2.1.0
 * Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
!(function ($) {
  "use strict";

  // Preloader
  $(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });
  $(document).ready(function () {
    $(".venobox").venobox();
    // Header scroll class
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $("#header").addClass("header-scrolled");
      } else {
        $("#header").removeClass("header-scrolled");
      }
    });

    if ($(window).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    }

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");

      $(".mobile-nav-toggle i").toggleClass("fa fa-bars");
      $(".mobile-nav-toggle i").toggleClass("fa fa-times");
    });
    $(document).click(function (e) {
      var container = $(".mobile-nav-toggle");
      if (container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass("fa fa-bars");
          $(".mobile-nav-toggle i").toggleClass("fa fa-times");
        }
      }
    });
  });
})(jQuery);
