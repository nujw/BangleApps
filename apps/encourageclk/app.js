require("FontHaxorNarrow7x17").add(Graphics);
require("FontDylex7x13").add(Graphics);

const storage = require('Storage');
const locale = require("locale");
const dateutil = require("date_utils");
const currentFont=g.getFont();

const width = 175; 
const height = 175;
const offset = 25;

var d = new Date();
var nowDate = d.getDate(); //today's date
var encourage = ["you\'re doing\ngreat!","pas de deux it!","you\'re amazing~","you got dis","keep going","you\'re one\nin a melon!","we\'re rooting\nfor you!","believe in\nyourself","dance like\nno one\'s\nwatching"];
var encouragementtest = "you\'re one\nin a melon!";

var bgimg = {
  width : 175, height : 175, bpp : 4,
  transparent : -1,
  palette : new Uint16Array([46452,38393,32024,42585,52984,46739,59130,21489,46543,21493,25358,52696,48564,61210,29944,46322]),
  buffer : require("heatshrink").decompress(atob("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"))
};

//TAP ALL THE THINGS
Bangle.on('touch', (n, e) => {
  // <88, top
  if (e.x > offset && e.y < height) { //bar
    clearText();
    g.setColor(0,0,0);
    g.setFont("Dylex7x13",2).setFontAlign(0,0).drawString(getEncour(), width/2, height/2);
    setInterval(loader,3000);
  }
});

//getters
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getEncour(){ //return string
  let rando = getRandomInt(encourage.length);
  return encourage[rando];
}

//clear stuff
function clearText(){
  g.clearRect(0,offset*2,175,175-offset*2);
  g.drawRect(0,offset*2,175,175-offset*2);
}

function queueDraw() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    drawtime();
  }, 60000 - (Date.now() % 60000));
}

function drawtime() {
  var time = locale.time(d, 1);
  var date = locale.date(d);
  var mo = dateutil.month(d.getMonth() + 1, 1);
  g.drawImage(bgimg,0,offset);
  g.setFont("HaxorNarrow7x17").setColor(0,0,0);
  g.setFontAlign(0, 0).setFont(currentFont, 7).drawString(time, width/2, 100);
  g.setFontAlign(0,0).setFont(currentFont, 3).drawString(mo + " " + nowDate, width/2, 130);
}

function loader() {
  drawtime();
  queueDraw();
}

//ready set go!
g.clear();

loader(); //drawthings

Bangle.setUI("clock");
Bangle.drawWidgets();
Bangle.loadWidgets();
