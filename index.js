const axios = require("axios");

const fs = require("fs");

const inquirer = require("inquirer");

const util = require("util");

start();


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
        const data = {
            username: response.username,
            title: response.title,
            description: response.description,
            license: response.license,
            dependencies: response.dependencies,
            tests: response.tests,
            use: response.use,
            contribution: response.contribution,
        
        };

            return data;

        }).then(data => {   

            createReadme(data);

            data.avatar = showAvatar(data.username);

            data.licenseLogo = getLicenseBadge(data.license);

            return data;


        }).then(data => {
            console.log(data);
        });
    }


  
    function createReadme(data) {
        const fileName = `README.md`;
        let layout = 

        `# ${data.title}

        ${data.licenseLogo}

        ## Description

        $(data.description)

        ## Table of Content

        *[Installation](#installation)

        *[Use](#use)

        *[Credits](#credits)
        
        *[License](#license)
        
        *[Tests](#tests)
        
        *[Contributing](#contributing)

        ## Intallation
        
        To install all of the necessary dependencies, run the following command:
        
        ${data.dependencies}
        
        ##Use
        
        ${data.use}
        
        ## Collaborators and/or Third Party Assets
        
        ${data.collaboration}
        
        ## License
        
        ${data.license}
        
        ## Tests
        
        To run tests, run the following command:
        
        ${data.test}
        
        ## Contribution
        
        ${data.contribution}
        
        ## Questions
        
        If you have any questions about the repo, please open up an issue or contact ${data.username}.
        
        $(data.avatar)`;

        fs.writeFile(fileName, layout, err => {
            if (err) throw err;
            console.log("saved readme!");
            console.log(fileName);
        });
    }

    async function showAvatar(username) {
        const queryURL = "https://api.github.com/users/" + username;
        try {
            const response = await axios.get(queryURL);
            return response.data.avatar_url;
        } catch (error) {
            console.log(error);
        }
    }

        function getLicenseBadge(license) {

            try {
                if(license === "Apache 2.0"){
                    return "[!Github license](https://img.shields.io/badge/License-Apache-2.svg)";
            }
                if(license === "MIT"){
                    return "[![Github license](https://img.shields.io/badge/License-MIT-yellow.svg)";
            
            }
                if (license === "BSD 3"){
                    return "[![Github license](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)";
          
            }            
                if (license === "GPL 3.0"){
                    return "[![Github license](https://img.shields.io/badge/License-GPL-3.svg)";

            }
                if (license === "None"){
                    return "[![Github license](https://img.shields.io/badge/License-none.svg";

            } 
        } catch (error) {
            console.log(error);
        }
    }

