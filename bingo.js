/*  
	Ты зочем сюда полез? :)
*/

const selectGColor = "#ace5c0";
const selectYColor = "#ffde70";

let gameFinish = false;
let words = [
	"стейкхолдер",
	"жира",
	"груминг",
	"артефакт",
	"Кафка",
	"бенефит",
	"фидбэк",
	"релиз",
	"фасилитатор",
	"вэлью",
	"конфлюенс",
	"колбаска Ганта",
	"фича",
	"инсайт",
	"лайфхак",
	"скуоп",
	"ишью",
	"брейншторм",
	"факап",
	"флоу",
	"скейл",
	"апдейт",
	"заапрувить",
	"бэклог",
	"БиАр-ка",
	"эпик",
	"юзерстори",
	"канбан",
	"спринт",
	"аджайл",
	"скрам",
	"кажется",
	"кубернетис", 
	"распил монолита", 
	"легаси", 
	"кластер",
	"топик",
	"микросервис",
	"бэклог",
	"пропушить",
	"раскатать"
	"дейлик",
	"развернуть",
	"форварднуть",
	"пайплайн",
	"куб",
	"консьюмер",
	"продьюсер",
	"паблишить"
];

function init() {
    generateGameField();
}

function generateGameField() {
	gameFinish = false;
	let shuffleWords = [...words];
	let currentSquare = "sq";
	
	document.getElementById('bingo').innerHTML = "";
	
	shuffle(shuffleWords);
	resetAllSquareSelection();
	
    for (let i = 0; i < 25; i++) {
        currentSquare = "sq" + i;
		word = shuffleWords.pop();	
		document.getElementById(currentSquare).value = word;
    }
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
	
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function resetAllSquareSelection() {
    for (var i = 0; i < 25; i++) {
        const currentSquare = document.getElementById("sq" + i);
        currentSquare.style.backgroundColor = "#ffffff";
    }
    return;
}

function selectSquare(square) {
	if(gameFinish) return;
	
    const currentSquare = document.getElementById(square);
    if (rgb2hex(currentSquare.style.backgroundColor) == selectGColor) 
        currentSquare.style.backgroundColor = "#ffffff";
    else
        currentSquare.style.backgroundColor = selectGColor;
    
	checkForBingo();
	return;
}


function checkForBingo() {
	checkVerticalBingo();
	checkHorizontalBingo();
	checkDiagonalBingo();
}

function checkVerticalBingo() {
    for (var i = 0; i < 5; i++) {
        var sq1 = document.getElementById('sq' + i);
        var sq2 = document.getElementById('sq' + (i + 5));
        var sq3 = document.getElementById('sq' + (i + 10));
        var sq4 = document.getElementById('sq' + (i + 15));
        var sq5 = document.getElementById('sq' + (i + 20));

        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}

function checkHorizontalBingo() {
    j = 0;
    for (var i = 0; i < 5; i++) {
        switch(i) {
            case 0: 
                var sq1 = document.getElementById('sq' + i);
                var sq2 = document.getElementById('sq' + (i + 1));
                var sq3 = document.getElementById('sq' + (i + 2));
                var sq4 = document.getElementById('sq' + (i + 3));
                var sq5 = document.getElementById('sq' + (i + 4));
                break;
            case 1: 
                var sq1 = document.getElementById('sq' + (i + 4));
                var sq2 = document.getElementById('sq' + (i + 5));
                var sq3 = document.getElementById('sq' + (i + 6));
                var sq4 = document.getElementById('sq' + (i + 7));
                var sq5 = document.getElementById('sq' + (i + 8));
                break;
            case 2: 
                var sq1 = document.getElementById('sq' + (i + 8));
                var sq2 = document.getElementById('sq' + (i + 9));
                var sq3 = document.getElementById('sq' + (i + 10));
                var sq4 = document.getElementById('sq' + (i + 11));
                var sq5 = document.getElementById('sq' + (i + 12));
                break;
            case 3: 
                var sq1 = document.getElementById('sq' + (i + 12));
                var sq2 = document.getElementById('sq' + (i + 13));
                var sq3 = document.getElementById('sq' + (i + 14));
                var sq4 = document.getElementById('sq' + (i + 15));
                var sq5 = document.getElementById('sq' + (i + 16));
                break;
            case 4: 
                var sq1 = document.getElementById('sq' + (i + 16));
                var sq2 = document.getElementById('sq' + (i + 17));
                var sq3 = document.getElementById('sq' + (i + 18));
                var sq4 = document.getElementById('sq' + (i + 19));
                var sq5 = document.getElementById('sq' + (i + 20));
                break;
        }
        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}

function checkDiagonalBingo() {
    for (var i = 0; i < 2; i++) {
        switch(i) {
            case 0:
                var sq1 = document.getElementById('sq' + 0);
                var sq2 = document.getElementById('sq' + 6);
                var sq3 = document.getElementById('sq' + 12);
                var sq4 = document.getElementById('sq' + 18);
                var sq5 = document.getElementById('sq' + 24);
                break;
            case 1:
                var sq1 = document.getElementById('sq' + 4);
                var sq2 = document.getElementById('sq' + 8);
                var sq3 = document.getElementById('sq' + 12);
                var sq4 = document.getElementById('sq' + 16);
                var sq5 = document.getElementById('sq' + 20);
                break;
        }
        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}

function checkLines(sq1, sq2, sq3, sq4, sq5) {
    if (rgb2hex(sq1.style.backgroundColor) == selectGColor && 
		rgb2hex(sq2.style.backgroundColor) == selectGColor &&
        rgb2hex(sq3.style.backgroundColor) == selectGColor &&
        rgb2hex(sq4.style.backgroundColor) == selectGColor &&
        rgb2hex(sq5.style.backgroundColor) == selectGColor) {
            youWin(sq1, sq2, sq3, sq4, sq5);
            return;
    }
}

function youWin(sq1, sq2, sq3, sq4, sq5) {
    sq1.style.backgroundColor = selectYColor;
    sq2.style.backgroundColor = selectYColor;
    sq3.style.backgroundColor = selectYColor;
    sq4.style.backgroundColor = selectYColor;
    sq5.style.backgroundColor = selectYColor;
    document.getElementById('bingo').innerHTML = "БИНГО! Idiom v pir'od — делай скрин, кидай в Discord!";
    gameFinish = true;
}

function rgb2hex(rgb){
	return "#" + rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('');
}
