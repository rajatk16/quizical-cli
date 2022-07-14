#!/usr/bin/env node

import inquirer from "inquirer";
import fs from 'node:fs/promises';

const data = JSON.parse((await fs.readFile("./data.json")).toString());
let index = 0;
let result = 0;
const askQuestions = async () => {
  if (index === data.length) {
    console.log(`YOU GOT ${result} answers correct!`);
    process.exit(0)
  } else {
    await askQuestion();
    index++;
    askQuestions();
  }
}

const askQuestion = async () => {
  const answer = await inquirer.prompt({
    type: 'list',
    name: `answer-${index + 1}`,
    choices: data[index].choices,
    message: data[index].question
  })
  checkAnswer(answer[`answer-${index + 1}`], index)
}

const checkAnswer = (enteredAnswer, index) => {
  if (enteredAnswer === data[index].answer) {
    console.log("CORRECT!!!")
    result++;
    return true;
  } else {
    console.log("WRONG!!!")
    return false;
  }
}

askQuestions();