(function($) {
      "use strict";
      
        $(function() {
        
             //Set the variables
             var mainMenu = '#navigation';
             var mobileMenu = '#navigation nav';
             var selectMenu = 'select.mobile_nav';

             //Append the .mobile_menu into the container
             $(mainMenu).append('<div class="mobile_menu"></div><div class="mobile-menu-label">Menu</div><select class="mobile_nav"></select>');


             $(mainMenu).children('nav').children('a').each(function() {

                       var href = $(this).attr('href');
                       var text = $(this).text();

                       $(selectMenu).append('<option value="'+href+'">'+text+'</option>');

             });


             $('select.mobile_nav').change(function(){
                       
                       var target_location = this.options[this.selectedIndex].value;
                       
                       if (target_location.substring(0, 1) == "#") {
                                 $('html,body').stop().animate({scrollTop: $("div"+target_location).offset().top -100},'slow');
                       } 
                       else { location = target_location; }

             return false;
             });

        });

})($);