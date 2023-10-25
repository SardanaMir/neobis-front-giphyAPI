document.addEventListener('DOMContentLoaded', ()=>{

    function init(){
        event.preventDefault();
        let input = document.getElementById('search');
        //отправка запроса
        const promise_1 = new Promise((resolve) =>{
            fetch(`${URL}${APIKEY}&q=${input.value.trim()}&limit=25`)
            .then(data => resolve(data.json()))
            .catch(error => console.log(error))
        })
        //удаление существующих гифок со страницы
        let gifClasses = document.querySelectorAll('.gif');
        console.log(gifClasses)
        for (let i = 0; i < gifClasses.length; i++){
            gifClasses[i].remove()
        }
        //очищение поиска
        input.value = '';
        // вывод гифок на страницу
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
