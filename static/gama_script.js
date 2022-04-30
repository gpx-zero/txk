"use strict";


// Global Variable ...
let canvas = document.getElementsByTagName("canvas")[0],
    ctx = canvas.getContext("2d"),
    map,
    players = [],
    main_loop,
    FPS = 50,
    RUN = false;


class Players{

    constructor(RBG, X, Y, WIDTH, HEIGHT, step=50, move_mode='check'){

        this.X = X;
        this.Y = Y;
        this.CONST_X = X;
        this.CONST_Y = Y;
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        this.RGB = RBG;
        this.direction = 1;
        this.step = step;
        this.move_mode = move_mode;

    }

    draw(){

        ctx.fillStyle = this.RGB;
        ctx.fillRect(this.X+((50-this.WIDTH)/2), this.Y+((50-this.HEIGHT)/2), this.WIDTH, this.HEIGHT);

    }

    check_and_move(command){

        if(this.move_mode == 'check'){

            if(command == 'w'){
                if(this.Y != 0){
                    for(let id=0; id<map.maps["map_1"].length; id++){
                        if(this.Y-50 == map.maps["map_1"][id][1] && this.X == map.maps["map_1"][id][0]) return;
                    }
                    this.Y -= this.step;
                    this.direction = 0;
                }
            }
            else if(command == 's'){
                if(this.Y != 550){
                    for(let id=0; id<map.maps["map_1"].length; id++){
                        if(this.Y+50 == map.maps["map_1"][id][1] && this.X == map.maps["map_1"][id][0]) return;
                    }
                    this.Y += this.step;
                    this.direction = 1;
                }
            }
            else if(command == 'a'){
                if(this.X != 0){
                    for(let id=0; id<map.maps["map_1"].length; id++){
                        if(this.X-50 == map.maps["map_1"][id][0] && this.Y == map.maps["map_1"][id][1]) return;
                    }
                    this.X -= this.step;
                    this.direction = 2;
                }
            }
            else if(command == 'd'){
                if(this.X != 550){
                    for(let id=0; id<map.maps["map_1"].length; id++){
                        if(this.X+50 == map.maps["map_1"][id][0] && this.Y == map.maps["map_1"][id][1]) return;
                    }
                    this.X += this.step;
                    this.direction = 3;
                }
            }

        }
        else if(this.move_mode == 'move'){

            if(command == 'w'){
                if(this.Y != 0){
                    this.Y -= this.step;
                    this.direction = 0;
                }
            }
            else if(command == 's'){
                if(this.Y != 550){
                    this.Y += this.step;
                    this.direction = 1;
                }
            }
            else if(command == 'a'){
                if(this.X != 0){
                    this.X -= this.step;
                    this.direction = 2;
                }
            }
            else if(command == 'd'){
                if(this.X != 550){
                    this.X += this.step;
                    this.direction = 3;
                }
            }

        }

    }

    check_for_collision(player){

        if(this.X == player.X && this.Y == player.Y){
            return true;
        }else{
            return false;
        }

    }

    chase(player){

        if( this.X < player.X)
            this.check_and_move('d');
        else if( this.X > player.X)
            this.check_and_move('a');

        if( this.Y < player.Y)
            this.check_and_move('s');
        else if( this.Y > player.Y)
            this.check_and_move('w');

    }

    reset(){

        this.X = this.CONST_X;
        this.Y = this.CONST_Y;

    }

}


class Maps{

    constructor(BACKGROUND_RGB="#eee", BLOCK_RGB='#111'){
        this.maps = {
            map_1 : [
                [150,0],
                [50,50],
                [100,50],
                [150,50],
                [250,50],
                [350,50],
                [450,50],
                [500,50],
                [50,100],
                [250,100],
                [350,100],
                [450,100],
                [500,100],
                [150,150],
                [250,150],
                [350,150],
                [50,200],
                [100,200],
                [150,200],
                [250,200],
                [350,200],
                [400,200],
                [450,200],
                [500,200],
                [400,250],
                [50,300],
                [100,300],
                [150,300],
                [200,300],
                [250,300],
                [300,300],
                [400,300],
                [500,300],
                [300,350],
                [400,350],
                [500,350],
                [50,400],
                [100,400],
                [150,400],
                [200,400],
                [300,400],
                [400,400],
                [500,400],
                [50,450],
                [500,450],
                [50,500],
                [150,500],
                [200,500],
                [250,500],
                [300,500],
                [350,500],
                [400,500],
                [500,500]
            ]
        };
        this.BACKGROUND_RGB = BACKGROUND_RGB;
        this.BLOCK_RGB = BLOCK_RGB;
    }

    draw(map_name='map_1'){

        ctx.fillStyle = this.BACKGROUND_RGB; // "#50d0f0"
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = this.BLOCK_RGB;
        for(let id=0; id<this.maps[map_name].length; id++){
            ctx.fillRect(this.maps[map_name][id][0], this.maps[map_name][id][1], 50, 50);
        }
    }

}


function setup(){

    // Drawing map //
    map = new Maps('#2f5050', '#507570');
    map.draw();

    // Create players //
    players = [
        new Players('#ccc', 0, 0, 30, 30, 25),
        new Players('#44c', 550, 0, 30, 30, 2),
        new Players('#4c4', 100, 350, 30, 30, 1),
        new Players('#4cc', 550, 550, 30, 30, 2, 'move'),
        new Players('#c44', 400, 450, 30, 30, 1, 'move')
    ]

    // Drawing players //
    for(let id=0; id<players.length; id++){
        players[id].draw();
    }

    document.getElementById('main-context').style.display = 'grid';

};


function update(){

    // Drawing map //
    map.draw();

    // Drawing players //
    for(let id=0; id<players.length; id++){
        players[id].draw();
    }

};


function reset(){

    RUN = false;

    console.log("❌ You Lost ❌");

    clearInterval(main_loop);

    for(let id=0; id<players.length; id++){
        players[id].reset();
    }

}


function player_move(event){

    if(event.key == ' ' && !RUN){
        run();
    }
    players[0].check_and_move(event.key);

}


function run(){

    RUN = true;

    setup();

    main_loop = setInterval(()=>{

    // Main Loop //

        // players chase //
        for(let id=1; id<players.length; id++){
            players[id].chase(players[0]);
        }

        for(let id=1; id<players.length; id++){
            if(players[id].check_for_collision(players[0])){
                reset();
            }
        }

        update();
        
    }, 1000/FPS);

}

setup();

/*

Notes ...

    [1] ! add loading mode into this game.

*/