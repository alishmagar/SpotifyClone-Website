//Initalize the Variable
let songIndex;
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItem = Array.from(document.getElementsByClassName("songItem"))
let masterSongName = document.getElementById('masterSongName')
let pausedTime;

let songs = [
    { songName: 'Anne-Marie 2002', filePath: 'songs/1.mp3', coverPath: "covers/1.jpg" },
    { songName: 'ED Sheeran Sape of You ', filePath: 'songs/2.mp3', coverPath: "covers/2.jpg" },
    { songName: 'Wiz Khalifa SEE YOU AGAIN', filePath: 'songs/3.mp3', coverPath: "covers/3.jpg" },
    { songName: 'Ruth_B Dandelious', filePath: 'songs/4.mp3', coverPath: "covers/4.jpg" },
    { songName: 'Sia Unstoppable', filePath: 'songs/5.mp3', coverPath: "covers/5.jpg" },
    { songName: 'Middle Of The Night', filePath: 'songs/6.mp3', coverPath: "covers/6.jpg" },
    { songName: '5_55 Aag ko gilko', filePath: 'songs/7.mp3', coverPath: "covers/7.jpg" },
    { songName: 'Doja_cat Been_like_This', filePath: 'songs/8.mp3', coverPath: "covers/8.jpg" },
    { songName: 'Love me Like you Do', filePath: 'songs/9.mp3', coverPath: "covers/9.jpg" },
    { songName: 'Heat Waves', filePath: 'songs/10.mp3', coverPath: "covers/10.jpg" }
]

// In forEach loop we not need to increment the value like i++ it will automatically go to next after the first.
// element = current element of the array 
// i = index of the array but here i is used in songs array to iterate its index not in songItem 
songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    // Run when the song is paused or not played
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        masterPlay.setAttribute('name', 'pause-circle')
        gif.style.opacity = 1

    }
    // If song is playing then this will run and stop the song
    else {
        audioElement.pause();
        masterPlay.setAttribute('name', 'play-circle')
        gif.style.opacity = 0
    }
})


// set progressbar according to audio currentTime that is audio play
audioElement.addEventListener('timeupdate', () => {
    //Finding the percent of how much audio played  with simple math
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress  // set that percent to progress bar
})

//Changing the audio currenttime if progress bar change 
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100
})


// ------------This code is for Listed songs play/pause icon---------------------------------------------->>

// This code change the play and pause icon of the listed song
//This function change all the name of the songPlay class to play-circle which is play icon
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.setAttribute('name', 'play-circle')
    })
}
//This code convert the songPlay class element into array and when any array with name songPlay is clicked then makeAllPlay() function run and as we know this function will change all array name to play-circle and then atlast the array or element which is clicked its name is changed to pause-circle
let isPlaying = false;

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.setAttribute('name', 'pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1
        masterPlay.setAttribute('name', 'pause-circle')
        masterSongName.innerText = songs[songIndex].songName
    })
})
// --------------------------------------------------------------------------->>



// This code  will play the next song when the next button is clicked 
// It take current song playing index from the upper code which is (songIndex = parseInt(e.target.id)) which will help it to go to next song by adding 1 in current playing songIndex

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {// if total song is 10 and the playing song is the last then when user clicked the next button set index=0 which is first song
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    let nextSongIcon = document.getElementById(songIndex)
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName  //Set the bottom song name according to the playing song name 
    audioElement.currentTime = 0;                       //set range bar to the zero when next song play
    audioElement.play();
    makeAllPlay()                                       // This function will make all the list song to the play icon which mean not playing
    nextSongIcon.setAttribute('name', 'pause-circle');   // change the next played song icon from the plat to pause which mean is playing
    masterPlay.setAttribute('name', 'pause-circle')      //Change the bottom icon to the pause which mean is playing 
})


// This code will play the previous song if previous button clicked this is also work same as the upper next button but it will  substract 1 from the current playing songIndex to go to previous index
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    let nextSongIcon = document.getElementById(songIndex)
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlay()    
    nextSongIcon.setAttribute('name', 'pause-circle'); 
    masterPlay.setAttribute('name', 'pause-circle')
})