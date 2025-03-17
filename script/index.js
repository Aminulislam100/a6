function loadLessonName() {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((data) => 
            data.data.forEach(level => displayLessonName(level.lessonName, level.id, level.level_no))
        );
}

function displayLessonName(lessonName, id, level) {
    const lessonContainer = document.getElementById('lesson-container');


    

    const lessonNameDiv = document.createElement('div');
    lessonNameDiv.innerHTML = `
        <button onclick="loadLessonCards(${level}), vanish()" class="btn btn-sm text-blue-900 border-blue-900 hover:border-white focus:border-white hover:text-white focus:text-white hover:bg-blue-900 focus:bg-blue-900">
            <img src="assets/fa-book-open.png" alt=""> ${lessonName}
        </button>
    `;
 

    lessonContainer.append(lessonNameDiv);
    

}

const loadLessonCards = (id) => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    console.log(url);

    if(url === (`https://openapi.programming-hero.com/api/level/4`) || url === (`https://openapi.programming-hero.com/api/level/7`)){
        const lessonContainer = document.getElementById('cards-container');

    const lessonNameDiv = document.createElement('div');
    lessonNameDiv.innerHTML = `
        <div class="w-270 text-center mx-auto">
        <img class="w-50 mx-auto" src="./assets/alert-error.png">
        <p class="text-xs text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <p class="text-3xl font-bold">নেক্সট Lesson এ যান</p>
        </div>
    `;
    lessonContainer.append(lessonNameDiv);
    }

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (Array.isArray(data.data) && data.data.length > 0) {
                data.data.forEach(word => {
                    displayCards(word.word, word.meaning, word.pronunciation, word.id);
                });
            }
        })
};







function displayCards(word, meaning, pronunciation, id, sentence) {
    

    

    const lessonContainer = document.getElementById('cards-container');

    const lessonNameDiv = document.createElement('div');
    lessonNameDiv.innerHTML = `
        <div class="hover:bg-sky-50 w-80 mx-auto rounded-xl h-60 text-center bg-white pt-5">
            <h1 class="text-3xl font-bold mb-2">${word}</h1>
            <p class="text-lg mb-2">Meaning / Pronunciation</p>
            <p class="text-2xl">"${meaning} / ${pronunciation}"</p>
            <div class="flex justify-between mt-11 mx-4">
                <button class="btn bg-slate-200" onclick="openModal('${word}', '${meaning}', '${pronunciation}', '${sentence}')">
                    <img class="w-5" src="assets/rounded-info-button.png" alt="">
                </button>

                <button class="btn bg-slate-200">
                    <img class="w-5" src="assets/speaker-filled-audio-tool.png" alt="">
                </button>
            </div>
        </div>
    `;
    lessonContainer.append(lessonNameDiv);
}

function openModal(word, meaning, pronunciation) {
    





    const modal = document.createElement('dialog');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-box">
            <h3 class="text-2xl font-bold">${word} (${pronunciation})</h3>
            <p class="text-lg font-semibold mt-5 mb-2">Meaning</p>
            <p class="mb-5">${meaning}</p>
            <h3 class="text-lg font-semibold mb-2">Example</h3>
            <p id="sentence" class="mb-5">The kids were eager to open their gifts.</p>
            <h1 class="mb-2">সমার্থক শব্দ গুলো</h1>
            <button class="btn bg-sky-100 mb-5">enthusiastic</button>
            <button class="btn bg-sky-100 mb-5">excited</button>
            <button class="btn bg-sky-100 mb-5">keen</button>
            <form method="dialog">
                <button class="btn btn-primary text-white">Complete learning</button>
            </form>
        </div>
    `

    document.body.appendChild(modal);
    modal.showModal();

    modal.querySelector('form').addEventListener('submit', () => {
        modal.close();
        document.body.removeChild(modal);
    });
}

function vanish() {
    const vanish = document.getElementById("lesson-sellect");
    vanish.style.display = 'none';
    const vanishh = document.getElementById("cards-container");
    vanishh.style.display = 'grid';
}

loadLessonName();