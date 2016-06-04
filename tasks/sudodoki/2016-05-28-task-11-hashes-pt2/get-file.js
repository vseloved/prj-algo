const fs = require('fs');

const text = fs.readFileSync('../../README.md').toString();
// разбить его по пробелам и переводам строк на отдельные токены (слова, знаки препинания, специальные символы)
const tokens = text.replace(/([,\[\]\(\)\.#\/\\`:\-\+_%])/gm, " $1 ").split(/[\s\n]+/);

fs.writeFileSync('debug-output.txt', tokens.join('\n'))

module.exports = tokens;
