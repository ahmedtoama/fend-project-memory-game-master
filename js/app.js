$(document).ready(function(){
  //class for memory game
  let memory_game = {
      //array for all cards
      list_cards: ['diamond','diamond','paper-plane-o','paper-plane-o','anchor','anchor','bolt','bolt','cube','cube','leaf','leaf','bicycle','bicycle','bomb','bomb'],
      card: $(".card .fa"),
      number_move: 0,
      number_stars: 3,
      minute: 3,
      set_interval:0,
      spacific_time:0,
      /*
       *make intial for game  it contain :
       -shuffle function for random card
       -assign the array into cards
       -on click to the cards match and compare between them
      */
      intial: function(){
          this.shuffle(this.list_cards);
          this.assign_cards(this.list_cards);
          this.card_on_click();
      },

      //shuffle function for make random cards
      shuffle: function(array) {
          var currentIndex = array.length, temporaryValue, randomIndex;

          while (currentIndex !== 0) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
          }

          return array;
      },

      //assign list to card in html
      assign_cards: function(arr){
        for(i=0;i<arr.length;i++){
          this.card.eq(i).data("value" , arr[i]).addClass("fa-"+arr[i]);
        }
      },

      //compare between cards when you click on the cards
      card_on_click: function(){
        $(".card").click(function(){
          $(this).addClass("open show").children().addClass("selected");
          memory_game.compare_cards();
        });
      },

      //compare between two cards
      compare_cards: function(){
        if($(".selected").length == 2){
          var first=$(".selected").first();
          var second=$(".selected").last();
          if(first.data('value')==second.data('value')){
            this.number_success++;
            console.log(this.number_success);
            first.removeClass("not-matched").parent().addClass("match animated bounce");
            second.removeClass("not-matched").parent().addClass("match animated bounce");
          }
          else {
            first.parent().addClass("animated shake");
            second.parent().addClass("animated shake");
            first.removeClass("selected");
            second.removeClass("selected");
            setTimeout(function(){
              first.parent().removeClass("open show").removeClass("animated shake");
              second.parent().removeClass("open show").removeClass("animated shake");
            },800);

         }
         $(".selected").each(function(){
           $(this).removeClass("selected");
         });
         this.number_move++;
         if(this.number_move>10 && this.number_move<=15){
           this.number_stars=3;
         }
         else if (this.number_move>15 && this.number_move<=20) {
           $(".first").css("opacity","0");
           this.number_stars=2;
         }
         else if(this.number_move>20){
           $(".second").css("opacity","0");
           this.number_stars=1;
         }
         memory_game.winner();
         $(".moves").text(this.number_move);
      }
    },

    //function for show when you win
    winner: function(){
      if($(".not-matched").length==0){
        clearInterval(memory_game.set_interval);
        let specefic_time=parseFloat($(".time").text())*60;
        let real_time=180-specefic_time;
        $(".time_win").text(real_time + " s ");
        $(".win").fadeIn(1000);
        $(".num-stars").text(memory_game.number_stars + " star");
        $(".win-restart").click(function(){
          $(".win").fadeOut(1000);
          memory_game.restart_init();
        });
      }
    },

    //restart funtion or reload game
    restart: function(){
      $(".fa-repeat").click(function(){
      memory_game.restart_init();
      });
    },

    //after restart make intialize
    restart_init: function(){
      $(".fa-repeat").each(function(){
      $(".card").removeClass("open show match animated bounce shake");
        memory_game.card.each(function(){
        memory_game.card.removeClass("selected");
      });
      memory_game.number_move=0;
      memory_game.minute=3;
      $(".time").text("03:00");
      clearInterval(memory_game.set_interval);
      memory_game.startTimer(memory_game.spacific_time, display);
      $(".moves").text(memory_game.number_move);
      $(".fa-star").css("opacity","1");
      memory_game.remove_assign_cards(memory_game.list_cards);
      memory_game.add_not_matched();
      memory_game.intial();
      });
  },

  remove_assign_cards: function(arr){
    for(i=0;i<arr.length;i++){
      this.card.eq(i).data("value" , arr[i]).removeClass("fa-"+arr[i]);
    }
  },

  add_not_matched: function(){
    memory_game.card.each(function(){
      memory_game.card.addClass("not-matched").removeClass("selected");
    });
  },
startTimer: function (duration, display) {
      var timer = duration, minutes, seconds;
      memory_game.set_interval=setInterval(function () {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          display.text(minutes + ":" + seconds);
          //loser for game
          if (--timer < 0) {
            clearInterval(memory_game.set_interval);
            $(".loser").fadeIn(1000);
            $(".loser-restart").click(function(){
              memory_game.minute=3;
              $(".time").text("03:00");
              $(".loser").fadeOut(1000);
              memory_game.restart_init();
              memory_game.intial();
              //invoke timer
              jQuery(function ($) {
                spacific_time= 60 * memory_game.minute;
                display = $('.time');
                  memory_game.startTimer( memory_game.spacific_time, display);
              });

            });
          }
      }, 1000);
  }

}
  memory_game.intial();
  memory_game.restart();
  jQuery(function ($) {
  memory_game.spacific_time= 60 * memory_game.minute;
          display = $('.time');
      memory_game.startTimer(memory_game.spacific_time, display);
  });
});
