// this is a very simple sketch that demonstrates how to place a video cam image into a canvas
let img;
let video;
let pose;

function preload() {
  img = loadImage("nose.png");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log("modelLoaded function has been called so this work!!!!");
}

function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
  }
}

function draw() {
  image(video, 0, 0);
    img.resize(50, 50);
    image(img, eyelX - 15, eyelY - 10);

}
