const NUM_IDLE_FRAMES   = 4;
const KEN_ATTACK_FRAMES = 6;
const RYU_ATTACK_FRAMES = 4;
const HIT_R_FRAMES  = 4;
const WIN_FRAMES    = 3;



const FRAME_TIME_MS     = 160;
const IDLE_Y_POS        = 130;
const IDLE_X_POS        = 330;

const TALL_SPRITE_DELTA = 32;
const TALL_Y_POS        = IDLE_Y_POS - TALL_SPRITE_DELTA;
const IDLE_SPRITE_WIDTH = 64;


class FireballSprite
{
    mFireballElement;
    constructor()
    {
        this.mFireballElement = document.getElementById("fireball_sprite");
    }
    Display()
    {
        gFireball.mFireballElement.style.display="block";
        setTimeout(()=>
            {
                gFireball.mFireballElement.style.display = "none";
            },FRAME_TIME_MS);
    }
    Hide()
    {
         gFireball.mFireballElement.style.display = "none";
    }

}
class PlayerSprite
{
    mCharacterID;
    mAnimationID;
    mRequestedAnimationID;
    mAnimationFrame;
    mPlayerSpriteElement;
    constructor(character,sprite_element)
    {
        this.mCharacterID = character;
        this.mPlayerSpriteElement = sprite_element;
    }
    
    Init()
    {
        this.mAnimationID           = "idle";
        this.mRequestedAnimationID  = "idle";
        this.mAnimationFrame    = 0;
        if (this.mCharacterID == "ryu")
        {
            requestAnimationFrame(this.RyuDoIdle);
        }
        else if(this.mCharacterID == "ken")
        {
            requestAnimationFrame(this.KenDoIdle);
        }        
    }

    Reset()
    {
        if (this.mCharacterID == "ryu")
        {
            gRyu.mRequestedAnimationID = "idle";
        }
        else if(this.mCharacterID == "ken")
        {
             gKen.mRequestedAnimationID = "idle";
        }       
    }


    RyuDoIdle()
    {

        if(gRyu.mAnimationFrame == 0)
        {
            gRyu.mPlayerSpriteElement.style.width   = `64px`;
            gRyu.mPlayerSpriteElement.style.height  = `96px`;
            gRyu.mPlayerSpriteElement.style.top     = `${IDLE_Y_POS}px`;
            gRyu.mPlayerSpriteElement.style.left    = `${IDLE_X_POS}px`;
        } 

        //console.log("Player Sprite::DoIdle");
        let new_frame_url = `../images/ryu_idle_${gRyu.mAnimationFrame}.webp`;
        //console.log("this CharacterID: Ryu" +" DoIdle mAnimationFrame: " +gRyu.mAnimationFrame + "new image :" +new_frame_url);
        gRyu.mPlayerSpriteElement.src = new_frame_url;
        gRyu.mAnimationFrame ++;
        if(gRyu.mAnimationFrame > NUM_IDLE_FRAMES -1)
        {
            gRyu.mAnimationFrame = 0;
            gRyu.mRequestedAnimationID = "idle";
        }
        setTimeout(gRyu.RyuUpdate,FRAME_TIME_MS);
    }
    
    KenDoIdle()
    {
        if(gKen.mAnimationFrame == 0)
        {
            gKen.mPlayerSpriteElement.style.width   = `64px`;
            gKen.mPlayerSpriteElement.style.height  = `96px`;
            let ken_x_pos = IDLE_X_POS + IDLE_SPRITE_WIDTH;
            gKen.mPlayerSpriteElement.style.top     = `${IDLE_Y_POS}px`;
            gKen.mPlayerSpriteElement.style.left    = `${ken_x_pos}px`;
        } 
        //console.log("KEN Player Sprite::DoIdle");
        let new_frame_url = `../images/ken_idle_${gKen.mAnimationFrame}.webp`;
        //console.log("this CharacterID: Ken" +" DoIdle mAnimationFrame: " +gKen.mAnimationFrame + "new image :" +new_frame_url);
        gKen.mPlayerSpriteElement.src = new_frame_url;
        gKen.mAnimationFrame ++;
        if(gKen.mAnimationFrame > NUM_IDLE_FRAMES -1)
        {
           

            gKen.mAnimationFrame = 0;
            gKen.mRequestedAnimationID = "idle";
        }
        setTimeout(gKen.KenUpdate,FRAME_TIME_MS);
    }

    RyuDoAttack()
    {
        if (gRyu.mAnimationFrame == 0)
        {

            gRyu.mPlayerSpriteElement.style.width   = `128px`;
            gRyu.mPlayerSpriteElement.style.height  = `96px`;
         
        }
        //console.log("gRyu Player Sprite::gRyuDoAttack Y: " +gRyu.mPlayerSpriteElement.style.top);
        let new_frame_url = `../images/ryu_fireb_${gRyu.mAnimationFrame}.webp`;
        //console.log("this CharacterID: RYU" +" RYUDoAttack mAnimationFrame: " +gRyu.mAnimationFrame + "new image :" +new_frame_url);
        gRyu.mPlayerSpriteElement.src = new_frame_url;
        if (gRyu.mAnimationFrame == 3)
        {
            let sound = new Audio("../sounds/fireball.mp3");
            sound.play();
            gKen.mRequestedAnimationID = "hit_react";
            //show fireball
            gFireball.Display();
        }
        gRyu.mAnimationFrame ++;
        if(gRyu.mAnimationFrame > RYU_ATTACK_FRAMES -1)
        {
            gRyu.mAnimationFrame = 0;
            gRyu.mRequestedAnimationID = "idle";
        }
        setTimeout(gRyu.RyuUpdate,FRAME_TIME_MS);
    }

  

    KenDoAttack()
    {
        if (gKen.mAnimationFrame == 0)
        {
            let sound = new Audio("../sounds/dp.mp3");
            sound.play();
            gKen.mPlayerSpriteElement.style.width   = `96px`;
            gKen.mPlayerSpriteElement.style.height  = `128px`;
            gKen.mPlayerSpriteElement.style.top     =  `${TALL_Y_POS}px`;
            //play hit react on ryu
            gRyu.mRequestedAnimationID ="hit_react";
         
        }
        //console.log("KEN Player Sprite::KenDoAttack Y: " +gKen.mPlayerSpriteElement.style.top);
        let new_frame_url = `../images/ken_dp_${gKen.mAnimationFrame}.webp`;
        //console.log("this CharacterID: Ken" +" KenDoAttack mAnimationFrame: " +gKen.mAnimationFrame + "new image :" +new_frame_url);
        gKen.mPlayerSpriteElement.src = new_frame_url;
        gKen.mAnimationFrame ++;
        if(gKen.mAnimationFrame > KEN_ATTACK_FRAMES -1)
        {
            gKen.mAnimationFrame = 0;
            gKen.mRequestedAnimationID = "idle";
        }
        setTimeout(gKen.KenUpdate,FRAME_TIME_MS);
    }

    KenDoHitReaction()
    {        
        if (gKen.mAnimationFrame == 0)
        {
            let sound = new Audio("../sounds/hit.wav");
            sound.play();
            gKen.mPlayerSpriteElement.style.width   = `96px`;
            gKen.mPlayerSpriteElement.style.height  = `96px`;            

        }
        //console.log("KEN Player Sprite::KenDoHitReaction");
        let new_frame_url = `../images/ken_hit_r_${gKen.mAnimationFrame}.webp`;
        //console.log("this CharacterID: Ken" +" KenDoAttack mAnimationFrame: " +gKen.mAnimationFrame + "new image :" +new_frame_url);
        gKen.mPlayerSpriteElement.src = new_frame_url;
        gKen.mAnimationFrame ++;
        if(gKen.mAnimationFrame > HIT_R_FRAMES -1)
        {
            gKen.mAnimationFrame = 0;
            gKen.mRequestedAnimationID = "idle";
        }
        setTimeout(gKen.KenUpdate,FRAME_TIME_MS);
    }

    RyuDoHitReaction()
    {
        if (gRyu.mAnimationFrame == 0)
        {
            let sound = new Audio("../sounds/hit.wav");
            sound.play();
            gRyu.mPlayerSpriteElement.style.width   = `96px`;
            gRyu.mPlayerSpriteElement.style.height  = `96px`;
            //gRyu.mPlayerSpriteElement.style.top     = `96px`;

        }
        //console.log("KEN Player Sprite::KenDoHitReaction");
        let new_frame_url = `../images/ryu_hit_r_${gRyu.mAnimationFrame}.webp`;
        //console.log("this CharacterID: Ken" +" KenDoAttack mAnimationFrame: " +gRyu.mAnimationFrame + "new image :" +new_frame_url);
        gRyu.mPlayerSpriteElement.src = new_frame_url;
        gRyu.mAnimationFrame ++;
        if(gRyu.mAnimationFrame > HIT_R_FRAMES -1)
        {
            gRyu.mAnimationFrame = 0;
            gRyu.mRequestedAnimationID = "idle";
        }
        setTimeout(gRyu.RyuUpdate,FRAME_TIME_MS);
    }

    
    KenDoWin()
    {
        //console.log("KEN Player Sprite::KenDoWin");
        
        if (gKen.mAnimationFrame == 0)
        {
            
            gKen.mPlayerSpriteElement.style.width   = `64px`;
            gKen.mPlayerSpriteElement.style.height  = `128px`;
            gKen.mPlayerSpriteElement.style.top     = `${TALL_Y_POS}px`;
        }

        let new_frame_url = `../images/ken_win_${gKen.mAnimationFrame}.webp`;
        //console.log("this CharacterID: Ken" +" DoIdle mAnimationFrame: " +gKen.mAnimationFrame + "new image :" +new_frame_url);
        gKen.mPlayerSpriteElement.src = new_frame_url;
        gKen.mAnimationFrame ++;
        if(gKen.mAnimationFrame > WIN_FRAMES -1)
        {
            gKen.mAnimationFrame = 2;           
        }
        setTimeout(gKen.KenUpdate,FRAME_TIME_MS);
    }

    RyuDoWin()
    {
        //console.log("KEN Player Sprite::KenDoWin");
        
        if (gRyu.mAnimationFrame == 0)
        {
            gRyu.mPlayerSpriteElement.style.width   = `64px`;
            gRyu.mPlayerSpriteElement.style.height  = `128px`;
            gRyu.mPlayerSpriteElement.style.top     = `${TALL_Y_POS}px`;
        }

        let new_frame_url = `../images/ryu_win_${gRyu.mAnimationFrame}.webp`;
        //console.log("this CharacterID: Ken" +" DoIdle mAnimationFrame: " +gRyu.mAnimationFrame + "new image :" +new_frame_url);
        gRyu.mPlayerSpriteElement.src = new_frame_url;
        gRyu.mAnimationFrame ++;
        if(gRyu.mAnimationFrame > WIN_FRAMES -1)
        {
            gRyu.mAnimationFrame = 2;        
        }
        setTimeout(gRyu.RyuUpdate,FRAME_TIME_MS);
    }


    RyuUpdate()
    {
        //console.log("Player Sprite Update");
        //console.dir(this);
        //if no new animation request
        if (gRyu.mAnimationID != gRyu.mRequestedAnimationID)
        {
            //change animation
            gRyu.mAnimationID = gRyu.mRequestedAnimationID;
            gRyu.mAnimationFrame = 0;

        }
        
        {
            switch(gRyu.mAnimationID)
            {
                case "idle":
                    {
                        gRyu.RyuDoIdle();
                    }
                    break;
                case "attack":
                    {
                        gRyu.RyuDoAttack();
                    }
                    break;
                case "hit_react":
                    {
                        gRyu.RyuDoHitReaction();
                    }
                    break;
                case "win":
                    {
                        gRyu.RyuDoWin();
                    }
                    break;
                default:
                    break;    
            }
        }
    
    }

     KenUpdate()
    {
        //console.log("Player Sprite Update");
        //console.dir(this);
        //if no new animation request
        if (gKen.mAnimationID != gKen.mRequestedAnimationID)
        {
            //change animation
            gKen.mAnimationID = gKen.mRequestedAnimationID;
            gKen.mAnimationFrame = 0;

        }
        
        {
            switch(gKen.mAnimationID)
            {
                case "idle":
                    {
                        gKen.KenDoIdle();
                    }
                    break;
                case "attack":
                    {
                        gKen.KenDoAttack();
                    }
                    break;
                case "hit_react":
                    {
                        gKen.KenDoHitReaction();
                    }
                    break;
                case "win":
                    {
                        gKen.KenDoWin();
                    }
                    break;
                default:
                    break;    
            }
        }
    }  

}





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
        //console.log("Virtual Key Reset: " +this.mKey);
        const keyboard_element = document.getElementById(this.mKey);
        if (keyboard_element.classList.contains("disabled_button"))
        {
            keyboard_element.classList.remove("disabled_button");
        }
        

    }
    
    VirtualKeyboardClickHanlder(event)
    {   
        
        const _element_id = event.target.getAttribute("id");
        //console.log("event target id: " +_element_id);     
        //console.log("Key Press: " +this.mKey);
       //console.log("This. InputKey mKey: " +this.mKey +" disabled: " +this.mDisabled);  
        
        const input_key = gHangman.mKeyboard.mLetters.get(_element_id);
        //console.log("InputKey mKey: " +input_key.mKey +" disabled: " +input_key.mDisabled);        
        
        if (input_key.mDisabled == false && !gHangman.mGameOver)
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
            //console.log("Got ElementID:" +_element_id);
            const InputKeyObject = this.mLetters.get(_element_id);
           //console.log("InputKey mKey: " +InputKeyObject.mKey +" disabled: " +InputKeyObject.mDisabled);
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
        //console.log("SetupWordSprites: " +this.mWordToGuess +" HINT : " +this.mHint);   
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
        //console.log("Setting guess word: " +this.mWordToGuess +" HINT : " +this.mHint);         
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
            //console.log(json);       
            const _word     = json.word;
            const _hint     = json.hint;
            const _num_char = Number(json.numLetters);
            //console.log("Word: " +_word +" hint: " +_hint +" Num Char: " +_num_char);
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
        //console.log("checking for letter: " +letter);
        if (this.mWordToGuess != this.default_word)
        {
            let result = false;
            for(let i=0;i<this.mWordToGuess.length;i++)
            {
                if(this.mWordToGuess[i] == letter)
                {
                    //console.log("found letter: " +letter);
                    result = true;
                }
            }

            if (result == true)
            {
               // console.log("HasLetter: true");
                return true;
            }
            else
            {
                //console.log("HasLetter: false1");
                return false;
            }       
        }
       // console.log("HasLetter: false2 guessword:" +this.mWordToGuess);
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
                    //console.log("Correctly Guessed:" +letter);
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
    mGameOver = false;
    mPopupElement;
    mRound;
    mStartMusic;
    mAudioInstance;
    mPressStartButtonElement;
    mGameStarted;
    mGameWidget;
    mPlayer1;
    mPlayer2;

    constructor()
    {
        this.mKeyboard = new Keyboard();
        this.mGuessWord = new GuessWord();
        this.mHealthHUD = new HangmanHUD();
        this.mRound         = 0;
        this.mStartMusic    = 0;
        this.mGameStarted   = false;

    }
    
    Init() 
    {
             
        this.mWinLoseElement            = document.getElementById("win_lose_string");
        this.mReplayButtonElement       = document.getElementById("replay_button");
        this.mReplayButtonElement.addEventListener("click",gHangman.Reset);
        this.mPopupElement              = document.getElementById("Popup");
        this.mPressStartButtonElement   = document.getElementById("press_start_button");
        this.mPressStartButtonElement.addEventListener("click",gHangman.PressStart);
        this.mGameWidget                = document.getElementById("game_widget");


        gRyu.Init(); 
        gKen.Init();

        //hide keyboard until they press start.
        this.mGameWidget.style.display = "none";    
        gHangman.HidePopUp();

    }
    

    PressStart()
    {   
        //console.log("PressStart");     
        gHangman.mPressStartButtonElement.src = "../images/button_down.webp";
        setTimeout(function()
        {
            if(!gHangman.mGameStarted)
            {
                gHangman.Reset();
                gHangman.mGameStarted = true;
                gHangman.mGameWidget.style.display ="block";
            }
            gHangman.mPressStartButtonElement.src = "../images/button.webp";

        },1000);
    }

   
    ShowPopUp()
    {
        this.mPopupElement.style.display = "flex";
        //console.log("Show Popup");
    }

    HidePopUp()
    {
        this.mPopupElement.style.display = "none";
       // console.log("Show Popup");
    }

    WinGamePresentation()
    {   
        setTimeout(()=>{
            this.ShowPopUp();       
            gHangman.mGameOver = true;    
            gHangman.mWinLoseElement.innerText = "YOU WIN!";
            //play audio
            let audio = new Audio("../sounds/you-win.mp3");
            audio.play();

            if (gHangman.mHealth == default_health)
            {
                //console.log("Play Perfect")
                setTimeout(function()
                {
                    let audio1 = new Audio("../sounds/perfect.mp3");
                        audio1.play();
                },1500);
            }
            setTimeout(()=>{gRyu.mRequestedAnimationID ="win";},1000);  
        },2000);

       
      
        
    }

    LoseGamePresentation()
    {
        gHangman.ShowPopUp(); 
        gHangman.mGameOver = true;
        gHangman.mWinLoseElement.innerText = "YOU LOSE! WORD: " +gHangman.mGuessWord.mWordToGuess;
        //play audio
        let audio = new Audio("../sounds/you-lose.mp3");
        audio.play();
        setTimeout(()=>{gKen.mRequestedAnimationID ="win";},1000);        

    }

    ReduceHealth()
    {
        this.mHealth--;
        //console.log("Health: " +this.mHealth +"/"+default_health);
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
            gRyu.mRequestedAnimationID ="attack";
        }
        else
        {
            this.ReduceHealth();
            gKen.mRequestedAnimationID = "attack";
        }
    }

    ShuffleMusic()
    {
        gHangman.mStartMusic++;
        if (gHangman.mStartMusic > 4)
        {
           gHangman.mStartMusic = 0; 
        }
        //play round intro and music.
        if (gHangman.mAudioInstance !== undefined)
        {
            gHangman.mAudioInstance.pause();
        }
        switch(gHangman.mStartMusic)
        {
            case 1:
            gHangman.mAudioInstance = new Audio("../sounds/attract.mp3");           
            break;
            case 2:
            gHangman.mAudioInstance = new Audio("../sounds/ken.mp3");           
            break;
            case 3:
            gHangman.mAudioInstance = new Audio("../sounds/guile.mp3");           
            break;
            case 4:
            gHangman.mAudioInstance = new Audio("../sounds/ryu.mp3");           
            break;
        }
        gHangman.mAudioInstance.volume = 0.5;
        gHangman.mAudioInstance.play();
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
        gHangman.mGameOver = false;

        gHangman.HidePopUp();

        gHangman.mRound++;
        gHangman.ShuffleMusic();

        gRyu.Reset();
        gKen.Reset();

        
    }


    Update()
    {

        //check if music is done and loop if required.
        if (gHangman.mAudioInstance != undefined)
        {
            if (gHangman.mAudioInstance.ended)
            {
                gHangman.ShuffleMusic();
            }
        }        
        setTimeout(gHangman.Update,2000);        
       
    }
 
}





const ryu_sprite_element = document.getElementById("p1_sprite");
const ken_sprite_element = document.getElementById("p2_sprite");
let gHangman    = new HangmanGame();

let gRyu        = new PlayerSprite("ryu",ryu_sprite_element);
let gKen        = new PlayerSprite("ken",ken_sprite_element);
let gFireball   = new FireballSprite();

gFireball.Hide();
   
gHangman.Init();

gHangman.Update();