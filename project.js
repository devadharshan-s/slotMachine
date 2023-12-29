const prompt = require("prompt-sync")();
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}
const deposit = () => {
    while (true) {
        const depositAmt = prompt("Enter deposit Amount: ");
        const numberDepositAmt = parseFloat(depositAmt);

        if (isNaN(numberDepositAmt) || numberDepositAmt <= 0) {
            console.log("Invalid Amount, Try again!");
        } else {
            return numberDepositAmt;
        }
    }
};


const numberOfLines = () => {
    while (true) {
        const lines = prompt("Enter number of lines to bet on (1-3): ");
        const noOfLines = parseFloat(lines);

        if (isNaN(noOfLines) || noOfLines <= 0 || noOfLines > 3) {
            console.log("Invalid bet, Try again!");
        } else {
            return noOfLines;
        }
    }
};

const getBet = (amt, lines) => {
    while (true) {
        const bet = prompt("Enter bet per line: ");
        const nobet = parseFloat(bet);

        if (nobet <= 0 || bet > amt / lines) {
            console.log("Invalid Bet, Try again!");
        } else {
            return nobet;
        }
    }
}


const spin = () => {
    const symbols = [];
    for(const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++) symbols.push(symbol);
    }
    const reels = [[]];
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randIdx = Math.floor(Math.random() * reelSymbols.length);
            const select = reelSymbols[randIdx];
            reels[i].push(select);
            reelSymbols.splice(randIdx,1);
        }
    }

    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++)
            rows[i].push(reels[j][i]);
    }

    return rows;
}

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for (const[i,symbol] of row.entries()){
            rowString += symbol
            if(i != row.length - 1) rowString += " | ";
        }
        console.log(rowString);
    }
}

const getWinnings = (rows,bet,lines) => {
    let winnings = 0;

    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame) winnings += bet * SYMBOL_VALUES[symbols[0]];
    }

    return winnings;
};
const game = () => {
    let amt = deposit();
    while (true) {
        console.log("Your balance $" + amt);
        const lines = numberOfLines();
        const bet = getBet(amt, lines);
        amt -= bet * lines;
        const s = spin();
        const rows = transpose(s);
        printRows(rows);
        const win = getWinnings(rows, bet, lines);
        amt += win;
        console.log("You Won!, $" + win.toString());

        if(amt === 0){
            console.log("Sorry, You've ran out of funds")
            break;
        }

        const playAgain = prompt("Do You wanna play again? (y/n)");

        if(playAgain === "n" || playAgain === "N") break;
    }
};
game();

