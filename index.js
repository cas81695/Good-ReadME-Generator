// These are the constants that are refered to the package.json

const axios = require("axios");

const inquirer = require("inquirer");

const fs = require('fs-extra');

// The beginning of the command line

start();

// The prompts that collect all of the data for the readme file

function start() { inquirer.prompt([

    {
        type: "input",
        name: "username",
        message: "What is the username to your Github?"
    },
    {
        type: "input",
        name: "title",
        message: "What is the project's title?"
    },
    {
        type: "input",
        name: "description",
        message: "Type a brief description of the project."

    },
    {
        type: "list",
        name: "license",
        message: "What type of license should be included for the project?",
        choices: 
            ["APACHE 2.0",
            "MIT",
            "BSD 3",
            "GPL 3.0",
            "None"]
    },
    {
        type: "input",
        name: "dependencies",
        message: "What command should be run to install dependencies?",
        default: "npm i"
    },
    {
        type: "input",
        name: "test",
        message: "What command should be run to perform a test?",
        default: "npm test"
    },
    {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using the app?"

    },
    {
        type: "input",
        name: "contribution",
        message: "What does the user need to know about contributing to the project?"
    },
    {
        type: "input",
        name: "collaboration",
        message: "Name all who collaborated with the project and third-party assets."

    },
    {
        type: "confirm",
        name: "image",
        message: "Would you like to include a screenshot of your application?",
        // User replies either yes or no
    },
    {
        type: "input",
        name: "applicationImage",
        message: "If you would like to include screenshot of your application, please enter the path or source!",
    },
    {
        type: "confirm",
        name: "link",
        message: "Would like to include a link to your application?",
        // User replies either yes or no
    },
    {
        type: "input",
        name: "applicationLink",
        message: "If you would like to include a link to your application, please enter the href?",
    },
    {
        type: "input",
        name: "email",
        message: "Please enter your email address!",
    },

    ]).then(response => { const data = {

        // This collects all of the data from the answers of the prompts

            username: response.username,

            title: response.title,

            description: response.description,

            license: response.license,

            dependencies: response.dependencies,

            test: response.test,

            usage: response.usage,

            contribution: response.contribution,

            collaboration: response.collaboration,

            image: response.image,

            applicationImage: response.applicationImage,

            link: response.link,

            applicationLink: response.applicationLink,

            email: response.email 

        };

            return data;

        }).then(data => {   

            //These are functions that are activated once has been recieved and create the assigned items of the read me

            // The link to the app

            data.displayedLink = getApplicationLink(data.link, data.applicationLink);

            // The logo/badge of the license choosen

            data.licenseLogo = getLicenseLogo(data.license);

            // The screenshot of the app given by the user

            data.screenshot = showScreenshot(data.image, data.applicationImage);

            // Provide the picture/avatar of the user pulled from thier github account

            showAvatar(data.username).then(avatar => {
                data.avatar = avatar;
                createReadme(data);
            });
        
        });

    }


    function getApplicationLink(applicationLink, link) {

        //This diplays the link of the application via the responce given by the user

        try 
        {
            if (link === true) {
                return '<a href="http://' + applicationLink +' "> Link to Application </a>';
            } else {
                return ""
            }
            } catch (error) {
                console.log(error);
        }
    }


    function getLicenseLogo(license) {

        // The logo is pulled from the links in response to the user

        try {
            if(license === "APACHE 2.0"){
                return "![Github license](https://img.shields.io/badge/License-Apache-2.svg)";
        }
            if(license === "MIT"){
                return "![Github license](https://img.shields.io/badge/License-MIT-yellow.svg)";
        
        }
            if (license === "BSD 3"){
                return "![Github license](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)";
      
        }            
            if (license === "GPL 3.0"){
                return "![Github license](https://img.shields.io/badge/License-GPL-3.svg)";

        }
            if (license === "None"){
                return ""
        } 
             } catch (error) {
             console.log(error);
    }
}

function showScreenshot (applicationImage, image) {

    // The link provided by the user allows the screenshot to be displayed

    try {
        if (image === true) {
            return '<img src=" '+ applicationImage +' "alt= "application image" width= "500px" height="200px"><br>';
        } else {
            return ""
        }

        } catch (error) {
            console.log(error);
        }
    }

async function showAvatar(username) {
        const queryURL = "https://api.github.com/users/" + username;
        try {
            const response = await axios.get(queryURL);
            console.log(response.data.avatar_url);
            return response.data.avatar_url;
        } catch (error) {
            console.log(error);
        }
    }
  
    // This function creates the layout of the read me file 

    function createReadme(data) {

        const fileName = `README.md`;

        let layout = 

        `# ${data.title}

        ${data.licenseLogo}

        ## Description

        ${data.description}

        ## Table of Content

        *[Installation](#installation)

        *[Usage](#usage)

        *[Credits](#credits)
        
        *[License](#license)
        
        *[Test](#test)
        
        *[Contribution](#contribution)

        ## Intsallation
        
        To install all of the dependencies that are needed, run the following command:
        
        ${data.dependencies}
        
        ## Usage
        
        ${data.usage}
        
        ## Collaborators and/or Third Party Assets
        
        ${data.collaboration}
        
        ## License
        
        ${data.license}
        
        ## Test
        
        To run test, run the following command:
        
        ${data.test}
        
        ## Contribution
        
        ${data.contribution}

        ----------------------------------------------

        ${data.screenshot}

        ${data.displayedLink}

        -----------------------------------------------
        
        ## Questions
        
        If you have any questions about the application, please open up an issue or contact ${data.username} via ${data.email}.
        
        <img src= "${data.avatar}" width ="200px" height="200px">`;

   
        console.log(data.title);

    
        fs.writeFile(fileName, layout, err => {
        if (err) throw err;
        console.log("saved readme!");
        console.log(fileName);
    });
}
