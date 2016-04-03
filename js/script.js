(function($) {
'use strict';

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

  items : 1,
});
$('.next').click(function() {
  owlMain.trigger('next.owl.carousel');
})
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



function responsTables(tables){

  var tableArr=new Array();
  var elem_str='';

    // Сохранение значений в массив
    tables.find('tr').each(function(index, elem){

      $(this).find('td,th').each(function(index_td, elem_td){

        if(index==0){
          tableArr[index_td]=new Array();
        }

        //tableArr[index_td][index]=elem_td.innerText;
        tableArr[index_td][index]=$(this).html();
        // console.log($(this).html());
      });
    });

    // Перебор масива и создание новых объектов
    var strtable='';
    $.each(tableArr, function( index, elem ) {
      if(index>0){
        $.each(tableArr[index], function( index_td, elem_td ) {
          if(index_td>0){
            strtable=strtable+'<tr>'+'<td>'+tableArr[0][index_td]+'</td><td>'+elem_td+'</td></tr>';
            if( typeof tableArr[index][index_td+1] == "undefined" ){strtable=strtable+'</tbody></table>'}
          }else{
            strtable=strtable+'<table width="100%" class="adaptive"><thead><tr><th colspan="2">'+elem_td+'</th></tr></thead><tbody>';
          }

        });
      }
    });

    tables.addClass('hide_table');
    tables.parent().append(strtable);
  }

  if($(window).width()<=980){ $('#responsiveTabs table, #table1 table').each(function(elem){ responsTables($(this)); }); }

  // $( window ).resize(function() {
  //   if($(window).width()<=980){
  //     $('#responsiveTabs table, #asd table').each(function(i, e){
  //       responsTables($(this));
  //     });

  //   }else{
  //     $('#responsiveTabs table.adaptive, #asd table.adaptive').remove();
  //     $('#responsiveTabs table.hide_table, #asd table.hide_table').removeClass('hide_table');
  //   }
  //   //console.log($(window).width());
  // });
