---
title: canvas放烟花
date: 2023-05-25 16:45:48
cover: https://cdn.wdtwo.com/anzhiyu/canvas29573945.png
categories:
- 前端
tags:
- js
- canvas
---
canvas放烟花
<!--more-->
```js
var ctx = document.querySelector('canvas').getContext('2d')
ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight
var sparks = []
var fireworks = []
var i = 30;
while (i--) {
    fireworks.push(
        new Firework(Math.random() * window.innerWidth, window.innerHeight * Math.random())
    )
}
render()
function render() {
    setTimeout(render, 1000 / 50)
    ctx.fillStyle = 'rgba(21, 3, 72, 0.1)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    for (var firework of fireworks) {
        if (firework.dead) continue
        firework.move()
        firework.draw()
    }
    for (var spark of sparks) {
        if (spark.dead) continue
        spark.move()
        spark.draw()
    }
    if (Math.random() < 0.05) {
        fireworks.push(new Firework())
    }
}
function Spark(x, y, color) {
    this.x = x
    this.y = y
    this.dir = Math.random() * (Math.PI * 2)
    this.dead = false
    this.color = color
    this.speed = Math.random() * 3 +3;
    this.walker = new Walker({
        radius: 1,
        speed: 0.25
    })
    this.gravity = 0.25
    this.dur = this.speed / 0.09
    this.move = function () {
        this.dur--
            if (this.dur < 0) this.dead = true
        if (this.speed < 0) return
        if (this.speed > 0) this.speed -= 0.1
        var walk = this.walker.step()
        this.x += Math.cos(this.dir + walk) * this.speed
        this.y += Math.sin(this.dir + walk) * this.speed
        this.y += this.gravity
        this.gravity += 0.05
    }
    this.draw = function () {
        drawCircle(this.x, this.y, 3, this.color)
    }
}
function Firework(x, y) {
    this.xmove = new Walker({
        radius: 10,
        speed: 0.5
    })
    this.x = x || Math.random() * ctx.canvas.width
    this.y = y || ctx.canvas.height
    this.height = Math.random() * ctx.canvas.height / 2
    this.dead = false
    this.color = randomColor()
    this.move = function () {
        this.x += this.xmove.step()
        if (this.y > this.height) this.y -= 1;
        else this.burst()
    }
    this.draw = function () {
        drawCircle(this.x, this.y, 1, this.color)
    }
    this.burst = function () {
        this.dead = true
        var i = 100;
        while (i--) sparks.push(new Spark(this.x, this.y, this.color))
    }
}
function drawCircle(x, y, radius, color) {
    color = color || '#FFF'
    ctx.fillStyle = color
    ctx.fillRect(x - radius / 2, y - radius / 2, radius, radius)
}
function randomColor() {
    return ['#FF2D1F', '#08AF77', '#36b89b', '#7bd7ec', '#66cbe1'][Math.floor(Math.random() * 5)];
}
function Walker(options) {
    this.step = function () {
        this.direction = Math.sign(this.target) * this.speed
        this.value += this.direction
        this.target ?
            this.target -= this.direction :
            (this.value) ?
            (this.wander) ?
            this.target = this.newTarget() :
            this.target = -this.value :
            this.target = this.newTarget()
        return this.direction
    }
    this.newTarget = function () {
        return Math.round(0)
    }
    this.start = 0
    this.value = 0
    this.radius = options.radius
    this.target = this.newTarget()
    this.direction = Math.sign(this.target)
    this.wander = options.wander
    this.speed = options.speed || 1
}
```
