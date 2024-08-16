let container_main = document.querySelector('.main');
let container_start = document.querySelector('.start');
let container_result = document.querySelector('.result');

let start_button = document.querySelector('.start-btn');
let question_field = document.querySelector('.question');
let answer_buttons = document.querySelectorAll('.answer');
let restart_button = document.querySelector('.restart-btn');
let score_field = document.querySelector('.score');

let countQuestion = 0;
let correct_answers_count = 0;

container_main.style.display = 'none';
container_result.style.display = 'none';
container_start.style.display = 'flex';

class Question {
    constructor(question, answer_1, answer_2, correct, answer_4, answer_5) {
        this.question = question;
        this.correct = correct;
        this.answers = [
            answer_1,
            answer_2,
            this.correct,
            answer_4,
            answer_5,
        ];
    }
    display() {
        const shuffled = this.answers.slice().sort(() => Math.random() - 0.5);
        question_field.innerHTML = this.question;
        console.log(this.question);
        for (let i = 0; i < shuffled.length; i += 1) {
            answer_buttons[i].innerHTML = shuffled[i];
            console.log(shuffled[i]);
        }
    }
}

let spisok_questions = [
    new Question("Яка назва Гароу в тсб?", "Garou", "Harou", "Hero Hunter", "Huter", "Hanter"),
    new Question("Який третій скілл в ульти Сайтами?", "Table Flip", "Death Counter", "Serious Punch", "Final Hunt", "Serious Mode"),
    new Question("Яка пасивка Сайтами?", "Регенерує здоров'я", "Багато урону", "Дає багато ульти", "Немає", "Незнаю"),
    new Question("Яка була перша назва гри?", "Battlegrounds", "Saitama Battlegrounds", "Saitama Game", "Не знаю.", "Game Fight"),
    new Question("Яка була перша ульта?", "Rampage", "Serious Mode", "Serious Series", "Не знаю.", "Can you even see me?"),
    new Question("Чому в 2023 гру видалили?", "Багато крові", "Шахрайство", "Авторське Право", "Не знаю.", "Без причини"),
    new Question("Яка пасивка Геноса?", "Регенерує здоров'я", "Дається ульта при уроні тобі", "Ресет перезарядки скилів", "Не знаю.", "Немає")
];

let total_answers_given = 0;

let current_question;

function showResult() {
    container_main.style.display = 'none';
    container_result.style.display = 'flex';
    
    let percentage = Math.round((correct_answers_count / spisok_questions.length) * 100);
    score_field.innerHTML = `${percentage}%`;
}

start_button.addEventListener('click', function() {
    container_main.style.display = 'flex';
    container_start.style.display = 'none';

    current_question = spisok_questions[total_answers_given];
    current_question.display();
});

for (let i = 0; i < answer_buttons.length; i += 1) {
    answer_buttons[i].addEventListener('click', function() {
        if (answer_buttons[i].innerHTML == current_question.correct) {
            console.log("Правильно");
            answer_buttons[i].classList.add('right');
            correct_answers_count += 1;
            setTimeout(function() {
                answer_buttons[i].classList.remove('right');
            }, 100); // видаляємо клас 
        } else {
            console.log("Неправильно");
            answer_buttons[i].classList.add('wrong');
            setTimeout(function() {
                answer_buttons[i].classList.remove('wrong');
            }, 100); // видаляємо клас 
        }

        total_answers_given += 1;
        if (total_answers_given === spisok_questions.length) {
            showResult();
        } else {
            current_question = spisok_questions[total_answers_given];
            current_question.display();
        }
    });
}

restart_button.addEventListener('click', function() {
    correct_answers_count = 0;
    total_answers_given = 0;
    container_result.style.display = 'none';
    container_start.style.display = 'flex';
});
