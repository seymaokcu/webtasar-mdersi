
const quizData = [
    {
        question: "Türkiye'nin en yüksek dağı hangisidir?",
        a: "Erciyes Dağı",
        b: "Ağrı Dağı",
        c: "Uludağ",
        d: "Süphan Dağı",
        correct: "b",
    },
    {
        question: "Modern web sayfaları oluşturmak için hangi dil kullanılır?",
        a: "Python",
        b: "HTML",
        c: "SQL",
        d: "Java",
        correct: "b",
    },
    {
        question: "C++ dilini kim geliştirmiştir?",
        a: "Guido van Rossum",
        b: "James Gosling",
        c: "Bjarne Stroustrup",
        d: "Linus Torvalds",
        correct: "c",
    },
    {
        question: "Güneş sistemindeki en büyük gezegen hangisidir?",
        a: "Mars",
        b: "Jüpiter",
        c: "Satürn",
        d: "Neptün",
        correct: "b",
    },
    {
        question: "Türkiye Cumhuriyeti hangi yılda kurulmuştur?",
        a: "1920",
        b: "1923",
        c: "1938",
        d: "1922",
        correct: "b",
    },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const feedbackEl = document.getElementById("feedback"); 
const trackerEl = document.getElementById("question-tracker"); 

let currentQuiz = 0;
let score = 0;
let isSubmitted = false; 
const totalQuestions = quizData.length;

shuffleArray(quizData);

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    feedbackEl.classList.add('hidden'); 

    trackerEl.innerText = `Soru ${currentQuiz + 1}/${totalQuestions}`;

    const currentQuizData = quizData[currentQuiz];
    const options = [
        { text: currentQuizData.a, id: 'a' },
        { text: currentQuizData.b, id: 'b' },
        { text: currentQuizData.c, id: 'c' },
        { text: currentQuizData.d, id: 'd' }
    ];
    const shuffledOptions = shuffleArray(options);

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = shuffledOptions[0].text;
    b_text.innerText = shuffledOptions[1].text;
    c_text.innerText = shuffledOptions[2].text;
    d_text.innerText = shuffledOptions[3].text;
}

function getSelected() {
    let answer = undefined;
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.value; 
        }
    });
    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false; 
    });
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
submitBtn.addEventListener("click", () => {
    const selectedAnswer = getSelected();
    if (!selectedAnswer) {
        feedbackEl.classList.remove('hidden');
        feedbackEl.className = 'feedback-error';
        feedbackEl.innerText = "Lütfen bir şık seçiniz!";
        return;
    }

    const currentQuizData = quizData[currentQuiz];
    const isCorrect = selectedAnswer === currentQuizData.correct;

    if (isCorrect) {
        score++;
        feedbackEl.className = 'feedback-success';
        feedbackEl.innerText = "Tebrikler! Doğru cevap.";
    } else {
        feedbackEl.className = 'feedback-error';
        feedbackEl.innerText = `Yanlış cevap. Doğru şık: ${currentQuizData.correct.toUpperCase()}`;
    }
    feedbackEl.classList.remove('hidden');

    submitBtn.disabled = true;
    setTimeout(() => {
        currentQuiz++;
        submitBtn.disabled = false;
        
        if (currentQuiz < totalQuestions) {
            loadQuiz();
        } else {
            gosterSonucEkrani();
        }
    }, 1500); 
});

function gosterSonucEkrani() {
    const successRate = ((score / totalQuestions) * 100).toFixed(1);
    
    let resultMessage;
    if (successRate >= 75) {
        resultMessage = "Mükemmel bir sonuç! Bilginiz takdire şayan.";
    } else if (successRate >= 50) {
        resultMessage = "İyi bir sonuç! Biraz daha çalışmayla harika olabilirsiniz.";
    } else {
        resultMessage = "Daha iyi sonuçlar alabilirsiniz. Tekrar denemek ister misiniz?";
    }
    
    quiz.innerHTML = `
        <div class="result-screen">
            <h2>Yarışma Tamamlandı!</h2>
            <p>Toplam ${totalQuestions} sorudan ${score} tanesini doğru cevapladınız.</p>
            <p>Başarı Oranınız: <strong>%${successRate}</strong></p>
            <p class="message">${resultMessage}</p>
            <button onclick="location.reload()">Yeniden Başla</button>
        </div>
    `;
}
