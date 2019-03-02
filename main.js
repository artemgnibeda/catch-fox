(function() {
  document.getElementById('nickname').addEventListener('keydown', function(e) {
 if (e.keyCode === 13) {

 startGame()
 }
  });
})();
function startGame() {
  if(document.getElementById("nickname").value === '') {
      alert("Введите nickname");
  }
else {
  stop = 1;
  document.getElementById("play-zone").style.display = "block";
  document.getElementById("start-block").style.display = "none";
  document.getElementById("fox").style.display = "none";
  mooveBird();
  time();
}

}

var stop;
var y;
var x;
var imgLeftInt;
var imgTopInt;
var imgHeight;
var imgWidth;
var moove;
var cancel = 0;
var score = 0;
var bird = document.getElementById("bird");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

setInterval(function () {
  x = getRandomInt(2);
}, setRand());

setInterval(function () {
  y = getRandomInt(2);
}, setRand());

function mooveBird() {
  var moove = setInterval(function (mooveBird) {
              imgLeftInt = parseInt(bird.style.left);
              imgTopInt = parseInt(bird.style.top);
              imgHeight = parseInt(bird.height);
              imgWidth = parseInt(bird.width);

    if (x == 1) {
      goRight();
    } else {
      goLeft();
    }

    if (y == 1) {
      goDown();
    } else {
      goUp();
    }
    if (cancel == 1) {
      clearInterval(moove);
    }
  }, 20);
}

function goRight() {
  bird.style.left = imgLeftInt + pxAmount() + "px";
  if (imgLeftInt > window.innerWidth - imgWidth - 250) {
    x = 0;
  }
}

function goLeft() {
  bird.style.left = imgLeftInt - pxAmount() + "px";
  if (imgLeftInt < 0) {
    x = 1;
  }
}

function goDown() {
  bird.style.top = imgTopInt + pxAmount() + "px";
  if (imgTopInt > window.innerHeight - imgHeight - 250) {
    y = 0;
  }
}

function goUp() {
  bird.style.top = imgTopInt - pxAmount() + "px";
  if (imgTopInt < 0) {
    y = 1;
  }
}

function pxAmount() {
  return ~~((Math.sin(Math.random()) + 1) * 5);
}

function setRand() {
  randnum = Math.floor(Math.random() * 900) + 300;
  return randnum;
}

bird.addEventListener("click",function scoreDrow() {
  score++
  innerScore();
});


function innerScore() {
  var scoreText = "Score: " + score;
  document.getElementById("score").innerText = scoreText;
}
function time() {
  var secs = 10;
  var id = setInterval(function (time) {
    secs--;
    document.getElementById("timer").innerHTML =
      "Time: " + secs + "s";
    if (secs == 0) {
      clearInterval(id);
      timeOut();
    }
  }, 1000);
}
function timeOut() {
    cancel = 1;
    bird.style.display = "none";
    document.getElementById('popup-score').style.display = "block";
    totalElement();
}
var list = document.querySelector('ul');
var nickname;

function totalElement() {
  var li = document.createElement('li');
  var inputValue = document.getElementById('nickname').value;

  var z = document.createTextNode(inputValue);
  var as = li.appendChild(z);
  // list.appendChild(as);

  toLocal(inputValue);
  history(inputValue,score);
  innerTotal();
}

function toLocal(nickname) {
  localStorage.setItem('nickname', nickname);
}

function history(nickname,score){

  if(localStorage.getItem('history') === null){
    var history = new Array();
    var temp = { nick : nickname , my_scroe : score};
    history.push(temp);
    localStorage.setItem('history', JSON.stringify(history));

  }else {
      var history = JSON.parse(localStorage.getItem('history'));
      var temp = { nick : nickname , my_scroe : score};
      history.push(temp);
      localStorage.setItem('history', JSON.stringify(history));
  }
}


function innerTotal() {

  var history = JSON.parse(localStorage.getItem('history'));

  history.sort((a,b)=> (a.my_scroe < b.my_scroe)?1 : -1);

  for (var i = 0; i < history.length && i < 10; i++) {
    var li = document.createElement('div');
    li.className = "nickname";
    li.innerText = history[i].nick;
    document.getElementById('tablewin').appendChild(li);

    var li = document.createElement('div');
    li.className = "total";
    li.innerText = history[i].my_scroe;
    document.getElementById('tablewin').appendChild(li);
    // history[i].nick
    document.getElementById('youscore').innerHTML = "Your score : " + score;
  }

}
