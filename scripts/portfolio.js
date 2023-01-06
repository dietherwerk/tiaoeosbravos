(function($) {
      "use strict";

      $(window).load(function(){

           
           /* FILTER
           ======================*/
           $('.portfolio-filter div ul li').click(function(){

                   var animation_speed = 300; //in milliseconds
                   var parent_element = $(this).closest('.portfolio-filter');
                   var item_container = $(parent_element).next('div.portfolio-items');
                   var category = $(this).attr('data-filter');
                   var all_elements = 'ul li';
                   var inactive_elements = 'ul li[data-category!=' + category + ']';
                   var active_elements = 'ul li[data-category=' + category + ']';

                   if ( category == 'all' ) {  $(item_container).find(all_elements).stop().animate({opacity:1},animation_speed ); }
                   if ( category != 'all' ) {

                         //$(parent_element).next('div.portfolio-items').css( "background", "yellow" );
                         $(item_container).find(inactive_elements).stop().animate({opacity:0.4},animation_speed );
                         $(item_container).find(active_elements).stop().animate({opacity:1},animation_speed );
                   }

           }); //End: click();


           /* LOAD AND SHOW ITEMS
           ======================*/
           $('.portfolio-items ul li .item-title a.load-item').click(function(){
                     var source = $(this).attr("href");
                     $('html').css("overflow","hidden");
                     $('body').append('<div id="portfolioitem-holder"><div id="portfolio-loader" class="animated flash">Loading the item...</div></div>');
                     setTimeout(function(){
                     $('#portfolioitem-holder').load(source,function(){
                               
                               //Call the slider if the elment exist
                               if ( $('#portfolio-slider').length != 0 ) {
                                         $('#portfolio-slider').flexslider({controlNav: true, directionNav: false});
                               }
                               
                               //Adjust video height if the video element exist
                               if ( $('#portfolio-video').length != 0 ) { 
                                         $('#portfolio-video').fitVids();
                               }
                               
                               //Call swibox
                               $('a.swipebox').swipebox();
      
                               //Fade out the loader
                               $('#portfolio-loader').fadeOut(400,function(){
                                         $('#portfolio-loader').remove();
                               });
                               
                               //Fade in the item
                               $('#portfolio-item').fadeIn(1000);
                               
                               //Close the item
                               $('.portfolio-close a').click(function(){
                                         $('#portfolioitem-holder').empty();
                                         $('#portfolioitem-holder').fadeOut(2,function(){
                                                             $('#portfolioitem-holder').remove();
                                                             $('html').removeAttr('style');
                                         });
                               return false;
                               });
                     });
                     }, 3000);
      
           return false;
           });
      
      });

})(jQuery);