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
    <div class="settings_div">
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

function getImprintScreen(){
    return `
    
    <div class="whole_imprint">
       
        <div class="content">
            <div class="sub_div">
                <div class="sub_heading">1. Acceptance of Terms</div>
                <div>By accessing or playing El Pollo Loco, you agree to be bound by these Terms of Use and all
                    applicable laws and regulations. If you do not agree, you must not use the game.</div>
            </div>
            <div class="sub_div">
                <div class="sub_heading">2. License</div>
                <div>El Pollo Loco is provided for personal, non-commercial use only. You are granted a limited,
                    non-exclusive, non-transferable license to access and play the game.
                    <br><br><u>You may not:</u>
                    <br>

                    - Copy, modify, or distribute the game or its source code without permission.
                    <br>
                    - Reverse engineer or attempt to extract the source code.
                    <br>
                    - Use the game for unlawful or harmful purposes.
                </div>
            </div>
            <div class="sub_div">
                <div class="sub_heading">3. Intellectual Property</div>
                <div>All content, graphics, code, and other materials related to El Pollo Loco are owned by the
                    developer unless otherwise stated. Unauthorized use may violate copyright, trademark, or other
                    laws.</div>
            </div>
            <div class="sub_div">
                <div class="sub_heading">4. Disclaimer of Warranties</div>
                <div>El Polo Loco is provided “as is” without any warranties, express or implied. The owner makes no
                    guarantees that the game will be error-free, uninterrupted, or compatible with all devices.</div>
            </div>
            <div class="sub_div">
                <div class="sub_heading">5. Limitation of Liability</div>
                <div>To the fullest extent permitted by law, the owner shall not be liable for any damages resulting
                    from the use or inability to use the game, including but not limited to loss of data, device
                    malfunction, or indirect damages</div>
            </div>
            <div class="sub_div">
                <div class="sub_heading">6. User Conduct</div>
                <div>You agree not to use El Pollo Loco in any way that could damage, disable, or impair the servers,
                    networks, or other infrastructure supporting it. Cheating, exploiting bugs, or using unauthorized
                    third-party tools is strictly prohibited.</div>
            </div>
            <div class="sub_div">
                <div class="sub_heading">7. Privacy</div>
                <div>El Pollo Loco does not intentionally collect personal data unless explicitly stated.</div>
            </div>
            <div class="sub_div">
                <div class="sub_heading">8. Updates and Changes</div>
                <div>The owner reserves the right to update, modify, or discontinue the game at any time without prior
                    notice. Terms of Use may also be updated, and continued use of the game constitutes acceptance of
                    those changes.</div>
            </div>
            <div class="sub_div">
                <div class="sub_heading">9. Governing Law</div>
                <div>These Terms shall be governed by and construed in accordance with the laws of your country. Any
                    disputes arising from the use of the game shall be subject to the jurisdiction.</div>
            </div>
            <div class="sub_div">
                <div class="sub_heading">10. Contact Information</div>
                <div>If you have any questions regarding these Terms, please contact:
                    Flynn Anton - my.email@email.com - +491786806732 - Niemeyerstr. 10, 30449 Hannover</div>
            </div>

        </div>
        <div onclick="closeImprint()">Go back<div>

    </div>
    
    `
}
