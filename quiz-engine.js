'use strict';
//tells javascript interpreter to be more stict with mistakes, helps catch bugs faster
class Quiz {

  static create(container, questions) {
    const quiz = new Quiz(container, questions);
    container.appendChild(quiz._buildQuestion(0));
    //part of DOM api, appends node to another node. method starting with _ is intended to be private in javascript. everything in javascript is public.
  }

  constructor(container, questions = []) {
    this.container = container;
    this.questions = questions;
    this.current = 0;
    this.answers = [];
  }

  _buildQuestion(index) {
  const { question, options, answer } = this.questions[index];
    //destructuring assignment. shortens 3 lines of code. explodes object into individual properties
    const wrapper = document.createElement('section');
    //dump all html we construct into this element
    const status = document.createElement('div');

    status.innerText = `Question ${index + 1} of ${this.questions.length}`;

    const p = document.createElement('p');

    p.innerText = question;
    //using backticks to allow for string interpolation

    const ul = document.createElement('ul');
    const items = options.map(o => {
      const li = document.createElement('li');
      const input = document.createElement('input');
      const span = document.createElement('span');
      //empty html nodes
      input.type = 'radio';
      input.name = `quiz-question-${index}`;
      input.value = o;

      span.innerText = o;

           li.appendChild(input);
           li.appendChild(span);

           return li;
         });
         const btn = document.createElement('button');

         btn.innerText = this.current === (this.questions.length - 1)
           ? 'Finish!'
           : 'Next!';

    //ternary operator, like an if/else statement? if we are on the last question, text will be finish. else its next
    btn.addEventListener('click', () => this.next());
    //moves on to next question
    wrapper.appendChild(status);
    wrapper.appendChild(p);
    //appendChild puts a node inside another node when in the dom
    items.forEach(li => ul.appendChild(li));
   wrapper.appendChild(ul);
   wrapper.appendChild(btn);

   return wrapper;
    //constructed html with javascript, appended to the html, appended to the wrapper, returned the wrapper
  }

next() {
  //calling next whenever the button is clicked
  const { value } = document.querySelector(
    `input[name="quiz-question-${this.current}"]:checked`
    //css selector that allows us to select a certain item. returns the user input {value} is destructured
  );
//extract the value of what the user selected
  this.answers.push(value);
  this.container.innerHTML = '';
  if (this.current === (this.questions.length - 1)) {
    this.container.appendChild(this._buildScore());
  } else {
    this.container.appendChild(this._buildQuestion(++this.current));
    //incrementing this.current question number. ++ in front of number returns version of incremented number. returns new index
  }
}

score() {
  let correct = 0;

const total = this.questions.length;

this.answers.forEach((answer, i) => {
  const question = this.questions[i];

  if (question.options.indexOf(answer) === question.answer) {
    correct++;
    }
    //for every answer we find corresponding questions
  });
  return [correct, total, ((correct / total) * 100).toFixed(0)];
    // returns % of correct answers, 0 is the precision(number of decimal questions)
}

_buildScore() {
  const [correct, total, score] = this.score();
  const p = document.createElement('p');

  p.innerHTML = `You got ${correct} of ${total} questions correct! (${score}%)`;

  return p;
}

}

window.Quiz = Quiz;
//puts this class into the global scope, unsure if this is needed
