// worker.js
self.addEventListener('message', function (letter) {

    if (letter.data[2] === "close") {
        self.close();
        return;
    }

    const pattern = "(" + letter.data[0].toLocaleUpperCase() + "|" + letter.data[0] + ")";
    const rex = new RegExp(pattern, "g");
    let input = letter.data[1].replace(rex, '');

    let stack = [];
    input.split('').forEach(char => {
        // (c) /u/apazzolini
        if (!stack.length || (stack[stack.length - 1].charCodeAt() ^ char.charCodeAt()) !== 32) {
            stack.push(char)
        } else {
            stack.pop()
        }
    });

    self.postMessage(stack.length);
});