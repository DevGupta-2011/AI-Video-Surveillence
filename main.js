video = "";
status = "";
objects = [];
function setup(){
    canvas = createCanvas(550,420);
    canvas.center()
} 
function preload(){
    video = createVideo("video.mp4")
    video.hide()
}
function draw(){
    image(video,0,0,550,420)
    if(status != ""){
        object_detector.detect(video,got_results)
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status : objects detected";
            document.getElementById("objects").innerHTML = "Number of objects = "+objects.length;
            confidence = Math.floor(objects[i].confidence*100)
            stroke("red")
            text(objects[i].label + " " + confidence + "%",objects[i].x+15,objects[i].y+15);
            noFill()
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}
function got_results(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results)
        objects = results;
    }
}
function start(){
    object_detector = ml5.objectDetector("cocossd",model_loaded);
    document.getElementById("status").innerHTML="Status : detecting objects"
}
function model_loaded(){
    console.log("Model Loaded!!")
    status = true;
    video.loop()
    video.speed(1)
    video.volume(1)
}
function stop(){
    video.pause()
}
function restart(){
    video.stop()
    video.play()
}