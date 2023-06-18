export default class player {
    WALK_ANIMATION_TIMER = 200;
    walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    dinoRunImages = []

    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    JUMP_SPEED = 0;

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

        const dinoRunImage1 = new Image();
        dinoRunImage1.src = './images/dino-run-0.png';

        const dinoRunImage2 = new Image();
        dinoRunImage2.src = './images/dino-run-1.png';
    
        this.dinoRunImages.push(dinoRunImage1);
        this.dinoRunImages.push(dinoRunImage2);
    }

    update(gameSpeed, frameTimeDelta){
        this.run(gameSpeed, frameTimeDelta);
    }

    run(gameSpeed, frameTimeDelta){
        if(this.walkAnimationTimer <= 0){
            if(this.image === this.dinoRunImages[0]){
                this.image = this.dinoRunImages[1];
            }
            else
            {
                this.image = this.dinoRunImages[0];
            }
            this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        }
        this.walkAnimationTimer -= frameTimeDelta * gameSpeed; //Move at same rate regardless of refresh rate 
    }

    draw(){
        this.ctx.drawImage(
            this.image,
            this.x, 
            this.y, 
            this.width, 
            this.height
            )
    }
}