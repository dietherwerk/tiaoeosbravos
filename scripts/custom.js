(function($) {
      "use strict";

      var window_height = $(window).height();
      var window_width = $(window).width();

      /* document.ready()
      ==================*/
      $(document).ready(function(){

                /*  PRELOADER
                ================================================*/
                var preloader = '#retrograd-preloader';
                var percentage = 0;
                var array_of_images = $('img').toArray();
                var number_of_images = array_of_images.length;
                var one_step = 100 / number_of_images;
                var one_step = one_step.toFixed(2);
                var one_step = parseFloat(one_step);
                if ( $(preloader).length != 0 ) {
                          $(preloader).append('<h1>0</h1>');
                          var imgLoad = imagesLoaded( 'body' );
                          //Change percentage after each image has been loaded
                          imagesLoaded('body').on( 'progress', function( instance, image ) {
                                percentage = percentage + one_step;
                                percentage = percentage.toFixed(0);
                                percentage = parseFloat(percentage);
                                $('#retrograd-preloader h1').text(percentage);

                          });
                }
                
                /* INIT ENTRANCE ANIMATIONS
                ================================================*/
                if ( window_width > 700 ) { new ENTRANCE().init(); }


                /* PARALLAX & VIDEO BACKGROUND
                ================================================*/
                /* Parallax Home */
                if ( $('#home-parallax').length != 0 ) { 
                          if ( window_width >= 700 & window_height >= 700 ) {
                                  $('#home-parallax').css('min-height',window_height);
                                  var homeElementsHeight = $('#home-parallax .home-elements').height();
                                  $('#home-parallax .home-elements').css({'height':homeElementsHeight,'top':'0','left':'0','bottom':'0','right':'0'});
                          }

                }


                /* YouTube Home */
                if ( $('.video_bg').length != 0 ) {
                     if ( window_width >= 960 && navigator.userAgent.indexOf('iPad') == -1 ) {
                         var video_url = $('.video_bg').attr("data-video");
                         var start_at = $('.video_bg').attr("data-start");
    	                 $('.video_bg').tubular({
                                  videoId: video_url,
                                  start: start_at
                         });
                     }
                     //Use image background for mobiles and tablets
                     if ( window_width < 960 ) {
                         var background_url = $('.video_bg').attr("data-alt");
                         $('.video_bg').backstretch(background_url);
                     }
                }

                /* NAVIGATION
                ================================================*/
                $('a.scroll').on('click', function(e) {
                     e.preventDefault();
                     var id = $(this).attr("href");
                     $('html,body').stop().animate({scrollTop: $("div"+id).offset().top -120},'slow', function(){
                               if ( navigator.userAgent.indexOf('iPad') != -1 ) {
                                         var yPos = window.pageYOffset;
                                         var jQueryfixedElement = jQuery('#top-bar');
                                         jQueryfixedElement.css({ "position": "relative" });
                                         window.scroll(0,yPos);
                                         jQueryfixedElement.css({ "position": "fixed" });
                               }
                               //Close overlay if opened
                               if ( $('#retrograd_overlay_menu').length != 0 ) {
                                         $('#retrograd_overlay_menu').fadeOut(300);
                               }
                     });
                });

                /* Open Overlay Menu */
                $('.open-overlay').on('click', function(e) {
                          e.preventDefault();
                          $('#retrograd_overlay_menu').fadeIn(300,function(){
                                    var count = $('#retrograd_overlay_menu div.menu nav').children().length;
                                    //if ( count <= 4 ) { var menu_height = 300; }
                                    //if ( count => 4 ) { var menu_height = 400; }
                                    //if ( count => 7 ) { var menu_height = 600; }
                                    if ( ( window_height > 770 ) && ( count > 4 ) ) { var menu_height = window_height * 0.6; }
                                    if ( ( window_height > 770 ) && ( count < 4 ) ) { var menu_height = window_height * 0.25; }
                                    if ( ( window_height < 770 ) && ( count > 4 ) ) { var menu_height = window_height * 0.7; }
                                    if ( ( window_height < 770 ) && ( count < 4 ) ) { var menu_height = window_height * 0.35; }
                                    if ( ( window_height < 550 ) && ( count > 4 ) ) { var menu_height = window_height * 0.85; }
                                    if ( ( window_height < 550 ) && ( count < 4 ) ) { var menu_height = window_height * 0.5; }
                                    var menu_item_height = menu_height / count;
                                    $('#retrograd_overlay_menu div.menu nav').css({'height':menu_height,'position':'absolute','top':'0','left':'0','right':'0','bottom':'0','margin':'auto'});
                                    $('#retrograd_overlay_menu div.menu nav a').css({'height':menu_item_height + 'px','line-height':menu_item_height + 'px'});
                                    $('#retrograd_overlay_menu div.menu').fadeIn(300);
                          });

                });
                
                /* Close Overlay Menu */
                $('#close-overlay').on('click', function(e) {
                          e.preventDefault();
                          $('#retrograd_overlay_menu').fadeOut(300);
                });
                
                /* SHOW / HIDE TOP BAR 
                ================================================*/
                if ( window_width > 700 ) {
                        $(window).scroll(function(){
                              var pagetop = jQuery(this).scrollTop();
                              if (pagetop >= window_height) {
                                       $('#top-bar').slideDown();
                              }
                              if (pagetop <= window_height) {
                                       $('#top-bar').css("display","none");
                              }
                        });
                }


                /*   PORTFOLIO
                ================================================*/
                $('.load-project').magnificPopup({
                          type : 'ajax',
                          ajax: {
                                //settings: {crossDomain:true, isLocal:true},
                                tError: 'Ajax requests cannot be completed on a local computer, because they work only with http protocol scheme. This is normal, not a bug of the theme or the portfolio. To solve the problem please upload your project to a live server or install a local webserver application ( XAMPP or Appserv )!'
                                },
                          callbacks: {
                                      parseAjax: function(response) {
                                              var $content = $(response.data);
                                              var videoContainer  = $content.find('.portfolio-iframe');
                                              var sliderContainer = $content.find('#portfolio-slider');
                                              var galleryItem     = $content.find('.portfolio-gallery');

                                              videoContainer.fitVids();
                                              sliderContainer.flexslider({controlNav: true, directionNav: false});
                                              if ( galleryItem.length != 0 ) { galleryItem.find('a').vanillabox(); }

                                              response.data = $content;
                                      }
                          }
                });
                
                /* LOAD SERVICES
                ================================================*/
                $('#service-items ul li a.more-link').magnificPopup({
                          type : 'ajax',
                          ajax: {
                                //settings: {crossDomain:true, isLocal:true},
                                tError: 'Ajax requests cannot be completed on a local computer, because they work only with http protocol scheme. This is normal, not a bug of the theme or the portfolio. To solve the problem please upload your project to a live server or install a local webserver application ( XAMPP or Appserv )!'
                                },
                          callbacks: {
                                      parseAjax: function(response) {
                                              var $content = $(response.data);
                                              var videoContainer  = $content.find('.service-iframe');
                                              var sliderContainer = $content.find('#service-slider');

                                              videoContainer.fitVids();
                                              sliderContainer.flexslider({controlNav: true, directionNav: false});

                                              response.data = $content;
                                      }
                          }
                });
                
                /* LOAD MEMBER INFO
                ================================================*/
                $('.about-left a.load-bio').magnificPopup({
                          type : 'ajax',
                          ajax: {
                                //settings: {crossDomain:true, isLocal:true},
                                tError: 'Ajax requests cannot be completed on a local computer, because they work only with http protocol scheme. This is normal, not a bug of the theme or the portfolio. To solve the problem please upload your project to a live server or install a local webserver application ( XAMPP or Appserv )!'
                                },
                          callbacks: {
                                      parseAjax: function(response) {
                                              var $content = $(response.data);
                                              var videoContainer  = $content.find('.member-iframe');

                                              videoContainer.fitVids();

                                              response.data = $content;
                                      }
                          }
                });


                /* FUN FACTS COUNTER
                ================================================*/
                if ( window_width > 700 ) {
                        $('.count').counterUp({
                                delay: 200,
                                time: 3000
                        });
                }
                
                /* GALLERY LIGHTBOX
                ================================================*/
                $('a.full-resolution').vanillabox();


                /* TOOL TIPS
                ================================================*/
                $('#footer-icons .helper ul li a').tipTip({ delay: 100, maxWidth: 500 });
                $('#contact-details div.helper ul li').tipTip({ delay: 100, maxWidth: 500 });
                
                /*  CONTACT FORM VALIDATION
                ================================================*/
                $('#contact-form button#button').on('click', function(e) {

                                    //Stop propagating the parent event handler
                                    e.stopPropagation();

                                    //Set the variables
                                    var name_value    =  $('input#retrograd-name').val();
                                    var mail_value    =  $('input#retrograd-email').val();
                                    var subject_value =  $('input#retrograd-subject').val();
                                    var message_value =  $('textarea#retrograd-message').val();

                                    var missing_name = $('input#retrograd-name').attr('data-missing-message');
                                    var missing_mail = $('input#retrograd-email').attr('data-missing-message');
                                    var invalid_mail = $('input#retrograd-email').attr('data-invalid-message');
                                    var missing_subject = $('input#retrograd-subject').attr('data-missing-message');
                                    var missing_message = $('textarea#retrograd-message').attr('data-missing-message');

                                    var original_border = $('input#retrograd-name').css('border');
                                    var original_color  = $('input#retrograd-name').css('color');
                                    var error_border = '2px solid #990000';
                                    var error_color  = '#990000';

                                    //Check if name field empty
                                    if (name_value == "" || name_value == missing_name ) {
                                              $('input#retrograd-name').css({'color':error_color,'border':error_border});
                                              $('input#retrograd-name').val(missing_name);
                                    }
                                    
                                    //Check if name field has error message
                                    $('input#retrograd-name').on('click', function() {
                                              var actual_name_value = $('input#retrograd-name').val();
                                              if ( actual_name_value == missing_name ) {
                                                        $(this).val('');
                                                        $(this).css({'color':original_color,'border':original_border});
                                              }
                                    });
                                    
                                    //Check if email field empty or the mail is invalid
                                    if (mail_value == "" || mail_value == missing_mail || mail_value == invalid_mail ) {
                                              $('input#retrograd-email').css({'color':error_color,'border':error_border});
                                              $('input#retrograd-email').val(missing_mail);
                                    }
                                    
                                    //Validate email address
                                    if ( mail_value != missing_mail && mail_value != '' ) {
                                              var atpos=mail_value.indexOf("@");
                                              var dotpos=mail_value.lastIndexOf(".");
                                              if (atpos<1 || dotpos<atpos+2 || dotpos+2>=mail_value.length) {
                                                        $('input#retrograd-email').css({'color':error_color,'border':error_border});
                                                        $('input#retrograd-email').val(invalid_mail);
                                                        return false;
                                              }
                                     }
                                     
                                    //Check if email field has error message
                                    $('input#retrograd-email').on('click', function() {
                                              var actual_email_value = $('input#retrograd-email').val();
                                              if ( actual_email_value == missing_mail || actual_email_value == invalid_mail ) {
                                                        $(this).val('');
                                                        $(this).css({'color':original_color,'border':original_border});
                                              }
                                    });

                                    //Check if subject field empty
                                    if (subject_value == "" || subject_value == missing_subject ) {
                                              $('input#retrograd-subject').css({'color':error_color,'border':error_border});
                                              $('input#retrograd-subject').val(missing_subject);
                                    }
                                    
                                    //Check if subject field has error message
                                    $('input#retrograd-subject').on('click', function() {
                                              var actual_subject_value = $('input#retrograd-subject').val();
                                              if ( actual_subject_value == missing_subject ) {
                                                        $(this).val('');
                                                        $(this).css({'color':original_color,'border':original_border});
                                              }
                                    });
                                    
                                    //Check if message textarea empty
                                    if (message_value == "" || message_value == missing_message ) {
                                              $('textarea#retrograd-message').css({'color':error_color,'border':error_border});
                                              $('textarea#retrograd-message').val(missing_message);
                                    }
                                    
                                    //Check if message textarea has error message
                                    $('textarea#retrograd-message').on('click', function() {
                                              var actual_message_value = $('textarea#retrograd-message').val();
                                              if ( actual_message_value == missing_message ) {
                                                        $(this).val('');
                                                        $(this).css({'color':original_color,'border':original_border});
                                              }
                                    });
                                    
                                    //Check if all the fields all completed properly
                                    if ( name_value == "" || name_value == missing_name ||  mail_value == "" || mail_value == invalid_mail ||  mail_value == missing_mail || message_value == "" ||  message_value == missing_message || subject_value == "" || subject_value == missing_subject ) { return false; }

                                    //Send the values to the mail.php via ajax
                                    $.ajax({
                                              type: 'post',
                                              url: 'mail.php',
                                              data: 'name=' + name_value + '&email=' + mail_value + '&subject=' + subject_value + '&comments=' + message_value,
              
                                              success: function(results) {
                                                 
                                                        $.magnificPopup.open({
                                                                  items: {
                                                                          src: '<div class="contact-info"><p>' + results + ' </p></div>',
                                                                          type: 'inline'
                                                                  }
                                                        });
                                                        
                                                        $('input#retrograd-name').val('');
                                                        $('input#retrograd-email').val('');
                                                        $('input#retrograd-subject').val('');
                                                        $('textarea#retrograd-message').val('');
                                              }
                                    });


                });//send click process ends here


      });  //END: document.ready()

      /* window.load()
      ==================*/
      $(window).load(function(){

                /*  PRELOADER
                ================================================*/
                var preloader = '#retrograd-preloader';
                if ( $(preloader).length != 0 ) {
                     $('#retrograd-preloader h1').text('100');
                     setTimeout(function(){
                            $(preloader).fadeOut(700,function(){
                                    $('#retrograd-preloader h1').text('0');
                            });
                     }, 1500);
                }

                /* FITVIDS
                ================================================*/
                if ( $('.video-container').length != 0 ) { $('.video-container').fitVids(); }

                /* HOME SLIDER
                ================================================*/
                $('#slider').flexslider({
                         animation: "slide",              //String: Select your animation type, "fade" or "slide"
                         slideDirection: "horizontal",   //String: Select the sliding direction, "horizontal" or "vertical"
                         slideshow: true,                //Boolean: Animate slider automatically
                         slideshowSpeed: 4000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
                         animationDuration: 600,         //Integer: Set the speed of animations, in milliseconds
                         directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
                         controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
                         keyboardNav: true,              //Boolean: Allow slider navigating via keyboard left/right keys
                         mousewheel: false,              //Boolean: Allow slider navigating via mousewheel
                         prevText: "<",                   //String: Set the text for the "previous" directionNav item
                         nextText: ">",                   //String: Set the text for the "next" directionNav item
                         pausePlay: false,               //Boolean: Create pause/play dynamic element
                         pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
                         playText: 'Play',               //String: Set the text for the "play" pausePlay item
                         randomize: false,               //Boolean: Randomize slide order
                         slideToStart: 0,                //Integer: The slide that the slider should start on. Array notation (0 = first slide)
                         animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
                         pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
                         pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
                         manualControls: "",             //Selector: Declare custom control navigation. Example would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
                         start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
                         before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
                         after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
                         end: function(){}
                });
                
                /* PARALLAX EFFECT
                ================================================*/
                $('.parallax').each(function(){
                        var parallax_bg = $(this).attr('data-background');
                        if ( window_width > 770 ) {
                             $(this).css('background-image','url(' + parallax_bg + ')');
                        }
                        if ( window_width < 770 ) {
                             $(this).backstretch(parallax_bg);
                        }
                });

                /*  TESTIMONIALS SLIDER
                ================================================*/
                $('#testimonials-slider').flexslider({
      
                     namespace: "testimonials-",     //{NEW} String: Prefix string attached to the class of every element generated by the plugin
                     selector: ".testimonial-slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
                     animation: "fade",              //String: Select your animation type, "fade" or "slide"
                     easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
                     direction: "vertical",          //String: Select the sliding direction, "horizontal" or "vertical"
                     reverse: false,                 //{NEW} Boolean: Reverse the animation direction
                     animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
                     smoothHeight: true,             //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
                     startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
                     slideshow: false,               //Boolean: Animate slider automatically
                     slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
                     animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
                     initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
                     randomize: false,               //Boolean: Randomize slide order

                     // Usability features
                     pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
                     pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
                     useCSS: false,                  //{NEW} Boolean: Slider will use CSS3 transitions if available
                     touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
                     video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

                     // Primary Controls
                     controlNav: true,              //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
                     directionNav: false,             //Boolean: Create navigation for previous/next navigation? (true/false)
                     prevText: "&lt;",               //String: Set the text for the "previous" directionNav item
                     nextText: "&gt;",               //String: Set the text for the "next" directionNav item
      
                     // Secondary Navigation
                     keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
                     multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
                     mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
                     pausePlay: false,               //Boolean: Create pause/play dynamic element
                     pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
                     playText: 'Play',               //String: Set the text for the "play" pausePlay item
      
                     // Special properties
                     controlsContainer: "#testimonial-controls",  //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
                     manualControls: "",             //Selector: Declare custom control navigation. Examples would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
                     sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
                     asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider
      
                     // Callback API
                     start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
                     before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
                     after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
                     end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
                     added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
                     removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
      
                });

      }); //END: window.load

      /* window.scroll
      ==================*/
      $(window).scroll(function(){

                var top_distance = $(this).scrollTop();

                /*  FLOATING MENU
                ================================================*/
                var floating_element = $('a.floating-button');
                if ( floating_element.length != 0 ) {

                          if ( top_distance > window_height ) {
                                    floating_element.fadeIn(600);
                          }
                          if ( top_distance < window_height ) {
                                    floating_element.fadeOut(600);
                          }

                }

      }); //END: window.scroll
      
      /* keyboard events
      ==================*/
      $(document).keyup(function(e) {

                //ESC
                if (e.keyCode == 27) {

                    //Close overlay menu
                    if ( $('#retrograd_overlay_menu').length != 0 ) {
                         $('#retrograd_overlay_menu').fadeOut(300);
                    }

                }

      }); // END: keyboard events


})(jQuery);