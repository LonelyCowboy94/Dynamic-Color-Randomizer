<<<<<<< HEAD
const body = document.getElementsByTagName("body")[0];
const heading = document.getElementsByTagName("h1")[0];
const colorGround = document.getElementById("color-ground");
const randomBtn = document.getElementById("random-btn");
const btn = document.getElementById("random-btn");
const playPauseBtn = document.getElementById("play-pause-btn");
const stopBtn = document.getElementById("stop-btn");
const rewindBtn = document.getElementById("slow-down-btn");
const fastForwardBtn = document.getElementById("speed-up-btn");
const player = document.getElementsByClassName("player");
const segments = document.querySelectorAll('.segment');
const audio = document.getElementById("audio");
const volume = document.getElementById("volume");
const mute = document.getElementById("mute");
const playBtn = `<svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 5v14l11-7z"/>
</svg>
`;
const pauseBtn = `<svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
</svg>
`;
playPauseBtn.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7z"/>
                  </svg>`;
rewindBtn.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
<g transform="scale(-1,1) translate(-24,0)">
  <path d="M4 6v12l8.5-6L4 6zm9 0v12l8.5-6L13 6z"/>
</g>
</svg>`;
fastForwardBtn.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6v12l8.5-6L4 6zm9 0v12l8.5-6L13 6z"/>
                  </svg>`;
stopBtn.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="6" width="12" height="12"/>
                  </svg>`;

mute.innerHTML = `<svg width="30" height="30" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 10v4h4l5 5V5l-5 5H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02zM14 3.23v2.06c3.39.49 6 3.39 6 6.71s-2.61 6.22-6 6.71v2.06c4.5-.51 8-4.31 8-8.77s-3.5-8.26-8-8.77z"/>
</svg>
`

const playerBtns = [playPauseBtn, rewindBtn, fastForwardBtn, stopBtn];

let working = false;
let intervalId;
let speed = 800;
let currentSpeed;

volume.value = audio.volume;
audio.volume = 1;


let muted = false;
mute.addEventListener('click', () => {
    if(!muted) {
        muted = !muted;
        audio.volume = 0.7;
        volume.value = audio.volume;
        mute.innerHTML = `<svg width="30" height="30" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 10v4h4l5 5V5l-5 5H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02zM14 3.23v2.06c3.39.49 6 3.39 6 6.71s-2.61 6.22-6 6.71v2.06c4.5-.51 8-4.31 8-8.77s-3.5-8.26-8-8.77z"/>
</svg>
`
    }   
    else if(muted) {
        muted = !muted;
        audio.volume = 0;
        volume.value = audio.volume;
        mute.innerHTML = `<svg width="30" height="30" viewBox="0 0 24 24" fill="#8B0000" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02z" opacity="0.3"/>
  <path d="M3 10v4h4l5 5V5l-5 5H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02zm3.49-10.48L18.38 4.1c2.61 1.65 4.32 4.57 4.32 7.9s-1.71 6.25-4.32 7.9l1.61 1.61L20.49 20 3.51 3 2 4.51 5.49 8H3v8h4l5 5v-6.17l7.49 7.49L20.49 20 3.51 3 2 4.51 20.49 22z"/>
</svg>
`
    }
});


let randomColor = () => {
    const red = Math.ceil(Math.random()*255);
    const green = Math.ceil(Math.random()*255);
    const blue = Math.ceil(Math.random()*255);
    return `${red}, ${green}, ${blue}`;
};

const animationSpeed = (speed) => {
    heading.style.animation = `bounce ${speed}s infinite`;
};
    
const randomizeColor = () => {
    
    colorGround.style = `background-color: rgb(${randomColor()})`;
    body.style = `background: linear-gradient(rgba(${randomColor()}, 0.3), rgba(${randomColor()}, 0.8), rgba(${randomColor()}, 0.3))`;
    for (let i = 0; i < player.length; i++) {
        player[i].style.backgroundColor = `rgb(${randomColor()})`;
    }
};

const countSpeed = (arg) => {
    if(speed >= 800) {
        arg = 800;
        return;
    }   else if(speed <= 0) {
        arg = 0; 
        return;
    }
    speed += arg;
};

const play = () => {
    intervalId = setInterval(() => {
        randomizeColor();
        speedOmer();
        randomizeRandomBtn();
        console.log(`brzina je:${speed}`)
}, speed);
};

const randomizeRandomBtn = () => {
    randomBtn.style.background = `rgb(${randomColor()})`;
    randomBtn.style.color = `rgb(${randomColor()})`;
};

randomBtn.addEventListener("click", () => {
    randomizeRandomBtn();
});

randomBtn.addEventListener("mouseenter", () => {
    randomizeRandomBtn();
});

randomBtn.addEventListener("mouseleave", () => {
    randomBtn.style.background = "#bbbbbb";
    randomBtn.style.color = "black";
});

playerBtns.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.background = `rgb(${randomColor()})`; 
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.background = "transparent"; 
    });
});

const colorChangeRapidly = () => {
    if(!working) {
        working = !working;
        play();
        playPauseBtn.innerHTML = pauseBtn;
}   else if(working) {
    working = !working;
    clearInterval(intervalId);
    playPauseBtn.innerHTML = playBtn;
}
};

const rewind = () => {
    if(working) {
        clearInterval(intervalId);
        countSpeed(100);
        if(speed === 0) {
            speed = 100;
        }
        play();
}
};

const fastForward = () => {
    if(working) {
        clearInterval(intervalId);
        countSpeed(-100);
        if(speed === 800) {
            speed = 700;
        }
        play();
}
}

const stop = () => {
    if(working) {
        working = !working;
    }
    clearInterval(intervalId);
    colorGround.style = "background: #FFF";
    body.style = "background: #FFF";
    for (let i = 0; i < player.length; i++) {
        player[i].style.backgroundColor = "#FFF";
    }
    playPauseBtn.innerHTML = playBtn;
    speed = 800;
    animationSpeed(0);
};

volume.addEventListener('input', () => {
    audio.volume = volume.value;
})

const digitMap = {
    0: [0, 1, 2, 4, 5, 6],
    1: [2, 6],
    2: [1, 2, 3, 4, 5],
    3: [1, 2, 3, 5, 6],
    4: [0, 2, 3, 6],          
    5: [0, 1, 3, 5, 6],       
    6: [0, 1, 3, 4, 5, 6],   
    7: [1, 2, 6],            
    8: [0, 1, 2, 3, 4, 5, 6], 
    9: [0, 1, 2, 3, 5, 6]
};

const changeGear = (digit) => {
    segments.forEach(segment => segment.style.opacity = 0.1);

    const activeSegments = digitMap[digit];
    activeSegments.forEach(index => {
        segments[index].style.opacity = 1;
    })
};


btn.addEventListener('click', () => {
    stop();
    speed = currentSpeed;
    randomizeColor();
    audio.play();
    setTimeout(() => {
        audio.pause();
    }, 400);
});
playPauseBtn.addEventListener('click', () => {
    colorChangeRapidly();
    audio.loop = true;
    audio.play();
    if(!working) {
        animationSpeed(0);
        audio.pause();
    };
});
stopBtn.addEventListener('click', () => {
    stop();
    changeGear(0);
    audio.pause();
    audio.currentTime = 0;
});
fastForwardBtn.onclick = fastForward;
rewindBtn.onclick = rewind;

function speedOmer() {
    switch(speed) {
        case 800:
            console.log(`gear 1`);
            changeGear(1);
            animationSpeed(0.8);
            audio.playbackRate = 1;
            currentSpeed = 800;
            break;
        case 700:
            console.log(`gear 2`);
            changeGear(2);
            animationSpeed(0.7);
            audio.playbackRate = 1.2;
            currentSpeed = 700;
            break;
        case 600:
            console.log(`gear 3`);
            changeGear(3);
            animationSpeed(0.6);
            audio.playbackRate = 1.4;
            currentSpeed = 600;
            break;
        case 500:
            console.log(`gear 4`);
            changeGear(4);
            animationSpeed(0.5);
            audio.playbackRate = 1.6;
            currentSpeed = 500;
            break;
        case 400:
            console.log(`gear 5`);
            changeGear(5);
            animationSpeed(0.4);
            audio.playbackRate = 1.9;
            currentSpeed = 400;
            break;
        case 300:
            console.log(`gear 6`);
            changeGear(6);
            animationSpeed(0.3);
            audio.playbackRate = 2.4;
            currentSpeed = 300;
            break;
        case 200:
            console.log(`gear 7`);
            changeGear(7);
            animationSpeed(0.2);
            audio.playbackRate = 3;
            currentSpeed = 200;
            break;
        case 100:
            console.log(`gear 8`);
            changeGear(8);
            animationSpeed(0.1);
            audio.playbackRate = 3.8;
            currentSpeed = 100;
            break;
        case 0:
            console.log(`gear 9`);
            changeGear(9);
            animationSpeed(0.01);
            audio.playbackRate = 4.8;
            currentSpeed = 0;
            break;        
    }
};


=======
const body = document.getElementsByTagName("body")[0];
const heading = document.getElementsByTagName("h1")[0];
const colorGround = document.getElementById("color-ground");
const randomBtn = document.getElementById("random-btn");
const btn = document.getElementById("random-btn");
const playPauseBtn = document.getElementById("play-pause-btn");
const stopBtn = document.getElementById("stop-btn");
const rewindBtn = document.getElementById("slow-down-btn");
const fastForwardBtn = document.getElementById("speed-up-btn");
const player = document.getElementsByClassName("player");
const segments = document.querySelectorAll('.segment');
const audio = document.getElementById("audio");
const volume = document.getElementById("volume");
const mute = document.getElementById("mute");
const playBtn = `<svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 5v14l11-7z"/>
</svg>
`;
const pauseBtn = `<svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
</svg>
`;
playPauseBtn.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7z"/>
                  </svg>`;
rewindBtn.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
<g transform="scale(-1,1) translate(-24,0)">
  <path d="M4 6v12l8.5-6L4 6zm9 0v12l8.5-6L13 6z"/>
</g>
</svg>`;
fastForwardBtn.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6v12l8.5-6L4 6zm9 0v12l8.5-6L13 6z"/>
                  </svg>`;
stopBtn.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="6" width="12" height="12"/>
                  </svg>`;

mute.innerHTML = `<svg width="30" height="30" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 10v4h4l5 5V5l-5 5H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02zM14 3.23v2.06c3.39.49 6 3.39 6 6.71s-2.61 6.22-6 6.71v2.06c4.5-.51 8-4.31 8-8.77s-3.5-8.26-8-8.77z"/>
</svg>
`

const playerBtns = [playPauseBtn, rewindBtn, fastForwardBtn, stopBtn];

let working = false;
let intervalId;
let speed = 800;
let currentSpeed;

volume.value = audio.volume;
audio.volume = 1;


let muted = false;
mute.addEventListener('click', () => {
    if(!muted) {
        muted = !muted;
        audio.volume = 0.7;
        volume.value = audio.volume;
        mute.innerHTML = `<svg width="30" height="30" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 10v4h4l5 5V5l-5 5H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02zM14 3.23v2.06c3.39.49 6 3.39 6 6.71s-2.61 6.22-6 6.71v2.06c4.5-.51 8-4.31 8-8.77s-3.5-8.26-8-8.77z"/>
</svg>
`
    }   
    else if(muted) {
        muted = !muted;
        audio.volume = 0;
        volume.value = audio.volume;
        mute.innerHTML = `<svg width="30" height="30" viewBox="0 0 24 24" fill="#8B0000" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02z" opacity="0.3"/>
  <path d="M3 10v4h4l5 5V5l-5 5H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02zm3.49-10.48L18.38 4.1c2.61 1.65 4.32 4.57 4.32 7.9s-1.71 6.25-4.32 7.9l1.61 1.61L20.49 20 3.51 3 2 4.51 5.49 8H3v8h4l5 5v-6.17l7.49 7.49L20.49 20 3.51 3 2 4.51 20.49 22z"/>
</svg>
`
    }
});


let randomColor = () => {
    const red = Math.ceil(Math.random()*255);
    const green = Math.ceil(Math.random()*255);
    const blue = Math.ceil(Math.random()*255);
    return `${red}, ${green}, ${blue}`;
};

const animationSpeed = (speed) => {
    heading.style.animation = `bounce ${speed}s infinite`;
};
    
const randomizeColor = () => {
    
    colorGround.style = `background-color: rgb(${randomColor()})`;
    body.style = `background: linear-gradient(rgba(${randomColor()}, 0.3), rgba(${randomColor()}, 0.8), rgba(${randomColor()}, 0.3))`;
    for (let i = 0; i < player.length; i++) {
        player[i].style.backgroundColor = `rgb(${randomColor()})`;
    }
};

const countSpeed = (arg) => {
    if(speed >= 800) {
        arg = 800;
        return;
    }   else if(speed <= 0) {
        arg = 0; 
        return;
    }
    speed += arg;
};

const play = () => {
    intervalId = setInterval(() => {
        randomizeColor();
        speedOmer();
        randomizeRandomBtn();
        console.log(`brzina je:${speed}`)
}, speed);
};

const randomizeRandomBtn = () => {
    randomBtn.style.background = `rgb(${randomColor()})`;
    randomBtn.style.color = `rgb(${randomColor()})`;
};

randomBtn.addEventListener("click", () => {
    randomizeRandomBtn();
});

randomBtn.addEventListener("mouseenter", () => {
    randomizeRandomBtn();
});

randomBtn.addEventListener("mouseleave", () => {
    randomBtn.style.background = "#bbbbbb";
    randomBtn.style.color = "black";
});

playerBtns.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.background = `rgb(${randomColor()})`; 
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.background = "transparent"; 
    });
});

const colorChangeRapidly = () => {
    if(!working) {
        working = !working;
        play();
        playPauseBtn.innerHTML = pauseBtn;
}   else if(working) {
    working = !working;
    clearInterval(intervalId);
    playPauseBtn.innerHTML = playBtn;
}
};

const rewind = () => {
    if(working) {
        clearInterval(intervalId);
        countSpeed(100);
        if(speed === 0) {
            speed = 100;
        }
        play();
}
};

const fastForward = () => {
    if(working) {
        clearInterval(intervalId);
        countSpeed(-100);
        if(speed === 800) {
            speed = 700;
        }
        play();
}
}

const stop = () => {
    if(working) {
        working = !working;
    }
    clearInterval(intervalId);
    colorGround.style = "background: #FFF";
    body.style = "background: #FFF";
    for (let i = 0; i < player.length; i++) {
        player[i].style.backgroundColor = "#FFF";
    }
    playPauseBtn.innerHTML = playBtn;
    speed = 800;
    animationSpeed(0);
};

volume.addEventListener('input', () => {
    audio.volume = volume.value;
})

const digitMap = {
    0: [0, 1, 2, 4, 5, 6],
    1: [2, 6],
    2: [1, 2, 3, 4, 5],
    3: [1, 2, 3, 5, 6],
    4: [0, 2, 3, 6],          
    5: [0, 1, 3, 5, 6],       
    6: [0, 1, 3, 4, 5, 6],   
    7: [1, 2, 6],            
    8: [0, 1, 2, 3, 4, 5, 6], 
    9: [0, 1, 2, 3, 5, 6]
};

const changeGear = (digit) => {
    segments.forEach(segment => segment.style.opacity = 0.1);

    const activeSegments = digitMap[digit];
    activeSegments.forEach(index => {
        segments[index].style.opacity = 1;
    })
};


btn.addEventListener('click', () => {
    stop();
    speed = currentSpeed;
    randomizeColor();
    audio.play();
    setTimeout(() => {
        audio.pause();
    }, 400);
});
playPauseBtn.addEventListener('click', () => {
    colorChangeRapidly();
    audio.loop = true;
    audio.play();
    if(!working) {
        animationSpeed(0);
        audio.pause();
    };
});
stopBtn.addEventListener('click', () => {
    stop();
    changeGear(0);
    audio.pause();
    audio.currentTime = 0;
});
fastForwardBtn.onclick = fastForward;
rewindBtn.onclick = rewind;

function speedOmer() {
    switch(speed) {
        case 800:
            console.log(`gear 1`);
            changeGear(1);
            animationSpeed(0.8);
            audio.playbackRate = 1;
            currentSpeed = 800;
            break;
        case 700:
            console.log(`gear 2`);
            changeGear(2);
            animationSpeed(0.7);
            audio.playbackRate = 1.2;
            currentSpeed = 700;
            break;
        case 600:
            console.log(`gear 3`);
            changeGear(3);
            animationSpeed(0.6);
            audio.playbackRate = 1.4;
            currentSpeed = 600;
            break;
        case 500:
            console.log(`gear 4`);
            changeGear(4);
            animationSpeed(0.5);
            audio.playbackRate = 1.6;
            currentSpeed = 500;
            break;
        case 400:
            console.log(`gear 5`);
            changeGear(5);
            animationSpeed(0.4);
            audio.playbackRate = 1.9;
            currentSpeed = 400;
            break;
        case 300:
            console.log(`gear 6`);
            changeGear(6);
            animationSpeed(0.3);
            audio.playbackRate = 2.4;
            currentSpeed = 300;
            break;
        case 200:
            console.log(`gear 7`);
            changeGear(7);
            animationSpeed(0.2);
            audio.playbackRate = 3;
            currentSpeed = 200;
            break;
        case 100:
            console.log(`gear 8`);
            changeGear(8);
            animationSpeed(0.1);
            audio.playbackRate = 3.8;
            currentSpeed = 100;
            break;
        case 0:
            console.log(`gear 9`);
            changeGear(9);
            animationSpeed(0.01);
            audio.playbackRate = 4.8;
            currentSpeed = 0;
            break;        
    }
};


>>>>>>> 048ed20e4cd12adcf526845a91d07fd102e5e88c
