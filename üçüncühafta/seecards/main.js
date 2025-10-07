// Mevcut JavaScript Kodunuz (main.js olarak kaydedin)
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    // İlk öğeyi alıp listenin sonuna ekler (ileri kaydırır)
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    // Son öğeyi alıp listenin başına ekler (geri kaydırır)
    document.querySelector('.slide').prepend(items[items.length-1]) 
})