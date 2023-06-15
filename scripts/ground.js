export default class ground {
    constructor(ctx, width, height, speed, scaleRation){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.scaleRation = scaleRation;
    
        this.x = 0;
        this.y =this.canvas.height - this.height;

        this.groundImage = new Image();
        this.groundImage.src = './images/ground.png'
    
    
    }
}