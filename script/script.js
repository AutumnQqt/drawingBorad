// 1、设置画板大小
var context = canvas.getContext('2d')   //获取上下文
autoSetCanvasSize(canvas)              //设置画板大小

// 2.画画功能

//设置画笔样式
setBrush(context)
// 监听鼠标动作
listenToUser(canvas)

// 3.橡皮擦功能
listenToEraser()

// 4.清空画板功能
clearBoard(context,canvas)

// 5.保存功能
saveAsImg(canvas)


/* ****************************** */

// 函数
function autoSetCanvasSize(canvas) {
  setCanvasSize(canvas)
  window.onresize = function () {
    setCanvasSize(canvas)
    setBrush(context)
  }
  function setCanvasSize(canvas) {
    var pageWigth = document.documentElement.clientWidth    //设置画板宽高和窗口一样大
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWigth
    canvas.height = pageHeight
  }
}

function listenToUser(canvas) {
  var painting = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  //特性检测
  if ('ontouchstart' in document) {
    //触屏设备
    canvas.ontouchstart = function (event) {
      painting = true
      lastPoint = startDraw(event.touches[0].clientX, event.touches[0].clientY)
    }
    canvas.ontouchmove = function (event) {
      lastPoint = moveDraw(painting, lastPoint, event.touches[0].clientX, event.touches[0].clientY)
    }
    canvas.ontouchend = function (event) {
      painting = false
    }
  } else {
    canvas.onmousedown = function (event) {
      painting = true
      lastPoint = startDraw(event.clientX, event.clientY)
    }
    canvas.onmousemove = function (event) {
      lastPoint = moveDraw(painting, lastPoint, event.clientX, event.clientY)
    }
    canvas.onmouseup = function (event) {
      painting = false
    }
  }
}

function startDraw(x, y) {
  var lastPoint = {
    'x': x,
    'y': y
  }
  if (eraserEnabled) {
    context.clearRect(x + 5, y + 5, 10, 10)
  } else {
    lastPoint.x = x
    lastPoint.y = y
  }
  return lastPoint
}
function moveDraw(painting, lastPoint, x, y) {
  var newPoint = {
    'x': x,
    'y': y
  }
  if (painting == true) {
    if (eraserEnabled) {
      context.clearRect(x + 5, y + 5, 10, 10)
    } else {
      drawLine(lastPoint.x, lastPoint.y, x, y)
    }
  }
  return newPoint
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

//设置画笔样式
function setBrush(context) {
  var brushColor = 'black'
  var lineWidth = 2

  black.onclick = function () {
    brushColor = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    orange.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    context.strokeStyle = brushColor
  }
  red.onclick = function () {
    brushColor = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    orange.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    context.strokeStyle = brushColor
  }
  orange.onclick = function () {
    brushColor = 'orange'
    orange.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    context.strokeStyle = brushColor
  }
  green.onclick = function () {
    brushColor = 'green'
    green.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    orange.classList.remove('active')
    blue.classList.remove('active')
    context.strokeStyle = brushColor
  }
  blue.onclick = function () {
    brushColor = 'blue'
    blue.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    orange.classList.remove('active')
    green.classList.remove('active')
    context.strokeStyle = brushColor
  }

  thin.onclick = function () {
    lineWidth = 2
    thin.classList.toggle('active')
    thick.classList.toggle('active')
    context.lineWidth = lineWidth
  }
  thick.onclick = function () {
    lineWidth = 5
    thin.classList.toggle('active')
    thick.classList.toggle('active')
    context.lineWidth = lineWidth
  }
  context.strokeStyle = brushColor
  context.lineWidth = lineWidth
}

//是否用橡皮擦
var eraserEnabled = false
function listenToEraser() {
  eraser.onclick = function (event) {
    eraserEnabled = true
    eraser.classList.toggle('active')
    brush.classList.toggle('active')
    canvas.classList.add('eraserActive')
  }
  brush.onclick = function (event) {
    eraserEnabled = false
    brush.classList.toggle('active')
    eraser.classList.toggle('active')
    canvas.classList.remove('eraserActive')
  }
}


//清空画板
function clearBoard(ctx,c){
  clear.onclick = function(){
    ctx.clearRect(0,0,c.width,c.height);  
  }
}


//保存为图片
function saveAsImg(canvas){
  save.onclick = function(){
    var url = canvas.toDataURL("image/png");
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画布'
    a.click()
  }
}