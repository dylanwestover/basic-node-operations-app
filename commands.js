const fs = require("fs");
const path = require("path");

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];

    switch (command) {
        case "pwd":
            commandLibrary.pwd();
            break;
        case "date":
            commandLibrary.date();
            break;
        case "ls":
            commandLibrary.ls();
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "head":
            commandLibrary.head(userInputArray.slice(1));
            break;
        case "tail":
            commandLibrary.tail(userInputArray.slice(1));
            break;
        default:
            commandLibrary.errorHandler(userInputArray.join(" "));
    }
}

const commandLibrary = {
    "pwd": function() {
        done(path.dirname(process.argv[1]));
    },
    "date": function() {
        currentDate = new Date().toDateString();
        done(currentDate);
    },
    "ls": function() {
        fs.readdir(".", (err, files) => {
            let output = "";
            if (err) throw err;
            files.forEach((file) => {
                output += file.toString() + "\t";
            });
            done(output);
        });
    },
    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },
    "echo": function(userInput) {
        done(userInput);
    },
    "head": function(fullPath) {
        let fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            // console.log("filename", data.toString());
            let dataArr = data.toString().split("\n");
            done(dataArr.slice(0,5).join("\n"));
        });
    },
    "tail": function(fullPath) {
        let fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            let dataArr = data.toString().split("\n");
            let length = dataArr.length;
            done(dataArr.slice(length - 5).join("\n"));
        });
    },
    "errorHandler": (userInput) => {
      done("-bash: " + userInput + ": command not found");
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
