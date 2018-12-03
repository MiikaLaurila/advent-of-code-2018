function parseAnswer() {
    const answerInput = document.getElementById('input').value;
    const numbers = answerInput.split('\n');
    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
        sum += parseInt(numbers[i]);
    }

    document.getElementById('result').innerHTML = sum;
}

function parseAnswer2() {
    const answerInput = document.getElementById('input').value;
    const numbers = answerInput.split('\n');
    let sum = 0;
    let visitedSums = [];
    let matchedSum = 0;
    let matchFound = false;
    let watchDog = 0;
    let index = 0;

    while (!matchFound && watchDog < 1000000) {

        sum += parseInt(numbers[index]);

        if (visitedSums.indexOf(sum) > -1) {
            matchFound = true;
            matchedSum = sum;
        }

        visitedSums.push(sum);
        watchDog++;
        index++;
        if (index >= numbers.length) {
            index = 0;
        }
    }

    if (watchDog >= 999999) {
        console.log("watchDog triggered");
    }

    document.getElementById('result').innerHTML = matchedSum;
}

function parseAnswer3() {
    const answerInput = document.getElementById('input').value;
    const strings = answerInput.split('\n');
    let twos = 0;
    let threes = 0;

    for (let i = 0; i < strings.length; i++) {

        let charArrayToCheck = strings[i].split('');
        var charCounts = {};
        let twoFound = false;
        let threeFound = false;

        charArrayToCheck.forEach(function (i) { charCounts[i] = (charCounts[i] || 0) + 1; });

        Object.keys(charCounts).forEach(function (key) {
            if (charCounts[key] === 2 && !twoFound) {
                twos++;
                twoFound = true;
            }
            if (charCounts[key] === 3 && !threeFound) {
                threes++;
                threeFound = true;
            }
        });

    }

    document.getElementById('result').innerHTML = twos * threes;
}

function parseAnswer4() {
    const answerInput = document.getElementById('input').value;
    const strings = answerInput.split('\n');
    const charArrays = [];

    for (let i = 0; i < strings.length; i++) {
        charArrays.push(strings[i].split(''));
    }

    for (let i = 0; i < charArrays.length; i++) {
        for (let j = 0; j < charArrays.length; j++) {

            let errors = 0;
            let matchedParts = [];

            for (let k = 0; k < charArrays[j].length; k++) {

                if (charArrays[i][k] === charArrays[j][k]) {
                    matchedParts.push(charArrays[i][k]);
                }
                else {
                    errors++;
                }
            }

            if (errors === 1) {
                console.log("found match");
                console.log(matchedParts);
                document.getElementById('result').innerHTML = matchedParts.join('');
            }
        }
    }
}

function parseAnswer5() {

    const answerInput = document.getElementById('input').value;
    const inputRows = answerInput.split('\n');
    let squaresOverlapping = 0;

    const canvas = new Array(1000);
    for (let i = 0; i < canvas.length; i++) {
        canvas[i] = new Array(1000);
    }

    for (let i = 0; i < inputRows.length; i++) {
        fillSquares(parseRowToFillDimensions(inputRows[i]));
    }

    function parseRowToFillDimensions(inputRow) {
        let restOfInput = inputRow.split('@ ')[1];

        const x = parseInt(restOfInput.split(',')[0]);
        restOfInput = restOfInput.split(',')[1];

        const y = parseInt(restOfInput.split(': ')[0]);
        restOfInput = restOfInput.split(': ')[1];

        const width = parseInt(restOfInput.split('x')[0]);
        const height = parseInt(restOfInput.split('x')[1]);

        const fillDimensions = {
            x: x,
            y: y,
            width: width,
            height: height
        }
        return fillDimensions;
    }

    function fillSquares(fillDimensions) {
        for (let i = fillDimensions.x; i < fillDimensions.x + fillDimensions.width; i++) {
            for (let j = fillDimensions.y; j < fillDimensions.y + fillDimensions.height; j++) {
                if (canvas[i][j] === undefined) {
                    canvas[i][j] = 'x';
                }
                else if (canvas[i][j] === 'x') {
                    squaresOverlapping++;
                    canvas[i][j] = 'o';
                }
            }
        }
    }

    document.getElementById('result').innerHTML = squaresOverlapping;
}

function parseAnswer6() {
    const answerInput = document.getElementById('input').value;
    const inputRows = answerInput.split('\n');
    let squareDatas = [];
    let answerID = -1;

    const canvas = new Array(1000);
    for (let i = 0; i < canvas.length; i++) {
        canvas[i] = new Array(1000);
    }

    for (let i = 0; i < inputRows.length; i++) {
        squareDatas.push(parseRowToFillDimensions(inputRows[i], i));
        fillSquares(squareDatas[i], i);
    }

    function parseRowToFillDimensions(inputRow) {
        let restOfInput = inputRow.split('@ ')[1];
        
        const x = parseInt(restOfInput.split(',')[0]);
        restOfInput = restOfInput.split(',')[1];

        const y = parseInt(restOfInput.split(': ')[0]);
        restOfInput = restOfInput.split(': ')[1];

        const width = parseInt(restOfInput.split('x')[0]);
        const height = parseInt(restOfInput.split('x')[1]);

        const squareData = {
            x: x,
            y: y,
            width: width,
            height: height,
            overlapping: false
        }
        return squareData;
    }

    function fillSquares(fillDimensions, index) {
        for (let i = fillDimensions.x; i < fillDimensions.x + fillDimensions.width; i++) {
            for (let j = fillDimensions.y; j < fillDimensions.y + fillDimensions.height; j++) {
                if (canvas[i][j] === undefined) {
                    canvas[i][j] = index;
                }
                else if (canvas[i][j] !== undefined) {
                    squareDatas[index].overlapping = true;
                    squareDatas[canvas[i][j]].overlapping = true;
                }
            }
        }
    }

    Object.keys(squareDatas).forEach(function (key, index) {
        if (!squareDatas[key].overlapping) {
            answerID = index+1;
        }
    });


    document.getElementById('result').innerHTML = answerID;
}

