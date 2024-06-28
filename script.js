var timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});


const firstPageAnimate = () => {


  var tl = gsap.timeline()

  tl.from("header", {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })

    .to(".box-elem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 1.5,
      delay: -1,
      stagger: .2,
    })
    .from(".hero-footer", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
      delay: -1,
    })
}

const skewMouseCircle = () => {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (details) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, details.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, details.clientY - yprev);

    xprev = details.clientX;
    yprev = details.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
    }, 100);
  });
}


const circleMouseFollower = (xscale, yscale) => {
  window.addEventListener("mousemove", function (details) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
  });
}





skewMouseCircle()
circleMouseFollower()
firstPageAnimate()

document.querySelectorAll('.item').forEach((elem) => {
  var rotate = 0
  var diffRotate = 0

  elem.addEventListener("mouseleave", () => {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5
    })
  })

  elem.addEventListener("mousemove", (details) => {
    var diff = details.clientY - elem.getBoundingClientRect().top;
    diffRotate = details.clientX - rotate
    rotate = details.clientX
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffRotate * 0.5),
    })
  })
})