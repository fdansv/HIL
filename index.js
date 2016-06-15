var express = require('express')
var app = express()
var Canvas = require('canvas')

app.get('/hil/*/*/*\.png', function (req, res) {
  var tilePoint = {zoom: req.params[0], x: req.params[1], y: req.params[2]}
  var tileBB = {
    n: tile2lat(tilePoint.y, tilePoint.zoom),
    s: tile2lat(tilePoint.y + 1, tilePoint.zoom),
    e: tile2lon(tilePoint.x, tilePoint.zoom),
    w: tile2lon(tilePoint.x + 1, tilePoint.zoom)
  } 
  res.setHeader('Content-Type', 'image/png')
  var Image = Canvas.Image
  var canvas = new Canvas(256, 256)
  var ctx = canvas.getContext('2d')
  ctx.fillRect(0,0,256,256)
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('' + tileBB.n, 128, 20);
  ctx.fillText('' + tileBB.s, 128, 236);
  ctx.translate(0,256)
  ctx.rotate(-90 * Math.PI / 180)
  ctx.fillText('' + tileBB.e, 128, 20);
  ctx.fillText('' + tileBB.w, 128, 236);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'
  ctx.moveTo(0, 0)
  ctx.lineTo(0, 255)
  ctx.lineTo(255, 255)
  ctx.lineTo(255, 0)
  ctx.lineTo(0, 0)
  ctx.stroke()
  canvas.pngStream().pipe(res)
});

app.listen(4568, function () {
  console.log('Help me I\'m Lost v1.0.0')
  console.log('Listening on port 4568')
});

var tile2lon = function (x, z) {
  return (x / Math.pow(2, z) * 360 - 180)
}

var tile2lat = function (y, z) {
  var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z)
  return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))))
}