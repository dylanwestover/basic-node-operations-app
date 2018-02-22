var commands = require("./commands.js");

process.stdout.write('prompt > ');
process.stdin.on('data', function(userInput) {
  userInput = userInput.toString().trim();
  commands.evaluateCmd(userInput);
});
