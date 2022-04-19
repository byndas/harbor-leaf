window.onload = function(){
    const canvas = document.getElementById('loopVector');
    const ctxLooper = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const flowField = new FlowFieldEffect(ctxLooper, canvas.width, canvas.height);
}

class FlowFieldEffect {
    #ctx;
    #width;
    #height;
    #radius;
    constructor(ctxLooper, width, height) {
        this.#ctx = ctxLooper;
        this.#ctx.lineWidth = .1; // .25;
        this.#width = width;
        this.#height = height;
        this.#radius = .01;
        this.vr = .005;
        // this.vr = 0;
        this.#mapField();
        this.timer = 0;
        this.cellSize = 10;
        this.interval = 16;
        // this.interval = 0;
        this.timer = 0;
        this.lastTime = 0;
    }
    #mapField(timeStamp){
        let deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval){
            this.#ctx.clearRect(0,0,this.#width, this.#height);
            this.#radius += this.vr;
            if (this.#radius > 5  || this.#radius < -5) this.vr *= -1
            for (let y = 0; y < this.#height; y+= this.cellSize){
                for (let x = 0; x < this.#width; x += this.cellSize){
                    const angle = this.#getValue(x, y);
                    this.#ctx.save();
                    this.#ctx.translate(x, y);
                    this.#draw(angle);
                    this.#ctx.restore();
                }
            }
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }

        requestAnimationFrame(this.#mapField.bind(this));

    }
    #getValue(x, y){ // 0.05 for cos & sin
        return (Math.cos(x * 0.5) + Math.sin(y * 0.5)) * Math.PI * this.#radius;
    }
    #draw(angle){
        this.#ctx.rotate(angle);
        this.#ctx.beginPath();
        this.#ctx.moveTo(0,0);
        this.#ctx.lineTo(100, 0);
        this.#ctx.stroke();
    }
}
