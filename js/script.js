const PROMPT_KEEP = "Would you like to keep playing this game? y/n";
const PROMPT_PICK = "Would you like to pick another game to play?  y/n"; 
const isYes = s => String(s ?? "").trim().toLowerCase() === "y";

function startPlaying(gameFn){
  let keep = true;
  while(keep){
    gameFn(); 
keep = isYes(prompt(PROMPT_KEEP));
}
  const another = isYes(prompt(PROMPT_PICK));
if(!another){
    const box = document.getElementById("farewell");
    if(box){
      box.hidden = false;
      const msg = document.getElementById("farewellMsg");
      if(msg) msg.textContent = "Thanks for playing the Arcade!";
    }
  }
}
// Function(arrow)_Guessing Game
window.guessingGame = () => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  let guessCount = 0;
  let message = "Guess a number 1-10:";

  while (true) {
    const input = prompt(message);
    if (input === null) { 
      alert("Canceled.");
      return; 
    }
    const n = Number(input);
    if (!Number.isInteger(n) || n < 1 || n > 10) {
      alert("Invalid input. Please enter a whole number from 1 to 10.");
      continue;
    }
    guessCount++;
    if (n < randomNumber) {
      message = "Your guess was too low. Guess again.";
      continue;
    } else if (n > randomNumber) {
      message = "Your guess was too high. Guess again.";
      continue;
    } else {
      alert(`You guessed it in ${guessCount} guesses!`);
      return;
    }
  }
};
// Function(Expressions)_Consult the Oracle
window.consultOracle = function () {
  const q = prompt("Ask the Oracle a yes/no question:");
  if(q === null || String(q).trim() === ""){
    alert("No input provided.");
    return;
  }
  const answers = [
    "It is certain","It is decidedly so","Yes","Most likely","Outlook good",
    "Ask again later","Cannot predict now","Reply hazy, try again",
    "Don't count on it","My reply is no","Very doubtful","No"
  ];
  const pick = answers[Math.floor(Math.random()*answers.length)];
  let outcome;
  if(/^(it is certain|it is decidedly so|yes|most likely|outlook good)$/i.test(pick)){
    outcome = "You win!";
  } else if(/don't count|reply is no|very doubtful|no/i.test(pick)){
    outcome = "You lose.";
  } else {
    outcome = "It's a tie.";
  }
  alert("Oracle says: " + pick + "\n" + outcome);
};
// Function(Declarations)_Bear Ninja Hunter
function bnh(){
  const raw = prompt("Type one: Bear, Ninja, or Hunter");
  if(raw === null){ alert("Canceled."); return; }
  let player = String(raw).trim();
  if(!player){ alert("No input provided."); return; }
  player = player.charAt(0).toUpperCase() + player.slice(1).toLowerCase();
  const choices = ["Bear","Ninja","Hunter"];
  if(!choices.includes(player)){
    alert("Invalid choice. Please type Bear, Ninja, or Hunter.");
    return;
  }
  const comp = choices[Math.floor(Math.random()*choices.length)];
  let result;
  if(player === comp){
    result = "It's a tie!";
  } else if(
    (player==="Bear"&&comp==="Ninja")||
    (player==="Ninja"&&comp==="Hunter")||
    (player==="Hunter"&&comp==="Bear")
  ){
    result = "You win!";
  } else {
    result = "The computer wins!";
  }
  alert("You chose " + player + ".\nThe computer chose " + comp + ".\n" + result);
}

window.bnh = bnh;
window.consultOracle = window.consultOracle;
window.guessingGame = window.guessingGame;
// connect buttons to session loop
(function(){
  try{
    const hasStart = (typeof window.startPlaying === "function");

    if(!hasStart){
      function isYes(s){ return !!(s && String(s).trim().toLowerCase().startsWith('y')); }
// session: rounds, then keep playing or pick another game
      function playingSession(roundFn){
        let keep = true;
        while(keep){
          roundFn();
          keep = isYes(prompt("Would you like to keep playing this game? y/n")) ? true : false;
        }
        const another = isYes(prompt("Would you like to pick another game to play?  y/n")) ? true : false;
        if(!another){
          const box = document.getElementById("farewell");
          if(box){ box.hidden = false; }
          const msg = document.getElementById("farewellMsg");
          if(msg){ msg.textContent = "Thanks for playing the Arcade!"; }
          const reload = document.getElementById("reloadBtn");
          if(reload){ reload.addEventListener("click", function(){ location.reload(); }); }
        }
      }
    }

    if (typeof window.guessingGame === "function"){
      const _roundGG = window.guessingGame;
      window.guessingGame = () => hasStart ? window.startPlaying(_roundGG) : playingSession(_roundGG);
    }
    if (typeof window.consultOracle === "function"){
      const _roundCO = window.consultOracle;
      window.consultOracle = function(){ return hasStart ? window.startPlaying(_roundCO) : playingSession(_roundCO); };
    }
    if (typeof window.bnh === "function"){
      const _roundBNH = window.bnh;
      function bnh(){ return hasStart ? window.startPlaying(_roundBNH) : playingSession(_roundBNH); }
      window.bnh = bnh;
    }
  }catch(e){
 }
})();
