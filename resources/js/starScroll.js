document.getElementbyId("body").onscroll = function myFunction() {
    var scrolltotop = document.scrollingElement.scrollTop;
    var target = document.getElementById("main");
    var xvalue = "center";
    var factor = 0.2;
    var yvalue = scrolltotop * factor;
    target.style.background-Position = xvalue + " " + yvalue + "px";
  }

// (function(){
//
//   var parallax = document.querySelectorAll("mainContainer"),
//       speed = 0.5;
//
//   window.onscroll = function(){
//     [].slice.call(parallax).forEach(function(el,i){
//
//       var windowYOffset = window.pageYOffset,
//           elBackgrounPos = "50% " + (windowYOffset * speed) + "px";
//
//       el.style.backgroundPosition = elBackgrounPos;
//
//     });
//   };
//
// })();

// (function () {
//         var body = document.body.mainContainer,
//                 e = document.documentElement,
//                 scrollPercent;
//         $(window).unbind("scroll").scroll(function () {
//             scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
//             body.style.backgroundPosition = "0px " + scrollPercent + "%";
//         });
// })();
