// canvas 1 
const canvas = document.getElementById('bubbles');
// gives access to all canvas built-in drawing methods
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// canvas 2 
const canvasBg = document.getElementById('bubblesBg');
// gives access to all canvas built-in drawing methods
const ctxBg = canvas.getContext('2d');
canvasBg.width = window.innerWidth;
canvasBg.height = window.innerHeight;

let bubbles = [];
let bgBubbles = [];

function addBubble() {
    bubbles.push(new Bubble('rgb(225, 194, 194', 1.8));
}
function addBgBubble() {
    bgBubbles.push(new Bubble('#ad0170', 2.5));
}
class Bubble {
    constructor(color, ySpeed) {
        this.radius = (Math.random() * 150) + 30;
        this.life = true;
        this.x = (Math.random() * window.innerWidth);
        this.y = (Math.random() * 0.0000002) + window.innerHeight + this.radius;
        this.vy = ((Math.random() * 0.0002) + 0.001) + ySpeed;
        this.vr = 0;
        this.vx = (Math.random() * 4) - 2;
        this.color = color;
    }  
    update() {
        this.vy += 0.1; // velocity y-axis
        this.vr += 0.2;
        this.y -= this.vy;
        this.x += this.vx;
        if (this.radius > 1) {
            this.radius -= this.vr;
        }
        if (this.radius <= 1) {
            this.life = false;
        }
    }
    draw(currentCanvas) {
        currentCanvas.beginPath();
        currentCanvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        currentCanvas.fillStyle = this.color;
        currentCanvas.fill();
    }
}
function handleBubbles() {
    for (let i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].update();
        if (!bubbles[i].life) {
            bubbles.splice(i, 1);
        }
    }
    for (let i = bgBubbles.length - 1; i >= 0; i--) {
        bgBubbles[i].update();
        if (!bgBubbles[i].life) {
            bgBubbles.splice(i, 1);
        }
    }
    if (bubbles.length < (window.innerWidth / 4)) {
        addBubble();
    }
    if (bgBubbles.length < (window.innerWidth / 12)) {
        addBgBubble();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxBg.clearRect(0, 0, canvas.width, canvas.height);
    
    handleBubbles();

    for (let i = bgBubbles.length - 1; i >= 0; i--) {
        bgBubbles[i].draw(ctxBg);
    }
    for (let i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].draw(ctx);
    }

    requestAnimationFrame(animate);
}

window.addEventListener('load', animate);

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasBg.width = window.innerWidth;
    canvasBg.height = window.innerHeight;
    bubbles = [];
    bgBubbles = [];
});