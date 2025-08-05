let index = 0;
iframe = document.getElementById('vimeo-player');
iframe.src = `https://player.vimeo.com/video/${content[0].videoId}?controls=false&loop=false&autoplay=false`;
document.addEventListener('DOMContentLoaded', function () {
    const player = new Vimeo.Player('vimeo-player');
    const playButton = document.getElementById('play-button');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const textToggleButton = document.getElementById('text-toggle-button');
    const textOverlay = document.getElementById("text-overlay")
    const title = document.getElementById('title');
    
    // Initialize mobile text state
    let textVisible = false;
    textOverlay.classList.add('mobile-hidden');

    playButton.addEventListener('click', function() { player.play() });
    player.on('play', function () {
        playButton.classList.add('hidden');
    });
    player.on('loaded', function () {
        textOverlay.innerHTML = `<p>${content[index].dialogue}</p>`;
        textOverlay.scrollTop = 0;
        playButton.classList.remove('hidden');
        if (index > 0) title.classList.add('hidden')
        else title.classList.remove('hidden');
        player.play();
    });
    prevButton.addEventListener('click', function () {
        if (index > 0) {
            index -= 1;
            player.loadVideo(content[index].videoId);
        };
    });
    nextButton.addEventListener('click', function () {
        if (index < content.length - 1) {
            index += 1;
            player.loadVideo(content[index].videoId);
        };
    });
    
    // Text toggle functionality
    textToggleButton.addEventListener('click', function () {
        textVisible = !textVisible;
        if (textVisible) {
            textOverlay.classList.remove('mobile-hidden');
            textToggleButton.innerHTML = '✕';
        } else {
            textOverlay.classList.add('mobile-hidden');
            textToggleButton.innerHTML = '💬';
        }
    });
    
});