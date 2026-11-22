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
  paint(backRidge, '#827397');
  paint(frontRidge, '#667d92');
  paint(meadow, '#97a85f');
  paint(river, '#558caa', '#6b7854', 3);
  paint(road, '#dbad77', '#aa8a59', 2);
  paint(lane, '#dcb682');
  drawTrees();
  drawCottage();
  drawBirds();
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

function drawSky() {
  const sky = drawingContext.createLinearGradient(0, 0, 0, 465);
  sky.addColorStop(0, '#809abb');
  sky.addColorStop(.35, '#c8a1b7');
  sky.addColorStop(.77, '#efb78c');
  sky.addColorStop(1, '#f8d69b');
  paint('M0 0 H1200 V485 H0 Z', sky);
  noStroke();
  fill('#ffe6a3');
  circle(654, 309, 104);
}

function drawTrees() {
  for (let i = 0; i < 49; i++) {
    const x = random(W);
    const y = random(431, 469);
    if (x < 583 || x > 733) tree(x, y, random(.08, .21));
  }
  tree(123, 592, 1.25);
  tree(1083, 620, 1.47);
  tree(1151, 573, .76);
  tree(61, 606, .52);
  tree(986, 580, .45);
}

function tree(x, y, size) {
  push();
  translate(x, y);
  scale(size);
  paint('M-12 1 Q-3 -36 -8 -78 L-10 -137 L0 -145 L6 -88 Q11 -47 17 0 Q3 -5 -12 1 Z', '#795540');
  paint('M-3 -78 Q-31 -114 -56 -128 L-51 -135 Q-22 -124 0 -98 Q22 -126 44 -149 L50 -145 Q22 -112 7 -80 Z', '#795540');
  paint('M-80 -131 Q-106 -151 -84 -175 Q-89 -201 -59 -208 Q-52 -233 -22 -227 Q-4 -251 24 -234 Q45 -240 59 -216 Q84 -220 88 -195 Q114 -179 95 -158 Q104 -135 76 -129 Q65 -109 43 -122 Q23 -113 7 -134 Q-12 -114 -30 -126 Q-51 -108 -66 -128 Z', '#557249');
  paint('M-84 -161 Q-95 -181 -65 -198 Q-66 -220 -33 -220 Q-15 -239 12 -230 Q37 -234 53 -211 Q77 -217 84 -191 Q65 -183 56 -194 Q37 -178 20 -193 Q1 -173 -17 -185 Q-36 -162 -54 -173 Q-71 -154 -84 -161 Z', '#78934f');
  pop();
}

function drawCottage() {
  paint('M791 551 L851 545 L852 623 L790 617 Z', '#f4d99f', '#8f664e', 2);
  paint('M851 545 L900 514 L943 549 L943 610 L852 623 Z', '#dfb77c', '#8f664e', 2);
  paint('M898 518 L901 490 L915 489 L916 523 Z', '#a65f47', '#805344', 2);
  paint(roof, '#ac4c40', '#803933', 3);
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
