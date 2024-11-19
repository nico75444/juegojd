const levels = [
    {
      questions: [
        { question: "The ocean ___ very deep.", options: ["am", "is", "are"], answer: "is" },
        { question: "They ___ sailing today.", options: ["am", "is", "are"], answer: "are" },
        { question: "Whales ___ mammals.", options: ["am", "is", "are"], answer: "are" },
        { question: "The coral reef ___ colorful.", options: ["am", "is", "are"], answer: "is" },
      ]
    },
    {
              questions: [
                  { question: "They ___ not at the beach.", options: ["am", "is", "are"], answer: "are" },
                  { question: "___ she a marine biologist?", options: ["Is", "Are", "Am"], answer: "Is" },
                  { question: "I ___ not ready to dive.", options: ["am", "is", "are"], answer: "am" },
                  { question: "___ you interested in marine life?", options: ["Am", "Is", "Are"], answer: "Are" },
                  { question: "The captain ___ not on the ship.", options: ["am", "is", "are"], answer: "is" },
                  { question: "___ they friends?", options: ["Is", "Are", "Am"], answer: "Are" },
              ]
          },
          {
  questions: [
      { question: "The fisherman ___ early every morning.", options: ["go", "goes", "going"], answer: "goes" },
      { question: "They ___ fish to sell at the market.", options: ["catch", "catches", "catching"], answer: "catch" },
      { question: "She ___ the tide charts before going surfing.", options: ["check", "checks", "checking"], answer: "checks" },
      { question: "He ___ on the beach every Sunday.", options: ["run", "runs", "running"], answer: "runs" },
      { question: "Dolphins ___ in groups called pods.", options: ["swim", "swims", "swimming"], answer: "swim" },
      { question: "The tide ___ in and out daily.", options: ["come", "comes", "coming"], answer: "comes" },
      { question: "They ___ the beach for litter every morning.", options: ["clean", "cleans", "cleaning"], answer: "clean" },
      { question: "He ___ starfish along the shore.", options: ["find", "finds", "finding"], answer: "finds" },
      { question: "Seagulls ___ over the waves.", options: ["fly", "flies", "flying"], answer: "fly" },
      { question: "I ___ sandcastles when I visit the beach.", options: ["build", "builds", "building"], answer: "build" },
  ]
},

{
  questions: [
  { question: "I ___ not like seafood.", options: ["do", "don't", "does", "doesn't"], answer: "don't" },
      { question: "She ___ like to swim in the ocean.", options: ["do", "does", "doesn't", "don't"], answer: "does" },
      { question: "We ___ play volleyball on Sundays.", options: ["do", "don't", "does", "doesn't"], answer: "don't" },
      { question: "They ___ have a boat for diving.", options: ["do", "does", "don't", "doesn't"], answer: "don't" },
      { question: "He ___ like to visit the beach.", options: ["do", "does", "don't", "doesn't"], answer: "doesn't" },
      { question: "You ___ enjoy snorkeling with me.", options: ["do", "don't", "does", "doesn't"], answer: "do" },
      { question: "I ___ think dolphins are amazing.", options: ["do", "don't", "does", "doesn't"], answer: "do" },
      { question: "She ___ like jellyfish.", options: ["do", "does", "don't", "doesn't"], answer: "doesn't" },
      { question: "We ___ need more time to dive.", options: ["do", "don't", "does", "doesn't"], answer: "do" },
      { question: "They ___ want to go scuba diving.", options: ["do", "don't", "does", "doesn't"], answer: "do" },
  ]
},


  ];

  let currentLevel = 0;
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 90; // Tiempo de 70 segundos

  function startGame() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!username || !password) {
      alert("Por favor, completa ambos campos.");
      return;
    }
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    score = 0;
    currentLevel = 0;
    currentQuestionIndex = 0;
    document.getElementById('levelValue').innerText = currentLevel + 1;
    resetTimer();
    showQuestion();
  }

  function resetTimer() {
    timeLeft = 70; // Tiempo establecido a 70 segundos
    document.getElementById('timerValue').innerText = timeLeft;
    document.getElementById('progress').style.width = '0%';
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById('timerValue').innerText = timeLeft;
      document.getElementById('progress').style.width = ((70 - timeLeft) / 70) * 100 + '%';
      if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
      }
    }, 1000);
  }

  function showQuestion() {
    if (currentLevel < levels.length) {
      const levelQuestions = levels[currentLevel].questions;

      if (currentQuestionIndex < levelQuestions.length) {
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        questionElement.innerText = levelQuestions[currentQuestionIndex].question;
        optionsElement.innerHTML = '';

        levelQuestions[currentQuestionIndex].options.forEach(option => {
          const button = document.createElement('button');
          button.innerText = option;
          button.onclick = () => checkAnswer(option);
          optionsElement.appendChild(button);
        });

        document.getElementById('next').classList.add('hidden');
        document.getElementById('errorMessage').classList.add('hidden'); // Ocultar el mensaje de error
      } else {
        currentLevel++;
        currentQuestionIndex = 0;
        showLevelChangeAlert();
        document.getElementById('next').classList.remove('hidden');
      }
    } else {
      endGame();
    }
  }

  function showLevelChangeAlert() {
    const levelAlert = document.getElementById('levelAlert');
    levelAlert.innerText = `¡Felicidades! Has alcanzado el Nivel ${currentLevel + 1}!`;
    levelAlert.classList.remove('hidden');
    setTimeout(() => {
      levelAlert.classList.add('hidden');
    }, 3000);
    document.getElementById('levelValue').innerText = currentLevel + 1;
  }

  function checkAnswer(selected) {
    const levelQuestions = levels[currentLevel].questions;
    if (selected === levelQuestions[currentQuestionIndex].answer) {
      score += 1; // Aumentar la puntuación en 10 puntos por respuesta correcta
      document.getElementById('errorMessage').classList.add('hidden'); // Ocultar mensaje de error
      currentQuestionIndex++;
      showQuestion();
    } else {
      document.getElementById('errorMessage').classList.remove('hidden'); // Mostrar mensaje de error
    }
  }

  function nextLevel() {
    document.getElementById('next').classList.add('hidden');
    showQuestion();
  }

  function endGame() {
    clearInterval(timer);
    document.getElementById('game').classList.add('hidden');
    document.getElementById('score').classList.remove('hidden');
    document.getElementById('scoreValue').innerText = score;

    const totalQuestions = levels.reduce((acc, level) => acc + level.questions.length, 0);
    document.getElementById('totalQuestions').innerText = totalQuestions;

    provideFeedback();
  }

  function provideFeedback() {
    const feedback = document.getElementById('feedback');
    const totalQuestions = levels.reduce((acc, level) => acc + level.questions.length, 0);
    if (score === totalQuestions * 10) {
      feedback.innerText = "¡Increíble! Respondiste todas las preguntas correctamente.";
    } else if (score >= (totalQuestions * 7)) {
      feedback.innerText = "¡Buen trabajo! Tienes un buen dominio del verbo 'to be' y presente simple.";
    } else {
      feedback.innerText = "¡Sigue practicando! Puedes mejorar con más práctica.";
    }
  }

  function restartGame() {
    startGame();
  }

  // Modal para información sobre el verbo "to be"
  const modal = document.getElementById("myModal");
  const btn = document.getElementById("modalBtn");
  const span = document.getElementsByClassName("close")[0];

  btn.onclick = function() {
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
  function provideFeedback() {
    const feedback = document.getElementById('feedback');
    const totalQuestions = levels.reduce((acc, level) => acc + level.questions.length, 0);
    if (score === totalQuestions * 10) {
      feedback.innerText = "¡Increíble! Respondiste todas las preguntas correctamente.";
    } else if (score >= (totalQuestions * 7)) {
      feedback.innerText = "¡Buen trabajo! Tienes un buen dominio del verbo 'to be' y presente simple.";
    } else {
      feedback.innerText = "¡Sigue aprendiendo y practicando! El inglés es una puerta a muchas oportunidades.";
    }
    // Mensaje de ánimo adicional
    const motivationMessage = document.createElement('p');
    motivationMessage.innerText = "¡Sigue aprendiendo y practicando! El inglés es una puerta a muchas oportunidades.";
    motivationMessage.style.fontSize = "1.2em";
    motivationMessage.style.marginTop = "15px";
    motivationMessage.style.color = "black";
    feedback.appendChild(motivationMessage);
  }