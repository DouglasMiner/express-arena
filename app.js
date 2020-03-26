const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

app.get('/burgers', (req,res) => {
  res.send('We have juicy cheese burgers!');
});

app.get('/pizza/pepperoni', (req,res) => {
  res.send('Your pizza is on the way!');
});

app.get('/pizza/pineapple', (req, res) => {
  res.send('We don\'t serve that here. Never call again!');
});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base Url: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
  `;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end();
});

app.get('/greetings', (req, res) => {
  const name = req.query.name;
  const race = req.query.race;

  if(!name) {
    return res.status(400).send('Please provide a name.');
  }

  if(!race) {
    return res.status(400).send('Please provide a race.');
  }

  const greeting= `Greetings ${name} the ${race}, welcome to our kingdom!`;

  res.send(greeting);
});

app.get('/sum', (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  if(!a) {
    return res.status(400).send('Please provide a number');
  }
  if(!b) {
    return res.status(400).send('Please provide a number');
  }

  const c = a + b;
  
  const sum = `The sum of ${a} and ${b} is ${c}`;

  res.send(sum);
});

app.get('/cipher', (req, res) => {
  const text = req.query.text.split('');
  const shift = parseInt(req.query.shift);
  const code = [];

  text.forEach(letter => {
    code.push(letter.charCodeAt(0)+shift);
  });

  const encoded = [];

  code.forEach(num => {
    encoded.push(String.fromCharCode(num));
  });

  const newString = encoded.join('');

  res.send(`${newString}`);
});

app.get('/lotto', (req, res) => {
  const numbers = req.query.numbers;

  const nums =[];
  for (let i = 0; i < 6; i++) {
    nums.push(parseInt(numbers[i]));
  }

  const lottoNumbers = [];
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  for (let i = 0; i < 6; i++) {
    lottoNumbers.push(getRandomIntInclusive(1, 20));
  }


  const comparedNumbers = [];
  for (let i = 0; i < 6; i++) {
    console.log(lottoNumbers[i]);

    if (lottoNumbers.includes(nums[i])){
      comparedNumbers.push(nums[i]);
    }
  }
  if (comparedNumbers.length < 4){
    res.send('Sorry, you lose');
  } else if (comparedNumbers.length === 4) {
    res.send('Congratulations, you win a free ticket');
  } else if (comparedNumbers.length === 5) {
    res.send('Congratulations! You win $100!');
  } else if (comparedNumbers.length === 6) {
    res.send('Wow! Unbelievable! You could have won the mega millions!');
  }
});