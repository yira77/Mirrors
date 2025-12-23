let s;
let num;
let strokes;
let count = 0;
let hues = 0;

let toolbar, th;
let saveBtn, clearBtn, fillBtn;

function setup() {
  toolbar = document.getElementById("toolbar");
  th = toolbar.offsetHeight;

  vw = window.visualViewport.width;
  vh = window.visualViewport.height;

  console.log(th);
  let canvas = createCanvas(vw, vh - th * 1.2);
  canvas.style("display", "block");

  angleMode(DEGREES);
  colorMode(HSL, 360, 100, 100, 100);
  background(0);

  fillBtn = createButton('<i class="fa-solid fa-brush"></i>');
  fillBtn.parent("toolbar");
  fillBtn.addClass("fillBtn");
  fillBtn.mousePressed(fillMode);
  fillBtn.touchStarted(() => {
    fillMode();
    return false;
  });

  strokes = createSlider(1, 10, 1);
  strokes.parent("toolbar");
  strokes.addClass("strokes");

  num = createInput(7, "number");
  num.attribute("min", 1);
  num.attribute("max", 250);
  num.attribute("step", 1);
  num.parent("toolbar");
  num.addClass("num");

  clearBtn = createButton('<i class="fa-solid fa-broom-ball"></i>');
  clearBtn.parent("toolbar");
  clearBtn.addClass("clearBtn");
  clearBtn.mousePressed(clearArt);
  clearBtn.touchStarted(() => {
    background(0);
    resetTool?.();
    return false; // prevents default
  });

  saveBtn = createButton('<i class="fa-solid fa-download"></i>');
  saveBtn.parent("toolbar");
  saveBtn.addClass("saveBtn");
  saveBtn.mousePressed(saveArt);
  saveBtn.touchStarted(() => {
    saveArt();
    return false;
  });
}

function drawing() {
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  let pmx = pmouseX - width / 2;
  let pmy = pmouseY - height / 2;

  //strokes
  let str = strokes.value();
  strokeWeight(str);

  //fillMode
  switch (count) {
    case 0: //White
      stroke(79);
      break;

    case 1: //Pastel
      stroke(random(360), 80, 75);
      break;

    case 2: //Rainbow
      stroke(hues, 100, 60);
      hues = (hues + 1) % 360;
      break;

    default:
      count = 0;
      stroke(0);
  }

  //Drawing & Mirroring
  s = int(num.value());
  let angle = 360 / s;
  for (let i = 0; i < s; i++) {
    push();
    translate(width / 2, height / 2);
    rotate(angle * i);
    line(pmx, pmy, mx, my);

    scale(1, -1);
    line(pmx, pmy, mx, my);
    pop();
  }
}

//Mobile Drawing
function touchMoved(e) {
  if (e.target.tagName === "CANVAS") {
    drawing();
  }
}

function mouseDragged(e) {
  if (e.target.tagName === "CANVAS") {
    drawing();
  }
}

function windowResized() {
  vw = window.visualViewport.width;
  vh = window.visualViewport.height;

  resizeCanvas(vw, vh - th);
}

function saveArt() {
  saveCanvas("Art", "png");
}

function clearArt() {
  background(0);
}

function fillMode() {
  count = (count + 1) % 3;

  switch (count) {
    case 0:
      fillBtn.style("border", "2px solid black");
      fillBtn.style("color", "black");
      break;
    case 1:
      fillBtn.style("border", "2px solid pink");
      fillBtn.style("color", "pink");
      break;
    case 2:
      fillBtn.style("border", "2px solid gray");
      fillBtn.style("color", "gray");
      break;
    default:
      fillBtn.style("border", "2px solid black");
      fillBtn.style("color", "black");
      break;
  }
}
