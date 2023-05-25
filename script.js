const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


//music 

const songs = [

    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Adi Shar',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army()Remix',
        artist: 'Adi Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight Disco Queen',
        artist: 'Adi Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row',
        artist: 'Adi Design',
    }
]
// check if playing
let isPlaying = false;


// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');// change playbutton to pause button
    playBtn.setAttribute('title', 'Pause')// change title
    music.play();
}


//pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')// change pausebutton to play button
    playBtn.setAttribute('title', 'Play')// change title


    music.pause();
}

// Play or pause eventlistener

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))



// Update DOM 


function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}



//current song
let songIndex = 0;


//Prev song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();

}

//Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}




// onLoad - Select first song
loadSong(songs[songIndex]);

// update progress bar & time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // update progress bar with
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // calculate display for duration
        const durationsMinut = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        // Delya switching duration Element to avoid NAN 
        if (durationSeconds) {
            durationEl.textContent = `${durationsMinut}:${durationSeconds}`
        }

        // calculate display for duration
        const currentMinut = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinut}:${currentSeconds}`
    }
}


function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;


}

// add eventlistener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar)