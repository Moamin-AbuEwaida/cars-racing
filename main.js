const container = document.getElementById('container');
const line = document.getElementById('line');
const line_1 = document.getElementById('line-1');
const line_2 = document.getElementById('line-2');
const line_3 = document.getElementById('line-3');
const car = document.getElementById('car');
const car_1 = document.getElementById('car-1');
const car_2 = document.getElementById('car-2');
const car_3 = document.getElementById('car-3');
const restart_div = document.getElementById('restart-div');
const restart_btn = document.getElementById('restart');
const score = document.getElementById('score');

//saving some initial settings
const container_left = parseInt(container.css('left'));
const container_width = parseInt(container.css('width'));
const container_height = parseInt(container.css('height'));
const car_width = parseInt(car.css('width'));
const car_height = parseInt(car.css('height'));

// game variables
let game_over= false;
let score_counter = 1;
let car_speed = 2;
let line_speed = 5;
let anim_id;

// event listener
window.addEventListener('keydown', function (e) {
    let key = e.which;
    if(game_over === false){
        if(key === 37){
            if(parseInt(car.css('right')) < (container_width - car_width -20)){
                car.animate({
                    left: "-=20px"
                }, 30)
            }
        } else if (key === 39){
            if(parseInt(car.css('left')) < (container_width - car_width - 20)){
                car.animate({
                    left: '+=20px'
                }, 30)
            }
        } else if (key === 38){
            if(parseInt(car.css('bottom')) < (container_width - car_width - 20)){
                car.animate({
                    bottom: '+=20px'
                }, 30)
            }
        } else if (key === 40){
            if(parseInt(car.css('top')) < (container_width - car_width - 20)){
                car.animate({
                    top: '-=20px'
                }, 40)
            }
        } else {
            if(key === 13){
                window.location.reload(true);
            }
        }
    }
    
})


function car_down(car){
    const current_top= parseInt(car.css('top'));
    if(current_top > (container_height + 50)){
        current_top = -60;
        const car_left = Math.floor(Math.random() * (container_width - car_width));
        car.css('left', car_left);
    }
    car.css('top', current_top + car_speed);
}

function line_down(line){
    const l_current_top = parseInt(line.css('top'));
    if(l_current_top > (container_height + 150)){
        l_current_top = -300;
    }
    line.css('top', l_current_top + line_speed);
}

function stop_game(){
    game_over = true;
    cancelAnimationFrame(anim_id);
    restart_div.slideDown();
    restart_btn.focus();
}

restart_div.addEventListener('click', function(){
    window.location.reload(true);
})

function collapsion(elem1, elem2){
    const x1=elem1.offset().left;
    const y1= elem1.offset().top;
    const x2=elem2.offset().left;
    const y2= elem2.offset().top;
    const h1 = elem1.outerheight();
    const w1 = elem1.outerwidth();
    const h2 = elem2.outerheight();
    const w2 = elem2.outerwidth();
    b1 = y1+h1;
    r1= x1+w1;
    b2= y2+h2;
    r2= x2+w2;
    if(b1<y2 || y1>b2 || r1<x2 || x1>r2){
        return false;
    }
    return true;
}


function repeat() {
    if(game_over=== false){
        score_counter++;
        if(score_counter % 20 == 0){
            score.text(parseInt(score.text())+1)
        }
        if(score_counter % 300 == 0){
            car_speed++;
            line_speed++;
        }
        if(collapsion(car, car_1) || collapsion(car, car_2) || collapsion(car, car_3)){
            stop_game();
            console.log(game_over);
        }
        car_down(car_1);
        car_down(car_2);
        car_down(car_3);

        line_down(line_1);
        line_down(line_2);
        line_down(line_3);
        anim_id = requestAnimationFrame(repeat);
    }
};

anim_id = requestAnimationFrame(repeat);