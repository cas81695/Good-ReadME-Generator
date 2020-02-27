const axios = require("axios");

const fs = require("fs");

const inquirer = require("inquirer");

const util = require("util");


function start() {
    inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "What is your Github username?"
    },
    {
        type: "input",
        name: "title",
        message: "What is the title of the project?"
    },
    {
        type: "input",
        name: "description",
        message: "Type a brief description of the project."

    },
    {
        type: "list",
        name: "license",
        message: "What type of license should be included for your project?",
        choices: [
            "Apache 2.0",
            "MIT",
            "BSD 3",
            "GPL 3.0",
            "None"
        ]
    },
    {
        type: "input",
        name: "dependencies",
        message: "What command should be run to install dependencies?",
        default: "npm i"
    },
    {
        type: "input",
        name: "tests",
        message: "What command should be run to perform tests?",
        default: "npm test"
    },
    {
        type: "input",
        name: "use",
        message: "What does the user need to knoew about using the repo?"

    },
    {
        type:"input",
        name: "contribution",
        message: "What does the user need to know about contributing to the project?"
    },
    {
        type: "input",
        name: "collaberation",
        message: "Name all who collaberated with the project and third-party assets."

    }


    ]).then(response => {
        let data = {
            username: response.username,
            title: response.title,
            description: response.description,
            license: response.license,
            dependencies: response.dependencies,
            tests: response.tests,
            use: response.use,
            contribution: response.contribution,
            collaberation: response.collaberation,
        };

            console.log(data)

        let fileName = 'READMe.md'

            console.log(fileName);

            console.log(data.username);

        const queryURL = "https://api.github.com/users/" + data.username;

            Console.log(queryURL);

        async function getLicenseBadge() {

            console.log(data.license);
        try {
            if(data.license === "MIT"){
                  return "[![Github license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            
            };
        try {
            if(data.license === "Apache 2.0"){
                return "[!Github license](https://img.shields.io/badge/License-Apache-2.svg)](https://opensource.org/licenses/Apache-2.0)";
            };
        try {
            if (data.license === "BSD 3"){
                return "[![Github license](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
          
            };
        try {
            if (data.license === "GPL 3.0"){
                return "[![Github license](https://img.shields.io/badge/License-.svg)](https://opensource.org/licenses/BSD-3-Clause)";
          
            };
        }
  

        start();