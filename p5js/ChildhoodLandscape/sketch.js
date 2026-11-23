// Childhood Landscape — p5.js
const W = 1200;
const H = 800;
const SEED = 27;

const backRidge = 'M0 304 Q69 270 117 284 L208 266 L310 273 L434 246 L516 262 Q620 240 694 207 L747 212 L912 164 Q933 160 958 174 L1029 194 L1118 224 L1170 222 L1200 230 V440 H0 Z';
const frontRidge = 'M0 344 L99 321 L195 326 L289 308 L375 299 L470 281 L548 295 L642 273 L703 272 L784 235 L841 247 L920 209 L1037 248 L1130 252 L1200 241 V420 H0 Z';
const meadow = 'M0 367 C156 345 229 361 382 347 S570 365 692 347 Q807 332 880 350 Q976 329 1043 340 L1200 331 V800 H0 Z';
const river = `
  M814 250 C785 259 811 268 769 278 C724 293 770 309 735 321
  C699 336 632 339 651 352 C667 367 709 359 672 375
  C603 397 444 411 345 430 C245 450 162 460 70 482 L0 501
  V687 C117 652 243 622 321 582 C387 547 427 509 478 484
  C550 448 629 433 675 408 C730 378 771 359 750 349
  C717 337 769 331 759 316 C748 302 755 295 779 285
  C818 269 798 260 814 250 Z
`;
const road = `
  M799 360 C758 369 692 384 699 406 C707 433 671 452 625 472
  C526 514 462 558 413 599 C355 651 263 689 215 736 L170 800 H892
  C796 778 737 749 698 713 C720 697 771 681 824 655
  C872 632 890 602 897 575 C904 545 929 535 985 522 L978 510
  C920 519 882 537 878 574 C872 609 845 632 804 644
  C755 659 700 672 670 693 C624 647 611 606 637 565
  C659 532 726 485 768 448 C800 418 773 409 746 394
  C733 383 769 369 799 360 Z
`;
const roof = 'M777 551 L817 500 Q821 495 829 497 L936 506 L958 554 L853 547 Z';

const treeBranches = 'M-3 -78 Q-31 -114 -56 -128 L-51 -135 Q-22 -124 0 -98 Q22 -126 44 -149 L50 -145 Q22 -112 7 -80 Z';
const treeTrunk = 'M-12 1 Q-3 -36 -8 -78 L-10 -137 L0 -145 L6 -88 Q11 -47 17 0 Q3 -5 -12 1 Z';

const treeCrown = 'M-80 -131 Q-106 -151 -84 -175 Q-89 -201 -59 -208 Q-52 -233 -22 -227 Q-4 -251 24 -234 Q45 -240 59 -216 Q84 -220 88 -195 Q114 -179 95 -158 Q104 -135 76 -129 Q65 -109 43 -122 Q23 -113 7 -134 Q-12 -114 -30 -126 Q-51 -108 -66 -128 Z';

const treeLitCrown = 'M-84 -161 Q-95 -181 -65 -198 Q-66 -220 -33 -220 Q-15 -239 12 -230 Q37 -234 53 -211 Q77 -217 84 -191 Q65 -183 56 -194 Q37 -178 20 -193 Q1 -173 -17 -185 Q-36 -162 -54 -173 Q-71 -154 -84 -161 Z';

// Trees on the bank facing the foreground bend.
const riversideTrees = [
  [145, 424, .55, false],
  [382, 352, .25, true],
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
  const water = paint(river, wash(252, 687, ['#b2cde0', '#75b3dd', '#3b94cb', '#448ec7']), '#6ba480', 2);
  drawTreeReflections(water);
  hatch(water, [0, 248, 820, 687], 11400, ['#fff2cb', '#c6dcf0', '#287cc5', '#3c9cdd'], [24, -3], .48);
  const cutbank = paint('M0 494 C112 468 184 459 297 437 C417 414 553 402 654 377 C584 403 445 424 312 446 C193 469 92 483 0 510 Z', '#ad986d');
  hatch(cutbank, [0, 376, 656, 510], 4400, ['#edca9a', '#846f64', '#71904a'], [10, -3], .46);
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
  const track = paint(road, wash(360, 800, ['#d8b28a', '#edc3a0', '#d7a58a']), '#ab856a', 1.5);
  hatch(track, [170, 358, 990, H], 9200, ['#f9d3a1', '#a57856', '#e8ad77', '#9a835b'], [9, -4], .37);
  // The footpath and road share one outline, so the pencil edge follows the verge.
  hatch(track, [660, 510, 990, 711], 2100, ['#f8d39f', '#946d53'], [6, 2], .42);
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
  randomSeed(SEED + 41);
  for (let i = 0; i < 49; i++) {
    const x = random(W);
    const y = random(333, 374);
    if (x < 630 || x > 770) tree(x, y, random(.08, .24), i % 2 === 0);
  }
  tree(...riversideTrees[0]);
  tree(...riversideTrees[1]);
  tree(858, 459, .9, true);
  tree(1136, 348, .44);
  drawFramingTree();
}

function drawFramingTree() {
  const trunk = paint(
    'M0 688 Q8 583 19 541 Q32 432 27 324 Q34 259 6 211 L0 179 L11 174 Q46 207 55 260 Q80 207 108 171 Q148 125 180 97 L195 106 Q163 147 137 173 Q174 161 217 132 L224 143 Q203 168 171 177 Q125 196 94 238 Q75 268 66 313 Q55 383 45 495 Q36 601 47 704 Z',
    wash(95, 705, ['#b77d44', '#aa633b', '#bc7a54']), '#996343', 1.6);
  hatch(trunk, [0, 85, 228, 707], 11500, ['#f9cca0', '#793f31', '#de9c59', '#965330'], [-4, 17], .55);
  const foliage = paint(
    'M0 11 Q21 -4 43 11 Q60 -4 87 12 Q112 -1 128 7 Q158 -3 185 14 Q204 -1 223 16 Q257 -1 286 14 Q319 3 344 18 Q371 17 381 37 Q412 32 424 52 Q451 55 451 75 Q477 96 467 112 Q483 137 465 153 Q438 161 419 148 Q409 167 388 152 Q367 175 347 155 Q331 168 311 157 Q291 179 274 156 Q249 174 222 147 Q206 165 196 142 Q173 144 165 126 Q142 151 124 124 Q96 145 78 127 Q53 159 33 130 Q17 164 0 140 Z',
    wash(0, 171, ['#b7cf6e', '#72a64e', '#478b51']), '#589454', 1.5);
  hatch(foliage, [0, 0, 480, 176], 13800, ['#e9df70', '#b5d55e', '#38824b', '#28784a', '#75b951', '#f5e398'], [11, -11], .53);
  const branches = paint(
    'M125 191 Q155 166 175 177 Q183 155 204 162 Q220 139 248 153 Q272 139 285 163 Q312 153 324 178 Q351 165 367 189 Q377 209 355 219 Q363 243 339 248 Q319 265 300 242 Q294 271 271 259 Q266 286 243 269 Q229 283 217 262 Q196 265 191 237 Q166 250 154 229 Q128 237 125 213 Z',
    wash(150, 276, ['#a8c766', '#659d50', '#3e8e57']), '#578d4e', 1.5);
  hatch(branches, [123, 139, 378, 282], 7200, ['#e2d96b', '#69ae50', '#267344', '#b0c965'], [6, -10], .54);
}

function tree(x, y, size, mirrored = false) {
  push();
  translate(x, y);
  scale(mirrored ? -size : size, size);
  const trunk = paint(treeTrunk, '#795540');
  paint(treeBranches, '#795540');
  const crown = paint(treeCrown, '#619c56');
  const litCrown = paint(treeLitCrown, '#a3ba56');
  const density = .2 + size * .8;
  hatch(trunk, [-13, -133, 17, 2], 260 * density, ['#c79c70', '#483f32'], [1, -15], .42);
  hatch(crown, [-104, -242, 111, -109], 3600 * density, ['#2b764a', '#88ae49', '#498844', '#c4d775'], [7, -6], .44);
  hatch(litCrown, [-98, -240, 88, -151], 2300 * density, ['#e8d866', '#b6d360', '#619b4e'], [8, -6], .49);
  pop();
}

function drawCottage() {
  push();
  translate(-281, -295);
  scale(1.48, 1.30);
  const litWall = paint('M791 551 L851 545 L852 623 L790 617 Z', '#f4d99f', '#8f664e', 2);
  const sideWall = paint('M851 545 L900 514 L943 549 L943 610 L852 623 Z', '#dfb77c', '#8f664e', 2);
  hatch(litWall, [790, 544, 854, 624], 590, ['#fff0b5', '#d39766'], [3, 9], .39);
  hatch(sideWall, [850, 514, 943, 625], 800, ['#f7d397', '#a2684c'], [4, 8], .33);
  const tiles = paint(roof, wash(495, 553, ['#df8364', '#cd6d52', '#b45549']), '#803933', 3);
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
  paint('M850 546 L934 505 L960 554 L944 555 L932 517 L853 552 Z', '#a24f44');
  paint('M849 624 L849 589 Q849 579 862 578 Q871 578 871 587 L870 621 Z', '#794d39', '#684436');
  paint('M837 624 L876 621 L884 628 L841 632 Z', '#d5c6b4', '#ac927b');
  paint('M840 630 L884 627 L887 632 L841 636 Z', '#bda792', '#9d826d');
  stroke('#d49d63');
  strokeWeight(1);
  line(856, 586, 856, 620);
  line(861, 583, 861, 621);
  line(866, 586, 866, 620);
  paint('M800 567 L832 565 L831 588 L800 589 Z M890 565 L922 560 L922 587 L890 591 Z', '#9abfda', '#805642', 3);
  stroke('#765542');
  strokeWeight(2);
  line(816, 566, 816, 588);
  line(800, 578, 832, 576);
  line(905, 562, 906, 589);
  line(890, 578, 922, 573);
  pop();
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
