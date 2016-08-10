window.addEventListener('load', function () {
    // var welcomeBtn = document.createElement('button');
    // welcomeBtn.innerHTML = 'Start game';
    // welcomeBtn.className = 'welcome-btn';
    // var controlsContainer = document.querySelector('.controls');
    //controlsContainer.appendChild(welcomeBtn);

    game.state.start('init');

    // welcomeBtn.addEventListener('click', function () {
    //     document.body.classList.add('game-started');
    //
    //     game.state.start('intro');
    // });
});