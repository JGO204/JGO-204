      /*  declaration of variables and some variable assignment and writing to the web page*/
      var sen_fin;

      sen_fin = prompt("Finish the sentence: To the window, to the....!");
      
   /* this is the right answer*/
      if (sen_fin == "wall" ) {
         document.write("<body bgcolor='#FFA233'>");
         document.write ('<img src = "Images/proposal2-2.jpg\" width=498 height=371>');
         }

   /*this could also be a right answer*/ 
      else if (sen_fin == "window" ) {
         document.write("<body bgcolor='#EDB469'>");
         document.write('<img src = "Images/proposal3-2.jpg\" width=486 height= 394>');
         }
   
   /*this is for all other text inputs*/ 
      else {
         document.write("<body bgcolor='#C23D10'>");
         document.write('<img src = "Images/proposal4-2.jpg\" width=510 height=225>');
         }