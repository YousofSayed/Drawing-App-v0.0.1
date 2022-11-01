let tools = document.querySelector('.tools .container'),
    toolsInputs = document.querySelector('.tools .container .right'),
    canvasParent = document.querySelector('.canvasParent'),
    canvas = document.getElementById('mycanvas'),
    ctx = canvas.getContext('2d'),
    brush = document.getElementById('brush'),
    eraser = document.getElementById('eraser'),
    shapes = document.getElementById('shapesParent'),
    shapesIcon = document.getElementById('shapes'),
    range = document.getElementById('range'),
    color = document.getElementById('color'),
    check = document.getElementById('check'),
    clearBtn = document.getElementById('clearCanvas'),
    downloadBtn = document.getElementById('download'),
    snapShot,
    x = 0,
    y = 0,
    tank,
    border,
    checker = 1,
    shapesInc = 1,
    isDrawing = false,
    isDraggingForShapes = false,
    isFill = false,
    isTouch = false,
    isDraw = false,
    isEraser = false,
    isRect = false,
    iscircle = false,
    isTriangel = false,
    isLine = false;

//====================Start Loader====================
let loader = document.querySelector('.loader');
window.addEventListener('load', () => { loader.style.display = 'none' });
//====================End Loader======================




canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight - 5;

window.onresize = (e) => {
    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight - 5;
}

ctx.fillStyle = `#ffffff`;
ctx.fillRect(0, 0, canvas.width, canvas.height)



let typeOfEventForShapes;
//For Shape  PC
shapesIcon.addEventListener('click', () => {
    //To Prevent Element From Opening While Moving
    if (typeOfEventForShapes === 'mousemove') return false;

    shapes.style.transition = '.2s'
    shapes.classList.toggle('active');
})

window.addEventListener('mousedown', (e) => {
    if (e.target.id === 'shapes') {
        //To Prevent Element From Opening While Moving
        typeOfEventForShapes = e.type;
        shapes.style.transition = '0s'
        isDraggingForShapes = true;
    }
})

window.addEventListener('mousemove', (e) => {
    if (isDraggingForShapes === true) {
        typeOfEventForShapes = e.type;
        shapes.style.top = `${e.clientY - 22.5}px`;
        shapes.style.left = `${e.clientX - 22.5}px`
    }
})

window.addEventListener('mouseup', () => {
    isDraggingForShapes = false;
})

//For Touch Devices
shapesIcon.addEventListener('touchstart', () => {
    shapes.style.transition = '0s'
    isDraggingForShapes = true;
})


window.addEventListener('touchmove', (e) => {
    if (isDraggingForShapes === true) {
        shapes.style.top = `${e.touches[0].clientY - 22.5}px`;
        shapes.style.left = `${e.touches[0].clientX - 22.5}px`;
    }
})


shapesIcon.addEventListener('touchend', () => {
    isDraggingForShapes = false;
})


shapesIcon.addEventListener('touchcancel', () => {
    isDraggingForShapes = false;
})



//Start Style Tools--------------
let pos = document.querySelectorAll('.pos'),
    icons = document.querySelectorAll('.pos i'),
    gear = document.querySelector('.gear'),
    geari = 1,
    isMoving = false,
    isOpen = false,
    typeOfEvent;

gear.addEventListener('click', (e) => {
    if (typeOfEvent === 'mousemove') return false
    geari++
    if (geari === 2) {
        for (let i = 0; i < pos.length; i++) {
            pos[i].style.transform = `translateX(0) rotate(calc(360deg / ${pos.length} * ${i}) ) `;
            pos[i].style.left = `0%`;
        }
    } else {
        geari = 1;
        for (let i = 0; i < pos.length; i++) {
            pos[i].style.transform = `translateX(-50%)`;
            pos[i].style.left = `50%`;
        }

    }
})

//To Style Icon Rotate
for (let i = 0; i < icons.length; i++) {
    icons[i].style.transform = `rotate(calc(-360deg / ${pos.length} * ${i}) ) `;

}

//Start Moving For Pc
gear.addEventListener('mousedown', (e) => {
    typeOfEvent = e.type;
    isMoving = true;
    isOpen = false;
})

window.addEventListener('mousemove', (e) => {
    isOpen = false;
    if (isMoving === true) {
        typeOfEvent = e.type;
        if (document.body.offsetWidth <= 767) {
            tools.style.top = `${e.clientY - 50}px`;
            tools.style.left = `${e.clientX - 50}px`;
        } else {
            tools.style.top = `${e.clientY - 100}px`;
            tools.style.left = `${e.clientX - 100}px`;
        }
    }
})

window.addEventListener('mouseup', (e) => {
    isMoving = false;
})

window.addEventListener('mouseleave', (e) => {
    isMoving = false;
})
//End Moving For Pc


//Start Moving For touch Devices
gear.addEventListener('touchstart', () => {
    isMoving = true;
})

window.addEventListener('touchmove', (e) => {
    if (isMoving === true) {
        if (document.body.offsetWidth <= 767) {
            tools.style.top = `${e.touches[0].clientY - 50}px`;
            tools.style.left = `${e.touches[0].clientX - 50}px`;
        } else {
            console.log(true);
            tools.style.top = `${e.touches[0].clientY - 100}px`;
            tools.style.left = `${e.touches[0].clientX - 100}px`;
        }
    }
})

window.addEventListener('touchend', () => {
    isMoving = false;
})

window.addEventListener('touchcancel', () => {
    isMoving = false;
})
//End Moving For touch Devices



function makeShapesAllFalse() {
    isRect = false;
    iscircle = false;
    isTriangel = false;
    isLine = false;
}

function makeDrawAndEraserFasle() {
    isEraser = false;
    isDraw = false;
}

//Tools For PC
tools.addEventListener('click', (e) => {

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        x = e.offsetX;
        y = e.offsetY;
    })


    tank = e.target.id;

    if (tank === 'brush') {
        isDraw = true;
        isEraser = false;
        makeShapesAllFalse()
    }

    if (tank === 'rect') {
        isRect = true;
        makeDrawAndEraserFasle()
    } else if (tank === 'circle' || tank === 'triangel' || tank === 'line') {
        isRect = false;

    }

    if (tank === 'circle') {
        iscircle = true;
        makeDrawAndEraserFasle()
    } else if (tank === 'rect' || tank === 'triangel' || tank === 'line') {
        iscircle = false;
    }

    if (tank === 'triangel') {
        isTriangel = true;
        makeDrawAndEraserFasle()
    } else if (tank === 'rect' || tank === 'circle' || tank === 'line') {
        isTriangel = false;
    }

    if (tank === 'line') {
        isLine = true;
        makeDrawAndEraserFasle()
    } else if (tank === 'rect' || tank === 'circle' || tank === 'triangel') {
        isLine = false;
    }


    if (tank === 'eraser') {
        isEraser = true;
        isDraw = false;
        makeShapesAllFalse()
        console.log(isEraser);
    }


    console.log(tank);
    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing === true) {
            drawTriangle(e);
            drawRect(e);
            drawCircle(e);
            draw(ctx, x, y, e.offsetX, e.offsetY, e);
            drawLine(e);
        }


    })



    canvas.addEventListener('mouseup', (e) => {
        isDrawing = false;

    })


    canvas.addEventListener('mouseleave', (e) => {
        isDrawing = false;

    })

})



//Start Tools For Touches Devices

tools.addEventListener('click', (e) => {
    canvas.addEventListener('touchstart', (e) => {
        isTouch = true;
        isDrawing = true;
        snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    })


    tank = e.target.id;

    canvas.addEventListener('touchmove', (e) => {
        if (isDrawing === true) {
            drawTriangle(e);
            drawRect(e);
            drawCircle(e);
            draw(ctx, x, y, e.touches[0].clientX, e.touches[0].clientY, e);
            drawLine(e);
        }
    })


    canvas.addEventListener('touchend', (e) => {
        isDrawing = false;

    })


    canvas.addEventListener('touchcancel', (e) => {
        isDrawing = false;

    })
})
//End Tools For Touches Devices



//Start Range Input For Font Or Stroke
range.value = 0;
ctx.lineWidth = range.value;
let valueOfRange = document.getElementById('valueOFRange');

range.addEventListener('input', (e) => {
    ctx.lineWidth = range.value;
    valueOfRange.textContent = range.value;
})
//End Range Input For Font Or Stroke

//End Style Tools----------------




check.addEventListener('click', () => {
    checker++;
    if (checker === 2) {
        isFill = true;
        check.style.backgroundColor = color.value;
    }
    if (checker === 3) {
        checker = 1;
        isFill = false;
        check.style.backgroundColor = `transparent`;
    }
    console.log(isFill);
});

color.addEventListener('change', () => {
    ctx.strokeStyle = color.value;
    if (checker === 2) {
        check.style.backgroundColor = color.value;
    }

});



function fillRectWhite() {
    if (ctx.fillStyle === '#ffffff' || ctx.fillStyle === '#fff') {
        return false
    }
    if (ctx.fillStyle === '#000000') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        console.log(ctx.fillStyle);
    }
};

function draw(ctx, x1, y1, x2, y2, event) {
    if (tank === 'brush' || tank === 'eraser' ||
        tank === 'gear' && isDraw === true ||
        tank === 'range' && isDraw === true ||
        tank === 'range' && isEraser === true ||
        tank === 'color' && isDraw === true
    ) {
        fillRectWhite();
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineWidth = range.value;

        //To Eraser
        if (tank === 'eraser' ||
            tank === 'gear' && isEraser === true ||
            tank === 'range' && isEraser === true
        ) {
            ctx.strokeStyle = '#fff';
        } else {
            ctx.strokeStyle = color.value;
        }


        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        //For Touch Devices
        if (isTouch === true) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        } else {
            x = event.offsetX;
            y = event.offsetY;
        }
        //For Touch Devices

    } else {

        return false;
    }

};


function drawRect(event) {


    if (tank === 'rect' ||
        tank === 'shapes' && isRect === true ||
        tank === 'range' && isRect === true ||
        tank === 'color' && isRect === true ||
        tank === 'check' && isRect === true
    ) {

        fillRectWhite();
        ctx.beginPath();
        ctx.putImageData(snapShot, 0, 0);
        ctx.lineWidth = range.value;

        //For Touch Devices
        if (isTouch === true) {
            if (isFill === true) {
                ctx.fillStyle = color.value;
                ctx.fillRect(x, y, event.touches[0].clientX - x, event.touches[0].clientY - y)
            }
            ctx.strokeRect(x, y, event.touches[0].clientX - x, event.touches[0].clientY - y);
        } else {
            ctx.strokeRect(x, y, event.offsetX - x, event.offsetY - y);
            if (isFill === true) {
                ctx.fillStyle = color.value;
                ctx.fillRect(x, y, event.offsetX - x, event.offsetY - y)
            }
        }
        //For Touch Devices
        if (tank !== 'eraser') {
            ctx.strokeStyle = color.value;
        }


        ctx.stroke();
        if (isFill === true) {
            console.log(1);
            ctx.fillStyle = color.value;
            ctx.fillRect(x, y, event.offsetX - x, event.offsetY - y);
        }
        ctx.closePath();

    } else {

        return false
    }
};

function drawCircle(event) {
    if (tank === 'circle' ||
        tank === 'shapes' && iscircle === true ||
        tank === 'range' && iscircle === true ||
        tank === 'color' && iscircle === true ||
        tank === 'check' && iscircle === true
    ) {

        fillRectWhite();
        ctx.putImageData(snapShot, 0, 0)
        ctx.beginPath();


        //For Touch Devices
        let circleDimention;
        if (isTouch === true) {
            circleDimention = event.touches[0].clientX - x;
        } else {
            circleDimention = event.clientX - x;
        }


        if (circleDimention < 0) {
            circleDimention = 0;
        } else {
            circleDimention = event.clientX - x;
            if (isTouch === true) {
                circleDimention = event.touches[0].clientX - x;
            }
        }
        //For Touch Devices
        ctx.arc(x, y, circleDimention, 0, 2 * Math.PI);
        if (isFill === true) {
            ctx.fillStyle = color.value;
            ctx.fill();
        }

        if (tank !== 'eraser') {
            ctx.strokeStyle = color.value;
        }

        ctx.stroke();
        ctx.closePath();

    } else {
        return false
    }

};

function drawLine(event) {
    if (tank === 'line' ||
        tank === 'shapes' && isLine === true ||
        tank === 'range' && isLine === true ||
        tank === 'color' && isLine === true ||
        tank === 'check' && isLine === true ||
        tank === 'gear' && isLine === true
    ) {
        fillRectWhite();
        ctx.putImageData(snapShot, 0, 0);
        ctx.beginPath();
        ctx.moveTo(x, y);
        if (isTouch) {
            ctx.lineTo(event.touches[0].clientX, event.touches[0].clientY);
        } else {
            ctx.lineTo(event.clientX, event.clientY);
        }

        if (tank !== 'eraser') {
            ctx.strokeStyle = color.value;
        }
        ctx.strokeStyle = color.value;
        ctx.stroke();
    } else { return false }
};


function drawTriangle(event) {
    if (tank === 'triangel' ||
        tank === 'shapes' && isTriangel === true ||
        tank === 'range' && isTriangel === true ||
        tank === 'color' && isTriangel === true ||
        tank === 'check' && isTriangel === true
    ) {


        fillRectWhite();
        ctx.putImageData(snapShot, 0, 0)
        ctx.beginPath();
        ctx.lineCap = `round`
        ctx.moveTo(x, y);

        //For Touch Devices
        if (isTouch === true) {
            ctx.lineTo(event.touches[0].clientX, event.touches[0].clientY);
            ctx.lineTo(x * 2 - event.touches[0].clientX, event.touches[0].clientY);
        } else {
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.lineTo(x * 2 - event.offsetX, event.offsetY);
        }
        //For Touch Devices

        console.log(x * 2);
        console.log(event.offsetX);
        if (isFill === true) {
            ctx.fillStyle = color.value;
            ctx.fill();
        }

        if (tank !== 'eraser') {
            ctx.strokeStyle = color.value;
        }
        ctx.closePath();
        ctx.stroke();
        // ctx.fill()




    } else {
        return false

    }






};

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
};



function download() {

    let data = canvas.toDataURL('image/jpeg');
    let a = document.createElement('a');
    a.download = 'image.jpeg';
    a.href = data;
    a.click();

};

//To Clear
clearBtn.addEventListener('click', () => {
    clearCanvas()
});


//To Download
downloadBtn.addEventListener('click', () => {
    fillRectWhite();
    download();
});

//===========================================================================
//=========================Making Music Player===============================
//===========================================================================
let parentOfAudios = document.querySelector('.audios'),
    allAudios = document.querySelectorAll('.aud'),
    musicArea = document.querySelector('.music-area'),
    titleOfSong = document.querySelector('.music-area .titleOfSong'),
    circle = document.querySelector('.music-area .circle'),
    timeContainer = document.querySelector('.timeContainer'),
    time = document.querySelector('.time'),
    currentMin = document.querySelector('.currentTime .min'),
    currentSec = document.querySelector('.currentTime .sec'),
    totaltMin = document.querySelector('.totalTime .min'),
    totaltSec = document.querySelector('.totalTime .sec'),
    bar = document.getElementById('bar'),
    appearList = document.getElementById('appearList'),
    previous = document.getElementById('previous'),
    next = document.getElementById('next'),
    play = document.getElementById('play'),
    list = document.querySelector('.list'),
    song = document.querySelector('.list .song'),
    repeat = document.getElementById('repeat'),
    repeat2 = document.getElementById('repeat2'),
    repeatOnce = document.getElementById('numOfLoop'),
    repeatOnce2 = document.getElementById('numOfLoop2'),
    trash = document.getElementById('trash'),
    add = document.getElementById('add'),
    numOfMusic = document.getElementById('numOfMusic'),
    stateOfPlaying = document.getElementById('stateOfPlaying'),
    state = document.getElementById('state'),
    Playing = 1,
    i1 = 0,
    i2 = 1,
    isPlayed = false;


for (let i = 0; i < allAudios.length; i++) {
    let clone = song.cloneNode(true);
    clone.draggable = 'true';
    clone.setAttribute('num', `${i}`);
    clone.setAttribute('num2', `${i}`);
    clone.setAttribute('trueOrFalse', `false`);
    allAudios[i].setAttribute('num', `${i}`);
    song.remove();
    list.appendChild(clone);

    //Butting name of songs
    clone.childNodes[3].textContent = allAudios[i].outerHTML.slice(32, -22);
    list.children[1].children[1].children[0].textContent = `Music ${i + 1}`
    console.log(list.children[1].children[1].children[0]);
}


//To appear And Disappear The Music Area Or Player
musicArea.addEventListener('click', (e) => {
    e.stopPropagation()
    if (e.target.className === 'fa-solid fa-music' || e.target.className === 'fa-solid fa-music toggle') {
        e.target.classList.toggle('toggle');
        musicArea.classList.toggle('toggle');
        console.log(true);
    }
})



//To Appear The List
appearList.addEventListener('click', (e) => {
    e.stopPropagation();
    list.style.bottom = '0';
})
list.addEventListener('click', (e) => { e.stopPropagation() })
musicArea.addEventListener('click', () => { list.style.bottom = '-100%'; })




//To Make It Play 
function playAudio() {
    Playing++;
    isPlayed = true;
    circle.classList.toggle('active');
    timeContainer.classList.toggle('active');
    if (Playing === 2) {
        allAudios[+numOfIndexs[i1]].play();
        console.log(i1);
        console.log(numOfIndexs);
        play.className = 'fa-solid fa-pause';
    } else {
        Playing = 1;
        allAudios.forEach((e) => { e.pause() })
        play.className = 'fa-solid fa-play';
    }

}


//TO Drag And Drop
let songs = document.querySelectorAll('.song'),
    firstElement,
    firstElementText,
    lastElement,
    lastElementText,
    firstNumAttr,
    lastNumAttr;

numOfIndexs = [...songs].map((e) => { return e.getAttribute('num') });
console.log(numOfIndexs)



//To Start Dragging And Drop
function dragAndDrop() {

    songs.forEach((e) => {
        e.addEventListener('dragstart', (el) => {

            //To Make First Element
            firstElementText = el.currentTarget.innerHTML;
            firstElement = el.currentTarget;
            firstNumAttr = el.currentTarget.getAttribute('num');

        })

        e.addEventListener('dragenter', (e) => {
            //To Add Class
            e.currentTarget.classList.add('right');
            //To Make Last Element
            lastElement = e.currentTarget;
            lastElementText = e.currentTarget.innerHTML;
            lastNumAttr = e.currentTarget.getAttribute('num');
        })


        e.addEventListener('dragover', (e) => {
            e.preventDefault();
        })


        e.addEventListener('dragleave', (e) => {
            //To Remove class
            e.currentTarget.classList.remove('right');
        })

        e.addEventListener('drop', (e) => {
            //To Swich Between Them
            firstElement.innerHTML = lastElementText;
            firstElement.setAttribute('num', lastNumAttr);
            lastElement.innerHTML = firstElementText;
            lastElement.setAttribute('num', firstNumAttr);
            //To Make Audios Run As Indexs Of List Songs
            numOfIndexs = [...songs].map((e) => { return e.getAttribute('num') });
            //To Remove Class on target 
            e.currentTarget.classList.remove('right');

            //Very Important To Make I1 Just Equal Audio Which Has True While Draging OR Drop Another Element OR Him
            allAudios.forEach((el) => {
                if (el.getAttribute('trueOrFalse2') === 'true') {
                    songs.forEach((elS) => {
                        if (elS.getAttribute('num') === el.getAttribute('num')) {
                            i1 = +elS.getAttribute('num2');
                        }
                    })
                }
            })
            console.log(i1);

        })


    });
}
dragAndDrop()
//To Make Style For Current Playing Music
function removeAndMakeStyle(el) {
    el.children[1].style.color = '#fff';
    el.children[2].style.opacity = '0';
    if (el.getAttribute('num2') === allAudios[i1].getAttribute('num')) {
        el.children[1].style.color = 'rgb(88, 189, 230)';
        el.children[2].style.opacity = '1';
    }
};

//To play Audio With Click On His Name
function playCurrentAudio() {

    songs.forEach((el) => {
        el.addEventListener('click', (event) => {
            circle.classList.add('active');
            // playAfterDeleting();
            i1 = +event.currentTarget.getAttribute('num2');
            Playing = 2;
            allAudios.forEach((e) => { e.pause(); e.currentTime = 0; })
            allAudios[+numOfIndexs[i1]].play();
            play.className = 'fa-solid fa-pause';
            songs.forEach((el) => {
                removeAndMakeStyle(el)
            })
            event.currentTarget.children[1].style.color = 'rgb(88, 189, 230)';
            event.currentTarget.children[2].style.opacity = '1';

        })
    });

};
playCurrentAudio();



play.addEventListener('click', () => {
    playAudio();
});


//To custom Bar
bar.value = 0;
function barValue() {
    //To preavent Event From Working If Client Delet All Songs
    if (allAudios[+numOfIndexs[i1]].getAttribute('trueOrFalse') === 'false') {
        return false
    }

    //To Make current Time Equal Bar Value
    allAudios[+numOfIndexs[i1]].currentTime = Math.trunc(bar.value);

    //To Link Betweent The Bar value And Current Time
    currentMin.textContent = Math.trunc(allAudios[+numOfIndexs[i1]].currentTime / 60);
    currentSec.textContent = Math.trunc(allAudios[+numOfIndexs[i1]].currentTime % 60);
};

bar.addEventListener('change', () => {
    barValue();
});

bar.addEventListener('click', () => {
    barValue();
});

//Putting The Time With Play Event
allAudios.forEach((e) => { e.setAttribute('trueOrFalse2', 'false') });
let interval;
function playEvent() {

    allAudios.forEach((el) => {

        el.addEventListener('play', (e) => {
            allAudios.forEach((e) => { e.setAttribute('trueOrFalse2', 'false') });

            e.target.setAttribute('trueOrFalse2', 'true');
            songs.forEach((el) => {
                removeAndMakeStyle(el)
            })
            //To butting Name
            handleName();

            //To Appear The Area Of Time
            time.classList.add('active');

            //To Putting Total Time
            totaltMin.textContent = Math.trunc(allAudios[+numOfIndexs[i1]].duration / 60);
            totaltSec.textContent = Math.trunc(allAudios[+numOfIndexs[i1]].duration % 60);


            interval = setInterval(() => {
                //Bar =====+++++
                bar.addEventListener('click', () => {
                    barValue();
                })
                bar.max = allAudios[+numOfIndexs[i1]].duration;
                bar.value = allAudios[+numOfIndexs[i1]].currentTime;
                currentMin.textContent = Math.trunc(allAudios[+numOfIndexs[i1]].currentTime / 60);
                currentSec.textContent = Math.trunc(allAudios[+numOfIndexs[i1]].currentTime % 60);
            }, 1000);
        })

    });
}
playEvent();


//To Handle The Name Of Title Of Song
function handleName() {
    allAudios.forEach((audio) => {
        if (audio.getAttribute('trueOrFalse2') === 'true') {
            songs.forEach((song) => {
                if (song.getAttribute('num') === audio.getAttribute('num')) {

                    titleOfSong.textContent = song.textContent;
                }
            })
        }

    })
}

//To Repeat Once Or Shuffle
function repeatOrShuffle() {
    //To Repeat Once
    if (repeat.getAttribute('trueOrFalse') === 'true') {
        allAudios[+numOfIndexs[i1]].currentTime = 0;
        handleName()
        allAudios[+numOfIndexs[i1]].play();

    }

    //To Shuffle
    if (repeat.className === 'fa-solid fa-shuffle') {
        var randomNum = Math.random();
        i1 = Math.trunc(randomNum * allAudios.length);

        allAudios.forEach((e) => { e.pause() });
        allAudios[+numOfIndexs[i1]].currentTime = 0;
        handleName()
        allAudios[+numOfIndexs[i1]].play();
    }

}

//previous Button--------
previous.addEventListener('click', () => {
    if (!isPlayed) return false
    allAudios.forEach((e) => { e.setAttribute('trueOrFalse2', 'false') });

    //To Repeat Once Or Shuffle
    repeatOrShuffle();

    //To increas
    if (repeat.getAttribute('trueOrFalse') === 'true') return false
    if (repeat.className === 'fa-solid fa-shuffle') return false
    i1--;
    if (i1 < 0) {
        i1 = allAudios.length - 1;
    }
    allAudios.forEach((e) => { e.pause() })
    allAudios[+numOfIndexs[i1]].currentTime = 0;
    allAudios[+numOfIndexs[i1]].play();
});


//Next Button--------
next.addEventListener('click', () => {
    if (!isPlayed) return false
    allAudios.forEach((e) => { e.setAttribute('trueOrFalse2', 'false') });

    //To Repeat Once Or Shuffle
    repeatOrShuffle();

    //To increas
    if (repeat.getAttribute('trueOrFalse') === 'true') return false
    if (repeat.className === 'fa-solid fa-shuffle') return false
    i1++;
    if (i1 > allAudios.length - 1) {
        i1 = 0;
    }
    allAudios.forEach((e) => { e.pause() })
    allAudios[+numOfIndexs[i1]].currentTime = 0;
    allAudios[+numOfIndexs[i1]].play();
});

//To Repeat , Repeat once , Shuffle
function commandForRepeat() {
    if (!isPlayed) return false
    i2++
    if (i2 === 2) {
        repeatOnce.style.opacity = '1';
        repeatOnce2.style.opacity = '1';
        allAudios[+numOfIndexs[i1]].loop = true;

        handleName()

        repeat.setAttribute('trueOrFalse', 'true');
    }
    else if (i2 === 3) {
        repeatOnce.style.opacity = '0';
        repeatOnce2.style.opacity = '0';
        allAudios[+numOfIndexs[i1]].loop = false;
        repeat.className = 'fa-solid fa-shuffle';
        repeat2.className = 'fa-solid fa-shuffle';
        //To Prevent Repeat Once
        repeat.setAttribute('trueOrFalse', 'false');
    }
    else {
        i2 = 1;
        repeat.className = 'fa-solid fa-repeat';
        repeat2.className = 'fa-solid fa-repeat';
    }
}
repeat.addEventListener('click', () => {
    commandForRepeat()
});

repeat2.addEventListener('click', () => {
    commandForRepeat()
});

//To End Song With End Event
function endOfaudio() {
    allAudios.forEach((e) => {
        e.addEventListener('ended', () => {
            //To Shuffle
            repeatOrShuffle()

            //To Reapeat  All
            if (repeat.getAttribute('trueOrFalse') === 'true') return false
            if (repeat.className === 'fa-solid fa-shuffle') return false
                i1++
                if (i1 > allAudios.length - 1) {
                    i1 = 0;
                    allAudios[+numOfIndexs[i1]].play()
                };
                allAudios.forEach((e) => { e.pause() });
                allAudios[+numOfIndexs[i1]].play();
           
        });
    })
}
// allAudios.forEach((e) => {
endOfaudio();
// });

let isDeleted = false;

//To Remove All Songs
trash.addEventListener('click', () => {
    let warn = confirm('Are You Sure To Remove All ?')
    if (warn === true) {
        //To Clear Interval
        allAudios.forEach((e) => { e.pause() });
        clearInterval(interval);

        //To Handle The Other Element
        titleOfSong.textContent = '';
        currentMin.textContent = 0;
        currentSec.textContent = 0;
        totaltSec.textContent = 0;
        totaltMin.textContent = 0;
        bar.value = 0;
        circle.classList.remove('active')
        //To Run It With play Event
        Playing = 1;
        play.className = 'fa-solid fa-play';
        //To Remove All Songs
        let allSongs = document.querySelectorAll('.song');
        allSongs.forEach((e) => { e.remove() })
        allAudios.forEach((e) => { e.remove() })
        //To Know If Is Deleted To Throw For Upload Function
        isDeleted = true;
        //To Calc Nums Of Songs
        numOfMusic.textContent = `Music ${0}`;
    } else {
        return false;
    }
});

//To Remove One Song OR Item
function delX() {
    songs.forEach((e) => {
        e.addEventListener('click', (e) => {
            if (e.target.className.includes('fa-x')) {
                e.currentTarget.remove();
                i1--
                if (i1 < 0) i1 = 0;
                numOfIndexs = [...songs].map((e) => { return e.getAttribute('num') });
                allAudios.forEach((e) => { e.pause() })
                allAudios[+numOfIndexs[i1]].play();
            }
        })
    });
}
delX();
//To Add Song
let numofAud = allAudios.length - 1;

//Upload Function
function upload() {
    //To Make numofAud increment
    numofAud++

    //To Create The Input File Element
    let inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = '.mp3 , .m4a'
    document.body.appendChild(inputFile);
    inputFile.style.display = 'none';
    inputFile.click();


    //To Create The audio Element
    let audio = document.createElement('audio');
    audio.className = 'aud';
    audio.setAttribute('num', numofAud);
    audio.setAttribute('trueOrFalse', true);

    //To Clone The Song Element
    let clone = song.cloneNode(true);
    clone.draggable = 'true';
    console.log(clone);
    clone.setAttribute('num', numofAud);
    clone.setAttribute('num2', numofAud);
    clone.setAttribute('trueOrFalse', `false`);

    //Input With Change Event
    inputFile.addEventListener('change', () => {
        //To Append And Re Calc Num Of Audios And Songs Element
        list.appendChild(clone);
        parentOfAudios.appendChild(audio);
        allAudios = document.querySelectorAll('.aud');
        songs = document.querySelectorAll('.song');


        //To Know If All DeleTed Or Not
        if (isDeleted) {
            numofAud = allAudios.length - 1;
            audio.setAttribute('num', numofAud);
            clone.setAttribute('num', numofAud);
            clone.setAttribute('num2', numofAud);
            numOfIndexs = [...songs].map((e) => { return e.getAttribute('num') });
            allAudios.forEach((e) => { e.setAttribute('trueOrFalse2', 'false') });
            list.children[1].children[1].children[0].textContent = `Music ${songs.length}`;
            console.log(numOfIndexs);

        } else {
            numOfIndexs = [...songs].map((e) => { return e.getAttribute('num') });
            list.children[1].children[1].children[0].textContent = `Music ${songs.length}`;

        }

        const reader = new FileReader();
        reader.readAsDataURL(inputFile.files[0]);
        reader.addEventListener('load', () => {
            audio.src = reader.result;
            clone.children[1].textContent = inputFile.files[0].name.slice(0, -4);
        })

        audio.addEventListener('ended', () => {
            repeatOrShuffle();
            if (repeat.getAttribute('trueOrFalse') === 'true') return false
            if (repeat.className === 'fa-solid fa-shuffle') return false
            i1++
            if (i1 > numofAud) {
                i1 = 0;
            }
            allAudios[+numOfIndexs[i1]].currentTime = 0;
            allAudios[+numOfIndexs[i1]].play();
        })

        //I Will Not Use The Next Function Because It Increas Th i1 For 2
        // endOfaudio();
        playCurrentAudio();
        playEvent();
        dragAndDrop();
        delX();
    })



}


add.addEventListener('click', () => {
    upload();
});



//==================Start The Context Menue==================
let contextMenu = document.querySelector('.context'),
    checkBoxs = document.querySelectorAll('.context input'),
    shapesI = 1,
    musicI = 1;

console.log(Object(checkBoxs[0]));
checkBoxs.forEach((e) => { e.checked = true })


contextMenu.addEventListener('click', (e) => { e.stopPropagation() })
window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    event.stopPropagation();

    checkBoxs[0].addEventListener('change', () => {
        if (checkBoxs[0].checked) {
            pos.forEach((e) => { e.style.display = 'flex'; })
            gear.style.display = 'flex';
        }
        else {
            pos.forEach((e) => { e.style.display = 'none'; })
            gear.style.display = 'none';
        }
    })

    checkBoxs[1].addEventListener('change', () => {
        if (checkBoxs[1].checked) {
            shapes.style.display = 'flex'
        } else {
            shapes.style.display = 'none'
        }
    })

    checkBoxs[2].addEventListener('change', () => {
        if (checkBoxs[2].checked) {
            musicArea.style.display = 'flex'
        } else {
            musicArea.style.display = 'none'
        }
    })

    contextMenu.classList.toggle('active')
    contextMenu.style.left = event.clientX + 'px';
    contextMenu.style.top = event.clientY + 'px';
})

window.addEventListener('click', (e) => {
    contextMenu.classList.remove('active')
})
//==================End The Context Menue====================

// window.onscroll