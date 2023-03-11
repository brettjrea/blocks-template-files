#!/usr/bin/env node 
// specify the interpreter to be used to execute the script

const path = require("path"); // import Node.js built-in 'path' module
const fs = require("fs"); // import Node.js built-in 'fs' module
const { exec } = require("child_process"); // import Node.js built-in 'child_process' module

// create a variable called 'distDir' that resolves to the absolute path of the 'dist' directory
const distDir = path.resolve(__dirname, "./dist");

// read the contents of the 'dist' directory and create an array of strings representing the names of each file or directory in the 'dist' directory
const distBlocks = fs.readdirSync(distDir);

// loop through each item in the 'distBlocks' array and generate a tar ball for each of them
distBlocks.forEach((distBlock) => {

// create a variable called 'tarBall' that represents the name of the tar ball
const tarBall = `${distBlock}.tar.gz`;

// create a variable called 'tarBallPath' that resolves to the absolute path of the tar ball
const tarBallPath = path.resolve(__dirname, "./dist", tarBall);

// create a variable called 'tarBallCmd' that represents the command to generate the tar ball
const tarBallCmd = `tar -czf ${tarBallPath} -C ${distDir} ${distBlock}`;

// execute the 'tarBallCmd' command
exec(tarBallCmd);
});

