'use strict';
/* global $ */

const BASE_API_URL = 'https://opentdb.com/api.php?amount=1&category=16&difficulty=easy&type=multiple';

const _SESSION_TOKEN_REQUEST_URL = 'https://opentdb.com/api_token.php?command=request';

const SESSION_TOKEN = '';


const QUESTIONS = [{
  question: 'In what year were the Cleveland Browns established?',
  a1: '1946',
  a2: '1963',
  a3: '1952',
  a4: '1950',
  answer: 'A1',
  comment: 'The correct answer is 1946.   Paul Brown, who was once called the \'father of modern football\', was the team\'s namesake and first coach. From the beginning of play in 1946 at Cleveland Municipal Stadium, the Browns were a great success'
},
{
  question: 'In 1979 and 1980, quarterback Brian Sipe engineered a series of last-minute wins and the Browns came to be called:',
  a1: 'Kolar Cadets',
  a2: 'Kardiac Kids',
  a3: 'The Dog pound',
  a4: 'Bulldog Browns',
  answer: 'A2',
  comment: 'The correct answer is Kardiak Kids. While the Browns made it back to the playoffs in 1971 and 1972, they fell into mediocrity through the mid-1970s. A revival of sorts took place in 1979 and 1980, when quarterback Brian Sipe engineered a series of last-minute wins and the Browns came to be called the \'Kardiac Kids\'. Under Sipe, however, the Browns did not make it past the first round of the playoffs.'
},
{
  question: 'In what division do the Cleveland Browns belong?',
  a1: 'AFC East',
  a2: 'AFC North',
  a3: 'NFC East',
  a4: 'NFC North',
  answer: 'A2',
  comment: 'Along with the Baltimore Ravens, Cincinnati Bengals and Pittsburgh Steelers, the Browns are part of the AFC North.'
},
{
  question: 'What upstate New York high school football team would be favored to beat the Cleveland Browns?',
  a1: 'Jamesville-DeWitt',
  a2: 'RL Thomas High School',
  a3: 'Fairport Central',
  a4: 'All of the above',
  answer: 'A4',
  comment: 'Since the Browns have not had a winning season since 2007, the answer is \'All of the above\'.'
},
{
  question: 'What is the name of the Cleveland Brown\'s cheerleaders?',
  a1: 'The Puppy Chows',
  a2: 'The Dukies',
  a3: 'The Dog Pounders',
  a4: 'None of the above',
  answer: 'A4',
  comment: 'The answer is \'None of the above\'.  Due to their old-school mentality, the Cleveland Browns have never had a cheerleaders squad.  The closest they have ever had was an all-girl marching band.'
},
{
  question: 'In the last 43 games, how many times has the Cleveland Browns changed quarterbacks?',
  a1: '5',
  a2: '10',
  a3: '15',
  a4: '20',
  answer: 'A4',
  comment: 'The Cleveland Browns have changed quarterbacks 20 times in the last 43 games.  They change quarterbacks, on average, every other week.  Among the quarterbacks involved in the changes are Brian Hoyer, Josh McCown, Austin Davis, Robert Griffin III and Cody Kessler.'
},
{
  question: 'Since 2010, How many first round quarterbacks has the Cleveland Browns passed on?',
  a1: '3',
  a2: '4',
  a3: '5',
  a4: '6',
  answer: 'A3',
  comment: 'Since 2010, the Cleveland Browns could have drafted a total of 5 winning quarterbacks.  Among the list are Teddy Bridgewater, Derek Carr, Ryan Tannehill, Russell Wilson, and Andy Dalton.'
},
{
  question: 'Out of the last 32 games, how many have the Cleveland Browns won?',
  a1: '3',
  a2: '4',
  a3: '5',
  a4: '6',
  answer: 'A2',
  comment: 'The Cleveland Browns have won 4 out of their last 32 games.  There is nothing more to say about this statistic.'
},
{
  question: 'What is the name of the bleacher section behind the east end zone in First Energy Stadium where the Brown’s play?',
  a1: 'The Dog Catchers',
  a2: 'The Dawg Pound',
  a3: 'The Elfs',
  a4: 'The Swaggers',
  answer: 'A2',
  comment: 'The answer is the \'Dawg Pound\'.  According to Hanford Dixon, then a cornerback with the Browns, the Dawg Pound started during the 1985 training camp where Dixon and fellow cornerback Frank Minnifield started the idea of the pound by using the dog-versus-cat relationship between the quarterback and the defense. This attitude carried into the stands at the training camp, where fans started barking along with the players.'
},
{
  question: 'Which Cleveland Browns player is currently in the Hall of Fame?',
  a1: 'OJ Simpson',
  a2: 'Johnny Menzel',
  a3: 'Joe Namath',
  a4: 'Jim Brown',
  answer: 'A4',
  comment: 'Jim Brown was a fullback for the Cleveland Browns from 1957 to 1965.  He ranks 10th amonth NFL rushing yards leaders by total yards gained, 12,312'
},
];

var startQuiz = false;
var index = 0;
const CORRECT_ANSWERS = [];
const totalQuestions = 10;

function changeButton() {
  console.log('ChangeButtonText ran');

  if (startQuiz) {
    $('.buttonControl').append('<button class= "next">Next</button>');
    $('.startQuiz').remove();
    handleNextClick();
  } else {
    $('.buttonControl').append('<button class= "startQuiz">Take the Quiz!</button>');
    $('.next').remove();
    handleNextClick();
  }

}

function generateQuestion(item) {
  console.log('GenerateQuizQuestion ran');
  return `<p>${item.question}</p>
				<input type= "radio" name= "answer" id= "radio" value= "A1"> ${item.a1}<br>
				<input type= "radio" name= "answer" id= "radio" value= "A2"> ${item.a2}<br>
				<input type= "radio" name= "answer" id= "radio" value= "A3"> ${item.a3}<br>
				<input type= "radio" name= "answer" id= "radio" value= "A4"> ${item.a4}<br>`;
}

function showResults() {
  console.log('showResults ran');

  var finalResults = 0;

  for (var i = 0; i < CORRECT_ANSWERS.length; i++)
    if (CORRECT_ANSWERS[i])
      finalResults++;


  $('p').remove();
  $('input').remove();
  $('#questions').html(' ');
  $('#questions').addClass('results');
  $('.results').append(`<p>${QUESTIONS[index-1].comment}</p><br>`);

  if (index != totalQuestions) {
    $('.results').append(`<p>Your current score is: ${finalResults} out of ${CORRECT_ANSWERS.length} correct answers</p>`);
  } else {

    $('.results').append(`<p>Your Final score is: ${finalResults} out of ${CORRECT_ANSWERS.length} correct answers</p>`);
    startQuiz = false;
    CORRECT_ANSWERS.length = 0;
    index = 0;
    changeButton();
    handleStartQuizClick();

  }
}

function handleAnswerClick() {

  $('input[name="answer"]').on('click', event => {
    console.log('handleAnswerClick ran');
    var answer = $('input[name="answer"]:checked').val();
    if (answer === QUESTIONS[index].answer) {
      CORRECT_ANSWERS[index] = 1;
    } else {
      CORRECT_ANSWERS[index] = 0;
    }
    index++;
    showResults();
    console.log(index);
    console.log(CORRECT_ANSWERS[index - 1]);

  });
}

function getNextQuestion() {
  const question = generateQuestion(QUESTIONS[index]);
  $('#questions').html(question);
  handleAnswerClick();

}


function handleNextClick() {
  $('.next').click(event => {
    console.log('HandleNextClick ran');
    if (index < 10)
      getNextQuestion();
    else
      showResults();
  });
}


function handleStartQuizClick() {
  $('.startQuiz').click(event => {
    console.log('handleStartQuizClick ran,');
    startQuiz = true;
    changeButton();
    $('#questions').addClass('quizContent');
    getNextQuestion();
  });
}

$(handleStartQuizClick);
$(handleNextClick);
$(handleAnswerClick);