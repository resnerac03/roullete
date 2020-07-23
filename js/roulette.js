var clap = new Howl({
  src: ['sound/applause.mp3']
});

var aw = new Howl({
  src: ['sound/aw.mp3']
});

var wheel = new Howl({
  src: ['sound/wheel.mp3']
});

var stopSound = function() {
  clap.stop();
  aw.stop();
  wheel.stop();
}

var prices = [
    {
      id:'0',
      name: 'You win! Congratulations!',
      sound: clap,
      img: "img/anim_wheels/you-win.gif"
    },
    {
      id:'1',
      name: "Sorry. The wheel isn't in your favor",
      sound: aw,
      img: "img/anim_wheels/isnt-in-your-favor.gif"
    },
    {
      id:'2',
      name: 'Spin harder next time!',
      sound: aw,
      img: "img/anim_wheels/spin-harder.gif"
    },
    {
      id:'3',
      name: 'Yay! One premium item for you!',
      sound: clap,
      img: "img/anim_wheels/yay-one-premium.gif"
    },
    {
      id:'4',
      name: 'Sorry! Better luck next time.',
      sound: aw,
      img: "img/anim_wheels/sorry-better-luck.gif"
    },
    {
      id:'5',
      name: 'You did not win! But you got one more spin.',
      sound: clap,
      img: "img/anim_wheels/you-did-not-win.gif"
    }
];


var modal = document.getElementById('myModal');
var anim_img = document.getElementsByClassName("anim_img")[0];


var $r = $('.spinner').fortune(prices);

var clickHandler = function() {

  $('.spinner').off('click');
  $('.spinner span').hide();
  wheel.stop();
  wheel.play();

  $r.spin().done(function(price) {

    console.log(price);
    console.log(price.id);

    // TEXT RESULT
    $('.result').text(price.name);

    // SHOW MODAL
    modal.style.display = "block";


    // ANIMATED IMAGE ON TOP OF MODAL
    console.log(price.img);
    var img = price.img;
    var modalImage = $("#modalImage");
    modalImage.attr('src', img);
    modalImage.css({'margin': '265px'});

    //SHOW ANIMATED IMAGE
    anim_img.style.display = "block";

     // CHECK IF WIN(id must be 0 or 3) THEN CONFETTI WILL SHOW
    if(price.id == "0" || price.id == "3"){
      $('#myModal').append("<canvas id='canvas'></canvas> <script src='js/confeti.js'></script>");
      $('canvas').show();
    }else{
      $('canvas').hide();
      console.log(price.id + " is equals to 1,2,4 or 5");
    }

    // CLEAR SOUND
    stopSound();
    // SOUND TO PLAY
    price.sound.play()
    


    $('.spinner').on('click', clickHandler);
    

    
  }); 
};

 

$('.spinner').on('click', clickHandler);


//modal-header
var modheader = document.getElementsByClassName('modal-header')[0];

// canvas
var canvas = document.getElementsByClassName('canvas')[0];

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    $('.spinner').on('click', clickHandler);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == canvas || event.target == modal || event.target == modalImage || event.target == modheader) {
        stopSound();
        anim_img.style.display = "none";
        modal.style.display = "none";
        $('.spinner').on('click', clickHandler);
    }
}