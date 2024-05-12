function runCmd(command, inMemory, fromInput) {
    if (command != undefined) {
        if (fromInput) {
            input.value = "";
            echo(prompt + command);
        }
        if (inMemory && command != "") {
            if (command != memory[memory.length - 1]) {
                memory.push(command);
            }
            if (!navigatingInMemory || command != memory[memoryPos]) {
                memoryPos = memory.length - 1;
            }
            navigatingInMemory = false;
        }
        if (!toFile) {
            var commandName = command.split(" ")[0],
                args = command.split(" ");
            args.shift();

            if (commandName === "cls" || commandName === "clearscreen") {
                log.innerHTML = "";
            } else if (commandName === "exit") {
                window.open(document.URL, "about:blank", "width=977 height=455");
                window.close();
            } else if (commandName === "echo") {
                echo(toSpaces(args));
            } else if (commandName === "echo.") {
                echo("\n");
            } else if ((commandName === "ver")|| (commandName === "version")) {
                echo("Web Shell v1.0");
                echo("Made with love by Joel Jolly.");
            } else if (commandName === "time") {
                showTime();
            } else if (commandName.includes("open:")) {
                openLink(commandName);
            } else if (commandName === "developer" || commandName === "dev") {
                openLink(commandName);
            }
        } else {
            if (command != ")") {
                toExec.push(command);
            } else {
                toFile = false;
                toExec.forEach((command) => {
                    runCmd(command);
                });
                toExec = [];
            }
        }

        if (fromInput) {
            resetPrompt();
        }
    }
}