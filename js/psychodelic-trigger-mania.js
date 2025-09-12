let eyeCursor = document.querySelector("#eyeCursor");

let clicks = [false,false,false,false];
let centerCalibrate = [];
let trancePoint = [0,0];
let s = true;

let avgPoints = [];
let first = true;

let xdPred=0;
let ydPred=0;


function setup() {
  createCanvas(window.innerWidth, window.innerHeight-document.querySelector("#eyeCursor").clientHeight*1.6);
  textSize(50);
  textAlign(CENTER);
}

function draw() {
  background(0,0,0);
  translate(width/2,height/2);

  a=map(sin(frameCount/20),-1,1,0.5,1.5);
  b=map(cos(frameCount/20),-1,1,1,1.5);
  rotate(frameCount/10);
  spiral(a,1,[199, 0, 199]);
  spiral(b,0.3,[255, 130, 255]);

  calibrationComplete();
  circle(trancePoint[0],trancePoint[1],40);
}

function calibrated() {
  message("Now Bambi, I want you to click the center of the spiral and stare while I calibrate your trance level");
  tranceCalibrateLoop = setInterval(()=>{
    centerCalibrate.push([xdPred,ydPred]);
  },10);
  setTimeout(()=>{
    clearInterval(tranceCalibrateLoop);
    message("Good Girl!");
    snap.play();
    setTimeout(()=>{
      message("Now I want you to relax and...");
      setTimeout(()=>{
        message("Bambi Sleep");
        bs.play();
        snap.play();
        drone.play();
        let pX = 0;
        for(let i=0;i<centerCalibrate.length;i++){
          pX+=centerCalibrate[i][0];
        }
        let pY = 0;
        for(let j=0;j<centerCalibrate.length;j++){
          pY+=centerCalibrate[j][1];
        }
        trancePoint[0] = (pY / centerCalibrate.length);
        trancePoint[1] = (pY / centerCalibrate.length);
        calibrationComplete();
      },5000);
    },5000);
  },10000);
}

function calibrationComplete() {

    tranceAmt = dist(xdPred,ydPred,trancePoint[0],trancePoint[1]);
}

function spiral(a,x,d) {
  fill(d[0],d[1],d[2]); stroke(d[0],d[1],d[2]);
  var r1 = 0,r2 = 1, step=a,spiralwidth=10.0,dw=spiralwidth/350;
  beginShape(TRIANGLE_STRIP);
  for ( var i = 0 ; i < 250 ; i++ ){
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
