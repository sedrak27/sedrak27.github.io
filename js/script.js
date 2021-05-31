$(function(){
    // validation part
   $("#start").on('click' , function (){
       let song = new Audio();
       
       var row = $('#row').val();
       var col = $('#col').val();
       var count = row * col;
       var click = false;
       if(row == '' || col == "" || isNaN(row) == true || isNaN(col) == true || count%2 == 1 ){
           alert("Enter valid data")
           location.reload();
       }else{
           $('.start').slideUp();
           $('.main').show(); 
       }
    //    Image part
     var globalPath  = "images/n";
     var globalEx = '.png';
     var arr = [];
     for(var i = 0 ; i<count/2 ; i++){
            arr.push(globalPath + i  + globalEx )
     }
     var all = $.merge(arr ,arr)
    
    function shuffle (array){
        var k ;
        var temp ;
        for(var i = 0 ; i <array.length ; i++){
            k = Math.floor(Math.random()*(i+1))
            temp = array[i];
            array[i] = array[k]
            array[k] = temp;
        }
        return array
    }
    var pic = shuffle(all)
    console.log(pic);
    
    // show image part
    $('.game').empty();
    for(var i = 0 ; i<count ; i++){
        var div  = $('<div>');
        div.attr('class' ,' divIn')
        div.attr('data-image' , all[i])
        div.css('background-image'  , "url(" +  all[i] +")")
        $('.game').append(div);
        $('.game').css('width' ,104*row + "px" )
    }
    // hide image part
    setTimeout(function(){
        var el = $('.divIn');
        for(var i = 0 ; i <count ; i++){
            $(el[i]).addClass('back');
        }
        timer(count);
    }, 4000)
    function timer(c){
        var time  = c*2
        var x = setInterval(function(){
            if(click == false){
                time--;
                $('h2').html(time + 'sec');
                if(time <= 5){
                    song.src = 'Sounds/countdown.mp3';
                    song.play();
                    
                }
                if(time == 0 ){
                    $('h2').html('');
                    song.src = 'Sounds/lose.mp3';
                    song.play();
                    $('.game').empty();
                    $('.game').attr('id', 'loser');
                    //$('.game').css('background-image', 'url("images/lose.gif")');
                    //$('.game').css('width', '300px');
                    setTimeout(function(){
                        alert ('game over');
                        clearInterval(x)
                    },400)
                }
            }

        },1000)
    }
    // click part
    setTimeout(function(){
        var indexes = [];
        var pair = [];
        $('.divIn').on('click', function(){
            $(this).addClass('checked');
            $(this).removeClass('back');
                var t = $(this).data('image');
                var ind  = $(this).index();
                console.log(t , ind);
                indexes.push(ind);
                pair.push(t);
                if(indexes.length == 2){
                    if(pair[0] == pair[1] && indexes[0] != indexes[1]){
                        
                        $('.checked').addClass('same');
                        if($('.divIn').has('same')){
                            $('.divIn').removeClass('checked');
                            $('.same').off('click');
                            song.src = 'Sounds/success.mp3';
                            song.play();
                        }

                    }else{
                        setTimeout(function(){
                            $('.checked').addClass('back');
                            $('.divIn').removeClass('checked')
                            song.src = 'Sounds/error.mp3';
                            song.play();
                        },400)

                    }
                    indexes = [];
                    pair = [];
                }
              if($('.same').length==count){
                  click = true;
                  song.src = 'Sounds/win.mp3';
                  song.play();
                  $('.game').empty();
                  $('.game').attr('id', 'winner');
                  setTimeout(function(){
                      alert('you win');
                  }, 500)
              }
                
        })
    },1000)
   } )
})