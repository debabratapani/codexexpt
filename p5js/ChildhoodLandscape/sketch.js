// Childhood Landscape — p5.js
const W = 1200;
const H = 800;
const SEED = 27;

const backRidge = 'M0 304 Q69 270 117 284 L208 266 L310 273 L434 246 L516 262 Q620 240 694 207 L747 212 L912 164 Q933 160 958 174 L1029 194 L1118 224 L1170 222 L1200 230 V440 H0 Z';
const frontRidge = 'M0 344 L99 321 L195 326 L289 308 L375 299 L470 281 L548 295 L642 273 L703 272 L784 235 L841 247 L920 209 L1037 248 L1130 252 L1200 241 V420 H0 Z';
const meadow = 'M0 367 C156 345 229 361 382 347 S570 365 692 347 Q807 332 880 350 Q976 329 1043 340 L1200 331 V800 H0 Z';
const river = 'M671 429 C596 435 544 450 548 472 C550 498 476 507 397 504 C331 501 270 525 278 559 C288 595 232 619 149 626 C88 629 35 633 0 651 V769 C78 729 215 719 290 681 C375 637 387 600 353 562 C329 534 383 529 445 535 C517 544 579 516 574 478 C570 454 622 442 671 429 Z';
const road = `
  M679 440
  C715 450 683 478 627 499
  C566 521 583 552 611 577
  C651 616 612 652 536 682
  C435 719 367 752 338 800
  H426
  C452 765 500 741 565 710
  C611 689 645 662 655 638
  C672 628 686 626 703 627
  C738 628 762 641 795 644
  C818 647 846 642 860 632
  L857 627
  C841 636 818 639 797 635
  C761 628 739 616 701 616
  C675 616 663 624 656 610
  Q651 592 634 573
  C600 539 593 529 639 508
  C697 482 724 455 679 440 Z
`;
const roof = 'M777 551 L817 500 Q821 495 829 497 L936 506 L958 554 L853 547 Z';

const treeBranches = 'M-3 -78 Q-31 -114 -56 -128 L-51 -135 Q-22 -124 0 -98 Q22 -126 44 -149 L50 -145 Q22 -112 7 -80 Z';
const treeTrunk = 'M-12 1 Q-3 -36 -8 -78 L-10 -137 L0 -145 L6 -88 Q11 -47 17 0 Q3 -5 -12 1 Z';

const treeCrown = 'M-80 -131 Q-106 -151 -84 -175 Q-89 -201 -59 -208 Q-52 -233 -22 -227 Q-4 -251 24 -234 Q45 -240 59 -216 Q84 -220 88 -195 Q114 -179 95 -158 Q104 -135 76 -129 Q65 -109 43 -122 Q23 -113 7 -134 Q-12 -114 -30 -126 Q-51 -108 -66 -128 Z';

const treeLitCrown = 'M-84 -161 Q-95 -181 -65 -198 Q-66 -220 -33 -220 Q-15 -239 12 -230 Q37 -234 53 -211 Q77 -217 84 -191 Q65 -183 56 -194 Q37 -178 20 -193 Q1 -173 -17 -185 Q-36 -162 -54 -173 Q-71 -154 -84 -161 Z';

// Trees on the bank facing the foreground bend.
const riversideTrees = [
  [123, 592, 1.25, false],
  [61, 606, .52, true],
];

function setup() {
  createCanvas(W, H);
  smooth();
  noLoop();
}

function draw() {
  randomSeed(SEED);
  drawSky();
  drawMountains();
  const grass = paint(meadow, wash(345, 800, ['#bbcc70', '#c0ce7d', '#a7be69']));
  hatch(grass, [0, 335, W, H], 17600, ['#f5e8a2', '#e6cf68', '#75a85b', '#539347'], [4, -10], .32);
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
    wash(0, 336, ['#e8c9ce', '#f6c9b4', '#ffe1a5', '#f4bcac']));
  hatch(sky, [0, 0, W, 455], 14000, ['#fff3ca', '#bc86aa', '#e98099', '#e8a84b'], [22, -6], .38);
  for (const cloud of [
    'M-40 148 Q105 139 150 117 Q225 95 260 120 Q313 126 401 112 Q353 147 251 149 Q176 177 56 165 Z',
    'M580 209 Q681 201 733 179 Q796 163 841 185 Q877 192 1003 171 Q978 200 887 210 Q789 234 700 225 Z',
    'M911 112 Q1041 104 1076 83 Q1121 68 1160 91 L1200 87 V116 Q1063 137 911 112 Z'
  ]) {
    const shape = paint(cloud, '#f6c1b355');
    hatch(shape, [0, 70, W, 237], 2700, ['#ffe1c1', '#de899d', '#ffd4be'], [25, -3], .29);
  }
  const glow = drawingContext.createRadialGradient(814, 204, 28, 814, 204, 137);
  glow.addColorStop(0, '#fff0aa');
  glow.addColorStop(1, '#ffd98c00');
  paint('M676 66 H952 V342 H676 Z', glow);
  const ctx = drawingContext;
  ctx.save();
  ctx.strokeStyle = '#e69541b0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let ray = 0; ray < 10; ray++) {
    const angle = Math.PI * (1.1 + ray * .093);
    const reach = 66 + (ray % 3) * 8;
    ctx.moveTo(814 + 49 * Math.cos(angle), 204 + 45 * Math.sin(angle));
    ctx.lineTo(814 + reach * Math.cos(angle), 204 + reach * Math.sin(angle));
  }
  ctx.stroke();
  ctx.restore();
  const sun = paint('M772 204 A42 37 0 1 0 856 204 A42 37 0 1 0 772 204 Z', '#ffc644');
  hatch(sun, [772, 167, 856, 241], 750, ['#fffbcb', '#ecad66'], [9, -2], .23);
}

function drawMountains() {
  const distant = paint(backRidge, wash(160, 360, ['#7776b9', '#7399ce', '#b0bbe0']));
  hatch(distant, [0, 158, W, 360], 8200, ['#e0d2dc', '#465eb3', '#84b8e6', '#8179be'], [13, -11], .46);
  const face = paint('M913 163 Q944 170 979 185 L1029 194 L1118 224 Q1026 206 985 217 Q950 191 913 163 Z', '#5d62a35e');
  hatch(face, [911, 159, 1120, 225], 4200, ['#6868aa', '#c2b0da'], [12, 7], .36);
  const hills = paint(frontRidge, wash(211, 373, ['#74a8cb', '#82a697', '#a5c173']));
  hatch(hills, [0, 207, W, 389], 7900, ['#506a78', '#a2abba', '#c3bc9d', '#728c85'], [13, 9], .32);
}

function drawWater() {
  const water = paint(river, wash(429, 770, ['#d4b4a0', '#83a5af', '#467c99', '#325f83']), '#616e49', 4);
  drawTreeReflections(water);
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

function drawTreeReflections(water) {
  const ctx = drawingContext;
  ctx.save();
  ctx.clip(water);
  const shapes = [
    [new Path2D(treeTrunk), '#4d5146'],
    [new Path2D(treeBranches), '#4d5146'],
    [new Path2D(treeCrown), '#28463c'],
    [new Path2D(treeLitCrown), '#738354'],
  ];

  // Reflect the bank trees in broken horizontal bands beneath the water hatching.
  for (const [x, y, size, mirrored] of riversideTrees) {
    const depth = size * .49;
    for (let row = 33; row < 244 * depth; row += 2.5) {
      const wave = Math.sin(row * .29) * 4 + Math.sin(row * .087) * 7;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, y + row, W, 1.65 + .65 * Math.sin(row * .41));
      ctx.clip();
      ctx.translate(x + wave, y);
      ctx.scale(mirrored ? -size : size, -depth);
      ctx.globalAlpha = (.92 - row / (560 * depth)) * (.82 + .18 * Math.cos(row * .73));
      for (const [shape, shade] of shapes) {
        ctx.fillStyle = shade;
        ctx.fill(shape);
      }
      ctx.restore();
    }
  }
  ctx.restore();
}

function drawRoads() {
  const track = paint(road, wash(440, 800, ['#c4a26e', '#e9bb85', '#c29765']), '#71694a', 2);
  hatch(track, [330, 435, 725, H], 9200, ['#f9d3a1', '#a57856', '#e8ad77', '#9a835b'], [9, -4], .37);
  // The footpath and road share one outline, so the pencil edge follows the verge.
  hatch(track, [650, 603, 864, 651], 2100, ['#f8d39f', '#946d53'], [6, 2], .42);
}

function drawFlowers(grass) {
  const ctx = drawingContext;
  const channels = [river, road].map(outline => new Path2D(outline));
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
  tree(...riversideTrees[0]);
  tree(1083, 620, 1.47, true);
  tree(1151, 573, .76);
  tree(...riversideTrees[1]);
  tree(986, 580, .45);
}

function tree(x, y, size, mirrored = false) {
  push();
  translate(x, y);
  scale(mirrored ? -size : size, size);
  const trunk = paint(treeTrunk, '#795540');
  paint(treeBranches, '#795540');
  const crown = paint(treeCrown, '#557249');
  const litCrown = paint(treeLitCrown, '#78934f');
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
  for (const [x, y, span] of [[584, 135, 24], [644, 112, 21], [686, 70, 24]]) {
    bezier(x - span, y - 5, x - span * .5, y - span, x - 2, y - 7, x, y);
    bezier(x, y, x + 3, y - 8, x + span * .65, y - span, x + span, y - 5);
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('childhood-landscape', 'png');
  }
}
