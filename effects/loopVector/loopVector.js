window.onload = function(){
    const canvas = document.getElementById('loopVector');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    console.log('loaded');
}

class FlowFieldEffect {
    #ctx;
    #width;
    #height;
    #count;
    #radius;
    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#ctx.lineWidth = 0.5;
        this.#width = width;
        this.#height = height;
        this.#radius = 1.9;
        this.vr = 0.03;
        this.#mapField();
        this.timer = 0;
        this.cellSize = 7;
        this.interval = 1000/60;
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
    #getValue(x, y){

        return (Math.cos(x * 0.005) + Math.sin(y * 0.005)) * Math.PI * this.#radius;

    }
    #draw(angle){
        //const length1 = Math.random() * 10 + 10;
        //const length2 = Math.random() * 10 + 10;
        this.#ctx.rotate(angle);
        this.#ctx.beginPath();
        this.#ctx.moveTo(0,0);
        this.#ctx.lineTo(25, 0);
        this.#ctx.stroke();
    }
}
