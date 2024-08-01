// Special Thanks to KatieGirl for the spiral effect.
// melkanea tweaked the spiral to be more hypnotic.


let eyeCursor = document.querySelector("#eyeCursor");

let clicks = [false,false,false,false];
let centerCalibrate = [];
let trancePoint = [0,0];

let avgPoints = [];
let first = true;

let xdPred=0;
let ydPred=0;


function setup() {
  // Get the #eyeCursor element
  const eyeCursor = document.getElementById('eyeCursor');

  // Use the clientWidth and clientHeight of #eyeCursor for the canvas size
  const width = eyeCursor.clientWidth;
  const height = eyeCursor.clientHeight;

  // Create a canvas with the size of the #eyeCursor element
  let cnv = createCanvas(width, height);

  // Append the canvas to the #eyeCursor div
  cnv.parent('eyeCursor');
}

function draw() {
  background(0,0,0);
  translate(width/2,height/2);
  a=map(sin(frameCount/20),-1,1,0.5,1.5);
  b=map(cos(frameCount/20),-1,1,1,1.5);
  rotate(frameCount/5);
  spiral(a,1,[199, 0, 199]);
  spiral(b,0.3,[255, 130, 255]);
  calibrationComplete();
  circle(trancePoint[0],trancePoint[1],40);
}


function calibrationComplete() {
    tranceAmt = dist(xdPred,ydPred,trancePoint[0],trancePoint[1]);
}

function spiral(a,x,d) {
  fill(d[0],d[1],d[2]); stroke(d[0],d[1],d[2]);
  var r1 = 0,r2 = 2, step=a,spiralwidth=5.0,dw=spiralwidth/350;
  beginShape(TRIANGLE_STRIP);
  for ( var i = 0 ; i < 450 ; i++ ){
    r1 += step;
    spiralwidth -= dw;
    r2 = r1 + spiralwidth;
    var ang = x;
    var r1x = r1*sin(ang*i);
    var r1y = r1*cos(ang*i);
    var r2x = r2*sin(ang*i);
    var r2y = r2*cos(ang*i);
    vertex(r1x,r1y);
    vertex(r2x,r2y);
     }
  endShape();
}