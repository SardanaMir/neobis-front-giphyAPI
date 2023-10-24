document.addEventListener('DOMContentLoaded', ()=>{
    const URL = "https://api.giphy.com/v1/gifs/search?api_key=";
    const APIKEY = "YIsjFowb5cokIEmiQ9t4LaIkjZt43SCn";

    function init(){
        event.preventDefault();
        let input = document.getElementById('search').value.trim();
        const promise_1 = new Promise((resolve) =>{
            fetch(`${URL}${APIKEY}&q=${input}&limit=25`)
            .then(data => resolve(data.json()))
            .catch(error => console.log(error))
        })

        let gifClasses = document.querySelectorAll('.gif');
        console.log(gifClasses)
        for (let i = 0; i < gifClasses.length; i++){
            gifClasses[i].remove()
        }

        Promise.all([promise_1]).then(data => {
            let gifsCollection = data[0].data;
            let out = document.querySelector('.out')
            for (let i = 0; i < gifsCollection.length; i++){
                let gifUrl = data[0].data[i].images.downsized.url;
                let newGif = document.createElement('img');
                newGif.src = gifUrl; 
                newGif.alt = data[0].data[i].title;
                newGif.classList.add('gif')
                out.append(newGif)
            }
        })
    }
    document.querySelector('.btn-search').addEventListener('click', init)
})
