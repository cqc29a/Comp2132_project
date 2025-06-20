
class InputKey
{
    mDisabled;
    mKey;
    constructor(key,disabled)
    {
        this.mKey = key;
        this.mDisabled = disabled;
    }

    Init()
    {

    }
    SetCharacter()
    {

    }
    Display()
    {

    } 
    Reset()
    {
        this.mDisabled = false;
        //removed disabled class
        console.log("Virtual Key Reset: " +this.mKey);
        const keyboard_element = document.getElementById(this.mKey);
        if (keyboard_element.classList.contains("disabled_button"))
        {
            keyboard_element.classList.remove("disabled_button");
        }
        

    }
    
    VirtualKeyboardClickHanlder(event)
    {   
        
        const _element_id = event.target.getAttribute("id");
        console.log("event target id: " +_element_id);     
        //console.log("Key Press: " +this.mKey);
       //console.log("This. InputKey mKey: " +this.mKey +" disabled: " +this.mDisabled);  
        
        const input_key = gHangman.mKeyboard.mLetters.get(_element_id);
        console.log("InputKey mKey: " +input_key.mKey +" disabled: " +input_key.mDisabled);        
        
        if (input_key.mDisabled == false)
        {
            //grey out key so it cant be used again
            const keyboard_element = document.getElementById(_element_id);
            input_key.mDisabled = true;
            keyboard_element.classList.add("disabled_button");
        
            //send key to hangman
            gHangman.HandleInput(input_key.mKey);
        }
        
    }   
}




class Keyboard
{
    mLetters;
    constructor()
    {
        this.mLetters = new Map();
        this.mLetters.set("Q",new InputKey("Q",false));
        this.mLetters.set("W",new InputKey("W",false));
        this.mLetters.set("E",new InputKey("E",false));
        this.mLetters.set("R",new InputKey("R",false));
        this.mLetters.set("T",new InputKey("T",false));
        this.mLetters.set("Y",new InputKey("Y",false));
        this.mLetters.set("U",new InputKey("U",false));
        this.mLetters.set("I",new InputKey("I",false));
        this.mLetters.set("O",new InputKey("O",false));
        this.mLetters.set("P",new InputKey("P",false));
        
        this.mLetters.set("A",new InputKey("A",false));
        this.mLetters.set("S",new InputKey("S",false));
        this.mLetters.set("D",new InputKey("D",false));
        this.mLetters.set("F",new InputKey("F",false));
        this.mLetters.set("G",new InputKey("G",false));
        this.mLetters.set("H",new InputKey("H",false));
        this.mLetters.set("J",new InputKey("J",false));
        this.mLetters.set("K",new InputKey("K",false));
        this.mLetters.set("L",new InputKey("L",false));
            
        this.mLetters.set("Z",new InputKey("Z",false));
        this.mLetters.set("X",new InputKey("X",false)); 
        this.mLetters.set("C",new InputKey("C",false));
        this.mLetters.set("V",new InputKey("V",false));
        this.mLetters.set("B",new InputKey("B",false));
        this.mLetters.set("N",new InputKey("N",false));
        this.mLetters.set("M",new InputKey("M",false));
    

        const keyboard_element = document.getElementById("virtual_keyboard");
        this.mLetters.forEach(element => {
            let html = `<li class ="virtual_key" id="${element.mKey}">${element.mKey}</li>`;
            keyboard_element.innerHTML += html;
        });
        //add click event handler
        const elements = document.querySelectorAll(".virtual_key");
        elements.forEach(element =>{
            //some get pointer to Input key object
            const _element_id = element.getAttribute("id");
            console.log("Got ElementID:" +_element_id);
            const InputKeyObject = this.mLetters.get(_element_id);
            console.log("InputKey mKey: " +InputKeyObject.mKey +" disabled: " +InputKeyObject.mDisabled);
            element.addEventListener("click",InputKeyObject.VirtualKeyboardClickHanlder);
            
        });
    }

    Reset()
    {
        this.mLetters.forEach(function (value,key,map)
        {
            value.Reset();
        });
       
    }
}

const default_word =  "DEFAULT";

class GuessWord
{
    mWordToGuess = default_word;
    mHint;
    mWordElement;
    mCharactersCorrect = [];
    mNumberCharacters = 0;

    SetupWordSprites()
    {
        console.log("SetupWordSprites: " +this.mWordToGuess +" HINT : " +this.mHint);   
        for(let i=0;i<this.mWordToGuess.length;i++)
        {
            const character = this.mWordToGuess[i];
            let html = `<li class="word_character">_</li>`;
            this.mWordElement.innerHTML += html;
            this.mCharactersCorrect[i] = false;
        }

        const hint_element = document.getElementById("hint_element");
        let new_hint = "HINT: " +this.mHint;
        hint_element.textContent = new_hint;
    }

    SetGuessWord(word,hint,number_letters)
    {            
        this.mWordToGuess = word;
        this.mHint = hint; 
        this.mNumberCharacters =  number_letters;
        console.log("Setting guess word: " +this.mWordToGuess +" HINT : " +this.mHint);         
    }

    async GetNewWord()
    {
        //go and get new word
         const url = "https://www.wordgamedb.com/api/v1/words/random";
   
        try 
        {
            const response = await fetch(url);
            if (!response.ok) 
            {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);       
            const _word     = json.word;
            const _hint     = json.hint;
            const _num_char = Number(json.numLetters);
            console.log("Word: " +_word +" hint: " +_hint +" Num Char: " +_num_char);
            this.SetGuessWord(_word.toUpperCase(),_hint,_num_char);
        }

        catch (error) 
        {
            console.error(error.message);
        }
        this.SetupWordSprites();
    }    

    Init()
    {
        this.mWordElement = document.getElementById("guess_word");
        this.mWordElement.innerHTML ="";
        this.mCharactersCorrect = [];

        this.GetNewWord();
    }

    HasLetter(letter)
    {
        console.log("checking for letter: " +letter);
        if (this.mWordToGuess != this.default_word)
        {
            let result = false;
            for(let i=0;i<this.mWordToGuess.length;i++)
            {
                if(this.mWordToGuess[i] == letter)
                {
                    console.log("found letter: " +letter);
                    result = true;
                }
            }

            if (result == true)
            {
                console.log("HasLetter: true");
                return true;
            }
            else
            {
                console.log("HasLetter: false1");
                return false;
            }       
        }
        console.log("HasLetter: false2 guessword:" +this.mWordToGuess);
        return false;
    }

    DisplayLetter(letter)
    {
        if (this.mWordToGuess != this.default_word)
        {    
            let correct_letter = false;        
            for(let i=0;i<this.mWordToGuess.length;i++)
            {
                if(this.mWordToGuess[i] == letter)
                {
                    console.log("Correctly Guessed:" +letter);
                    this.mCharactersCorrect[i] = true;
                    this.mWordElement.children[i].innerText = letter;
                    correct_letter = true;
                }
            }

            if(correct_letter)
            {
                //postive feedback
            }

            //check for winning condition
            let winning = true;
            for(let i=0;i<this.mCharactersCorrect.length;i++)
            {
                if (this.mCharactersCorrect[i] == false)
                {
                       winning = false; 
                }
            }
            if(winning == true)
            {
                gHangman.WinGamePresentation();
            }

        }
    }
}

const default_health = 8;

class HangmanHUD
{
    mHealthElement;
    constructor()
    {
        this.mHealthElement = document.getElementById("health_display");
    }
    Reset()
    {
        this.mHealthElement.innerText =`${default_health}/${default_health}`;
    }

    Init()
    {
        this.Reset();
    }
    UpdateHealth()
    {
         this.mHealthElement.innerText =`${gHangman.mHealth}/${default_health}`;
    }
}




class HangmanGame
{
    mGuessWord;
    mKeyboard;
    mHealth;
    mWinLoseElement;
    mReplayButtonElement;
    mHealthHUD;

    constructor()
    {
        this.mKeyboard = new Keyboard();
        this.mGuessWord = new GuessWord();
        this.mHealthHUD = new HangmanHUD();
    }
    
    Init() 
    {
             
        this.mWinLoseElement = document.getElementById("win_lose_string");
        this.mReplayButtonElement = document.getElementById("replay_button");
        this.mReplayButtonElement.addEventListener("click",gHangman.Reset);

        //reset variables
        this.Reset();
    }
    
    WinGamePresentation()
    {       
        gHangman.mWinLoseElement.innerText = "You Win!";
        //play audio
        let audio = new Audio("../sounds/you-win.mp3");
        audio.play();

        if (gHangman.mHealth == default_health)
        {
            console.log("Play Perfect")
            setTimeout(function()
            {
                  let audio1 = new Audio("../sounds/perfect.mp3");
                    audio1.play();
            },1500);
        }
    }

    LoseGamePresentation()
    {
        gHangman.mWinLoseElement.innerText = "You Lose! The word was: " +gHangman.mGuessWord.mWordToGuess;
        //play audio
        let audio = new Audio("../sounds/you-lose.mp3");
        audio.play();

    }

    ReduceHealth()
    {
        this.mHealth--;
        console.log("Health: " +this.mHealth +"/"+default_health);
        if (this.mHealth == 0)
        {
            this.LoseGamePresentation();
        }
        this.mHealthHUD.UpdateHealth();
    }

    HandleInput(input)
    {
        //check if word had letter.
        const has_word = this.mGuessWord.HasLetter(input);
        if (has_word)
        {
            this.mGuessWord.DisplayLetter(input);
        }
        else
        {
            this.ReduceHealth();
        }
    }


    //replay
    Reset()
    {
        console.log("Reset Hangman Game");
        gHangman.mHealth = default_health;
        gHangman.mHealthHUD.Reset();
        gHangman.mGuessWord.Init();
        gHangman.mKeyboard.Reset();
        gHangman.mWinLoseElement.innerText = "Game Playing";

        //play audio
        let audio = new Audio("../sounds/coin.mp3");
        audio.play();

    }
}






let gHangman = new HangmanGame();

gHangman.Init();