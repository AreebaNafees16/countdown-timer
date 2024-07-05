#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
const response = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: chalk.yellowBright("Enter the number of seconds for the countdown:"),
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.redBright("Please enter valid number");
            }
            else if (input > 60) {
                return chalk.yellowBright("Second must be in 60");
            }
            else {
                return true;
            }
        }
    }
]);
let input = response.userInput;
function startTime(value) {
    const iniTime = new Date().setSeconds(new Date().getSeconds() + value);
    const intervalTime = new Date(iniTime);
    setInterval((() => {
        const currenTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currenTime);
        if (timeDiff <= 0) {
            console.log(chalk.red("Time\'s up!"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(chalk.cyanBright(`${min.toString().padStart(2, "0")}: ${sec.toString().padStart(2, "0")}`));
    }), 950);
}
startTime(input);
// ////The current date and time can be fetched by first creating a new Date object
// //getSeconds: returns the seconds (0-59)
