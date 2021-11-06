'use strict';

class BingoGame {

    grid = Array();
    dictinory = Array();
    isGameActive = false;

    constructor(dictinory, boardSelector = '#gamefield', boardSize = 5, cellWidth = 120, cellHeight = 120){
        this.dictinory = dictinory;
        //доска может быть только квадратной, иначе проблемно найти диагональ
        this.boardSize = BingoGame.fixBoardSize(boardSize, this.dictinory);
        this.gamefieldElement = document.querySelector(boardSelector);
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
    }

    run(){
        this.isGameActive = true;

        this.dictinory = this.shuffle(this.dictinory);
        this.renderBoard();
    }

    //строит игровую доску 
    renderBoard(){
        //устанавливаем размер доски
        this.gamefieldElement.style.width = (this.cellWidth * this.boardSize) + (this.cellWidth * this.boardSize * 0.1) + 'px';
        this.gamefieldElement.style.height = (this.cellHeight * this.boardSize) + (this.cellHeight * this.boardSize * 0.1) + 'px';

        for(let i = 0; i < this.boardSize; i++){
            this.grid[i] = Array();
            for(let j = 0; j < this.boardSize; j++){
                const cellElement = document.createElement('div');
                cellElement.id = i*this.boardSize+j+1;
                cellElement.classList.add('gamecell');
                cellElement.style.width = this.cellWidth + 'px';
                cellElement.style.height = this.cellHeight + 'px';
                //cellElement.innerHTML = `<p>${this.dictinory.pop()}</p>`;
                cellElement.textContent = this.dictinory.pop();
                // маленький хак по передаче контекста класса
                cellElement.addEventListener('click', this.clickHandler.bind(this));

                this.gamefieldElement.insertAdjacentElement('beforeend', cellElement);

                this.grid[i][j] = cellElement;
            }
        }
    }

    clickHandler(evt){
        if(!this.isGameActive) return;
        //находим колонку и строку в массиве, легкая математика, но сложная конструкция :)
        const column = ((Number.parseInt(evt.target.id) % this.boardSize) || this.boardSize) - 1;
        const row = column+1 == this.boardSize ? Number.parseInt(evt.target.id)/this.boardSize-1 : Math.floor(Number.parseInt(evt.target.id)/this.boardSize);
        //устанавливаем класс отметки, по нему и будем проверять
        this.grid[row][column].classList.toggle('selected');
        //проверяем выигрыш
        this.isGameActive = !this.checkWin();
    }

    //проверяет выигрышные партии и подсвечивает их
    checkWin(){
        const bufferArray = Array();

        //горизонтально
        for(let i = 0; i < this.boardSize; i++){
            if(this.checkWinInBuffer(this.grid[i])){
                return true;
            }
        }

        //вертикально
        for(let i = 0; i < this.boardSize; i++){
            for(let j = 0; j < this.boardSize; j++){
                bufferArray.push(this.grid[j][i]);
            }
            if(this.checkWinInBuffer(bufferArray)){
                return true;
            }
            bufferArray.length = 0; //очищаем буфер
        }

        //диагонально (слева-направо)
        bufferArray.length = 0; //очищаем буфер
        for(let i = 0; i < this.boardSize; i++){
            bufferArray.push(this.grid[i][i]);
        }
        if(this.checkWinInBuffer(bufferArray)){
            return true;
        }

        //диагонально (слева-направо)
        bufferArray.length = 0; //очищаем буфер
        for(let i = 0; i < this.boardSize; i++){
            bufferArray.push(this.grid[i][this.boardSize-i-1]);
        }
        if(this.checkWinInBuffer(bufferArray)){
            return true;
        }

    }

    checkWinInBuffer(cells){
        if(cells.every(element => element.classList.contains('selected'))){
            cells.forEach(element => {
                element.classList.add('win');
                element.classList.remove('selected');
            });
            const winPhraseElement = document.createElement('div');
            winPhraseElement.innerHTML = `БИНГО!!!<br> Idiom v pir'od — делай скрин, кидай в Discord!`;
            winPhraseElement.classList.add('win-phrase');
            this.gamefieldElement.insertAdjacentElement('beforebegin', winPhraseElement);
            return true;
        }
        return false;
    }

    //рекурсивно определяет максимально возможное игровое поле
    //исходя из количества слов в предлагаемом словаре
    //не может быть меньше чем 2х2
    //при ошибке возвращает 0
    static fixBoardSize(sizeValue, dictinory){
        if(sizeValue < 2) return 0;
        if(dictinory.length < 4) return 0;
        if((sizeValue*sizeValue) > dictinory.length){
            return BingoGame.fixBoardSize(sizeValue - 1, dictinory);
        }
        return sizeValue;
    }

    shuffle(dictinory){
        let currentIndex = dictinory.length, 
            randomIndex;
  
        while(currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [dictinory[currentIndex], dictinory[randomIndex]] = [dictinory[randomIndex], dictinory[currentIndex]];
        }
  
        return dictinory;
    }

}

new BingoGame(words, '#gamefield', 5).run();
