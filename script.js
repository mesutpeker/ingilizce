let currentCategory = '';
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let isEnglish = false;
let timer;
let timeLeft;
let gameInterval;

// Sesleri tanımla
const correctSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
const wrongSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3');
const timerSound = new Audio('https://assets.mixkit.co/active_storage/sfx/888/888-preview.mp3');

// Emoji feedback fonksiyonu
function showEmojiFeedback(isCorrect) {
    const emojiElement = document.getElementById('emoji-feedback');
    emojiElement.textContent = isCorrect ? '👍' : '☝️';
    emojiElement.className = 'emoji-feedback ' + (isCorrect ? 'emoji-correct' : 'emoji-wrong');
    
    // Animasyon bitiminde emoji'yi temizle
    setTimeout(() => {
        emojiElement.textContent = '';
        emojiElement.className = 'emoji-feedback';
    }, 1000);
}

const wordsQuestions = [
    {
        question: "'Ambulance' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Ambulance' kelimesinin Türkçe anlamı nedir?",
        options: ["Ambulans", "Hastane", "Doktor"],
        optionsTr: ["Ambulans", "Hastane", "Doktor"],
        correct: 0
    },
    {
        question: "'Balloon' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Balloon' kelimesinin Türkçe anlamı nedir?",
        options: ["Top", "Balon", "Oyuncak"],
        optionsTr: ["Top", "Balon", "Oyuncak"],
        correct: 1
    },
    {
        question: "'Biscuit' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Biscuit' kelimesinin Türkçe anlamı nedir?",
        options: ["Kek", "Pasta", "Bisküvi"],
        optionsTr: ["Kek", "Pasta", "Bisküvi"],
        correct: 2
    },
    {
        question: "'Café' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Café' kelimesinin Türkçe anlamı nedir?",
        options: ["Kafe", "Restaurant", "Market"],
        optionsTr: ["Kafe", "Restaurant", "Market"],
        correct: 0
    },
    {
        question: "'Cake' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Cake' kelimesinin Türkçe anlamı nedir?",
        options: ["Bisküvi", "Pasta", "Ekmek"],
        optionsTr: ["Bisküvi", "Pasta", "Ekmek"],
        correct: 1
    },
    {
        question: "'Camp' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Camp' kelimesinin Türkçe anlamı nedir?",
        options: ["Kamp", "Piknik", "Park"],
        optionsTr: ["Kamp", "Piknik", "Park"],
        correct: 0
    },
    {
        question: "'Doctor' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Doctor' kelimesinin Türkçe anlamı nedir?",
        options: ["Hemşire", "Doktor", "Hasta"],
        optionsTr: ["Hemşire", "Doktor", "Hasta"],
        correct: 1
    },
    {
        question: "'Email' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Email' kelimesinin Türkçe anlamı nedir?",
        options: ["E-posta", "Telefon", "Mesaj"],
        optionsTr: ["E-posta", "Telefon", "Mesaj"],
        correct: 0
    },
    {
        question: "'Electric' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Electric' kelimesinin Türkçe anlamı nedir?",
        options: ["Su", "Gaz", "Elektrik"],
        optionsTr: ["Su", "Gaz", "Elektrik"],
        correct: 2
    },
    {
        question: "'Garage' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Garage' kelimesinin Türkçe anlamı nedir?",
        options: ["Garaj", "Bahçe", "Depo"],
        optionsTr: ["Garaj", "Bahçe", "Depo"],
        correct: 0
    },
    {
        question: "'Hotel' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Hotel' kelimesinin Türkçe anlamı nedir?",
        options: ["Ev", "Otel", "Bina"],
        optionsTr: ["Ev", "Otel", "Bina"],
        correct: 1
    },
    {
        question: "'Internet' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Internet' kelimesinin Türkçe anlamı nedir?",
        options: ["İnternet", "Telefon", "Bilgisayar"],
        optionsTr: ["İnternet", "Telefon", "Bilgisayar"],
        correct: 0
    },
    {
        question: "'Laptop' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Laptop' kelimesinin Türkçe anlamı nedir?",
        options: ["Tablet", "Telefon", "Dizüstü bilgisayar"],
        optionsTr: ["Tablet", "Telefon", "Dizüstü bilgisayar"],
        correct: 2
    },
    {
        question: "'Lemon' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Lemon' kelimesinin Türkçe anlamı nedir?",
        options: ["Limon", "Portakal", "Mandalina"],
        optionsTr: ["Limon", "Portakal", "Mandalina"],
        correct: 0
    },
    {
        question: "'Microphone' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Microphone' kelimesinin Türkçe anlamı nedir?",
        options: ["Hoparlör", "Mikrofon", "Kulaklık"],
        optionsTr: ["Hoparlör", "Mikrofon", "Kulaklık"],
        correct: 1
    },
    {
        question: "'Note' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Note' kelimesinin Türkçe anlamı nedir?",
        options: ["Not", "Kitap", "Kalem"],
        optionsTr: ["Not", "Kitap", "Kalem"],
        correct: 0
    },
    {
        question: "'Office' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Office' kelimesinin Türkçe anlamı nedir?",
        options: ["Ev", "Ofis", "Market"],
        optionsTr: ["Ev", "Ofis", "Market"],
        correct: 1
    },
    {
        question: "'Picnic' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Picnic' kelimesinin Türkçe anlamı nedir?",
        options: ["Park", "Kamp", "Piknik"],
        optionsTr: ["Park", "Kamp", "Piknik"],
        correct: 2
    },
    {
        question: "'Quiz' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Quiz' kelimesinin Türkçe anlamı nedir?",
        options: ["Ders", "Sınıf", "Sınav"],
        optionsTr: ["Ders", "Sınıf", "Sınav"],
        correct: 2
    },
    {
        question: "'Radio' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Radio' kelimesinin Türkçe anlamı nedir?",
        options: ["Radyo", "Televizyon", "Telefon"],
        optionsTr: ["Radyo", "Televizyon", "Telefon"],
        correct: 0
    },
    {
        question: "'Salad' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Salad' kelimesinin Türkçe anlamı nedir?",
        options: ["Salata", "Yemek", "Meyve"],
        optionsTr: ["Salata", "Yemek", "Meyve"],
        correct: 0
    },
    {
        question: "'Sandwich' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Sandwich' kelimesinin Türkçe anlamı nedir?",
        options: ["Tost", "Sandviç", "Ekmek"],
        optionsTr: ["Tost", "Sandviç", "Ekmek"],
        correct: 1
    },
    {
        question: "'Sport' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Sport' kelimesinin Türkçe anlamı nedir?",
        options: ["Oyun", "Egzersiz", "Spor"],
        optionsTr: ["Oyun", "Egzersiz", "Spor"],
        correct: 2
    },
    {
        question: "'Stop' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Stop' kelimesinin Türkçe anlamı nedir?",
        options: ["Dur", "Git", "Bekle"],
        optionsTr: ["Dur", "Git", "Bekle"],
        correct: 0
    },
    {
        question: "'Supermarket' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Supermarket' kelimesinin Türkçe anlamı nedir?",
        options: ["Market", "Süpermarket", "Mağaza"],
        optionsTr: ["Market", "Süpermarket", "Mağaza"],
        correct: 1
    },
    {
        question: "'Telephone' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Telephone' kelimesinin Türkçe anlamı nedir?",
        options: ["Telefon", "Bilgisayar", "Tablet"],
        optionsTr: ["Telefon", "Bilgisayar", "Tablet"],
        correct: 0
    },
    {
        question: "'Television' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Television' kelimesinin Türkçe anlamı nedir?",
        options: ["Radyo", "Televizyon", "Bilgisayar"],
        optionsTr: ["Radyo", "Televizyon", "Bilgisayar"],
        correct: 1
    },
    {
        question: "'Tomato' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Tomato' kelimesinin Türkçe anlamı nedir?",
        options: ["Biber", "Salatalık", "Domates"],
        optionsTr: ["Biber", "Salatalık", "Domates"],
        correct: 2
    },
    {
        question: "'Train' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Train' kelimesinin Türkçe anlamı nedir?",
        options: ["Tren", "Otobüs", "Araba"],
        optionsTr: ["Tren", "Otobüs", "Araba"],
        correct: 0
    },
    {
        question: "'Word' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Word' kelimesinin Türkçe anlamı nedir?",
        options: ["Cümle", "Kelime", "Harf"],
        optionsTr: ["Cümle", "Kelime", "Harf"],
        correct: 1
    },
    {
        question: "'University' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'University' kelimesinin Türkçe anlamı nedir?",
        options: ["Üniversite", "Okul", "Lise"],
        optionsTr: ["Üniversite", "Okul", "Lise"],
        correct: 0
    },
    {
        question: "'Vanilla' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Vanilla' kelimesinin Türkçe anlamı nedir?",
        options: ["Çikolata", "Vanilya", "Çilek"],
        optionsTr: ["Çikolata", "Vanilya", "Çilek"],
        correct: 1
    },
    {
        question: "'Video' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Video' kelimesinin Türkçe anlamı nedir?",
        options: ["Fotoğraf", "Resim", "Video"],
        optionsTr: ["Fotoğraf", "Resim", "Video"],
        correct: 2
    },
    {
        question: "'Yoghurt' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Yoghurt' kelimesinin Türkçe anlamı nedir?",
        options: ["Yoğurt", "Süt", "Ayran"],
        optionsTr: ["Yoğurt", "Süt", "Ayran"],
        correct: 0
    },
    {
        question: "'Paint' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Paint' kelimesinin Türkçe anlamı nedir?",
        options: ["Çizmek", "Boyamak", "Kesmek"],
        optionsTr: ["Çizmek", "Boyamak", "Kesmek"],
        correct: 1
    },
    {
        question: "'Draw' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Draw' kelimesinin Türkçe anlamı nedir?",
        options: ["Çizmek", "Boyamak", "Yazmak"],
        optionsTr: ["Çizmek", "Boyamak", "Yazmak"],
        correct: 0
    },
    {
        question: "'Cut' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Cut' kelimesinin Türkçe anlamı nedir?",
        options: ["Yapıştırmak", "Kesmek", "Açmak"],
        optionsTr: ["Yapıştırmak", "Kesmek", "Açmak"],
        correct: 1
    },
    {
        question: "'Stick' kelimesinin Türkçe anlamı nedir?",
        questionTr: "'Stick' kelimesinin Türkçe anlamı nedir?",
        options: ["Kesmek", "Çizmek", "Yapıştırmak"],
        optionsTr: ["Kesmek", "Çizmek", "Yapıştırmak"],
        correct: 2
    }
];

const spellingQuestions = [
    {
        question: "Which is the correct spelling of 'Ambulans'?",
        questionTr: "'Ambulans' kelimesinin doğru yazılışı hangisidir?",
        options: ["ambulence", "ambulens", "ambulance"],
        optionsTr: ["ambulence", "ambulens", "ambulance"],
        correct: 2
    },
    {
        question: "Which is the correct spelling of 'Balon'?",
        questionTr: "'Balon' kelimesinin doğru yazılışı hangisidir?",
        options: ["balloon", "baloon", "ballon"],
        optionsTr: ["balloon", "baloon", "ballon"],
        correct: 0
    },
    {
        question: "Which is the correct spelling of 'Bisküvi'?",
        questionTr: "'Bisküvi' kelimesinin doğru yazılışı hangisidir?",
        options: ["biscut", "biscuit", "biskit"],
        optionsTr: ["biscut", "biscuit", "biskit"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'Kafe'?",
        questionTr: "'Kafe' kelimesinin doğru yazılışı hangisidir?",
        options: ["café", "cafe", "caffe"],
        optionsTr: ["café", "cafe", "caffe"],
        correct: 0
    },
    {
        question: "Which is the correct spelling of 'Kek'?",
        questionTr: "'Kek' kelimesinin doğru yazılışı hangisidir?",
        options: ["kake", "cak", "cake"],
        optionsTr: ["kake", "cak", "cake"],
        correct: 2
    },
    {
        question: "Which is the correct spelling of 'Kamp'?",
        questionTr: "'Kamp' kelimesinin doğru yazılışı hangisidir?",
        options: ["cemp", "camp", "kamp"],
        optionsTr: ["cemp", "camp", "kamp"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'Doktor'?",
        questionTr: "'Doktor' kelimesinin doğru yazılışı hangisidir?",
        options: ["doctor", "docter", "dokter"],
        optionsTr: ["doctor", "docter", "dokter"],
        correct: 0
    },
    {
        question: "Which is the correct spelling of 'E-posta'?",
        questionTr: "'E-posta' kelimesinin doğru yazılışı hangisidir?",
        options: ["imail", "email", "e-mail"],
        optionsTr: ["imail", "email", "e-mail"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'Elektrik'?",
        questionTr: "'Elektrik' kelimesinin doğru yazılışı hangisidir?",
        options: ["elektric", "elektrik", "electric"],
        optionsTr: ["elektric", "elektrik", "electric"],
        correct: 2
    },
    {
        question: "Which is the correct spelling of 'Garaj'?",
        questionTr: "'Garaj' kelimesinin doğru yazılışı hangisidir?",
        options: ["garage", "garaj", "garaje"],
        optionsTr: ["garage", "garaj", "garaje"],
        correct: 0
    },
    {
        question: "Which is the correct spelling of 'Otel'?",
        questionTr: "'Otel' kelimesinin doğru yazılışı hangisidir?",
        options: ["hotle", "hotel", "hotell"],
        optionsTr: ["hotle", "hotel", "hotell"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'İnternet'?",
        questionTr: "'İnternet' kelimesinin doğru yazılışı hangisidir?",
        options: ["Internet", "intenet", "internet"],
        optionsTr: ["Internet", "intenet", "internet"],
        correct: 0
    },
    {
        question: "Which is the correct spelling of 'Dizüstü bilgisayar'?",
        questionTr: "'Dizüstü bilgisayar' kelimesinin doğru yazılışı hangisidir?",
        options: ["labtop", "leptop", "laptop"],
        optionsTr: ["labtop", "leptop", "laptop"],
        correct: 2
    },
    {
        question: "Which is the correct spelling of 'Limon'?",
        questionTr: "'Limon' kelimesinin doğru yazılışı hangisidir?",
        options: ["lemon", "lemun", "limon"],
        optionsTr: ["lemon", "lemun", "limon"],
        correct: 0
    },
    {
        question: "Which is the correct spelling of 'Mikrofon'?",
        questionTr: "'Mikrofon' kelimesinin doğru yazılışı hangisidir?",
        options: ["mikrofon", "microphone", "microfone"],
        optionsTr: ["mikrofon", "microphone", "microfone"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'Not'?",
        questionTr: "'Not' kelimesinin doğru yazılışı hangisidir?",
        options: ["notte", "not", "note"],
        optionsTr: ["notte", "not", "note"],
        correct: 2
    },
    {
        question: "Which is the correct spelling of 'Ofis'?",
        questionTr: "'Ofis' kelimesinin doğru yazılışı hangisidir?",
        options: ["office", "offise", "ofis"],
        optionsTr: ["office", "offise", "ofis"],
        correct: 0
    },
    {
        question: "Which is the correct spelling of 'Piknik'?",
        questionTr: "'Piknik' kelimesinin doğru yazılışı hangisidir?",
        options: ["picknick", "picnic", "piknik"],
        optionsTr: ["picknick", "picnic", "piknik"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'Quiz'?",
        questionTr: "'Quiz' kelimesinin doğru yazılışı hangisidir?",
        options: ["quizz", "quiz", "quize"],
        optionsTr: ["quizz", "quiz", "quize"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'Radyo'?",
        questionTr: "'Radyo' kelimesinin doğru yazılışı hangisidir?",
        options: ["redio", "radio", "radyo"],
        optionsTr: ["redio", "radio", "radyo"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'Salata'?",
        questionTr: "'Salata' kelimesinin doğru yazılışı hangisidir?",
        options: ["salad", "sallad", "salat"],
        optionsTr: ["salad", "sallad", "salat"],
        correct: 0
    },
    {
        question: "Which is the correct spelling of 'Sandviç'?",
        questionTr: "'Sandviç' kelimesinin doğru yazılışı hangisidir?",
        options: ["sandvich", "sandwitch", "sandwich"],
        optionsTr: ["sandvich", "sandwitch", "sandwich"],
        correct: 2
    },
    {
        question: "Which is the correct spelling of 'Spor'?",
        questionTr: "'Spor' kelimesinin doğru yazılışı hangisidir?",
        options: ["sportt", "sport", "spor"],
        optionsTr: ["sportt", "sport", "spor"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'Dur'?",
        questionTr: "'Dur' kelimesinin doğru yazılışı hangisidir?",
        options: ["stop", "stopp", "stup"],
        optionsTr: ["stop", "stopp", "stup"],
        correct: 0
    },
    {
        question: "Which is the correct spelling of 'Süpermarket'?",
        questionTr: "'Süpermarket' kelimesinin doğru yazılışı hangisidir?",
        options: ["supermarkett", "süpermarket", "supermarket"],
        optionsTr: ["supermarkett", "süpermarket", "supermarket"],
        correct: 2
    },
    {
        question: "Which is the correct spelling of 'Telefon'?",
        questionTr: "'Telefon' kelimesinin doğru yazılışı hangisidir?",
        options: ["telefon", "telephone", "telephon"],
        optionsTr: ["telefon", "telephone", "telephon"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'Televizyon'?",
        questionTr: "'Televizyon' kelimesinin doğru yazılışı hangisidir?",
        options: ["television", "televition", "televizyon"],
        optionsTr: ["television", "televition", "televizyon"],
        correct: 0
    },
    {
        question: "Which is the correct spelling of 'Domates'?",
        questionTr: "'Domates' kelimesinin doğru yazılışı hangisidir?",
        options: ["tometo", "tomato", "tamato"],
        optionsTr: ["tometo", "tomato", "tamato"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'Tren'?",
        questionTr: "'Tren' kelimesinin doğru yazılışı hangisidir?",
        options: ["traine", "tren", "train"],
        optionsTr: ["traine", "tren", "train"],
        correct: 2
    },
    {
        question: "Which is the correct spelling of 'Kelime'?",
        questionTr: "'Kelime' kelimesinin doğru yazılışı hangisidir?",
        options: ["word", "werd", "woord"],
        optionsTr: ["word", "werd", "woord"],
        correct: 0
    },
    {
        question: "Which is the correct spelling of 'Üniversite'?",
        questionTr: "'Üniversite' kelimesinin doğru yazılışı hangisidir?",
        options: ["universitet", "university", "üniversite"],
        optionsTr: ["universitet", "university", "üniversite"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'Vanilya'?",
        questionTr: "'Vanilya' kelimesinin doğru yazılışı hangisidir?",
        options: ["vanilia", "vanila", "vanilla"],
        optionsTr: ["vanilia", "vanila", "vanilla"],
        correct: 2
    },
    {
        question: "Which is the correct spelling of 'Video'?",
        questionTr: "'Video' kelimesinin doğru yazılışı hangisidir?",
        options: ["video", "vidio", "vedio"],
        optionsTr: ["video", "vidio", "vedio"],
        correct: 0
    },
    {
        question: "Which is the correct spelling of 'Yoğurt'?",
        questionTr: "'Yoğurt' kelimesinin doğru yazılışı hangisidir?",
        options: ["yogurt", "yoghurt", "yoğurt"],
        optionsTr: ["yogurt", "yoghurt", "yoğurt"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'Boyamak'?",
        questionTr: "'Boyamak' kelimesinin doğru yazılışı hangisidir?",
        options: ["peint", "peynt", "paint"],
        optionsTr: ["peint", "peynt", "paint"],
        correct: 2
    },
    {
        question: "Which is the correct spelling of 'Çizmek'?",
        questionTr: "'Çizmek' kelimesinin doğru yazılışı hangisidir?",
        options: ["draw", "drow", "drau"],
        optionsTr: ["draw", "drow", "drau"],
        correct: 0
    },
    {
        question: "Which is the correct spelling of 'Kesmek'?",
        questionTr: "'Kesmek' kelimesinin doğru yazılışı hangisidir?",
        options: ["cutt", "cut", "kat"],
        optionsTr: ["cutt", "cut", "kat"],
        correct: 1
    },
    {
        question: "Which is the correct spelling of 'Yapıştırmak'?",
        questionTr: "'Yapıştırmak' kelimesinin doğru yazılışı hangisidir?",
        options: ["stik", "stic", "stick"],
        optionsTr: ["stik", "stic", "stick"],
        correct: 2
    }
];

const speakingQuestions = [
    {
        question: "How do you say 'Günaydın'?",
        questionTr: "'Günaydın' nasıl söylenir?",
        options: ["Good morning", "Good night", "Good evening", "Good afternoon"],
        optionsTr: ["Günaydın", "İyi geceler", "İyi akşamlar", "İyi öğlenler"],
        correct: 0
    },
    {
        question: "What's the meaning of 'How are you?'",
        questionTr: "'How are you?' ne demek?",
        options: ["Nasılsın?", "Nerelisin?", "Kimsin?", "Neredesin?"],
        optionsTr: ["Nasılsın?", "Nerelisin?", "Kimsin?", "Neredesin?"],
        correct: 0
    },
    {
        question: "How do you say 'Teşekkür ederim'?",
        questionTr: "'Teşekkür ederim' nasıl söylenir?",
        options: ["Thank you", "Please", "You're welcome", "Excuse me"],
        optionsTr: ["Teşekkür ederim", "Lütfen", "Rica ederim", "Affedersiniz"],
        correct: 0
    },
    {
        question: "What's the meaning of 'Nice to meet you'?",
        questionTr: "'Nice to meet you' ne demek?",
        options: ["Tanıştığımıza memnun oldum", "Görüşürüz", "Hoşçakal", "Nasılsın"],
        optionsTr: ["Tanıştığımıza memnun oldum", "Görüşürüz", "Hoşçakal", "Nasılsın"],
        correct: 0
    },
    {
        question: "How do you say 'Hoşçakal'?",
        questionTr: "'Hoşçakal' nasıl söylenir?",
        options: ["Goodbye", "Hello", "Welcome", "Thanks"],
        optionsTr: ["Hoşçakal", "Merhaba", "Hoşgeldin", "Teşekkürler"],
        correct: 0
    },
    {
        question: "Complete the dialogue: 'Good ___, how are you?'",
        questionTr: "Diyaloğu tamamlayın: 'Good ___, how are you?'",
        options: ["bye", "night", "morning"],
        optionsTr: ["hoşçakal", "gece", "sabah/günaydın"],
        correct: 2
    },
    {
        question: "Fill in the blank: '___ name is John.'",
        questionTr: "Boşluğu doldurun: '___ name is John.'",
        options: ["My", "I", "Me"],
        optionsTr: ["Benim", "Ben", "Bana"],
        correct: 0
    },
    {
        question: "Complete: 'How ___ you?'",
        questionTr: "Tamamlayın: 'How ___ you?'",
        options: ["am", "is", "are"],
        optionsTr: ["im", "dir", "sin"],
        correct: 2
    },
    {
        question: "Fill in: '___ to meet you.'",
        questionTr: "Boşluğu doldurun: '___ to meet you.'",
        options: ["Well", "Nice", "Good"],
        optionsTr: ["Güzel", "Memnun oldum", "İyi"],
        correct: 1
    },
    {
        question: "Complete: 'See you ___.'",
        questionTr: "Tamamlayın: 'See you ___.'",
        options: ["before", "after", "later"],
        optionsTr: ["önce", "ardından", "sonra"],
        correct: 2
    }
];

function startCategory(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    
    switch(category) {
        case 'words':
            questions = wordsQuestions;
            break;
        case 'spelling':
            questions = spellingQuestions;
            break;
        case 'speaking':
            questions = speakingQuestions;
            break;
    }
    
    document.getElementById('categorySelection').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    
    updateQuestion();
    startTimer();
    updateProgress();
}

function startTimer() {
    timeLeft = 15;
    clearInterval(gameInterval);
    updateTimerDisplay();
    
    gameInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 5) {
            document.getElementById('timer').classList.add('warning');
            timerSound.play(); // Timer uyarı sesi
        }
        
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            handleAnswer(-1);
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = timeLeft;
}

function updateQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = isEnglish ? 
        currentQuestion.question : currentQuestion.questionTr;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    const currentOptions = isEnglish ? currentQuestion.options : currentQuestion.optionsTr;
    
    currentOptions.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => handleAnswer(index);
        optionsContainer.appendChild(button);
    });

    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    updateProgress();
}

function handleAnswer(selectedIndex) {
    clearInterval(gameInterval);
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.getElementById('options').children;
    
    options[currentQuestion.correct].classList.add('correct');
    
    if (selectedIndex !== -1) {
        if (selectedIndex === currentQuestion.correct) {
            score += 10;
            correctSound.play(); // Doğru cevap sesi
            showEmojiFeedback(true);
            showFeedback(true);
        } else {
            options[selectedIndex].classList.add('wrong');
            wrongSound.play(); // Yanlış cevap sesi
            showEmojiFeedback(false);
            showFeedback(false);
        }
    } else {
        timerSound.play(); // Zaman dolma sesi
        showEmojiFeedback(false);
        showFeedback(false);
    }

    document.getElementById('currentScore').textContent = score;
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            updateQuestion();
            startTimer();
        } else {
            endGame();
        }
    }, 2000);
}

function showFeedback(isCorrect) {
    const feedback = document.getElementById('feedback');
    feedback.style.display = 'block';
    feedback.style.backgroundColor = isCorrect ? '#2ecc71' : '#e74c3c';
    feedback.style.color = 'white';
    feedback.textContent = isCorrect ? 
        (isEnglish ? 'Correct!' : 'Doğru!') : 
        (isEnglish ? 'Wrong!' : 'Yanlış!');
    
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 1500);
}

function updateProgress() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function toggleLanguage() {
    isEnglish = !isEnglish;
    document.getElementById('languageBtn').textContent = isEnglish ? 'Türkçe\'ye Geç' : 'Switch to English';
    updateQuestion();
}

function endGame() {
    clearInterval(gameInterval);
    const finalScore = score;
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    highScores.push({
        category: currentCategory,
        score: finalScore,
        date: new Date().toLocaleDateString()
    });
    
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('categorySelection').style.display = 'block';
    
    showScoreboard();
}

function showScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    const scoreList = document.getElementById('scoreList');
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    scoreList.innerHTML = '';
    
    highScores.forEach((score, index) => {
        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        scoreItem.innerHTML = `
            <span>${index + 1}. ${getCategoryName(score.category)}</span>
            <span>${score.score} puan</span>
            <span>${score.date}</span>
        `;
        scoreList.appendChild(scoreItem);
    });
    
    scoreboard.style.display = 'block';
}

function getCategoryName(category) {
    const categories = {
        'words': 'Kelimeler',
        'spelling': 'Yazım',
        'speaking': 'Konuşma'
    };
    return categories[category] || category;
}

function hideScoreboard() {
    document.getElementById('scoreboard').style.display = 'none';
}