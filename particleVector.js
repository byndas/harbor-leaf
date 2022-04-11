// checkout particle.js

const starCanvas = document.getElementById("particleVector");
const ctxStar = starCanvas.getContext("2d");
starCanvas.width  = window.innerWidth;
starCanvas.height = window.innerHeight;

let particleArray;

// gets mouse position
// let mouse = {
// 	x: null,
// 	y: null,
//   radius: ((starCanvas.height/80) * (starCanvas.width/80))
// }
// window.addEventListener('mousemove', 
// 	function(event){
// 		mouse.x = event.x;
// 		mouse.y = event.y;
// });

// creates Particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.speedX = this.directionX;
        this.speedY = this.directionY;
    }
    // creates method to draw individual particle
    draw() {
        ctxStar.beginPath();
        ctxStar.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);

        ctxStar.fillStyle = 'HSL(48, 89%, 90%)';
	    ctxStar.fill();
    }

    // checks particle position, checks mouse position, moves the particle, draws the particle
    /*
    update() {
        // checks if particle is still within starCanvas
        if (this.x > starCanvas.width || this.x < 0){
			this.directionX = -this.directionX;
            this.speedX = this.directionX;
	    } if (this.y + this.size > starCanvas.height || this.y - this.size < 0){
		    this.directionY = -this.directionY;
            this.speedY = this.directionY;
	    }
        // checks mouse position/particle position - collision detection
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < starCanvas.width - this.size*10){
                this.x+=10;
            }
            if (mouse.x > this.x && this.x > this.size*10){
                this.x-=10;
            }
            if (mouse.y < this.y && this.y < starCanvas.height - this.size*10){
                this.y+=10;
            }
            if (mouse.y > this.y && this.y > this.size*10){
                this.y-=10;
            }
        }
        
        // moves particle
        // this.x += this.directionX;
        // this.y += this.directionY;
        
        this.draw();
    }
    */
}

// checks if particles are close enough to draw line between them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++){
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x))
            +   ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
            
            if  (distance < (starCanvas.width/7) * (starCanvas.height/7)) 
            {   
                opacityValue = 1-(distance/10000);
                ctxStar.strokeStyle='rgba(0247, 220, 111,' + opacityValue +')';
                ctxStar.beginPath();
                ctxStar.lineWidth = .75;
                ctxStar.moveTo(particleArray[a].x, particleArray[a].y);
                ctxStar.lineTo(particleArray[b].x, particleArray[b].y);
                ctxStar.stroke();
            }    
        }
    }
}


// creates particle array 
function init(){
    particleArray = [];
    let numberOfParticles = (starCanvas.height*starCanvas.width)/8000;
    for (let i=0; i<numberOfParticles; i++){
        let size = (Math.random() * 2.75);
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        // let directionX = (Math.random() * 2) - 1;
        // let directionY = (Math.random() * 2) - 1;
        

        particleArray.push(new Particle(x, y, .5, .5, size, 'gold'));
    }
}

// creates animation loop
function animate(){
// 	requestAnimationFrame(animate);
// 	ctxStar.clearRect(0,0,innerWidth,innerHeight);
	
	for (let i = 0; i < particleArray.length; i++){
		particleArray[i].draw();
	}
    connect();
}
init();
animate();

// RESPONSIVE - empties and refills particle array every time window changes size + changes starCanvas size
window.addEventListener('resize',
	function(){
		starCanvas.width = innerWidth;
		starCanvas.height = innerHeight;
         mouse.radius = ((starCanvas.height/80) * (starCanvas.width/80));
		init();
	}
)
// 2) SETS MOUSE POSITION AS UNDEFINED when it leaves starCanvas
// window.addEventListener('mouseout',
// 	function(){
// 		mouse.x = undefined;
// 	    mouse.y = undefined;
// 	}
// )