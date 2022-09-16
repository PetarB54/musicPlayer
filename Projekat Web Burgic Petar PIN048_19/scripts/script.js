let ddlPerformer = document.getElementById("ddlPerformer");
let ddlAlbum = document.getElementById("ddlAlbum");
let container = document.getElementById('ContainerSongs');
let input = document.getElementById('songInput');
let list = document.getElementById("songList");
let dropSort = document.getElementById('ddlSort');
let total = document.getElementById('totalSongs');
let totalLength = document.getElementById('totalLength');
let rbAZ = document.getElementById('asc');
let rbZA = document.getElementById('desc');
let rb1 = document.querySelector('#sortDiv label:first-of-type');
let rb2 = document.querySelector('#sortDiv label:last-of-type');
let find = document.getElementById('findDiv');
let upBtn = document.getElementById('backOnTop');
let filteredList = [];
let rb = 0;
let degrees = 0;

let query = window.location.search;
let searchParams = new URLSearchParams(query);
let b = 10;
let newURL = window.location.pathname;

document.getElementById('findDiv').addEventListener('click', filterSongs);
document.getElementById('reset').addEventListener('click', resetFields);
document.getElementById('useLastFilter').addEventListener('click', useLastFilters);
dropSort.addEventListener('change', changeLabel);
upBtn.addEventListener('click', backToTop);
list.addEventListener('scroll', scrollFunction);

loadList(song);

let albums = new Set();
for (let i of song) {
    albums.add(i.album);
}
for (let i of albums) {
    let newOption = document.createElement('option');
    newOption.textContent = i;
    ddlAlbum.append(newOption);
}

let performers = new Set();
for (let i of song) {
    performers.add(i.performer);
}
for (let i of performers) {
    let newOption = document.createElement('option');
    newOption.textContent = i;
    ddlPerformer.append(newOption);
}

function changeLabel() {
    rb1.className = "";
    rb2.className = "";
    rbAZ.className = "";
    rbZA.className = "";
    if (dropSort.value === 'Length') {
        rb1.textContent = "From longest";
        rb2.textContent = "From shortest";
    } else {
        rb1.textContent = "A-Z";
        rb2.textContent = "Z-A";
    }
}

function loadList(element) {

    list.innerHTML = '';
    rb = 0;

    let sortedEl = sortSongs(element);

    for (let i of sortedEl) {
        rb++;
        
        let newLi = document.createElement('li'); 
        let newDiv1 = document.createElement('div');
        let newP1 = document.createElement('p');
        newP1.textContent = rb + '.';
        let newImg1 = document.createElement('img');
        newImg1.src = "images/music_logo.PNG";
        let newP2 = document.createElement('p');
        newP2.textContent = i.songName;
        let newP3 = document.createElement('p');
        newP3.textContent = i.performer;
        let newP4 = document.createElement('p');
        newP4.textContent = i.album;
        let newP5 = document.createElement('p');
        let totalS = i.lengthS;
        let seconds = totalS % 60;
        let minutes = (totalS - (totalS % 60)) / 60;
        newP5.textContent = minutes + ":" + addZeroToOneDigitSecond(seconds);
        let newImg2 = document.createElement('img');
        newImg2.src = "images/arrow.PNG";
        let newDiv2 = document.createElement('div');
        newDiv2.textContent = "Genres: " + i.genre;
        newDiv1.append(newP1, newImg1, newP2, newP3, newP4, newP5, newImg2);
        newLi.append(newDiv1);
        newLi.append(newDiv2);
        newLi.className = "Hidden";
        list.append(newLi);
    }

    let start = 0;
    let totalSec = sortedEl.reduce(totalLengthMath, start);
    let hrs = Math.floor(totalSec / 3600);
    totalSec = totalSec % 3600;
    let min = Math.floor(totalSec / 60);
    let sec = totalSec % 60;
    if (hrs > 0) {
        totalLength.textContent = hrs + "h " + min + "min " + addZeroToOneDigitSecond(sec) + "sec";

    } else {
        totalLength.textContent = min + "min " + addZeroToOneDigitSecond(sec) + "sec";
    }

    let arrows = document.querySelectorAll('#songList li img:last-child');
    for (let i of arrows) {
        i.addEventListener('click', function (e) {
            let element = e.target.parentElement.parentElement;
            let ar = e.target;
            if (element.className === 'Hidden') {
                ar.classList.add('Rotate');
                element.classList.remove('Hidden');
                element.style.borderBottomLeftRadius = 0;
                element.style.borderBottomRightRadius = 0;
                element.style.marginBottom = 50 + 'px';
            } else {
                element.classList.add('Hidden');
                ar.classList.remove('Rotate');
                element.style.borderBottomLeftRadius = 15 + 'px';
                element.style.borderBottomRightRadius = 15 + 'px';
                element.style.marginBottom = 20 + 'px';
            }
        });

        let musicLogos = document.querySelectorAll('#songList li img:first-of-type');
        let individualDiv = document.getElementById('individualView');
        for (let i of musicLogos) {
            i.addEventListener('click', function (e) {
                let el = e.target.parentElement;
                let songName = el.children[2].textContent;
                let imgSRC;
                
                if (individualDiv.className === '') {
                    let newDiv = '<div><img src = "images/music_logo.PNG" class = "picIndividual"></img></div>';
                    
                    if(localStorage.getItem(songName)==undefined||JSON.parse(localStorage.getItem(songName))===0){
                        imgSRC = 'heart1';
                    } else if(JSON.parse(localStorage.getItem(songName))===1){
                        imgSRC = 'heart2';
                    }
                    let newPS = '<p id="pp"><nobr>-&nbsp' + songName + ' -</nobr><img src="images/'+ imgSRC +'.jpeg" alt=""></p>';
                    let songSRC = sendBackSRC(songName);
                    let newAudio = '<audio controls autoplay><source src="' + songSRC + '" type=' + '"audio/mpeg"' + '</audio>';
                    let newPP = document.createElement('p');
                    newPP.innerHTML = 'Perfomer:&nbsp <nobr>' + el.children[3].textContent + '</nobr>';
                    let newPA = document.createElement('p');
                    newPA.innerHTML = 'Album:&nbsp <nobr>' + el.children[4].textContent + '</nobr>';
                    let newPG = document.createElement('p');
                    newPG.innerHTML = '<nobr>' + el.nextElementSibling.textContent + '</nobr>';
                    let bt = document.createElement('div');
                    bt.id = "btIndividual";

                    individualDiv.innerHTML += newPS;
                    individualDiv.innerHTML += newDiv;
                    individualDiv.innerHTML += newAudio;
                    individualDiv.append(newPP, newPA, newPG, bt);
                    individualDiv.className = 'individualView';
                    upBtn.style.display = 'none';
                }

                    document.querySelector(".individualView p").addEventListener('click', function(e){
                        if(e.target !== e.currentTarget){
                            if(imgSRC==='heart1'){
                                localStorage.setItem(songName, JSON.stringify(1));
                            } else if(imgSRC === 'heart2'){
                                localStorage.setItem(songName, JSON.stringify(0));
                            }
                            if(JSON.parse(localStorage.getItem(songName))===0){
                                imgSRC = 'heart1';
                            } else if(JSON.parse(localStorage.getItem(songName))===1){
                                imgSRC = 'heart2';
                            }
                            e.currentTarget.innerHTML = '<nobr>-&nbsp' + songName + ' -</nobr><img src="images/'+ imgSRC +'.jpeg" alt="">';
                        }    
                    });
                    
                    for (let i = 0; i <= 4; i++) {
                        container.children[i].style.filter = "blur(4px)";
                        list.removeEventListener('scroll', scrollFunction);
                    }

                    let bt = document.getElementById('btIndividual');
                    bt.addEventListener('click', function () {
                        individualDiv.className = '';
                        individualDiv.innerHTML = '';
                        list.addEventListener('scroll', scrollFunction);
                        upBtn.style.display = 'block';
                        scrollFunction();
                        for (let i = 0; i <= 4; i++) {
                            container.children[i].style.filter = "blur(0px)";
                        }
                    });
                
            });
        }
    }
    total.textContent = rb;

    if (rb === 0) {
        swal({
            title: "There are no songs that match the criteria!",
            text: "Try changing the filter input!",
            icon: "warning",
            button: "OK"
        });
    }
}

function addZeroToOneDigitSecond(i) {
    if (i < 10) {
        return "0" + i;
    } else {
        return i;
    }
}

function totalLengthMath(value, element) {
    if (element.lengthS > 0) {
        return value + element.lengthS;
    } else {
        return value;
    }
}

function resetFields() {
    degrees += 360;
    document.querySelector('#reset div').style = 'transform: rotate(' + degrees + 'deg)';
    ddlAlbum.value = "All albums";
    ddlPerformer.value = "All performers";
    input.value = '';
    dropSort.value = "Sort by";
    rb1.className = "HiddenRb";
    rb2.className = "HiddenRb";
    rbAZ.className = "HiddenRb";
    rbZA.className = "HiddenRb";
    loadList(song);
    newURL = window.location.pathname;
    history.pushState(null, '', newURL);
}

function sendBackSRC(name) {
    for (let i of song) {
        if (i.songName === name) {
            return i.audioSRC;
        }
    }
}

function sortSongs(element){
    if(dropSort.value ==='Sort by'){
        return element;
    }
    if (dropSort.value === 'Song name') {
        element.sort((x,y)=>{
            if (x.songName > y.songName) {
                return 1;
            }
            else if (x.songName < y.songName) {
                return -1;
            }
            else {
                return 0;
            }
        });
        rbAZ.checked ? element : element.reverse();
    } else if (dropSort.value === 'Length') {
        element.sort((x,y)=>{
            if (x.lengthS < y.lengthS) {
                return 1;
            }
            else if (x.lengthS > y.lengthS) {
                return -1;
            }
            else {
                return 0;
            }
        });
        rbAZ.checked ? element : element.reverse();
    } else if (dropSort.value === 'Album') {
        element.sort((x,y)=>{
            if (x.album > y.album) {
                return 1;
            }
            else if (x.album < y.album) {
                return -1;
            }
            else {
                return 0;
            }
        });
        rbAZ.checked ? element : element.reverse();
    } else if (dropSort.value === 'Performer') {
        element.sort((x,y)=>{
            if (x.performer > y.performer) {
                return 1;
            }
            else if (x.performer < y.performer) {
                return -1;
            }
            else {
                return 0;
            }
        });
        rbAZ.checked ? element : element.reverse();
    }
    return element;
}

function filterSongs() {
    filteredList = [];
    for (let i of song) {
        if (albumFilter(i) && performerFilter(i) && songNameFilter(i)) {
            filteredList.push(i);
        }
    }
    if (input.value !== '' || ddlAlbum.value !== 'All albums' || ddlPerformer.value !== 'All performers') {
        localStorage.setItem('lastName', (songInput.value));
        localStorage.setItem('lastPerformer', (ddlPerformer.value));
        localStorage.setItem('lastAlbum', (ddlAlbum.value));
    }

    newURL = window.location.pathname + '?';
    searchParams.set('Album', ddlAlbum.value);
    searchParams.set('Name', input.value);
    searchParams.set('Performer', ddlPerformer.value);

    for (let key of searchParams.keys()) {
        newURL += `${key}=` + `${searchParams.get(key)}&`;
    }
    if (input.value !== '' || ddlAlbum.value !== 'All albums' || ddlPerformer.value !== 'All performers') {
        history.pushState(null, '', newURL);   
    } else{
        history.pushState(null, '', window.location.pathname);
    }

    loadList(filteredList);
}

if (window.location.search !== '') {
    ddlAlbum.value = searchParams.get('Album');
    ddlPerformer.value = searchParams.get('Performer');
    input.value = searchParams.get('Name');
    filterSongs();
}

function albumFilter(element) {
    if (ddlAlbum.value === 'All albums') {
        return true;
    } else {
        if (element.album === ddlAlbum.value) {
            return true;
        } else {
            return false;
        }
    }
}

function performerFilter(element) {
    if (ddlPerformer.value === 'All performers') {
        return true;
    } else {
        if (element.performer === ddlPerformer.value) {
            return true;
        }
        else {
            return false;
        }
    }
}

function songNameFilter(element) {
    if (element.songName.toUpperCase().includes(songInput.value.toUpperCase())) {
        return true;
    }
    else {
        return false;
    }
}

function useLastFilters() {
    songInput.value = localStorage.getItem('lastName');
    ddlPerformer.value = localStorage.getItem('lastPerformer');
    ddlAlbum.value = localStorage.getItem('lastAlbum');

    filterSongs();
}

function scrollFunction(){
    if(list.scrollTop>50){
        upBtn.style.display = 'block';
    } else{
        upBtn.style.display = 'none';
    }
}

function backToTop(){
    list.scrollTo({top: 0, behavior: 'smooth'});
}

input.addEventListener('keypress', function(e){
    if(e.key==='Enter'){
        filterSongs();
    }
});