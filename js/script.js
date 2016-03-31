(function($) {
'use strict';

var overlay = $('#overlay');
var open_modal = $('.open_modal');
var close = $('.modal_close, #overlay');
var modal = $('.modal_div');
open_modal.click( function(){
 var div = $(this).data('href');
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
   }
   );
});

var owlMain = $('.owl').owlCarousel({
  loop:true,
  margin:10,

  slideSpeed : 300,
  paginationSpeed : 400,
  singleItem : true,
  items : 1,
  itemsDesktop : false,
  itemsDesktopSmall : false,
  itemsTablet: false,
  itemsMobile : false,
});
$('.next').click(function() {
  owlMain.trigger('next.owl.carousel');
})
$('.prev').click(function() {
  owlMain.trigger('prev.owl.carousel');
});
})(jQuery);
