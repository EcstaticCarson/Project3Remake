//Declare our Variables

let totalScore = 0;
let easyQ = [];
let MedQ = [];
let HardQ = [];
let diff = '../data/data.json';
let difficulty = 0;

//get elements from all html pages

let inject = document.getElementById('inject');
let body = document.getElementById('body');

//correct, counter, questions, buttons - using a class//

// let correct = document.getElementById('correct');
// // let counter = document.getElementById('counter');
// let questions = document.getElementById('questions');

//--------------Get our Buttons and add EventListeners--------//

let buttons = document.getElementsByClassName('btn');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (e) {
        //Call our next function
        // console.log(e);
        // checkAnswer(buttons[i].innerText); <----This would do the same as "e.toElement.innerText"
        checkAnswer(e.toElement.innerText);
    });
}
//--------------------
function loadJSON(url) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Version from the notes
            easyQ = JSON.parse(this.responseText).easyQuest;
            medQ = JSON.parse(this.responseText).medQuest;
            hardQ = JSON.parse(this.responseText).hardQuest;
            // counter.innerText = timer;
            // interval = setInterval(countDown, 1000);
            // loadQuestion();
        }
    }
    xmlhttp.open("Get", url, true);
    xmlhttp.send();
}
//--------------
function injectHTML(url) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = this.responseText;
            console.log(url)
            if (url === "../options.html") {
                injectOptions(myArr);
            }
            else if (url === "../title.html") {
                injectTitle(myArr);
            }
            else if (url === "../menu.html") {
                injectMenu(myArr);
            }
            else if (url === "../easy.html" && difficulty  === 1) {
                injectGame(myArr, easyQ, "easybg");
            }
            else if (url === "../easy.html" && difficulty === 2) {
                injectGame(myArr, medQ, "mediumbg");
            }
            else if (url === "../easy.html" && difficulty === 3) {
                injectGame(myArr, hardQ, "hardbg");
            }
            else if (url === "../victory.html") {
                injectVictory(myArr);
            }
            else if (url === "../defeat.html") {
                injectDefeat(myArr);
            }
        }
    };
    xmlhttp.open("Get", url, true);
    xmlhttp.send();
}
//--------------
function injectTitle(info) {
    inject.innerHTML = info;
    body.className = "titlebg";
    //get our stuff
    let begin = document.getElementById('start');
    let options = document.getElementById('options');


    options.addEventListener('click', function (e) {
        injectHTML('../options.html')
    });
    begin.addEventListener('click', function (e) {
        injectHTML('../menu.html');
    });

}
//--------------
function injectMenu(info) {
    inject.innerHTML = info;
    body.className = "menubg";
    easy.addEventListener('click', function (e) {
        difficulty = 1;
        injectHTML('../easy.html');
    });
    medium.addEventListener('click', function (e) {
        difficulty = 2;
        injectHTML('../easy.html');
    });
    hard.addEventListener('click', function (e) {
        difficulty = 3;
        injectHTML('../easy.html');
    });

}
//--------------
function injectOptions(info) {
    inject.innerHTML = info;
    body.className = "optionsbg";
    let title = document.getElementById('title');
    title.addEventListener('click', function (e) {
        injectHTML('../title.html');
    });

}
//--------------
function injectGame(info, question, predator) {
    inject.innerHTML = info;
    body.className = predator;
    let totalQuestions = 20;
    let timer = 20;
    let questions = document.getElementById('questions');
    let counterTag = document.getElementById('counter');
    let correct = document.getElementById('correct');
    let counter = 0;
    let interval;
    console.log(question)
    let alien = [];
    randomizer(question);
    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');

    a1.addEventListener('click', function (e) {
        checkAnswer(a1.innerText);
    });

    a2.addEventListener('click', function (e) {
        checkAnswer(a2.innerText);
    });

    a3.addEventListener('click', function (e) {
        checkAnswer(a3.innerText);
    });

    a4.addEventListener('click', function (e) {
        checkAnswer(a4.innerText);
    });

    loadQuestion();
    //-----------------
    function loadQuestion() {
        //These will load the questions
        clearInterval(interval);
        questions.innerText = alien[counter].q;
        a1.innerText = alien[counter].a1;
        a2.innerText = alien[counter].a2;
        a3.innerText = alien[counter].a3;
        a4.innerText = alien[counter].a4;
        interval = setInterval(countDown, 1000);
    }
    //-----------------------------------//
    function nextQuestion() {
        //Prep to go to next question
        //loadQuestion

        counter++;
        if (counter < totalQuestions) {
            //will run until you hit total questions = 20;
            loadQuestion();
        }
        else if(totalScore > 13) {
            //Clears the interval set in LoadJSON
            clearInterval(interval);
            //Load up Ending Screen
            //Inject your Ending Screen HTML Below
            injectHTML("../victory.html");
        }
        else if(totalScore < 14){
            clearInterval(interval);
            injectHTML("../defeat.html");
        }
        // if (blah){

        // } else if (blah){

        // } else if (blah){

        // }
    }
    //Timer section//
    function countDown() {
        //Make sure time isn't over and it is showing correct time.
        timer--;
        if (timer === 0) {
            timer = 20;
            counterTag.innerText = timer;
            nextQuestion();
        }
        else {
            counterTag.innerText = timer;
        }

    }
    //--------------
    function randomizer(q) {
        let rnd = 0;
        for (let i = 0; i < 20; i++) {
            rnd = Math.floor(Math.random() * q.length);
            alien.push(q[rnd]);
            q.splice(rnd, 1)
        }
    }
    //-----------------------------------//
    function checkAnswer(answer) {
        //Retrieve an answer to check if correct or not
        //Increments the correct number

        if (answer === alien[counter].c) {
            totalScore++;
        }
        correct.innerText = `${totalScore}/${totalQuestions}`;
        timer = 20;
        counterTag.innerText = timer;
        //Go to next Question
        nextQuestion();
    }

};
//----------
function injectVictory(info) {
    inject.innerHTML = info;
    body.className = "victorybg";
    restart.addEventListener('click', function (e) {
        injectHTML('../menu.html');
    });
}
//----------
function injectDefeat(info) {
    inject.innerHTML = info;
    body.className = "defeatbg";
    restart.addEventListener('click', function (e) {
        injectHTML('../menu.html');
    })
}
//----------

//-----------------------------------//
//Music section
// play.addEventListener('click', function (e) {
//     if (!sound) {
//         audio.play();
//         sound = true;
//     }
//     else {
//         audio.pause();
//         audio.currentTime = 0;
//         sound = false;
//     }
// });
// stop.addEventListener('click', function (e) {
//     audio.pause();
//     audio.currentTime = 0;
// });
//-----------------------------------//
injectHTML('../title.html');
loadJSON(diff);