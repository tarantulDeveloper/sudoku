var medium = [
    ['1', '6', '8', '10', '11', '14', '15', '16', '18', '21', '22', '25', '29', '31', '39', '40', '41', '49', '51', '55', '58', '59', '62', '64', '65', '66', '69', '70', '72', '74', '79', '3', '0', '45', '27', '28', '77', '33', '53', '35', '47', '5', '37', '43'],
    ['0', '5', '8', '9', '11', '12', '13', '16', '20', '22', '23', '24', '31', '32', '35', '45', '48', '49', '56', '66', '58', '60', '64', '67', '68', '69', '71', '72', '75', '80', '65', '52', '42', '27', '47', '37', '74', '25', '33', '62', '54', '6', '53', '29', '39', '41', '79'],
    ['1', '3', '5', '9', '13', '19', '20', '24', '25', '27', '31', '32', '35', '38', '39', '41', '42', '45', '48', '49', '53', '55', '56', '60', '61', '67', '71', '75', '77', '79', '7', '16', '51', '73', '63', '59', '37', '66', '65', '21', '2', '78', '6', '74'],
    ['0', '3', '5', '8', '11', '15', '18', '23', '26', '28', '30', '34', '36', '38', '41', '48', '53', '54', '58', '60', '64', '66', '71', '74', '76', '79', '24', '46', '72', '32', '68', '43', '51', '78', '13', '19', '49', '1', '21', '16', '65', '62']
];

var easy = [
    ['2', '4', '6', '19', '24', '27', '37', '49', '33', '52', '72', '56', '67', '69', '80'],
    ['9', '21', '14', '25', '8', '36', '32', '43', '53', '54', '74', '75', '59', '79', '60'],
    ['0', '11', '3', '7', '16', '28', '46', '39', '32', '42', '53', '56', '68', '75', '70'],
    ['3', '7', '10', '14', '21', '27', '33', '40', '46', '48', '61', '56', '68', '72', '79'],
    ['0', '8', '12', '18', '22', '29', '41', '43', '45', '57', '60', '62', '64', '75', '78']
];

var hard = [
    ['1', '3', '5', '13', '16', '19', '24', '30', '35', '36', '41', '47', '53', '57', '60', '64', '70', '66', '65', '74', '77'],
    ['0', '3', '8', '11', '14', '22', '25', '27', '29', '33', '39', '46', '50', '53', '60', '65', '66', '72', '75', '79'],
    ['1', '5', '7', '12', '19', '25', '32', '36', '39', '42', '44', '46', '59', '61', '63', '66', '71', '73', '65', '77', '30', '78']
]


var listRed = [];

var which;

var difficulty = "";

var timeRemaining = "";

var timer;

var currentSudoku;

var lifes = 0;

var detected;

var hints;

var timeUp = true;

id("submit").onclick = check;



id("btn").onclick = clickBtn;


function clickBtn() {
    timeUp = false;
    detected = 0;
    id('gameOver').style.display = 'none';
    id('lifesLeft').style.display = 'contents';
    id('won').style.display = 'none';
    id('submit').disabled = false;
    id('lifes').textContent = '';


    clearInterval(timer);
    setInterval(timer, 1000);
    for (var i = 0; i < 81; i++) {
        id(i.toString()).style.backgroundColor = 'white';
        id(i.toString()).disabled = false;
    }

    startTimer();

    if (id('diff-1').checked) {
        difficulty = 'easy'
    } else if (id('diff-2').checked) {
        difficulty = 'medium'
    } else {
        difficulty = 'hard'
    }

    for (var i = 0; i < 81; i++) {
        id(i.toString()).value = null;
    }

    let configuration = new Configurator(lifes, hints, difficulty, timeRemaining);
    console.log(configuration.lifes, configuration.hints, configuration.difficulty);

    var sudoku = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    let game = new Generator();
    game.solve(sudoku);



    let showBoard = new Shower();

    if (difficulty == "medium") {
        showBoard.showSudokuMedium(currentSudoku);
        hints = 5;
        lifes = 4;
        id('hints').textContent = "5";
        id('lifes').textContent = '4';
    } else if (difficulty == "easy") {
        showBoard.showSudokuEasy(currentSudoku);
        hints = 3;
        lifes = 3;
        id('hints').textContent = "3";
        id('lifes').textContent = '3';
    } else {
        showBoard.showSudokuHard(currentSudoku);
        hints = 10;
        lifes = 7;
        id('hints').textContent = "10";
        id('lifes').textContent = '7';
    }




}


function startTimer() {
    //sets time remaining based on input
    if (id('time-1').checked) {
        timeRemaining = 180;
    } else if (id('time-2').checked) {
        timeRemaining = 300;
    } else {
        timeRemaining = 600;
    }



    timer = setInterval(function() {
            if (id('remainTime').textContent === "00:01") {
                let end = new Checker();
                clearTimeout(timer);
                timeUp = true;
                end.endGame();
            }
            timeRemaining--;
            //if no time  remaining	end the game

            id('remainTime').textContent = timeConversion(timeRemaining);
        }, 1000)
        //sets timer for first second
    id('remainTime').textContent = timeConversion(timeRemaining);
    //sets timer to update every second

}

function timeConversion(time) {
    let minutes = Math.floor(time / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let seconds = time % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
}








class Configurator {
    constructor(lifes, hints, difficulty, time) {
        this.lifes = lifes;
        this.hints = hints;
        this.difficulty = difficulty;
        this.time = time;
    }

}



















function id(id) {
    return document.getElementById(id);
}

function content(id) {
    return document.getElementById(id).textContent;
}




class Generator {



    // ... and we solve it!!


    // given a sudoku cell, returns the row
    returnRow(cell) {
        return Math.floor(cell / 9);
    }

    // given a sudoku cell, returns the column
    returnCol(cell) {
        return cell % 9;
    }

    // given a sudoku cell, returns the 3x3 block
    returnBlock(cell) {
        return Math.floor(this.returnRow(cell) / 3) * 3 + Math.floor(this.returnCol(cell) / 3);
    }

    // given a number, a row and a sudoku, returns true if the number can be placed in the row
    isPossibleRow(number, row, sudoku) {
        for (var i = 0; i <= 8; i++) {
            if (sudoku[row * 9 + i] == number) {
                return false;
            }
        }
        return true;
    }

    // given a number, a column and a sudoku, returns true if the number can be placed in the column
    isPossibleCol(number, col, sudoku) {
        for (var i = 0; i <= 8; i++) {
            if (sudoku[col + 9 * i] == number) {
                return false;
            }
        }
        return true;
    }

    // given a number, a 3x3 block and a sudoku, returns true if the number can be placed in the block
    isPossibleBlock(number, block, sudoku) {
        for (var i = 0; i <= 8; i++) {
            if (sudoku[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)] == number) {
                return false;
            }
        }
        return true;
    }

    // given a cell, a number and a sudoku, returns true if the number can be placed in the cell
    isPossibleNumber(cell, number, sudoku) {
        var row = this.returnRow(cell);
        var col = this.returnCol(cell);
        var block = this.returnBlock(cell);
        return this.isPossibleRow(number, row, sudoku) && this.isPossibleCol(number, col, sudoku) && this.isPossibleBlock(number, block, sudoku);
    }

    // given a row and a sudoku, returns true if it's a legal row
    isCorrectRow(row, sudoku) {
        var rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var rowTemp = new Array();
        for (var i = 0; i <= 8; i++) {
            rowTemp[i] = sudoku[row * 9 + i];
        }
        rowTemp.sort();
        return rowTemp.join() == rightSequence.join();
    }

    // given a column and a sudoku, returns true if it's a legal column
    isCorrectCol(col, sudoku) {
        var rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var colTemp = new Array();
        for (var i = 0; i <= 8; i++) {
            colTemp[i] = sudoku[col + i * 9];
        }
        colTemp.sort();
        return colTemp.join() == rightSequence.join();
    }

    // given a 3x3 block and a sudoku, returns true if it's a legal block 
    isCorrectBlock(block, sudoku) {
        var rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var blockTemp = new Array();
        for (var i = 0; i <= 8; i++) {
            blockTemp[i] = sudoku[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)];
        }
        blockTemp.sort();
        return blockTemp.join() == rightSequence.join();
    }

    // given a sudoku, returns true if the sudoku is solved
    isSolvedSudoku(sudoku) {
        for (var i = 0; i <= 8; i++) {
            if (!this.isCorrectBlock(i, sudoku) || !this.isCorrectRow(i, sudoku) || !this.isCorrectCol(i, sudoku)) {
                return false;
            }
        }
        return true;
    }

    // given a cell and a sudoku, returns an array with all possible values we can write in the cell
    determinePossibleValues(cell, sudoku) {
        var possible = new Array();
        for (var i = 1; i <= 9; i++) {
            if (this.isPossibleNumber(cell, i, sudoku)) {
                possible.unshift(i);
            }
        }
        return possible;
    }

    // given an array of possible values assignable to a cell, returns a random value picked from the array
    determineRandomPossibleValue(possible, cell) {
        var randomPicked = Math.floor(Math.random() * possible[cell].length);
        return possible[cell][randomPicked];
    }

    // given a sudoku, returns a two dimension array with all possible values 
    scanSudokuForUnique(sudoku) {
        var possible = new Array();
        for (var i = 0; i <= 80; i++) {
            if (sudoku[i] == 0) {
                possible[i] = new Array();
                possible[i] = this.determinePossibleValues(i, sudoku);
                if (possible[i].length == 0) {
                    return false;
                }
            }
        }
        return possible;
    }

    // given an array and a number, removes the number from the array
    removeAttempt(attemptArray, number) {
        var newArray = new Array();
        for (var i = 0; i < attemptArray.length; i++) {
            if (attemptArray[i] != number) {
                newArray.unshift(attemptArray[i]);
            }
        }
        return newArray;
    }

    // given a two dimension array of possible values, returns the index of a cell where there are the less possible numbers to choose from
    nextRandom(possible) {
        var max = 9;
        var minChoices = 0;
        for (var i = 0; i <= 80; i++) {
            if (possible[i] != undefined) {
                if ((possible[i].length <= max) && (possible[i].length > 0)) {
                    max = possible[i].length;
                    minChoices = i;
                }
            }
        }
        return minChoices;
    }

    // given a sudoku, solves it
    solve(sudoku) {
        var saved = new Array();
        var savedSudoku = new Array();
        var i = 0;
        var nextMove;
        var whatToTry;
        var attempt;
        while (!this.isSolvedSudoku(sudoku)) {
            i++;
            nextMove = this.scanSudokuForUnique(sudoku);
            if (nextMove == false) {
                nextMove = saved.pop();
                sudoku = savedSudoku.pop();
            }
            whatToTry = this.nextRandom(nextMove);
            attempt = this.determineRandomPossibleValue(nextMove, whatToTry);
            if (nextMove[whatToTry].length > 1) {
                nextMove[whatToTry] = this.removeAttempt(nextMove[whatToTry], attempt);
                saved.push(nextMove.slice());
                savedSudoku.push(sudoku.slice());
            }
            sudoku[whatToTry] = attempt;
        }

        currentSudoku = sudoku;


    }


    // given a solved sudoku and the number of steps, prints out the sudoku

}

class Shower {
    showSudokuMedium(sudoku) {
        //currentSudoku = sudoku;
        if (which == null) {
            which = 0;
        } else if (which < 3) {
            which += 1;
        } else {
            which = 0;
        }
        for (let i in medium[which]) {
            let temp = medium[which][i];
            id(temp).value = sudoku[temp];
            id(temp).style.backgroundColor = '#12e33f';
            id(temp).disabled = true;
        }
    }

    showSudokuEasy(sudoku) {
        //currentSudoku = sudoku;
        if (which == null) {
            which = 0;
        } else if (which < 4) {
            which += 1;
        } else {
            which = 0;
        }
        for (var i = 0; i < 81; i++) {
            id(i.toString()).value = sudoku[i];
            id(i.toString()).style.backgroundColor = '#12e33f';
            id(i.toString()).disabled = true;
        }
        for (let i in easy[which]) {
            let temp = easy[which][i];
            id(temp).value = null;
            id(temp).style.backgroundColor = 'white';
            id(temp).disabled = false;
        }

    }

    showSudokuHard(sudoku) {
        //currentSudoku = sudoku;
        if (which == null) {
            which = 0;
        } else if (which < 2) {
            which += 1;
        } else {
            which = 0;
        }
        for (let i in hard[which]) {
            let temp = hard[which][i];
            id(temp).value = sudoku[temp];
            id(temp).style.backgroundColor = '#12e33f';
            id(temp).disabled = true;
        }
    }
}

class Checker {
    endGame() {

        for (var i = 0; i < 81; i++) {
            if (id(i.toString()).value == currentSudoku[i]) {
                id(i.toString()).style.backgroundColor = '#12e33f';
                id(i.toString()).disabled = true;
            } else {
                id(i.toString()).style.backgroundColor = '#e01b3f'
                detected = 1;
                listRed.push(i);
            }
        }

        if (detected == 1) {
            if (timeUp) {
                id('lifes').textContext = '0';
                id('hints').textContent = '0';
                for (var i = 0; i < 81; i++) {
                    id(i.toString()).disabled = true;
                }
                clearInterval(timer);
                id('lifesLeft').style.display = 'none';
                id('gameOver').style.display = 'contents';
                id('submit').disabled = true;

            } else if (id('lifes').textContent != '1') {
                let left = parseInt(id('lifes').textContent);
                left--;
                id('lifes').textContent = left.toString();
                // setTimeout(1)
                id('submit').disabled = true;
                setTimeout(deleteBackground, 2000, listRed);

                listRed = [];

            } else {
                for (var i = 0; i < 81; i++) {
                    id(i.toString()).disabled = true;
                }
                clearInterval(timer);
                id('lifesLeft').style.display = 'none';
                id('gameOver').style.display = 'contents';
                id('submit').disabled = true;
            }

        } else {
            clearInterval(timer);
            id('lifesLeft').style.display = 'none';
            id('won').style.display = 'contents';
        }


        detected = 0;

    }
}

function check() {
    let endGame = new Checker();
    endGame.endGame();
}

function deleteBackground(list) {
    for (i = 0; i < list.length; i++) {
        id(list[i].toString()).style.backgroundColor = '#fff';
        id(list[i].toString()).value = "";
    }
    id('submit').disabled = false;

}

function inputFunction(element) {
    if (id(element).value.length > 0) {
        id(element).value = null
    }
}

function checkNum(element) {
    if (isNaN(id(element).value)) {
        id(element).value = null;
    } else if (id(element).value === '0') {
        id(element).value = null;
    }
}



function enterKey(event, element) {
    if (event.keyCode == 13) {
        let hintNumber = parseInt(id('hints').textContent);
        console.log(hintNumber);
        if (hintNumber >= 1) {
            id(element).value = currentSudoku[parseInt(element)];
            let hint = parseInt(id('hints').textContent);
            hint--;
            id('hints').textContent = hint.toString();
        }

    }
}