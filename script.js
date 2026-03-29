let currentAudio = null;

function playSong(file,title){
    if(currentAudio) currentAudio.pause();
    const audio = new Audio("songs/"+file);
    audio.play();
    currentAudio = audio;
    const now = document.getElementById("nowPlaying");
    if(now) now.innerText = "🎵 " + title;
}

const stopBtn = document.getElementById("stopBtn");
if(stopBtn) stopBtn.onclick = ()=>{ if(currentAudio) currentAudio.pause(); }

// صفحة الأغاني
const container = document.getElementById("songsContainer");
if(container && typeof songs!=="undefined"){
    songs.forEach(song=>{
        const card = document.createElement("div");
        card.className="song-card";
        card.innerHTML=`
            <img src="images/${song.img}" alt="${song.title}">
            <h3>${song.title}</h3>
            <button class="play-btn">▶ تشغيل</button>
            <button onclick="saveSong('${song.title}')">❤️</button>
        `;
        const btn = card.querySelector(".play-btn");
        btn.onclick = ()=>playSong(song.file,song.title);
        container.appendChild(card);
    });

    // البحث
    document.getElementById("search").addEventListener("input",function(){
        let value=this.value.toLowerCase();
        document.querySelectorAll(".song-card").forEach(card=>{
            card.style.display = card.innerText.toLowerCase().includes(value)?"block":"none";
        });
    });
}

// حفظ الأغاني
function saveSong(title){
    let fav=JSON.parse(localStorage.getItem("fav"))||[];
    if(!fav.includes(title)) fav.push(title);
    localStorage.setItem("fav",JSON.stringify(fav));
    alert("تم حفظ الأغنية ❤️");
}

// الألبومات تفتح صفحة الأغنية
function playSongPage(file,title,img){
    localStorage.setItem("currentSong",JSON.stringify({title,file,img}));
    window.location.href="songPage.html";
}