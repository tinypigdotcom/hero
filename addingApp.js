const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Give me the first number.', (number1) => {
  rl.question('Give me the second number.', (number2) => {
    let result = parseInt(number1) + parseInt(number2)
    console.log(result)
    rl.close()
  })
})

//this is radical
 


