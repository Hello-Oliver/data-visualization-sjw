var mapimg;
var zoom = 1;

var clat = 0;
var clon = 0;

// 31.2304 N, 121.4737 E Shang Hai
var lat = 31.2304;
var lon = 121.4737;

var earthquakes;
//iter variable
// var i;

// var cx = mercX(clon);
// var cy = mercY(clat);

function preload() {
    mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoia2lraWtpa2lraSIsImEiOiJjanN5cGFqYWYxMndiNDlvZHE0cTVyeXp0In0.iLTFDJWOdztgngfMiAfe8A');
    earthquakes = loadStrings('all_2000s_M6plus.csv');
    // avenir = loadFont('assets/Avenir.otf');
}

function mercX(lon){
    lon = radians(lon);
    var a = (256 / PI) * pow(2, zoom);
    var b = lon + PI;
    return a * b;
}

function mercY(lat){
    lat = radians(lat);
    var a = (256 / PI) * pow(2, zoom);
    var b = tan(PI/4 + lat/2);
    var c = PI - log(b);
    return a * c;
}

function setup(){
    createCanvas(1024, 512);
    translate(width/2, height/2);
    imageMode(CENTER);

    // textFont(avenir);
    textSize(6);
    textAlign(CENTER, CENTER);

    image(mapimg, 0, 0);

    var cx = mercX(clon);
    var cy = mercY(clat);

    console.log('length of file', earthquakes[1])


    for(var i = 0; i < earthquakes.length; i++){
        var data = earthquakes[i].split(/,/);
        var lat = data[1];
        var lon = data[2];
        var mag = data[4];
        var name = data[13];


        var x = mercX(lon) - cx;
        var y = mercY(lat) - cy;

        var temp_mag = mag;

        mag = pow(33, mag);
        mag = sqrt(mag);

        var magmax = sqrt(pow(33, 10));
        var d = map(mag, 0, magmax, 0, 180);
        var c = 30 * map(mag, 0, magmax, 0 ,255);
        if(c<100){
            c = 100
        }

        stroke(c, 0, c);
        fill(c, 0, c, 200);
        ellipse(x, y, d, d);

        console.log('mag', temp_mag);
        if(temp_mag >= 8.5){
            fill(0, 0, 0);
            text(name, x, y);
        }
    }

}

function draw(){

    // var data = earthquakes[i].split(/,/);
    // console.log(data);
    // var lat = data[1];
    // var lon = data[2];
    // var mag = data[4];
    //
    // var x = mercX(lon) - cx;
    // var y = mercY(lat) - cy;
    //
    // mag = pow(33, mag);
    // mag = sqrt(mag);
    //
    // var magmax = sqrt(pow(33, 10));
    // var d = map(mag, 0, magmax, 0, 180);
    //
    // stroke(255, 0, 255);
    // fill(255, 0, 255, 200);
    // ellipse(x, y, d, d);
}