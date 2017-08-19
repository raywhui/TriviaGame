
$(document).ready(function(){

	var correct;
	var incorrect;
	var time;
	var question1;
	var question2;
	var question3;
	var question4;
	var question5;
	var question6;
	var question7;
	var question8;
	var qCount;

	function initialValue(){
		correct = 0;
		incorrect = 0;
		time = 30; //change to 30 when done, 5 for debug
		$('.timer').html(time);

		//Question 1
		question1 = {
			q: 'Which character does Beth shoot at the end of the episode "Total Rickall"?',
			a1: "a. Rick", 
			a2: "b. Jerry",
			a3: "c. Mr.Poopybutthole", //correct
		  a4: "d. Squanchy",
		  ans: "c. Mr.Poopybutthole"
		};
		
		console.log(question1);
		//Question 2
		question2 = {
		  q:'Which universe are Rick and Morty originally from?',
		  a1: 'a. C-132',
		  a2: 'b. C-137', //correct
		  a3: 'c. D-99',
		  a4: 'd. Microverse',
		  ans: 'b. C-137'
		};
		
		console.log(question2);
		//Question 3
		question3 = {
		 q:'What show was the character Mr.Jellybean based on?',
		 a1:'a. Unbelieveable Tales!', //correct
		 a2:'b. Mr.Bean',
		 a3:'c. Back to the Future',
		 a4:'d. The Adventures of Doc and Marty',
		 ans:'a. Unbelieveable Tales!'
		};
		console.log(question3);
		//Question 4
		question4 = {
		  q: "What does Rick's catchphrase 'Wubba Lubba Dub Dub' mean?",
		  a1: 'a. F*** you, God! Not today bitch!',
		  a2: "b. I-I-I'll go out and find some more of that Mulan Szechuan teriyaki dipping sauce, Morty!",
		  a3: 'c. Keep Summer safe.',
		  a4: 'd. I am in great pain. Please help me.',//correct
		  ans:'d. I am in great pain. Please help me.'
		};
		console.log(question4);
		
		//Question 5
		question5 = { 
			q: 'What brand of top saves Summer and Rick in the episode "Raising Gazorpazorp"?',
			a1: "a. Marc Jacobs", //correct
			a2: "b. Versace",
			a3: "c. Coco Chanel",
			a4: "d. Ralph Lauren",
			ans: "a. Marc Jacobs"
		};
		//Question 6
		question6 = {
			q: 'In the episode "A Rickle in Time", what unit of measure does Rick use to tell the difference between Morty and Summer?',
			a1: "a. Age",
			a2: "b. Height",
			a3: "c. Pain in my ass", //correct
			a4: "d. Pieces of shit",
			ans: "c. Pain in my ass"
		};
		//Question 7
		question7 = {
			q: 'What game does Rick and Morty play after receiving 3000 Flurbos in the episode "Mortynight Run"?',
			a1: "a. Meeseeks and Destroy",
			a2: "b. Roy: A Life Well Lived", //correct
			a3: "c. Blipz and Chitz",
			a4: "d. Krombopulos Michael",
			ans: "b. Roy: A Life Well Lived"		
		};
		//Question 8
		question8 = {
			q: "What is my purpose?",
			a1: "a. 42",
			a2: "b. You pass butter.", //correct
			a3: "c. Welcome to the club, pal.",
			a4: "d. I am not programmed for friendship.",
			ans: "b. You pass butter."			
		};
		//Question+Answer Switcher
		qCount = 0;
	};//initialValue

		initialValue();	
		function qaSwitcher(){
			question1 = question2;
			question2 = question3;
			question3 = question4;
			question4 = question5;
			question5 = question6;
			question6 = question7;
			question7 = question8;
		};
		
		//nested array?
		//possible nested for loop to push previous array into other array?
			// for (var i = qaArray.length-1; i >= 0; i--) {
			// 	qaArray[i] = nextArray[i];
			// 	//check to see if list changes or breaks.
			// }
		//generates new questions and answers
		function htmlReplacer(v,w,x,y,z){
			$('.question-box').html(v);   //x is replacing text
			$('.a1').html(w);
			$('.a2').html(x);
			$('.a3').html(y);
			$('.a4').html(z);
		}

		//Results screen
		function resultScreen(){
			qaSwitcher();
			console.log('?#: ' + qCount);
			//reveals results + hides questions and answers.
			$('.display-results').css('display','block');
			$('.not-results').css('display','none');
			console.log("sweet");

		};

		function timerReset(){ //loop to run timer to 0, then wait few seconds to start countdown all over again. AKA recursive function
			htmlReplacer(question1.q, question1.a1, question1.a2, question1.a3, question1.a4, question1.ans); //1st question
			console.log('htmlReplacer Activated');
			console.log(question1.ans);
			time = 30;  //change to 30 when done, 5 for debug
			$('.timer').html(time);
			//reveals questions and answers + hides results.
			$('.display-results').css('display','none');
			$('.not-results').css('display','block');
			//setInterval(function executed,time)
			timeInterval = setInterval(myTimer,1000);
		}; //timerReset()

			function myTimer(){ //base timer, use myTimer(nextQuestion) to fill in future questions,answers, and results.
				time--;
				console.log('Countdown: ' + time);
				$('.timer').html(time);
				//conditional to end timer
				//sets delay until recursion

				if (time === 0){//Final results screen after all questions done
					clearInterval(timeInterval);
					incorrect++;
					$('.display-results').html("How can you be so uncertain?! The f***ing answer was <br>" + question1.ans +
						"<br> <img class='time-out' src='./assets/images-media/time_out.png'>"
					);//replace inside html with text that fills in blank with correct answer.

					var fiveSec=setTimeout(timerReset,5000);//change to 5000
					qCount++;
					var uncertainAudio = document.querySelector('.uncertainty').play();
					uncertainAudio.volume=0.1;

					//resultScreen()
					resultScreen();
				} //if(time === 0) 
				if (qCount === 8){ 
					clearInterval(timeInterval);
					clearTimeout(fiveSec)
					$('.display-results').html(
					"<h1> Final Results: </h1>" +
					"<p> Ricks: " + correct + "</p>" +
					"<p> Mortys: " + incorrect + "</p>");
					$('.reset-btn').css("display","block");

					document.querySelector('.uncertainty').pause();
					var video = document.querySelector('#reward');
					video.style.display = 'inline-block';
					video.play();
					video.volume=0.1;
				} 	
			}; //myTimer()


	$('.answers').on('click', function(){
		console.log("YEEZYYEEZy");
		//checks if correct answer
		if(($(this)[0].innerHTML || $(this)[1].innerHTML || $(this)[2].innerHTML || $(this)[3].innerHTML) === question1.ans){
			clearInterval(timeInterval);
			correct++;
			console.log('correct!@!@#!@#');
			$('.display-results').html("Good job. You're not as stupid as you look." +
				"<br> <img class='guess-right' src='./assets/images-media/guess_right.png'>"
				);
			var fiveSec= setTimeout(timerReset,5000); //change to 5000
			qCount++;
			var didItAudio = document.querySelector('.did-it').play();
			didItAudio.volume=0.1;
			//resultScreen
			resultScreen();
		}
		else{
			$('.display-results').html("You're a f***ing idiot, Morty! You've basically killed us all! The answer was  <br>" + question1.ans +
				"<br> <img class='guess-wrong' src='./assets/images-media/guess_wrong.png'>"
				);
			//get audio from standoff scene "Your really fuckign this up right now"
				clearInterval(timeInterval);
				incorrect++;
				console.log('WRONG!@!@#!@#');
				var fiveSec=setTimeout(timerReset,5000);//change to 5000
				//resultScreen
				resultScreen();
				qCount++;
				var wrongAudio = document.querySelector('.wronggg').play();
				wrongAudio.volume=0.1;
		}


		if (qCount === 8){ 
			clearInterval(timeInterval);
			clearTimeout(fiveSec);
			$('.display-results').html(
					"<h1> Final Results: </h1><br>" +
					"<p> Ricks: " + correct + "</p>" +
					"<p> Mortys: " + incorrect + "</p>");
			$('.reset-btn').css("display","block");

			var video = document.querySelector('#reward');
				video.style.display = 'inline-block';
				video.play();
				video.volume=0.1;

			document.querySelector('.wronggg').pause();
			document.querySelector('.did-it').pause();
		} 
	});//$('.answer').on('click'

			$('.reset-btn').on('click', function(){
				$('.reset-btn').css("display","none");
				$('#reward').css('display','none');
				var video = document.querySelector('#reward');
					video.pause();
				initialValue();	
				timerReset();
			});

	function doItAgain(){
		initialValue();	
		timerReset();
	}


//timerReset();	
});	//document ready	

	// var rotate = document.querySelector('.other-canvas').getContext('2d');
 //  rotate.save();
	// rotate.rotate(3.14);
	// // draw your object
	// rotate.restore();

//audio visualizer NEED TO ASK HOW TO GET IT TO WORK WITHOUT UPLOADING.
window.onload = function() {
  
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  
  file.onchange = function() {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.volume = 0.1;
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.querySelector(".canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      bars = 50;
      for (var i = 0; i < bars; i++) {
        barHeight = (dataArray[i]*3);
        
        var r = 255;
        var g = 43;
        var b = 58;

				//rgb(255,43,58) red try to make it blend to blue?

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
  };
};









