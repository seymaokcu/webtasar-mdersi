// Sayfadaki tüm kaynaklar yüklendiğinde çalışır
window.addEventListener('load', function() {
    
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    
    // 1. Preloader'a "fade-out" sınıfını ekleyerek kaybolma animasyonunu başlat
    preloader.classList.add('fade-out');
    
    // 2. Ana içeriği göster
    // 'hidden' sınıfını kaldırıyoruz. CSS'deki 'transition' sayesinde bu da yumuşakça görünür.
    content.classList.remove('hidden'); 
    
    // NOT: Preloader'ın tamamen kaybolmasını garanti etmek için,
    // "transitionend" olayını da dinleyebilirsiniz, ancak '.fade-out' 
    // sınıfı zaten visibility: hidden; yaptığı için bu çoğu durumda yeterlidir.
    
    /*
    // OPTIONEL: Eğer preloader'ın DOM'dan tamamen kalkmasını istiyorsanız:
    preloader.addEventListener('transitionend', function() {
        preloader.remove(); // Preloader elementini tamamen siler
    }, { once: true });
    */
});