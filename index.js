var astro = document.getElementsByClassName("astro")[0];
var rope = document.getElementsByClassName("rope")[0];
var toolTipContainer = document.getElementsByClassName("tooltipcontainer")[0];
var planet = document.getElementsByClassName("planet")[0];
var r = document.querySelector(":root");
document.getElementsByClassName("toggleButton")[0].onclick = function () {
  var planetName = document.getElementById("selectPlanet");
  console.log(planetName.value);
  switch (planetName) {
    case "mars":
  }
  var rs = getComputedStyle(r);
  var jumpHeight = rs.getPropertyValue("--jump-height");
  var ropeHeight = rs.getPropertyValue("--rope-height");
  var animationTimer =
    parseInt(rs.getPropertyValue("--animation-timer").replace("s")) * 1000;

  r.style.setProperty("--jump-height", "400px");
  r.style.setProperty("--rope-height", "300px");
  astro.classList.add("astro-transition");
  rope.classList.add("rope-transition");
  setTimeout(() => {
    toolTipContainer.style.visibility = "visible";
    setTimeout(() => {
      toolTipContainer.style.visibility = "hidden";
      astro.classList.remove("astro-transition");
      rope.classList.remove("rope-transition");
    }, 2000);
  }, animationTimer);
};

document.getElementById("selectPlanet").onchange = function (e) {
  console.log(this.value);
  var planet = document.getElementsByClassName("planet")[0];
  var url =
    "url('./assets/images/" +
    this.value +
    ".png') no-repeat center center/cover";
  planet.style.background = url;
  if (this.value === "saturn") {
    console.log(planet.style);
    planet.style.clipPath = "circle(62% at 51% 66%";
    planet.style.height = "230px";
  } else {
    planet.style.height = "200px";
    planet.style.clipPath = "circle(50% at 50% 72%)";
  }
};

var img = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

img.src = "./assets/images/universe_1920.jpg";
var CanvasXSize = 800;
var CanvasYSize = 800;
var speed = 10; // lower is faster
var scale = 0.75;
var y = -4.5; // vertical offset

// Main program

var dx = 0.15;
var imgW;
var imgH;
var x = 0;
var clearX;
var clearY;
var ctx;

img.onload = function () {
  imgW = img.width * scale;
  imgH = img.height * scale;

  if (imgW > CanvasXSize) {
    // image larger than canvas
    x = CanvasXSize - imgW;
  }
  if (imgW > CanvasXSize) {
    // image width larger than canvas
    clearX = imgW;
  } else {
    clearX = CanvasXSize;
  }
  if (imgH > CanvasYSize) {
    // image height larger than canvas
    clearY = imgH;
  } else {
    clearY = CanvasYSize;
  }

  // get canvas context
  ctx = document.getElementById("canvas").getContext("2d");

  // set refresh rate
  return setInterval(draw, speed);
};

function draw() {
  ctx.clearRect(0, 0, clearX, clearY); // clear the canvas

  // if image is <= Canvas Size
  if (imgW <= CanvasXSize) {
    // reset, start from beginning
    if (x > CanvasXSize) {
      x = -imgW + x;
    }
    // draw additional image1
    if (x > 0) {
      ctx.drawImage(img, -imgW + x, y, imgW, imgH);
    }
    // draw additional image2
    if (x - imgW > 0) {
      ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
    }
  }

  // image is > Canvas Size
  else {
    // reset, start from beginning
    if (x > CanvasXSize) {
      x = CanvasXSize - imgW;
    }
    // draw additional image
    if (x > CanvasXSize - imgW) {
      ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
    }
  }
  // draw image
  ctx.drawImage(img, x, y, imgW, imgH);
  // amount to move
  x += dx;
}
