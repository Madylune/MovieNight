const API_URL = 'https://api.themoviedb.org/3/movie/'
const API_KEY = 'def5c8263140ffdaf14ef31e37ce7f21'

const popular = `${API_URL}popular?page=1&language=fr&api_key=${API_KEY}`
const topRated = `${API_URL}top_rated?page=1&language=fr&api_key=${API_KEY}`
const upComing = `${API_URL}upcoming?page=1&language=fr&api_key=${API_KEY}`
const nowPlaying = `${API_URL}now_playing?page=1&language=fr&api_key=${API_KEY}`

$.ajax(popular).done(function (response) {
    const films = response.results
    films.forEach(film => {
        let li = document.createElement('li')
        let filmContainer = document.createElement('div')

        filmContainer.classList.add('film-container')
        li.appendChild(filmContainer)

        let img = document.createElement('img')
        img.setAttribute('src', `https://image.tmdb.org/t/p/w500${film.poster_path}`)
        filmContainer.appendChild(img)

        let h3 = document.createElement('h3')
        h3.append(film.title)
        filmContainer.append(h3)

        let p = document.createElement('p')
        p.append(film.overview)
        filmContainer.appendChild(p)

        const video = function showVideo() {
            fetch(`${API_URL}${film.id}/videos?language=fr&api_key=${API_KEY}`)
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                const results = data.results
                let video = document.createElement('iframe')
                video.setAttribute('src', `https://www.youtube.com/embed/${results[0].key}`)
                video.setAttribute('width', 450)
                video.setAttribute('height', 300)
                document.querySelector('#Trailer').append(video)
            })
        
        }
        video()

        document.querySelector('#popular-list').appendChild(li)
    })
})

$.ajax(topRated).done(function (response) {
    const films = response.results
    films.forEach(film => {
        let li = document.createElement('li')
        let filmContainer = document.createElement('div')

        filmContainer.classList.add('film-container')
        li.appendChild(filmContainer)

        let img = document.createElement('img')
        img.setAttribute('src', `https://image.tmdb.org/t/p/w500${film.poster_path}`)
        filmContainer.appendChild(img)

        let h3 = document.createElement('h3')
        h3.append(film.title)
        filmContainer.append(h3)

        let p = document.createElement('p')
        p.append(film.overview)
        filmContainer.appendChild(p)

        let voteWrapper = document.createElement('div')
        voteWrapper.classList.add('vote-wrapper')
        voteWrapper.append(`${film.vote_average}/10`)
        filmContainer.appendChild(voteWrapper)

        document.querySelector('#toprated-list').appendChild(li)
    })
})

$.ajax(upComing).done(function (response) {
    const films = response.results
    films.forEach(film => {
        let li = document.createElement('li')
        let filmContainer = document.createElement('div')

        filmContainer.classList.add('film-container')
        li.appendChild(filmContainer)

        let img = document.createElement('img')
        img.setAttribute('src', `https://image.tmdb.org/t/p/w500${film.poster_path}`)
        filmContainer.appendChild(img)

        let h3 = document.createElement('h3')
        h3.append(film.title)
        filmContainer.append(h3)

        let span = document.createElement('span')
        span.innerHTML = `${film.release_date} <br>`
        filmContainer.appendChild(span)

        let p = document.createElement('p')
        p.append(film.overview)
        filmContainer.appendChild(p)

        document.querySelector('#upcoming-list').appendChild(li)
    })
})

$.ajax(nowPlaying).done(function (response) {
    const films = response.results
    films.forEach(film => {
        let li = document.createElement('li')
        let filmContainer = document.createElement('div')

        filmContainer.classList.add('film-container')
        li.appendChild(filmContainer)

        let img = document.createElement('img')
        img.setAttribute('src', `https://image.tmdb.org/t/p/w500${film.poster_path}`)
        filmContainer.appendChild(img)

        let h3 = document.createElement('h3')
        h3.append(film.title)
        filmContainer.append(h3)

        let p = document.createElement('p')
        p.append(film.overview)
        filmContainer.appendChild(p)

        document.querySelector('#nowplaying-list').appendChild(li)

        let picture = document.createElement('li')
        picture.append(img)
        document.querySelector('#enSalleList').appendChild(picture)
    })
})

function toggleTab(event, screenName) {
    const screens = document.querySelectorAll('.screen');
    //Hide all screens
    screens.forEach(screen => screen.style.display = 'none');
    //Manage active class
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.className = tab.className.replace(' active', ''));

    document.getElementById(screenName).style.display = 'block';
    event.currentTarget.className += ' active';
}

$('.navbar-toggler').click(function() {
    $('#navbarNav').toggle()
})

function searchMovie() {
    const search = document.querySelector('#searchBar')
    let filter = search.value.toUpperCase()
    const lists = document.querySelectorAll('.movies-list')
    lists.forEach(list => {
        const movie = list.getElementsByTagName('li')
        for (let i = 0; i < movie.length; i++) {
            let movieTitle = movie[i].getElementsByTagName('h3')[0]
            if (movieTitle.innerHTML.toUpperCase().indexOf(filter) != -1) {
                movie[i].style.display = ''
            } else {
                movie[i].style.display = 'none'
            }
        }
    })
}