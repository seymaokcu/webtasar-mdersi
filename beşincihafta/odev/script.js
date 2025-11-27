$(document).ready(function() {

    $('.dot').on('click', function() {
        var newImage = $(this).data('img');
        
        $('.dot').removeClass('active');
        $(this).addClass('active');
        $('#slider-img').attr('src', newImage);
    });
    var intervalTime = 5000; 
    var sliderInterval = setInterval(nextSlide, intervalTime);

    function nextSlide() {
        var $activeDot = $('.dot.active');
        var $nextDot = $activeDot.next('.dot').length ? $activeDot.next('.dot') : $('.dot:first');
        
        $nextDot.trigger('click');
    }
});