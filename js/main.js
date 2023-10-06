
// Super Wheel Script
jQuery(document).ready(function($){
   
    $('.wheel-with-image').superWheel({
        slices: [
            {
                text: 'static/images/r-0.png',
                value: 1,
                background: "#ffffff",
                cadeau: 2
                
            },
            {
                text: 'static/images/r-10.png',
                value: 0,
                background: "#db0513",
                cadeau: 0
                
            },
            {
                text: 'static/images/r-20.png',
                value: 0,
                background: "#ffffff",
                cadeau: 0
                
            },
            {
                text: 'static/images/r-30.png',
                value: 0,
                background: "#db0513",
                cadeau: 0
                
            },
            {
                text: 'static/images/r-0.png',
                value: 0,
                background: "#ffffff",
                cadeau: 0
                
            },
            {
                text: 'static/images/r-40.png',
                value: 0,
                background: "#db0513",
                cadeau: 0
                
            },
            {
                text: 'static/images/r-50.png',
                value: 0,
                background: "#ffffff",
                cadeau: 0
                
            },
            {
                text: 'static/images/r-60.png',
                value: 1,
                background: "#db0513",
                cadeau: 1
                
            }
        ],
    text : {
        type: 'image',
        color: '#CFD8DC',
        size: 25,
        offset : 10,
        orientation: 'h'
        
    },
    line: {
        width: 0,
        color: "#e2c4c8"
    },
    outer: {
        width: 15,
        color: "#ff1d27"
    },
    inner: {
        width: 15,
        color: "#e2c4c8"
    },
    center:{
        width: 20,
        background: '#f4e984',
        rotate: true,
        class: "",
        image:{
          url: "wheel/images/axe_roue.png",
          width: 60
        }
      },
    marker: {
        background: "#e88189",
        animate: 0
    },
    
    selector: "value",
    
    
    
    });
    
    
    
    var tick = new Audio('wheel/media/tick.mp3');
    var lose = true;
    $(document).on('click','.wheel-with-image-spin-button',function(e){
        if(lose == true){
            $('.wheel-with-image').superWheel('start','cadeau',2);
            console.log('winwin');
        }else{
            $('.wheel-with-image').superWheel('start','cadeau',1);
            console.log('chance');
        }
        
        $(this).prop('disabled',true);
    });
    
    
    $('.wheel-with-image').superWheel('onStart',function(results){
        
        
        $('.wheel-with-image-spin-button').text('...Ø¯ÙˆØ±Ø§Ù†');
        
    });
    $('.wheel-with-image').superWheel('onStep',function(results){
        
        if (typeof tick.currentTime !== 'undefined')
            tick.currentTime = 0;
        
        tick.play();
        
    });
    
    
    $('.wheel-with-image').superWheel('onComplete',function(results){
        //console.log(results.value);
        if(results.value === 1){
            
             // do this for 30 seconds
                var duration = 30 * 100;
                var end = Date.now() + duration;

                

                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })
                if(results.cadeau == 1){
                    var snd = new Audio("static/win.wav"); // buffers automatically when created
                    snd.play();

                    (function frame() {
                        // launch a few confetti from the left edge
                        confetti({
                            particleCount: 7,
                            angle: 60,
                            spread: 55,
                            origin: { x: 0 }
                        });
                        // and launch a few from the right edge
                        confetti({
                            particleCount: 7,
                            angle: 120,
                            spread: 55,
                            origin: { x: 1 }
                        });
        
                        // keep going until we are out of time
                        if (Date.now() < end) {
                            requestAnimationFrame(frame);
                        }
                        }());
                    swalWithBootstrapButtons.fire({
                        html: '<img src="static/images/moin60precent.gif" style="width: 96%;">',
                        showCancelButton: false,
                        confirmButtonText: 'Ø§Ø´ØªØ±ÙŠÙ‡ Ø§Ù„Ø¢Ù†'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            
    
                            $('#roue').removeClass('visible');
                            $('#allContent').removeClass('not-visible');
                            $('#roue').addClass('not-visible');
                            $('#allContent').addClass('visible');
    
                            var cadeau_1 = [
                                {"Id": 39696818766018, "Name": "Ø¹Ù„Ø§Ø¬ ÙƒÙˆØ§Ù† Ù„Ù„Ø¹Ù†Ø§ÙŠØ© Ø¨Ø§Ù„Ø´Ø¹Ø±"}, 
                                {"Id": 39839509774530, "Name": "Ù…Ø±ÙƒØ² Ø§Ù„Ø²ÙŠÙˆØª + Ø´Ø§Ù…Ø¨Ùˆ Ù…Ù†Ù‚ÙŠ"},
                                {"Id": 39839501746370, "Name": "Ø¨Ù€Ù€Ù€ÙˆØªÙ€Ù€Ù€ÙˆÙƒØ³ + Ø´Ø§Ù…Ø¨Ùˆ Ù…Ù†Ù‚ÙŠ"}
                                ];
 
                        } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                        ) {
                        
                        }
                    })
                }else{
                    var snd = new Audio("static/lose.wav"); // buffers automatically when created
                    snd.play();
                    lose = false;
                    swalWithBootstrapButtons.fire({
                        title: "Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø©",
                        html: ' &#128515; ÙŠÙ…ÙƒÙ†Ùƒ  Ø¥Ø¹Ø§Ø¯Ø©  Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© ',
                        icon: 'error',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø©',
                    });
                }

                            /*swal({
                                type: 'success',
                                title: "Ù…Ø¨Ø±ÙˆÙˆÙˆÙˆÙƒ ØªÙ‡Ø§Ù†ÙŠÙ†Ø§ Ù„Ù‚Ø¯ Ø±Ø¨Ø­Øª", 
                                html: results.message
                            }); */

        }else{
            swal("Oops!", 'Not win', "error");
        }
        
        
        $('.wheel-with-image-spin-button:disabled').prop('disabled',false).text('Ø§ Ø¶ØºØ· Ù‡Ù†Ø§');
        
    });
    
   
    $(".sWheel-marker").html( "<img src='static/images/pointer.png' style='position:relative;top:43px;height: 58px ; text-align: center; margin: 0 auto;'>" );

});
