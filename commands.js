var fs = require("fs");
var path = require("path");
var http = require("http");

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
    var userInputArray = userInput.split(" ");
    var command = userInputArray[0];

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
        case "curl":
            commandLibrary.curl(userInputArray.slice(1));
            break;
        case "sort":
            commandLibrary.sort(userInputArray.slice(1));
            break;
        default:
            commandLibrary.errorHandler(userInputArray.join(" "));
    }
}

var commandLibrary = {
    "pwd": function() {
        done(path.dirname(process.argv[1]));
    },
    "date": function() {
        currentDate = new Date().toDateString();
        done(currentDate);
    },
    "ls": function() {
        fs.readdir(".", function(err, files) {
            var output = "";
            if (err) throw err;
            files.forEach(function(file) {
                output += file.toString() + "\t";
            });
            done(output);
        });
    },
    "cat": function(fullPath) {
        var fileName = fullPath[0];
        fs.readFile(fileName, function(err, data) {
            if (err) throw err;
            done(data);
        });
    },
    "echo": function(userInput) {
        var userInputArray = userInput.split(" ");
        let output = "";
        for(var i = 0; i < userInputArray.length; i++){
          output += userInputArray[i] + " ";
        }
        done(output);
    },
    "head": function(fullPath) {
        var fileName = fullPath[0];
        fs.readFile(fileName, function(err, data) {
            if (err) throw err;
            // console.log("filename", data.toString());
            var dataArr = data.toString().split("\n");
            done(dataArr.slice(0,5).join("\n"));
        });
    },
    "tail": function(fullPath) {
        var fileName = fullPath[0];
        fs.readFile(fileName, function(err, data) {
            if (err) throw err;
            var dataArr = data.toString().split("\n");
            var length = dataArr.length;
            done(dataArr.slice(length - 5).join("\n"));
        });
    },
    "curl": function (url) { //this will be an array..
        rawUrl = url[0];
        var cleanUrl = rawUrl.match(/^http:\/\//) ? rawUrl : "http://" + rawUrl;
        request(cleanUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                done(body);
            }
        });
    },
    "errorHandler": function(userInput) {
      done("-bash: " + userInput + ": command not found");
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
