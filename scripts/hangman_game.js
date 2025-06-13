
class InputKey
{
    mDisabled;
    mKey;
    constructor(key,disabled)
    {
        this.mDisabled = disabled;
        this.mKey = key;
        
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
}

function    VirtualKeyboardClickHanlder(event)
{
    let dom_id = this.getAttribute("id");
    console.log("Key Press: " +dom_id);
    //const doc_elememnt = 
}


class Keyboard
{
    
    Init()
    {
        this.Letters = [

            new InputKey("Q",false),
            new InputKey("W",false),
            new InputKey("E",false),
            new InputKey("R",false),
            new InputKey("T",false),
            new InputKey("Y",false),
            new InputKey("U",false),
            new InputKey("I",false),
            new InputKey("O",false),
            new InputKey("P",false),

            new InputKey("A",false),
            new InputKey("S",false),
            new InputKey("D",false),            
            new InputKey("F",false),
            new InputKey("G",false),
            new InputKey("H",false),
            new InputKey("J",false),
            new InputKey("K",false),
            new InputKey("L",false),
            
            new InputKey("Z",false),
            new InputKey("X",false), 
            new InputKey("C",false),
            new InputKey("V",false),
            new InputKey("B",false),
            new InputKey("N",false),
            new InputKey("M",false),
        ];

        const keyboard_element = document.getElementById("virtual_keyboard");
        this.Letters.forEach(element => {
            let html = `<li class ="virtual_key" id="key_${element.mKey}">${element.mKey}</li>`;
            keyboard_element.innerHTML += html;
        });
        //add click event handler
        const elements = document.querySelectorAll(".virtual_key");
        elements.forEach(element =>{
            element.addEventListener("click",VirtualKeyboardClickHanlder);
        });
    }
    Reset()
    {

    }

}

class GuessWord
{
    mWordToGuess;
    mHint;

    SetupWordSprites()
    {
        const word_element = document.getElementById("guess_word");
        for(let i=0;i<this.mWordToGuess.length;i++)
        {
            const character = this.mWordToGuess[i];
            let html = `<li class="word_character">_</li>`;
            word_element.innerHTML += html;
        }

        const hint_element = document.getElementById("hint_element");
        let new_hint = "HINT: " +this.mHint;
        hint_element.textContent = new_hint;
    }

    SetGuessWord(word,hint)
    {
        console.log("Setting guess word: " +word);
        this.mWordToGuess = word;
        this.mHint = hint;        
    }

    GetNewWord()
    {
        //go and get new word
        //todo
        const _word = "keyboard"
        this.SetGuessWord(_word.toUpperCase(),"enter data with these");
    }

    Init()
    {
        this.GetNewWord();
        this.SetupWordSprites();
    }
}


class HangmanGame
{
    mGuessWord;
    mKeyboard;
    constructor()
    {
        this.mKeyboard = new Keyboard();
        this.mGuessWord = new GuessWord();
    }
    
    Init() 
    {
        //Get GuestWorld
        this.mGuessWord.Init();
        this.mKeyboard.Init();

    }
    HandleInput(input)
    {

    }
}






let gHangman = new HangmanGame();

gHangman.Init();