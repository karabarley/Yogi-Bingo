const bingoApp =  {}; // PART 1a:: This is the bingoApp object
const wordBank = [] // Word bank of all yoga-related words from API
let wordSheet = [] // List of randomly generated words displayed on bingo sheet
const bonusBank =  // List of Bonus words
    [
    'namaste',
    'energy',
    'humble',
    'vinyasa',
    'grateful',
    '~om~',
    'shanti', 
    'headstand',
    'guru',
    'practice',
    'self-love',
    'awareness',
    'wellness',
    'rejuvinate'
    ]
let setSheet = function () { //appending words from the array
    $('.word1').text(wordSheet[0]);
    $('.word2').text(wordSheet[1]);
    $('.word3').text(wordSheet[2]);
    $('.word4').text(wordSheet[3]);
    $('.word5').text(bonusBank[Math.floor(Math.random() *bonusBank.length)]); //bonus points    
    $('.word6').text(wordSheet[5]);
    $('.word7').text(wordSheet[6]);
    $('.word8').text(wordSheet[7]);
    $('.word9').text(wordSheet[8]);
}
const newSheet = function () {
    wordSheet = [] //empty current sheet
    bingoApp.randomizeWords()// randomly generate words
    setSheet(); // reset sheet
    $('input[type="checkbox"]').prop('checked', false); //check things off
    $('h4 span').text(`0 `) //reset points
    $('#wordList').empty() // reset wordlist
}
// Transitions between different sections 
bingoApp.sections = function () {
    $('#bingoGame').hide();
    $('#results').hide();
    // when 'start' button is clicked, transition to bingoGame sheet
    $('#start').on('click', function(){
        $('header').hide();
        $('#bingoGame').fadeIn();
    })
    // when 'end game' button is clicked, transition to results section 
    $('#endGame').on('click', function () {
        $('#bingoGame').hide();
        $('#results').fadeIn();
    })
    //when 'play again' button is clicked, transition back to game and reset what has been appended to the results section
    $('#playAgain').on('click', function () {
        $('#results').hide();
        $('#bingoGame').fadeIn();
        newSheet();
        $('#results h1').empty();
        $('#results h4 time').empty();
        $('li').removeClass('crossed')    
    })
    //when 'home' button clicked, go back to start page
    $("#home").on("click", function () {
        window.location.reload(true);
    })
}

bingoApp.getWords = function(){//PART 3:: get words from API
    $.ajax({
        url: "https://api.datamuse.com/words", //endpoint destination
        method: "GET",
        dataType: "json",
        data: {
            rel_trg: "yoga",
            max: 2000
        }
    }).then(function(results){ //results is an array of objects
        bingoApp.bankWords(results)
        bingoApp.randomizeWords()
        bingoApp.displayWords()
    });
}

bingoApp.bankWords = function(wordArray){ //PART 4:: create a bank of words from the API and store it in a new array
    
    wordArray.forEach(function(wordObject){ //word is an object with two key-value pairs
        // console.log(wordObject.word)// this gives you the word from the API
        wordBank.push(wordObject.word) //creating our word bank

    })  
}

bingoApp.randomizeWords = function (){
    for (i = 0; i < 9; i++) {
        randomWord = wordBank.splice(Math.floor(Math.random() * wordBank.length), 1)[0]
        wordSheet.push(randomWord)
    }
}

bingoApp.displayWords = function(){
    setSheet();
}

bingoApp.events = () => {
    // Event:: When 'start' is clicked, set timer
    var clock = document.getElementsByTagName('h2')[0],
        start = document.getElementById('start'),
    //  Event:: When 'endGame' is clicked, stop timer
        stop = document.getElementById('endGame'),

    //  Event:: When 'playAgain' is clicked, clear timer
        clear = document.getElementById('playAgain'),
        seconds = 0, minutes = 0, hours = 0,
        t;
      //  Event:: When 'newSheet' is clicked, clear timer
        clearAgain = document.getElementById('newSheet'),
        seconds = 0, minutes = 0, hours = 0,
        t;

    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        clock.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        timer();
    }
    function timer() {
        t = setTimeout(add, 1000);
    }


    // start timer
    start.onclick = timer();
    // clear timer 
    clear.onclick = function(){
        seconds = 0; minutes = 0; hours = 0; // reset time
        timer();
    }
    // clear Again when new sheet is selected
    clearAgain.onclick = function () {
        seconds = 0; minutes = 0; hours = 0; // reset time
        
    }

    // stop timer
    stop.onclick = function () {
        clearTimeout(t);
    }

   

    // Events:: Bingo Word Interactions
    // Adding words to the final word list (and removing words from world list when words are deselected)
    $('#word1').on('click', function () {
        if ($('#word1').prop("checked") == true) {
            var newInput = $(`<p id="display1">${wordSheet[0]}<p>`)
            $('#wordList').append(newInput);
        } else if ($('#word1').prop("checked") == false) {
            $('#wordList').find('#display1').remove();
        }
        // responsive grid
        if ($('#word1').prop("checked") == true) {
            $('li.1').addClass('crossed')
        }else if ($('#word1').prop("checked") == false) {
            $('li.1').removeClass('crossed')
        }
    })

    $('#word2').on('click', function () {
        if ($('#word2').prop("checked") == true) {
            var newInput = $(`<p id="display2">${wordSheet[1]}<p>`)
            $('#wordList').append(newInput);
        } else if ($('#word2').prop("checked") == false) {
            $('#wordList').find('#display2').remove();
        }
        // responsive grid
        if ($('#word2').prop("checked") == true) {
            $('li.2').addClass('crossed')
        } else if ($('#word2').prop("checked") == false) {
            $('li.2').removeClass('crossed')
        }
    })

    $('#word3').on('click', function () {
        if ($('#word3').prop("checked") == true) {
            var newInput = $(`<p id="display3">${wordSheet[2]}<p>`)
            $('#wordList').append(newInput);
        } else if ($('#word3').prop("checked") == false) {
            $('#wordList').find('#display3').remove();
        }
        // responsive grid
        if ($('#word3').prop("checked") == true) {
            $('li.3').addClass('crossed')
        } else if ($('#word3').prop("checked") == false) {
            $('li.3').removeClass('crossed')
        }
    })
    $('#word4').on('click', function () {
        if ($('#word4').prop("checked") == true) {
            var newInput = $(`<p id="display4">${wordSheet[3]}<p>`)
            $('#wordList').append(newInput);
        } else if ($('#word4').prop("checked") == false) {
            $('#wordList').find('#display4').remove();
        }
        // responsive grid
        if ($('#word4').prop("checked") == true) {
            $('li.4').addClass('crossed')
        } else if ($('#word4').prop("checked") == false) {
            $('li.4').removeClass('crossed')
        }
    })
    $('#word5').on('click', function () {
        if ($('#word5').prop("checked") == true) {
            var newInput = $(`<p id="display5">${$('label[class="word5"]').text()}<p>`) // bonus word from bonusBank array
            $('#wordList').append(newInput);
        } else if ($('#word5').prop("checked") == false) {
            $('#wordList').find('#display5').remove();
        }
        // responsive grid
        if ($('#word5').prop("checked") == true) {
            $('li.5').addClass('crossed')
        } else if ($('#word5').prop("checked") == false) {
            $('li.5').removeClass('crossed')
        }
    })
    $('#word6').on('click', function () {
        if ($('#word6').prop("checked") == true) {
            var newInput = $(`<p id="display6">${wordSheet[5]}<p>`)
            $('#wordList').append(newInput);
        } else if ($('#word6').prop("checked") == false) {
            $('#wordList').find('#display6').remove();
        }
        // responsive grid
        if ($('#word6').prop("checked") == true) {
            $('li.6').addClass('crossed')
        } else if ($('#word6').prop("checked") == false) {
            $('li.6').removeClass('crossed')
        }
    })
    $('#word7').on('click', function () {
        if ($('#word7').prop("checked") == true) {
            var newInput = $(`<p id="display7">${wordSheet[6]}<p>`)
            $('#wordList').append(newInput);
        } else if ($('#word7').prop("checked") == false) {
            $('#wordList').find('#display7').remove();
        }
        // responsive grid
        if ($('#word7').prop("checked") == true) {
            $('li.7').addClass('crossed')
        } else if ($('#word7').prop("checked") == false) {
            $('li.7').removeClass('crossed')
        }
    })
    $('#word8').on('click', function () {
        if ($('#word8').prop("checked") == true) {
            var newInput = $(`<p id="display8">${wordSheet[7]}<p>`)
            $('#wordList').append(newInput);
        } else if ($('#word7').prop("checked") == false) {
            $('#wordList').find('#display8').remove();
        }
        if ($('#word8').prop("checked") == true) {
            $('li.8').addClass('crossed')
        } else if ($('#word8').prop("checked") == false) {
            $('li.8').removeClass('crossed')
        }
    })
    $('#word9').on('click', function () {
        if ($('#word9').prop("checked") == true) {
            var newInput = $(`<p id="display9">${wordSheet[8]}<p>`)
            $('#wordList').append(newInput);
        } else if ($('#word9').prop("checked") == false) {
            $('#wordList').find('#display9').remove();
        }
        if ($('#word9').prop("checked") == true) {
            $('li.9').addClass('crossed')
        } else if ($('#word9').prop("checked") == false) {
            $('li.9').removeClass('crossed')
        }
    })
    //if user chooses to end game without getting BINGO, display the following message: Thank you for your energy! (Instead of Bingo)
    $('#endGame').on('click', () => {
        $('#results h1').empty()
        $('#results h1').append(`Thank you for your energy!`)
    })

    $('input').on('click',function () {
        // Word points counter
        if ($('#word5').prop("checked")) {// bonus point is worth 200points
            $('h4 span').text(`${($(":checkbox:checked").length * 100) + 100} `);
        } else $('h4 span').text(`${$(":checkbox:checked").length*100} `);


        // BINGO - when the user wins!
        if (
            //Across - Combination 1
            (($('#word1').prop("checked") == true) 
            &&
            ($('#word2').prop("checked") == true)
            &&
            ($('#word3').prop("checked") == true))
            ||
            //Across - Combination 2
            (($('#word4').prop("checked") == true)
            &&
            ($('#word5').prop("checked") == true)
            &&
            ($('#word6').prop("checked") == true))
            ||
            //Across - Combination 3
            (($('#word7').prop("checked") == true)
            &&
            ($('#word8').prop("checked") == true)
            &&
            ($('#word9').prop("checked") == true))
            ||
            //Down - Combination 1
            (($('#word1').prop("checked") == true)
            &&
            ($('#word4').prop("checked") == true)
            &&
            ($('#word7').prop("checked") == true))
            ||
            //Down - Combination 2
            (($('#word2').prop("checked") == true)
            &&
            ($('#word5').prop("checked") == true)
            &&
            ($('#word8').prop("checked") == true))
            ||
            //Down - Combination 3
            (($('#word3').prop("checked") == true)
            &&
            ($('#word6').prop("checked") == true)
            &&
            ($('#word9').prop("checked") == true))
            ||
            //Down - Diagonal 1
            (($('#word1').prop("checked") == true)
            &&
            ($('#word5').prop("checked") == true)
            &&
            ($('#word9').prop("checked") == true))
            ||
            //Down - Diagonal 2
            (($('#word7').prop("checked") == true)
            &&
            ($('#word5').prop("checked") == true)
            &&
            ($('#word3').prop("checked") == true))
            )
         {
            $('#endGame').click() //stop timer
            $('#results h1').empty();
            $('#results h1').append(`BINGO!`);
            $('input[type="checkbox"]').prop('checked', false); //check things off
              
         }


    })
    // Event:: Bingo Word Interactions
    $('#newSheet').on('click',function () {
        console.log('clicked')
        newSheet();
        $('li').removeClass('crossed')    
    })

}


bingoApp.init = function(){//PART 2:: initialize functions
    bingoApp.sections();
    bingoApp.getWords(); 
    bingoApp.events();
}

$(function() { //PART 1b:: document ready and call init();
    bingoApp.init();
});