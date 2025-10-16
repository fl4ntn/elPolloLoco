function getExplanationBoardTemplate() {
    return `
    <div onclick="openExplanation()" class="explanation_box">
        <img class="map" src="img/map.png" alt="map">
        <p>EXPLANATION</p>
    </div>
    <div onclick="openSettings()" class="explanation_box">
        <img class="map rotate" src="img/settings.png" alt="map">
        <p>SETTINGS</p>
    </div>
    <div onclick="init()" class="explanation_box">
        <img class="map" src="img/old_door.png" alt="map">
        <p>START GAME</p>
    </div>
    `;
}


function getSettingsOverlay() {
    return `
    <div style="padding-top:64px;">
        <div class="settings">
            <div onclick="updateSoundSettings()" class="settings_option">
                <div class="ticked_box">
                    <div class="box"></div>
                    <div id="soundsettings" class="cross"></div>
                </div>
                <p class="font60">Sound</p>
            </div>
            <div onclick="switchLevelSettings()" class="settings_option">
                <div class="ticked_box">
                    <div class="box"></div>
                    <div id="level1settings" class="cross"></div>
                </div>
                <p class="font60">Level 1</p>
            </div>
            <div onclick="switchLevelSettings()" class="settings_option">
                <div class="ticked_box">
                    <div class="box"></div>
                    <div id="level2settings" class="cross"></div>
                </div>
                <p class="font60">Level 2</p>
            </div>
        </div>
        <div class="leave_settings">
            <p onclick="init()" class="font60">Start Game</p>
            <p onclick="getExplanationBoard()" class="font60">Go Back</p>
        </div>
    </div>
    `;
}


function getExplanaionOverlay() {
    return `
    <div class="settings">
        <div class="explanation_text">
            You are about to guide the tireless Pepe across the scorching desert. Along the way, enemies will block his path. Defeat them by jumping on their heads or by throwing one of your precious salsa bottles. <br>But be careful—at the end of the journey awaits a mighty final boss, so make sure to save a few bottles for the showdown.<br><br>
            On your adventure, you can also collect coins and salsa bottles simply by running into them. Every step brings Pepe closer to victory—will you lead him through the desert?
        </div>
        <div class="keyboard_explanation">
            <div>
                <p class="font40">Walk:</p>
                <p class="font40">Jump:</p>
                <p class="font40">Throw:</p>
            </div>
            <div>
                <p class="font40">Arrow left/right</p> 
                <p class="font40">Arrow up/Space</p>   
                <p class="font40">D</p>
            </div>  
        </div> 
        <div class="leave_explanation">
            <p onclick="init()" class="font40 hover">Start Game</p>
            <p onclick="getExplanationBoard()" class="font40 hover">Go Back</p>
        </div>
    </div>
    `;
}


function getYouLostScreen(i) {
    return `
    <div class="settings">
        <img class="you_lost_img" src="img/You won, you lost/You lost.png" alt="You Lost">
        <div class="reason_for_loss">
            <p class="font40">${reasonsToLooose[i]}</p>
        </div>
        <div class="leave_explanation">
            <p onclick="init()" class="font40 hover">Try Again</p>
            <p onclick="getExplanationBoard()" class="font40 hover">Leave Game</p>
        </div>
    </div>
    `;
}


function getYouWonScreen(i, enemiesKilled) {
    playSound(winnerAudio, 0.2);
    return `
    <div class="settings">
        <img class="you_won_img" src="img/You won, you lost/You won A.png" alt="You Won">
        <div class="results">
            <div class="result_div">
                <p class="font40">Coins earned:</p>
                <p class="font40">${Math.round(i)} / 100</p>
            </div>
            <div class="result_div">
                <p class="font40">Enemies killed:</p>
                <p class="font40">${enemiesKilled}</p>
            </div>  
        </div> 
        <div class="leave_explanation">
            <p onclick="init()" class="font40 hover">Play Again</p>
            <p onclick="getExplanationBoard()" class="font40 hover">Leave Game</p>
        </div>
    </div>
    `;
}
