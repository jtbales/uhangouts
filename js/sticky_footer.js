$(window).bind("load", function() { 
       
      //The wrapper div contains all content except the footer. The body div is directly within the wrapper.

       var wrapperHeight = 0,
       heightMinusFooter = 0,
           $footer = $("footer");
           $wrapper = $("#wrapper");
           $body = $("#body");
           
       positionFooter();
       
       function positionFooter() {

                trueHeight = $body.height();
                wrapperHeight = $wrapper.height();
                heightMinusFooter = ($(window).height() - $("footer").height());

              //Usually a bigger screen, content doesn't push the footer to the bottom
               if ( trueHeight < heightMinusFooter) {
                   $wrapper.css({
                        height: heightMinusFooter
                   })
               } 
               //Content has pushed footer to the bottom or lower 
               else {
                     $wrapper.css({
                          height: trueHeight
                     })                    
               }


               
       }

       $(window)
               .scroll(positionFooter)
               .resize(positionFooter)
               .click(positionFooter)
               .keyup(positionFooter)
});