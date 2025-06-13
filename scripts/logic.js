const rotate_left_button    = document.getElementById("rotate_left");
const rotate_right_button   = document.getElementById("rotate_right");
const stop_rotation_button  = document.getElementById("stop_button");
const main_product_image    = document.getElementById("main_image_view");
const pacman_sprite         = document.getElementById("pacman_sprite");
const pacman_controls       = document.getElementById("pacman_controls");
const pacman_screen         = document.getElementById("arcade_screen");

const pacman_left_indicator     = document.getElementById("joystick_left");
const pacman_right_indicator    = document.getElementById("joystick_right");
const pacman_up_indicator       = document.getElementById("joystick_up");
const pacman_down_indicator     = document.getElementById("joystick_down");
const pacman_stop_indicator     = document.getElementById("joystick_stop");


let current_active_button       = "unknown_button";
let current_animation_frame     = Number(1);
let frame_delta                 = Number(0);
const lower_frame_number        = Number(1);
const upper_frame_number        = Number(34);
let current_animation_handle    = 0;

let pacman_delta_x              = Number(0);
let pacman_delta_y              = Number(0);
let pacman_x                    = Number(0);
let pacman_y                    = Number(0);
let pacman_stationary           = true;
let animation_started           = false;

function RotationButtonClickHandler(event)
{   
    const button_ID = this.getAttribute("id");  
  
    switch(button_ID)
    {
        case "rotate_left":
            frame_delta = 1;
            break;
        case "rotate_right":
            frame_delta = -1;
            break;
        case "stop_button":
            frame_delta = 0;
            break;
        default:
            break;    
    }
    
    if (current_active_button == "unknown_button")
    {   
        current_active_button = button_ID;
        requestAnimationFrame(UpdateAnimationFrame);
    }
}

function UpdateAnimationFrame()
{
    let new_frame_number = current_animation_frame + frame_delta;
    if (new_frame_number < lower_frame_number)
    {
        new_frame_number = upper_frame_number;
    }
    else if (new_frame_number > upper_frame_number)
    {
         new_frame_number = lower_frame_number;
    }
    //change bike image
    let new_frame_url = `../images/bike-${new_frame_number}.jpg`;
    main_product_image.src = new_frame_url;
    current_animation_frame = new_frame_number;
    setTimeout(function(){requestAnimationFrame(UpdateAnimationFrame);},50);
    
}

function InitRotationButtons()
{
    rotate_left_button.addEventListener("click",RotationButtonClickHandler);
    rotate_right_button.addEventListener("click",RotationButtonClickHandler);
    stop_rotation_button.addEventListener("click",RotationButtonClickHandler);
}

/*PAC MAN*/
const PACMAN_SPEED = Number(2);
function KeyReleaseHandler(event)
{
    const input = event.key; 
     switch(input)
    {
        case "ArrowRight":
            pacman_right_indicator.classList.remove("button_highlight");
            event.preventDefault();
            break;
        case "ArrowLeft":
            pacman_left_indicator.classList.remove("button_highlight");
            event.preventDefault();
            break;
        case "ArrowUp":
            pacman_up_indicator.classList.remove("button_highlight");
            event.preventDefault();
            break;
        case "ArrowDown":
            pacman_down_indicator.classList.remove("button_highlight");
            event.preventDefault();
            break;
        case "0":
            pacman_stop_indicator.classList.remove("button_highlight");
            event.preventDefault();
            break;
        default:
            break;
    }
}


function PacmanInputControlHandler(event)
{
    const input = event.key;   
    switch(input)
    {
        case "ArrowRight":
            pacman_delta_x = PACMAN_SPEED;
            pacman_delta_y = 0;
            pacman_right_indicator.classList.add("button_highlight");
            event.preventDefault();
            break;
        case "ArrowLeft":
            pacman_delta_x = -PACMAN_SPEED;
            pacman_delta_y = 0;
            pacman_left_indicator.classList.add("button_highlight");
            event.preventDefault();
            break;
        case "ArrowUp":
            pacman_delta_y = -PACMAN_SPEED;
            pacman_delta_x = 0;
            pacman_up_indicator.classList.add("button_highlight");
            event.preventDefault();
            break;
        case "ArrowDown":
            pacman_delta_y = PACMAN_SPEED;
            pacman_delta_x = 0;
            pacman_down_indicator.classList.add("button_highlight");
            event.preventDefault();
            break;
        case "0":
            pacman_delta_x = 0;
            pacman_delta_y = 0;
            pacman_stationary= true;
            pacman_stop_indicator.classList.add("button_highlight");
            event.preventDefault();
            break;
        default:
            break;
    }
    if (!animation_started)
    {           
        animation_started = true;
        requestAnimationFrame(UpdatePacman);
    }
}

function UpdatePacman()
{
    pacman_x += pacman_delta_x;
    pacman_y += pacman_delta_y;
    pacman_sprite.style.left    = `${pacman_x}px`; 
    pacman_sprite.style.top     = `${pacman_y}px`;
    /*check for crossing going offscreen*/    
    RenderPacMan();
}


function RenderPacMan()
{
    if ((pacman_delta_x === 0) && (pacman_delta_y === 0))
    {
        pacman_sprite.src = "../images/pac-man-static.gif";
    }
    else
    {
        if(pacman_stationary)
        {
            pacman_sprite.src = "../images/pac-man-fast.gif";
            pacman_stationary = false;
        }
    }
    /*check screen edge*/
    const left_screen_edge      = Number(0);
    const right_screen_edge     = pacman_screen.offsetWidth -pacman_sprite.offsetWidth;
    const top_screen_edge       = Number(0);
    const bottom_screen_edge    = pacman_screen.offsetHeight -pacman_sprite.offsetWidth;

    if (pacman_x < left_screen_edge)
    {
        pacman_delta_x = PACMAN_SPEED;
    }

    if (pacman_x > right_screen_edge)
    {
        pacman_delta_x = -PACMAN_SPEED;
    }

    if(pacman_y < top_screen_edge)
    {
        pacman_delta_y = PACMAN_SPEED;
    }

    if(pacman_y > bottom_screen_edge)
    {
        pacman_delta_y = -PACMAN_SPEED;
    }


    /*set rotation */
    if (pacman_delta_x > 0)
    {
        pacman_sprite.style.transform ="rotate(0deg)";
    }
    if (pacman_delta_x < 0)
    {
        pacman_sprite.style.transform ="rotate(180deg)";
    }

    if (pacman_delta_y > 0)
    {
        pacman_sprite.style.transform ="rotate(90deg)";
    }
    if (pacman_delta_y < 0)
    {
        pacman_sprite.style.transform ="rotate(-90deg)";
    }
    
    requestAnimationFrame(UpdatePacman);
}

function WindowResizeHandler(event)
{
    console.log("Arcade Screen Size " +pacman_screen.offsetWidth);
    /*set the arcade height accordingly so its square.*/
    pacman_screen.style.height = `${pacman_screen.offsetWidth}px`;
}


function InitPacManControls()
{
    pacman_screen.style.height = `${pacman_screen.offsetWidth}px`;
    document.addEventListener("keydown",PacmanInputControlHandler);
    document.addEventListener("keyup",KeyReleaseHandler);
    window.addEventListener("resize",WindowResizeHandler);
     
}




InitRotationButtons();
InitPacManControls();



