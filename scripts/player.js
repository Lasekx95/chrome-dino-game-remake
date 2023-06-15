export default class player {
    constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;
        
        // Player starting X Y axis
        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5 *scaleRatio;

        this.standingStillImage = new Image(); 
        this.standingStillImage.src = './images/dino_stationary.png';
        this.image = this.standingStillImage;
    }

    draw(){
        this.ctx.drawImage(this.image,this.x, this.y, this.width, this.height)
    }
}