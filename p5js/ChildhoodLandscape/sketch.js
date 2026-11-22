// Childhood Landscape — p5.js (JavaScript)
// A colored-pencil countryside scene generated entirely from shapes.
// Press 'S' to save a PNG. Change SEED for different foliage and texture.
const W = 1200;
const H = 800;
const SEED = 27;

function setup() {
  createCanvas(W, H);
  smooth();
  randomSeed(SEED);
  noLoop();
}

function draw() {
  drawSky();
  drawSun();
  drawMountains();
  drawMeadow();
  drawRiver();
  drawDistantTrees();
  drawRoad();
  drawLane();
  drawForegroundTrees();
  drawHouse();
  drawFlowers();
  drawBirds();
  paperGrain();
}

function drawSky() {
  for (let y = 0; y < 460; y++) {
    let t = y / 460.0;
    stroke(lerpColor(color(166, 205, 232), color(255, 220, 162), t));
    line(0, y, W, y);
  }
  // Wispy pink pastel clouds.
  noStroke();
  for (let i = 0; i < 28; i++) {
    let x = random(100, W - 80), y = random(85, 310);
    fill(249, 171, 153, 24);
    ellipse(x, y, random(65, 210), random(8, 23));
  }
}

function drawSun() {
  noStroke();
  for (let r = 155; r >= 45; r -= 6) {
    fill(255, 191, 72, map(r, 155, 45, 4, 65));
    ellipse(755, 260, r * 2, r * 2);
  }
  fill(255, 231, 132);
  ellipse(755, 260, 93, 93);
}

function drawMountains() {
  noStroke();
  fill(174, 179, 193);
  beginShape();
  vertex(0, 445); vertex(140, 344); vertex(250, 400);
  vertex(425, 240); vertex(590, 402); vertex(770, 273);
  vertex(970, 416); vertex(1120, 295); vertex(1200, 356);
  vertex(1200, 495); vertex(0, 495);
  endShape(CLOSE);

  fill(121, 151, 174);
  beginShape();
  vertex(220, 450); vertex(430, 237); vertex(585, 411);
  vertex(776, 284); vertex(976, 448); vertex(1200, 355);
  vertex(1200, 525); vertex(220, 525);
  endShape(CLOSE);

  // Simple snow highlights.
  fill(226, 230, 225, 195);
  triangle(430, 237, 383, 307, 451, 286);
  triangle(776, 284, 737, 342, 799, 323);
  triangle(1120, 295, 1080, 352, 1140, 330);
  // Light pencil hatch on shaded slopes.
  stroke(74, 112, 152, 50);
  strokeWeight(1);
  for (let i = 0; i < 190; i++) {
    let x = random(260, 1180), y = random(360, 455);
    line(x, y, x + random(8, 27), y - random(1, 8));
  }
}

function drawMeadow() {
  noStroke();
  fill(151, 191, 117);
  beginShape();
  vertex(0, 435); vertex(260, 447); vertex(465, 427);
  vertex(690, 449); vertex(950, 430); vertex(1200, 448);
  vertex(1200, H); vertex(0, H);
  endShape(CLOSE);
  fill(127, 174, 101, 130);
  ellipse(940, 660, 790, 260);
  fill(187, 211, 127, 150);
  ellipse(235, 735, 650, 200);
}

function drawRiver() {
  // River widens as it flows from the mountain valley to the LEFT foreground.
  noStroke();
  fill(67, 142, 183);
  beginShape();
  vertex(674, 416);
  bezierVertex(571, 445, 488, 456, 418, 485);
  bezierVertex(270, 540, 215, 615, 0, 653);
  vertex(0, 765);
  bezierVertex(240, 692, 337, 613, 470, 544);
  bezierVertex(559, 502, 627, 453, 674, 416);
  endShape(CLOSE);

  // Fine blue/white water ripples.
  noFill();
  for (let i = 0; i < 100; i++) {
    let x = random(20, 565);
    let center = 642 - x * 0.36;
    let y = center + random(-12, 27);
    stroke(210, 231, 224, random(40, 130));
    strokeWeight(random(0.8, 2.2));
    line(x, y, x + random(12, 38), y - 3);
  }
  // Grassy near-bank boundary.
  stroke(78, 135, 79, 110);
  strokeWeight(4);
  noFill();
  beginShape();
  vertex(0, 765);
  bezierVertex(240, 692, 337, 613, 470, 544);
  bezierVertex(559, 502, 627, 453, 674, 416);
  endShape();
}

function drawDistantTrees() {
  for (let i = 0; i < 33; i++) {
    let x = random(20, W);
    let y = random(429, 480);
    smallTree(x, y, random(13, 31));
  }
}

function smallTree(x, y, r) {
  stroke(99, 89, 63, 190);
  strokeWeight(2);
  line(x, y, x, y - r);
  noStroke();
  fill(71 + random(35), 128 + random(48), 75, 190);
  ellipse(x, y - r * 1.25, r * 1.9, r * 1.75);
}

function drawRoad() {
  noStroke();
  fill(117, 111, 75, 70);
  beginShape();
  vertex(15, 799);
  bezierVertex(210, 709, 357, 605, 520, 523);
  bezierVertex(586, 489, 651, 466, 731, 465);
  vertex(744, 481);
  bezierVertex(658, 482, 600, 512, 536, 546);
  bezierVertex(375, 640, 205, 757, 86, 800);
  endShape(CLOSE);
  fill(231, 197, 143);
  beginShape();
  vertex(28, 799);
  bezierVertex(216, 709, 367, 615, 527, 528);
  bezierVertex(593, 492, 654, 474, 728, 469);
  vertex(738, 478);
  bezierVertex(651, 485, 596, 515, 533, 544);
  bezierVertex(380, 633, 221, 742, 71, 800);
  endShape(CLOSE);
  // Occasional sandy pencil strokes.
  stroke(157, 129, 93, 55);
  strokeWeight(1.3);
  for (let i = 0; i < 65; i++) {
    let x = random(100, 690);
    let y = 760 - x * 0.43 + random(-5, 5);
    line(x, y, x + random(5, 20), y - random(2, 8));
  }
}

function drawLane() {
  // Footpath only: from the river road to the red-roofed cottage.
  noFill();
  stroke(145, 116, 78, 100);
  strokeWeight(20);
  bezier(720, 480, 810, 477, 830, 579, 955, 638);
  stroke(226, 194, 145);
  strokeWeight(13);
  bezier(720, 480, 810, 477, 830, 579, 955, 638);
  stroke(255, 221, 166, 65);
  strokeWeight(2);
  bezier(720, 480, 810, 477, 830, 579, 955, 638);
}

function drawForegroundTrees() {
  bigTree(104, 540, 1.15);
  bigTree(1102, 511, 0.89);
  // Low foliage around the cottage, leaving its entrance visible.
  for (let i = 0; i < 65; i++) {
    let x = random(760, 1200), y = random(620, 790);
    shrub(x, y, random(10, 24));
  }
}

function bigTree(x, y, s) {
  push();
  translate(x, y);
  scale(s);
  noStroke();
  fill(109, 80, 59);
  quad(-12, 0, 12, 0, 17, -182, -15, -182);
  stroke(110, 83, 64, 160);
  strokeWeight(6);
  line(0, -117, -51, -172);
  line(0, -135, 54, -190);
  noStroke();
  for (let i = 0; i < 95; i++) {
    let a = random(TWO_PI);
    let rr = sqrt(random(1)) * 95;
    let cx = cos(a) * rr, cy = -200 + sin(a) * rr * 0.7;
    fill(random(65, 112), random(130, 179), random(65, 108), 160);
    ellipse(cx, cy, random(24, 48), random(21, 42));
  }
  pop();
}

function shrub(x, y, r) {
  noStroke();
  fill(random(63, 111), random(133, 179), random(63, 94), 190);
  ellipse(x, y, r * 2.3, r * 1.4);
  ellipse(x - r, y + 3, r * 1.4, r);
}

function drawHouse() {
  // The cottage is on the near bank: cream walls and red tiled roof.
  stroke(116, 87, 63);
  strokeWeight(2);
  fill(239, 215, 165);
  quad(867, 535, 1090, 535, 1090, 679, 867, 679);
  fill(226, 194, 145);
  triangle(867, 535, 980, 449, 1090, 535);

  // Roof overhang and diagonal roof planes.
  fill(170, 67, 49);
  quad(845, 540, 976, 438, 1110, 540, 1091, 556);
  fill(193, 79, 53);
  triangle(845, 540, 976, 438, 1095, 540);
  stroke(121, 48, 40, 145);
  strokeWeight(1.7);
  for (let row = 0; row < 7; row++) {
    let t = (row + 1) / 8.0;
    let yy = lerp(442, 540, t);
    let half = 130 * t;
    line(976 - half, yy, 976 + half, yy);
    for (let k = -row; k <= row; k++) {
      let xx = 976 + k * 17;
      line(xx, yy - 5, xx + 7, yy + 2);
    }
  }
  // Door, windows and tiny front step.
  stroke(92, 70, 54);
  strokeWeight(3);
  fill(107, 76, 57);
  rect(966, 586, 47, 93);
  fill(71, 113, 131);
  rect(886, 575, 52, 45);
  rect(1035, 575, 37, 45);
  stroke(234, 205, 151);
  line(912, 575, 912, 620);
  line(886, 598, 938, 598);
  line(1053, 575, 1053, 620);
  line(1035, 598, 1072, 598);
  noStroke();
  fill(236, 203, 164);
  rect(958, 679, 67, 11);
  fill(235, 200, 121);
  ellipse(1003, 635, 5, 5);
}

function drawFlowers() {
  randomSeed(SEED + 3);
  for (let i = 0; i < 155; i++) {
    let x = random(W), y = random(515, 795);
    // Avoid painting over water and major house details.
    if ((x < 430 && y < 725 - x * 0.3) ||
        (x > 855 && x < 1110 && y < 693)) continue;
    stroke(64, 124, 62, 120);
    strokeWeight(1);
    line(x, y, x - 2, y - 7);
    noStroke();
    if (random(1) < 0.28) {
      fill(240, random(125, 195), random(125, 185), 170);
      circle(x - 2, y - 8, random(3, 6));
    }
  }
}

function drawBirds() {
  noFill();
  stroke(71, 82, 88, 190);
  strokeWeight(2.8);
  bird(565, 133, 18);
  bird(605, 114, 14);
  bird(635, 155, 11);
}

function bird(x, y, r) {
  bezier(x - r, y - 5, x - r * .4, y - r, x, y - 2, x, y);
  bezier(x, y, x + r * .3, y - r, x + r, y - 5, x + r, y - 5);
}

function paperGrain() {
  randomSeed(SEED + 6);
  // Transparent speckles and short marks simulate grain and pastel dust.
  strokeWeight(1);
  for (let i = 0; i < 16000; i++) {
    let x = random(W), y = random(H);
    stroke(random(70, 155), random(70, 130), random(65, 115), random(5, 19));
    point(x, y);
  }
  for (let i = 0; i < 3500; i++) {
    let x = random(W), y = random(450, H);
    stroke(64, 109, 63, random(12, 37));
    line(x, y, x + random(-3, 3), y - random(2, 9));
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    saveCanvas('childhood-landscape', 'png');
  }
}
