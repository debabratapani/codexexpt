// Childhood Landscape — p5.js
const W = 1200;
const H = 800;
const SEED = 27;

const backRidge = 'M0 398 Q60 371 111 350 L146 325 Q178 305 203 320 L251 354 Q278 364 306 384 L359 354 Q388 335 415 303 L451 281 Q477 254 495 265 L525 290 Q552 301 577 329 L624 366 Q656 375 681 396 Q730 378 774 337 L801 311 Q823 289 845 303 L871 323 Q912 342 952 381 Q976 398 999 390 L1067 345 Q1113 305 1150 321 L1200 351 V480 H0 Z';
const frontRidge = 'M0 425 Q72 409 124 376 L186 348 Q211 338 225 351 L259 370 Q284 371 329 407 Q360 403 389 387 L428 370 Q456 366 485 387 Q536 419 588 423 Q637 411 680 380 L707 365 Q739 362 765 390 Q803 417 837 419 Q866 405 901 399 L931 379 Q959 367 978 388 L1018 405 Q1062 425 1103 407 L1200 372 V480 H0 Z';
const meadow = 'M0 433 C161 403 235 452 391 430 S568 440 672 424 C818 414 909 449 1023 425 S1134 428 1200 422 V800 H0 Z';
const river = 'M671 429 C596 435 544 450 548 472 C550 498 476 507 397 504 C331 501 270 525 278 559 C288 595 232 619 149 626 C88 629 35 633 0 651 V769 C78 729 215 719 290 681 C375 637 387 600 353 562 C329 534 383 529 445 535 C517 544 579 516 574 478 C570 454 622 442 671 429 Z';
const road = 'M679 440 C715 450 683 478 627 499 C566 521 583 552 611 577 C651 616 612 652 536 682 C435 719 367 752 338 800 H426 C452 765 500 741 565 710 C644 674 685 625 634 573 C600 539 593 529 639 508 C697 482 724 455 679 440 Z';
const lane = 'M622 593 C680 564 724 568 763 594 S810 624 856 619 L858 630 C805 638 783 619 757 602 S684 577 630 606 Z';
const roof = 'M777 551 L817 500 Q821 495 829 497 L936 506 L958 554 L853 547 Z';

function setup() {
  createCanvas(W, H);
  smooth();
  noLoop();
}

function draw() {
  randomSeed(SEED);
  drawSky();
  drawMountains();
  const grass = paint(meadow, wash(420, 800, ['#a8af67', '#879951', '#5f783f']));
  hatch(grass, [0, 421, W, H], 17600, ['#e5ce78', '#b7ba60', '#466b3e', '#274d36'], [4, -10], .32);
  drawWater();
  drawRoads();
  drawFlowers(grass);
  drawTrees();
  drawCottage();
  drawBirds();
  drawPaper();
}

function paint(outline, fillColor, edge, weight = 1) {
  const ctx = drawingContext;
  const path = new Path2D(outline);
  ctx.save();
  ctx.fillStyle = fillColor;
  ctx.fill(path);
  if (edge) {
    ctx.strokeStyle = edge;
    ctx.lineWidth = weight;
    ctx.lineJoin = 'round';
    ctx.stroke(path);
  }
  ctx.restore();
  return path;
}

function wash(top, bottom, colors) {
  const gradient = drawingContext.createLinearGradient(0, top, 0, bottom);
  colors.forEach((shade, i) => gradient.addColorStop(i / (colors.length - 1), shade));
  return gradient;
}

// Draw short, uneven strokes clipped to the same outline as the base color.
function hatch(path, [left, top, right, bottom], count, colors, [dx, dy], opacity) {
  const ctx = drawingContext;
  ctx.save();
  ctx.clip(path);
  ctx.lineCap = 'round';
  ctx.globalAlpha = opacity;
  for (const shade of colors) {
    ctx.beginPath();
    for (let i = 0; i < count / colors.length; i++) {
      const x = random(left, right);
      const y = random(top, bottom);
      const length = random(.18, 1.45);
      ctx.moveTo(x, y);
      ctx.lineTo(x + dx * length + random(-2, 2), y + dy * length + random(-2, 2));
    }
    ctx.strokeStyle = shade;
    ctx.lineWidth = random(.65, 1.55);
    ctx.stroke();
  }
  ctx.restore();
}

function drawSky() {
  const sky = paint('M0 0 H1200 V485 H0 Z',
    wash(0, 465, ['#819abe', '#ad98ba', '#e3a1a4', '#f7c999', '#f9d795']));
  hatch(sky, [0, 0, W, 455], 14000, ['#f9d8b7', '#777aaf', '#f4a89d', '#fbedcf'], [20, -2], .19);
  for (const cloud of [
    'M-40 148 Q105 139 150 117 Q225 95 260 120 Q313 126 401 112 Q353 147 251 149 Q176 177 56 165 Z',
    'M580 209 Q681 201 733 179 Q796 163 841 185 Q877 192 1003 171 Q978 200 887 210 Q789 234 700 225 Z',
    'M911 112 Q1041 104 1076 83 Q1121 68 1160 91 L1200 87 V116 Q1063 137 911 112 Z'
  ]) {
    const shape = paint(cloud, '#f6c1b355');
    hatch(shape, [0, 70, W, 237], 2700, ['#ffe1c1', '#de899d', '#ffd4be'], [25, -3], .29);
  }
  const glow = drawingContext.createRadialGradient(654, 309, 25, 654, 309, 146);
  glow.addColorStop(0, '#fff0aa');
  glow.addColorStop(1, '#ffd98c00');
  paint('M508 163 H800 V455 H508 Z', glow);
  const sun = paint('M602 309 A52 52 0 1 0 706 309 A52 52 0 1 0 602 309 Z', '#ffeca9');
  hatch(sun, [602, 257, 706, 361], 750, ['#fffbcb', '#ecad66'], [9, -2], .23);
}

function drawMountains() {
  const distant = paint(backRidge, wash(253, 461, ['#77719a', '#97819b', '#bb929d']));
  hatch(distant, [0, 254, W, 455], 8200, ['#d6a7b0', '#655e88', '#ebbaaf', '#9580a1'], [11, 15], .29);
  for (const slope of [
    'M485 265 Q535 290 577 329 L624 366 L584 407 Q540 363 514 342 Q488 319 485 265 Z',
    'M835 299 Q872 330 914 344 L968 394 L914 399 L882 361 Q844 341 835 299 Z',
    'M1131 317 Q1163 323 1200 351 V395 Q1162 374 1131 317 Z'
  ]) {
    const shade = paint(slope, '#5d638151');
    hatch(shade, [470, 260, W, 410], 4200, ['#685d83', '#a89ab1'], [9, 14], .3);
  }
  const hills = paint(frontRidge, wash(345, 468, ['#697f8b', '#7d9190', '#a5a880']));
  hatch(hills, [0, 340, W, 469], 7900, ['#506a78', '#a2abba', '#c3bc9d', '#728c85'], [13, 9], .32);
}

function drawWater() {
  const water = paint(river, wash(429, 770, ['#d4b4a0', '#83a5af', '#467c99', '#325f83']), '#616e49', 4);
  hatch(water, [0, 428, 672, 769], 9500, ['#e3d7b6', '#b2d1c8', '#365f83', '#74a6af'], [26, -1], .34);
  const sand = paint('M0 759 C100 724 209 713 283 675 C361 633 376 604 347 567 C320 527 385 525 445 529 C514 537 572 514 569 480 C568 466 570 460 585 453 C571 467 577 473 578 485 C583 525 522 552 447 543 C392 536 345 540 359 559 C400 608 379 646 296 688 C216 728 95 737 0 776 Z', '#b7aa70');
  hatch(sand, [0, 453, 586, 777], 8500, ['#dfc495', '#556b4f', '#766e4c'], [10, -5], .44);
  strokeWeight(1.4);
  for (let i = 0; i < 185; i++) {
    const t = random();
    const x = bezierPoint(0, 95, 216, 296, t) + random(-3, 3);
    const y = bezierPoint(776, 737, 728, 688, t) + random(0, 12);
    stroke(56, 98, 52, random(65, 155));
    line(x, y, x + random(-5, 5), y - random(3, 15));
  }
}

function drawRoads() {
  const track = paint(road, wash(440, 800, ['#c4a26e', '#e9bb85', '#c29765']), '#71694a', 2);
  hatch(track, [330, 435, 725, H], 9200, ['#f9d3a1', '#a57856', '#e8ad77', '#9a835b'], [9, -4], .37);
  const footpath = paint(lane, '#d1ab76', '#8f8152', 1.5);
  hatch(footpath, [620, 563, 859, 640], 2100, ['#f8d39f', '#946d53'], [6, 2], .42);
}

function drawFlowers(grass) {
  const ctx = drawingContext;
  const channels = [river, road, lane].map(outline => new Path2D(outline));
  const density = pixelDensity();
  for (let i = 0; i < 540; i++) {
    const x = random(W);
    const y = random(531, H);
    const size = (y - 450) / 350;
    if (!ctx.isPointInPath(grass, x * density, y * density) ||
        channels.some(path => ctx.isPointInPath(path, x * density, y * density))) continue;
    stroke(random(['#536941', '#b8b573', '#405c3a']));
    strokeWeight(random(.6, 1.4));
    line(x, y, x - size * 3, y - size * 11);
    if (random() < .32) {
      noStroke();
      fill(random(['#e6b87b', '#d9958a', '#f0d296', '#b7a1bb']));
      circle(x - size * 3, y - size * 11, size * random(2, 5));
    }
  }
}

function drawPaper() {
  const ctx = drawingContext;
  ctx.save();
  for (const shade of ['#482c41', '#fff2cb']) {
    ctx.fillStyle = shade;
    ctx.globalAlpha = .13;
    for (let i = 0; i < 32000; i++) {
      ctx.fillRect(random(W), random(H), random(.5, 2), random(.5, 1.7));
    }
  }
  ctx.restore();
}

function drawTrees() {
  for (let i = 0; i < 49; i++) {
    const x = random(W);
    const y = random(431, 469);
    if (x < 583 || x > 733) tree(x, y, random(.08, .21), i % 2 === 0);
  }
  tree(123, 592, 1.25);
  tree(1083, 620, 1.47, true);
  tree(1151, 573, .76);
  tree(61, 606, .52, true);
  tree(986, 580, .45);
}

function tree(x, y, size, mirrored = false) {
  push();
  translate(x, y);
  scale(mirrored ? -size : size, size);
  const trunk = paint('M-12 1 Q-3 -36 -8 -78 L-10 -137 L0 -145 L6 -88 Q11 -47 17 0 Q3 -5 -12 1 Z', '#795540');
  paint('M-3 -78 Q-31 -114 -56 -128 L-51 -135 Q-22 -124 0 -98 Q22 -126 44 -149 L50 -145 Q22 -112 7 -80 Z', '#795540');
  const crown = paint('M-80 -131 Q-106 -151 -84 -175 Q-89 -201 -59 -208 Q-52 -233 -22 -227 Q-4 -251 24 -234 Q45 -240 59 -216 Q84 -220 88 -195 Q114 -179 95 -158 Q104 -135 76 -129 Q65 -109 43 -122 Q23 -113 7 -134 Q-12 -114 -30 -126 Q-51 -108 -66 -128 Z', '#557249');
  const litCrown = paint('M-84 -161 Q-95 -181 -65 -198 Q-66 -220 -33 -220 Q-15 -239 12 -230 Q37 -234 53 -211 Q77 -217 84 -191 Q65 -183 56 -194 Q37 -178 20 -193 Q1 -173 -17 -185 Q-36 -162 -54 -173 Q-71 -154 -84 -161 Z', '#78934f');
  const density = .2 + size * .8;
  hatch(trunk, [-13, -133, 17, 2], 260 * density, ['#c79c70', '#483f32'], [1, -15], .42);
  hatch(crown, [-104, -242, 111, -109], 3600 * density, ['#354f3f', '#8d9b50', '#506b41', '#bbc16a'], [7, -6], .44);
  hatch(litCrown, [-98, -240, 88, -151], 2300 * density, ['#dbbe68', '#aebb61', '#627644'], [8, -6], .49);
  pop();
}

function drawCottage() {
  const litWall = paint('M791 551 L851 545 L852 623 L790 617 Z', '#f4d99f', '#8f664e', 2);
  const sideWall = paint('M851 545 L900 514 L943 549 L943 610 L852 623 Z', '#dfb77c', '#8f664e', 2);
  paint('M898 518 L901 490 L915 489 L916 523 Z', '#a65f47', '#805344', 2);
  hatch(litWall, [790, 544, 854, 624], 590, ['#fff0b5', '#d39766'], [3, 9], .39);
  hatch(sideWall, [850, 514, 943, 625], 800, ['#f7d397', '#a2684c'], [4, 8], .33);
  const tiles = paint(roof, wash(495, 553, ['#c97555', '#a9443a', '#82392f']), '#803933', 3);
  const ctx = drawingContext;
  ctx.save();
  ctx.clip(tiles);
  strokeWeight(1.2);
  for (let row = 0; row < 8; row++) {
    const y = 504 + row * 6.6;
    for (let x = 766 + row % 2 * 5; x < 956; x += 12) {
      const skew = random(-1.5, 1.5);
      stroke(random(['#713532', '#843e38', '#e18d65']));
      noFill();
      arc(x, y + (x - 830) * .045 + skew, 13, 4.7, 0, PI);
      line(x + 5, y + (x - 830) * .045, x + 7, y + 4 + (x - 830) * .045);
    }
  }
  ctx.restore();
  hatch(tiles, [775, 495, 963, 556], 1250, ['#e99567', '#713735', '#d06c50'], [5, 2], .34);
  paint('M850 546 L934 505 L960 554 L944 555 L932 517 L853 552 Z', '#873c35');
  paint('M849 624 L849 589 Q849 579 862 578 Q871 578 871 587 L870 621 Z', '#794d39', '#684436');
  paint('M841 624 L877 620 L882 627 L843 632 Z', '#c09b6a');
  paint('M800 567 L832 565 L831 588 L800 589 Z M890 565 L922 560 L922 587 L890 591 Z', '#ffdb83', '#805642', 3);
  stroke('#a16946');
  strokeWeight(2);
  line(816, 566, 816, 588);
  line(800, 578, 832, 576);
  line(905, 562, 906, 589);
  line(890, 578, 922, 573);
}

function drawBirds() {
  noFill();
  stroke('#5e5460');
  strokeWeight(2.2);
  for (const [x, y, span] of [[460, 163, 16], [504, 145, 12], [534, 179, 10]]) {
    bezier(x - span, y - 5, x - span * .5, y - span, x - 2, y - 7, x, y);
    bezier(x, y, x + 3, y - 8, x + span * .65, y - span, x + span, y - 5);
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('childhood-landscape', 'png');
  }
}
