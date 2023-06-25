import Player from './player.js'
import Ground from './ground.js';
import CactiController from './cacticontroller.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_SPEED_START = .75 // 1.0
const GAME_SPEED_INCREMENT = 0.00001; // Increase per game loop


const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 62 /1.5; //41.33333..
const PLAYER_HEIGHT = 94 /1.5; //62
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 2399;
const GROUND_HEIGHT = 24;
const GROUND_AND_CACTUS_SPEED = 0.5;

const CACTI_CONFIG = [
    {width:40 / 1.5, height: 100/1.5, image:'./images/cactus1.png'},
    {width:40 / 1.5, height: 100/1.5, image:'./images/cactus2.png'},
    {width:43 / 1.5, height: 75/1.5, image:'./images/cactus3.png'}
]

//Game Objects
let player = null;
let ground = null;
let cactiController = null

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let WaitingToStart = true;

function createSprites(){
    const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
    const playerheightInGame = PLAYER_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

    const groundWidthInGame = GROUND_WIDTH * scaleRatio;
    const groundHeighthInGame = GROUND_HEIGHT * scaleRatio;

    player= new Player(
        ctx, 
        playerWidthInGame, 
        playerheightInGame, 
        minJumpHeightInGame,
         maxJumpHeightInGame, 
         scaleRatio
    );

    ground = new Ground(
        ctx,
        groundWidthInGame,
        groundHeighthInGame,
        GROUND_AND_CACTUS_SPEED,
        scaleRatio
    );

    const cactiImages = CACTI_CONFIG.map(cactus => {
        const image = new Image()
        image.src = cactus.image;
        return{
            image:image,
            width: cactus.width * scaleRatio,
            height: cactus.height * scaleRatio,
        }
    });

    cactiController = new CactiController(ctx, cactiImages, scaleRatio, GROUND_AND_CACTUS_SPEED)
}

function setScreen(){
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
    createSprites();
}

setScreen();
//Use setTimeout on Safari mobile rotation otherwise works fine on desktop
window.addEventListener('resize', ()=> setTimeout(setScreen, 500));

if(screen.orientation) {
    screen.orientation.addEventListener('change', setScreen);
}

function getScaleRatio(){
    const screenHeight = Math.min(
        window.innerHeight, 
        document.documentElement.clientHeight
        );

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
    );

// window is wider than game width
    if(screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT)
    {
    return screenWidth / GAME_WIDTH
    } else 
    {
        return screenHeight / GAME_HEIGHT
    }
}

function showGameOver() {
    const fontSize = 70 * scaleRatio;
    ctx.font = `${fontSize}px Verdana`;
    ctx.fillStyle = "black";
    const x = canvas.width / 7;
    const y = canvas.height / 2;
    ctx.fillText("GAME OVER LOL", x, y);
  }

function setupGameReset() {
    if(!hasAddedEventListenersForRestart){
        hasAddedEventListenersForRestart = true;
        setTimeout(() => {
            window.addEventListener('keyup', reset, {once:true})
            window.addEventListener('touchstart', reset, {once:true})
        }, 1000)
    }
}

function reset(){
    hasAddedEventListenersForRestart = false;
    gameOver = false;
    WaitingToStart = false;
    ground.reset();
    cactiController.reset();
    gameSpeed = GAME_SPEED_START;
}

function showStartGameText(){
    const fontSize = 40 * scaleRatio;
    ctx.font = `${fontSize}px Verdana`;
    ctx.fillStyle = "black";
    const x = canvas.width / 14;
    const y = canvas.height / 2;
    ctx.fillText("Tap Screen or Press Space To Start", x, y);
}


function clearSceen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(currentTime) {
    if(previousTime === null){
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime
    console/console.log(frameTimeDelta);


    clearSceen();

if(!gameOver && !WaitingToStart){
//Update Game Objects
ground.update(gameSpeed, frameTimeDelta);
cactiController.update(gameSpeed, frameTimeDelta);
player.update(gameSpeed, frameTimeDelta);
}

if(!gameOver && cactiController.collideWith(player)){
    gameOver = true
    setupGameReset();
}

//Draw Game Objects
ground.draw();
cactiController.draw();
player.draw();
if(gameOver){
    showGameOver();
}

if(WaitingToStart){
    showStartGameText();
}


requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener('keyup', reset, {once:true})
window.addEventListener('touchstart', reset, {once:true})