function playButton(){
   
// declaration of variables
var movie_name;
// asked the user a question
   movie_name = prompt("What is the name of this movie?");
         if (movie_name == "the proposal") {
             // when they get the question right
            document.write("<h2> You are correcto!</h2>");
         }
         
         else {
             //when they get the question wrong
            document.write("<h2> wrong.</h2>");
         }
}



