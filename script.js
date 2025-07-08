const questions = [
    { question: "В якому році було засноване місто Рим?", options: ["У 600р до н. є.", "У 753р. до н. є.", "У 845р. до н. є.", "У 100р."], correct: "У 753р. до н. є." },
    { question: "Де зародилося християнство?", options: ["В Італії", "В Греції", "В Палестині", "В Єгипті"], correct: "В Палестині" },
    { question: "Коли відбулося Хрещення Русі?", options: ["У 988р.", "У 1054р.", "У 862р.", "У 999р."], correct: "У 988р." },
   { question: "У якому місті відбулося Хрещення Русі?", options: ["Берлін", "Лондон", "Харків", "Київ"], correct: "Київ" },
    { question: "Коли була революція в Франції", options: ["1812–1815 роки", "1917–1921 роки", "1848–1849 роки", "1789–1799 роки"], correct: "1789–1799 роки" },
    { question: "Хто був першим королем Пруссії?", options: ["Фрідріх I", "Фрідріх II", "Вільгельм I", "Отто фон Бісмарк"], correct: "Фрідріх I" },
    { question: "Коли відбувалися Наполеонівські війни?", options: ["1799–1815 роки", "1700–1721 роки", "1700–1721 роки", "1800–1850 роки"], correct: "1799–1815 роки" },
    { question: "Коли була Громадянська війна в США?", options: ["1861–1865 роки", "1775–1783 роки", "1914–1918 роки", "1865–1870 роки"], correct: "1861–1865 роки" },
    { question: "Коли почалася перша Балканська війна?", options: ["15 березня 1913 року", "28 липня 1914 року", "1 серпня 1914 року", "8 жовтня 1912 року"], correct: "8 жовтня 1912 року" },
    { question: "Коли почалася друга Балканська війна?", options: ["28 липня 1914 року", "8 жовтня 1912 року", "1 серпня 1913 року", "16 червня 1913 року"], correct: "16 червня 1913 року" },
    { question: "Коли була Перша світова війна?", options: ["1 вересня 1939 – 2 вересня 1945", "8 жовтня 1912 – 30 травня 1913", "28 липня 1914 – 11 листопада 1918", "16 червня 1913 – 10 серпня 1913"], correct: "28 липня 1914 – 11 листопада 1918" },
    { question: "Хто очолював Центральну Раду — перший орган влади УНР?", options: ["Володимир Винниченко", "Симон Петлюра", "Михайло Грушевський", "Павло Скоропадський"], correct: "Михайло Грушевський" },
    { question: "Яка держава визнала незалежність УНР першою у 1918 році?", options: ["Німеччина", "Польща", "Франція", "Росія"], correct: "Німеччина" },
    { question: "Хто був головним отаманом війська УНР у 1919–1920 роках?", options: ["Євген Петрушевич", "Симон Петлюра", "Павло Скоропадський", "Нестор Махно"], correct: "Симон Петлюра" },
    { question: "Хто був лідером анархістського руху в Україні, відомого як махновщина?", options: ["Нестор Махно", "Симон Петлюра", "Павло Скоропадський", "Володимир Винниченко"], correct: "Нестор Махно" },
    { question: "Який ідеологічний напрямок сповідував рух Махна?", options: ["Комунізм", "Анархізм", "Монархізм", "Фашизм"], correct: "Анархізм" },
    { question: "Які країни входили до блоку Осі у Другій світовій війні?", options: ["СРСР, США, Канада", "Велика Британія, Франція, США", "Німеччина, Італія, Японія", "Польща, Чехословаччина, Нідерланди"], correct: "Німеччина, Італія, Японія" },
    { question: "Які країни входили до складу антигітлерівської коаліції у Другій Світовій?", options: ["Німеччина, Італія, Японія", "Австрія, Угорщина, Румунія", "Іспанія, Швейцарія, Швеція", "США, СРСР, Велика Британія, Китай"], correct: "США, СРСР, Велика Британія, Китай" }
];

let questionIndex = 0;
let correctAnswers = 0;
let timerId = null;
let timeLeft = 10; // 10 секунд на питання

const startButton = document.getElementById("startButton");
const quizContainer = document.getElementById("quizContainer");
const startContainer = document.getElementById("startContainer");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const statsElement = document.getElementById("stats");
const timerDiv = document.getElementById("timer");
const timeDisplay = document.getElementById("time");

function startQuiz() {
    questionIndex = 0;
    correctAnswers = 0;
    statsElement.textContent = "";
    startContainer.style.display = "none";
    quizContainer.style.display = "block";
    timerDiv.style.display = "block";
    loadQuestion();
    startQuestionTimer();
}

function loadQuestion() {
    if (questionIndex < questions.length) {
        const currentQuestion = questions[questionIndex];
        questionElement.textContent = currentQuestion.question;
        answersElement.innerHTML = "";
        currentQuestion.options.forEach(option => {
            const btn = document.createElement("button");
            btn.classList.add("btn");
            btn.textContent = option;
            btn.onclick = () => checkAnswer(option, currentQuestion.correct);
            answersElement.appendChild(btn);
        });
        timeLeft = 10;
        updateTimerDisplay();
    } else {
        endQuiz();
    }
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        correctAnswers++;
    }
    clearInterval(timerId);
    questionIndex++;
    loadQuestion();
    startQuestionTimer();
}

function startQuestionTimer() {
    clearInterval(timerId);
    timeLeft = 10;
    updateTimerDisplay();
    timerId = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerId);
            questionIndex++;
            loadQuestion();
            startQuestionTimer();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function endQuiz() {
    clearInterval(timerId);
    quizContainer.style.display = "none";
    timerDiv.style.display = "none";
    startContainer.style.display = "flex";
    statsElement.innerHTML = `
        Ви дали <b>${correctAnswers}</b> правильних відповідей із <b>${questions.length}</b>.<br/>
        <span style="color:green;">Правильні: ${correctAnswers}</span><br/>
        <span style="color:red;">Неправильні: ${questions.length - correctAnswers}</span>
    `;
    startButton.textContent = "Почати заново";
}

startButton.addEventListener("click", startQuiz);
