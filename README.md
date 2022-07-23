# UFC Wordle!

This is a web application game inspired from the Wordle (https://www.nytimes.com/games/wordle/index.html) and Poeltl (https://poeltl.dunk.town/) online games. The game generates a random ranked UFC fighter that is hidden from the player and the goal is for the player to be able to guess this randomly generated fighter within 5 tries. 

Players can select fighters by searching for a fighter's name in the input box located at the top of the page and then selecting one of the fighters that appear in the dropdown menu. While the player searches for the right fighter, the game gives clues that helps point the player in the right direction. Every time the player makes a guess, the information/attributes of the guessed fighter is displayed on the screen. Fighter information includes the fighter's name, gender, weight class, rank number, height, reach, and age. If one of the guessed fighter's attributes matches with the same attribute of the mystery fighter, then that attribute section will be highlighted green. For example, if the fighter I guessed/selected is 30 years old and the mystery fighter is also 30 years old, then the age section will be highlighted green when the guessed fighter's information is displayed on the screen. In addition to this, the weight class, rank number, height, reach, and age sections will be highlighted yellow if one of the guessed fighter's attributes does not match up with the same attribute of the mystery fighter, but the value is only slightly off. For the weight class attribute, if the guessed fighter's weight class is only one weight class off from the mystery fighter's weight class, then the weight class section will be highlighted yellow. For example, if my guessed fighter was a Light Heavyweight but the mystery fighter was a Heavyweight, then the weight class section will be highlighted yellow when displaying the guessed fighter's information. Similarly, for the rank number, height, reach, and age sections, if the guessed fighter's attribute value for one of these sections is only off by 2, then that specific attribute section will be highlighted yellow. For example, if the reach of my guessed fighter was 70 inches but the reach of the mystery fighter was 71.5 inches, then the reach section will be highlighted yellow. Lastly, the rank weight class, rank number, height, reach, and age attribute sections have either an up or down pointing arrow depending on whether a specific attribute value of the mystery person is greater/higher or smaller than that specific attribute value of the guessed fighter. The arrow will always point in the direction of the correct value. For example, if my guessed fighter was a Light Heavyweight but the mystery fighter was a Heavyweight, then the weight class section will have an arrow pointing up. Another example is if the height of my guessed fighter is 70 inches but the height of the mystery fighter is 69 inches, then the height section will have an arrow pointing down.

Once the player has exhausted all guesses or was able to successfully guess the mystery fighter within 5 tries, then the input box will disappear from the page and will be replaced by a message that informs the player if the player was successful in guessing the mystery fighter within 5 tries or not. Furthermore, the information of the mystery fighter will be displayed at the top of the page and the history of the player's guesses will be displayed right under the revealed information of the mystery fighter. Lastly, the "Play Again" button will be located at the bottom of the page which the player can click if the player wishes to play the game again .

The Python file located in the src folder of this project is used to scrape all the athlete information from the UFC's website. Since the UFC updates their athlete and rankings information on a weekly basis, the Python file will also be run every week in order to update the information of the fighters accordingly and store this information within the female-fighters.json and male-fighters.json files, also located within the src folder.

This game can be demo'd by following this link here: https://magnificent-arithmetic-b380f8.netlify.app/ :-)
