var videos;

function renderHomepage(searchWord) {
    if (!searchWord) searchWord = 'ymca';
    // console.log(searchWord);
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyARM8zsJGqgo4Jwfcf4rmVN3KRtJzCMXLg&q=${searchWord}`)
        .then(function (res) {
            // console.log(res.data.items[0].snippet.title);
            // console.log(res.data.items[0].snippet.thumbnails.high.url);
            videos = res.data.items.map(video => {
                return getVideoTemplet(video.id.videoId, video.snippet.title, video.snippet.thumbnails.high.url);
            });
            // console.log(videos);
            renderVideos(videos);
            document.querySelector('.videosContainer').classList.remove('playVideoDisplay');
        });
};


function getVideoTemplet(videoId, videoTitle, videoImg) {
    var strHtml = `
    <div class="video" onclick="playVideo('${videoId}','${videoTitle}')">
    <img src="${videoImg}">
    <h4>${videoTitle}</h4>
    </div>
    `
    // <iframe width="300" height="200" src="https://www.youtube.com/embed/${videoId}">
    // </iframe>=

    return strHtml;
}

function renderVideos(videos) {
    var strHtml = '';

    videos.forEach(video => {
        strHtml += video;
    });
    document.querySelector('.videosContainer').innerHTML = strHtml;
}

function renderVideosList(videos) {
    var strHtml = '';
    videos.forEach(video => {
        strHtml += video;
    });
    return strHtml;
}

function playVideo(videoId, videoTitle) {
    document.querySelector('.videosContainer').innerHTML = `
    <div class="videoList">
   
    </div>

    <div class="mainVideo">
    <iframe width="500" height="300" src="https://www.youtube.com/embed/${videoId}">
    </iframe>
    <h4>${videoTitle}</h4>

    <p class="info">
    </p>
    </div>
    `
    // document.querySelector('.info').innerText = getInfo(videoTitle);
    document.querySelector('.videoList').innerHTML = renderVideosList(videos);  
    document.querySelector('.videosContainer').classList.add('playVideoDisplay');

    console.log('hi')
}

// function homepage() {
//     videos.forEach(video => {
//         document.querySelector('.videosContainer').innerHTML = renderVideosList(videos);
//     });

//     document.querySelector('.videosContainer').classList.remove('playVideoDisplay');
// }

function search(){
    var searchWord = document.querySelector('input').value;
    renderHomepage(searchWord);
}

function getInfo(searchWord) {
    searchWord = searchWord.replace(/\s/g, "&");
    console.log(searchWord);
    var strHtml = '';
    axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${searchWord}&limit=5`)
    .then(function (res) {
        console.log(res.data);
        res.data.forEach(info => strHtml+=info[0]);
        return strHtml;
    });
};