(function($) {
  'use strict';

  $('.specifications').productsTable({
    attributes: {
      'class': 'adaptive'
    }
  });

var overlay = $('#overlay');
var open_modal = $('.open_modal');
var close = $('.modal_close, #overlay');
var modal = $('.modal_div');
open_modal.click( function(){
 var div = $(this).data('href');
 var modalTitle = $(this).attr('data-modal-title');
 var modalEmailTitle = $(this).attr('data-modal-email-title');

 if(modalTitle!=undefined){
  $(div).find('span.title').html(modalTitle);
 }

 if(modalTitle!=undefined){
  $(div).find('form input[name=mailtitle]').attr('value',modalEmailTitle);
 }

 overlay.fadeIn(400,
   function(){
     $(div)
     .css('display', 'block').css('z-index', '1000')
     .animate({opacity: 1, top: '50%'}, 200);
   });
});
close.click( function(){
  modal
  .animate({opacity: 0, top: '45%'}, 200,
   function(){
     $(this).css('display', 'none').css('z-index', '0');
     overlay.fadeOut(400);
   });

   modal.find('form').html('<span>* Введите Ваше имя:</span>\
      <input type="text" name="name"/>\
      <span>* Телефон:</span>\
      <input type="text"  name="phone"/>\
      <span>* E-mail:</span>\
      <input type="email" name="email" />\
      <input type="hidden" name="mailtitle" />\
      <input type="hidden" name="adminemail" value="rgakotel@gmail.co"/>\
      <input type="submit" class="button" onclick="sendform(); return false;" />');


});

var owlMain = $('.owl').owlCarousel({
  margin:10,
  smartSpeed: 600,
  // autoplay: true,
  autoplayTimeout: 10000,
  dots: false,
  autoplayHoverPause: true,
  autoHeight:false,
  items: 1
});
$('.next').click(function() {
  owlMain.trigger('next.owl.carousel');
});
$('.prev').click(function() {
  owlMain.trigger('prev.owl.carousel');
});

$('.gallery1 a').lightbox();
})(jQuery);

function sendform(){
  var data = $('#modal form').serialize();
    $.ajax({
        url: 'sendmail.php',
        type: "POST",
        data: data,
        async: false,
        success: function (data) { // вешаем свой обработчик на функцию success
          $('#modal form').html(data);
        }
    });
}
