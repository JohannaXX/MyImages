let characters = {
    batman: {
    name: "Batman",
    classname: "batman",
    health: 150,
    fightskills: 15,
    strength: 15,
    imageLeft: "https://raw.githubusercontent.com/JohannaXX/SuperheroRPG/master/images/BatmanL.png",
    imageRight: "https://raw.githubusercontent.com/JohannaXX/SuperheroRPG/master/images/BatmanR.png",
    },
    captainamerica: {
    name: "Captain America",
    classname: "captainamerica",
    health: 150,
    fightskills: 15,
    strength: 15,
    imageLeft: "https://raw.githubusercontent.com/JohannaXX/SuperheroRPG/master/images/CaptainL.png",
    imageRight: "https://raw.githubusercontent.com/JohannaXX/SuperheroRPG/master/images/CaptainR.png",
    },
    ironman: {
    name: "Iron Man",
    classname: "ironman",
    health: 150,
    fightskills: 15,
    strength: 15,
    imageLeft: "https://raw.githubusercontent.com/JohannaXX/SuperheroRPG/master/images/IronManL.png",
    imageRight: "https://raw.githubusercontent.com/JohannaXX/SuperheroRPG/master/images/IronManL.png"
    },
    superman: {
    name: "Super Man",
    classname: "superman",
    health: 150,
    fightskills: 15,
    strength: 15,
    imageLeft: "https://raw.githubusercontent.com/JohannaXX/SuperheroRPG/master/images/SupmanL.png",
    imageRight: "https://raw.githubusercontent.com/JohannaXX/SuperheroRPG/master/images/SupmanR.png"
    },
    wonderwoman: {
    name: "Wonder Woman",
    classname: "wonderwoman",
    health: 150,
    fightskills: 15,
    strength: 15,
    imageLeft: "https://raw.githubusercontent.com/JohannaXX/SuperheroRPG/master/images/WonderL.png",
    imageRight: "https://raw.githubusercontent.com/JohannaXX/SuperheroRPG/master/images/WonderR.png"
    }
};

let selectedHeroName;
let selectedEnemy;
let fightmodus = false;
let yrfighterchoosen = false;
let fighter;
let enemy;
let enemyNum = 0;

// START
function start() {
        console.log("Start ready to go");
        let herohtml = "";
        
        // Place heroes
        for (const key in characters) {
            enemyNum += 1;
            let dummy = characters[key].classname;  // how to access values from keys
            herohtml = herohtml + '<div class="' + characters[key].classname + '"><img class="' + characters[key].classname + '" src="'+ characters[key].imageLeft + '" ><h3>' + characters[key].name + '</h3><p class="heroHealth">Health: ' + characters[key].health + '</p></div>'; 
        } 
    
        let getHeroSelection = document.querySelector(".heroSelection");
        getHeroSelection.innerHTML = herohtml;
        
        const charList = document.querySelector('.heroSelection');
        charList.addEventListener('click', yourCharacter , false); 
};

//CHOOSE FIGHTERS
function yourCharacter(event) {
        let fighterOne;
        let fighterTwo;
        
        console.log("yourCharacter");
        if (fightmodus === false) {
            
            //CHOOSE YOUR SUPERHERO
            if (yrfighterchoosen === false){
                fighterOne = event.target.classList.value;
                let selectedHero = document.getElementsByClassName(fighterOne)[0];
                selectedHeroName = selectedHero;
                
                document.querySelector('.heroSelection').removeChild(selectedHeroName);
                document.getElementsByClassName("yrFighter")[0].appendChild(selectedHeroName);

                let getHeader = document.querySelector(".header");        
                getHeader.innerHTML = '<h1>FIGHT NIGHT</h1> <h2>Choose your enemy!</h2>';
                yrfighterchoosen = true;

            } 
            //CHOOSE ENEMY
            else { 
                fighterTwo = event.target.classList.value;
                
                let selectedHeroTwo = document.getElementsByClassName(fighterTwo)[0];
                selectedEnemy = selectedHeroTwo;
                
                document.getElementsByClassName("pcFighter")[0].appendChild(selectedEnemy);
                
                let getHeader = document.querySelector(".header"); 
                getHeader.innerHTML = '<h1>FIGHT NIGHT</h1><h2>Press attack to fight!</h2>';
                let getTextArea = document.querySelector(".textArea");
                getTextArea.innerHTML = "";

                let attackbutton = document.getElementById('btnAttack');
                attackbutton.style.visibility="visible";
                attackbutton.removeEventListener('click', yourCharacter ,false); 
                attackbutton.addEventListener('click', attack ,false); 

                fightmodus = true;
            }
        } else {
            return;
        }
};

//SETUP FIGHT
function attack() {
        console.log("attack");
        let getHeader = document.querySelector(".header");        
        getHeader.innerHTML = '<h1>FIGHT NIGHT</h1><h2>Press attack to fight!</h2>';
        
        let attackbutton = document.getElementById('btnAttack');
        let getTextArea = document.querySelector(".textArea");
        
        //FIGHT PARAMETERS
        let yourHP = characters[selectedHeroName.classList.value].health;
        let yourStrength = characters[selectedHeroName.classList.value].strength;
        let yourSkill = characters[selectedHeroName.classList.value].fightskills;
        let yourHits = yourStrength + Math.floor(Math.random() * Math.floor(9));
        let yourDamage = yourSkill + Math.floor(Math.random() * Math.floor(9));
        let yourAttack = yourHits + yourDamage;
        
        let enemyHP = characters[selectedEnemy.classList.value].health;
        let enemyStrength = characters[selectedEnemy.classList.value].strength;
        let enemySkill = characters[selectedEnemy.classList.value].fightskills;
        let enemyHits = enemyStrength + Math.floor(Math.random() * Math.floor(8));
        let enemyDamage = enemySkill + Math.floor(Math.random() * Math.floor(8));
        let enemyAttack = enemyHits + enemyDamage;
               
        yourHP -= enemyAttack;
        characters[selectedHeroName.classList.value].health = yourHP;
        
        enemyHP -= yourAttack;
        characters[selectedEnemy.classList.value].health = enemyHP;
        
        //ENEMY LOST - CHOOSE LAST OPPONENT
        if (enemyHP <= 0 && enemyHP <= yourHP && enemyNum === 3) {
            getHeader.innerHTML = '<h1>FIGHT NIGHT</h1> <h2>Choose your next enemy&#33;</h2>';
            getTextArea.innerHTML = "Great, just one more round to go&#33; Pick you last enemy." ;
            attackbutton.style.visibility="hidden";
            
            characters[selectedHeroName.classList.value].health = 150;
            characters[selectedEnemy.classList.value].health = 0;

            document.querySelector('.pcFighter .heroHealth').textContent=`Health: ${characters[selectedEnemy.classList.value].health}`;
            let enemyhtml = "";
            enemyhtml = enemyhtml + `<div class= "${characters[selectedEnemy.classList.value].classname}" ><img class= "${characters[selectedEnemy.classList.value].classname}" src="${characters[selectedEnemy.classList.value].imageRight}" ><h3>${characters[selectedEnemy.classList.value].name} </h3><p class="heroHealth"> Health: ${characters[selectedEnemy.classList.value].health} </p></div>`;
            
            let defeatedEnemy = document.getElementsByClassName("pcFighter")[0];
            let changeCat = defeatedEnemy.getElementsByTagName('div')[0];
            defeatedEnemy.removeChild(changeCat);
            document.getElementsByClassName("deadZone")[0].appendChild(changeCat);
            
            enemyNum -= 1;
            fightmodus = false; 
            
            const charList = document.querySelector('.heroSelection');
            charList.addEventListener('click', yourCharacter , false); 
            yourCharacter();
            return;
        } 
        //ENEMY LOST - PICK THE NEXT ONE
        else if (enemyHP <= 0 && enemyHP <= yourHP && enemyNum > 3) { 
            getHeader.innerHTML = '<h1>FIGHT NIGHT</h1> <h2>Choose your next enemy&#33;</h2>';
            getTextArea.innerHTML = "Well done, you knocked your opponent out&#33;" ;
            attackbutton.style.visibility="hidden";
            
            characters[selectedHeroName.classList.value].health = 150;

            document.querySelector('.yrFighter .heroHealth').textContent=`Health: ${characters[selectedHeroName.classList.value].health}`;
            let herohtml = "";
            herohtml = herohtml + `<div class="${ characters[selectedHeroName.classList.value].classname }"><img class="${characters[selectedHeroName.classList.value].classname}" src="${characters[selectedHeroName.classList.value].imageLeft}" ><h3>"${characters[selectedHeroName.classList.value].name}"</h3><p class="heroHealth">Health: "${characters[selectedHeroName.classList.value].health}"</p></div>`;
            characters[selectedEnemy.classList.value].health = 0;
            document.querySelector('.pcFighter .heroHealth').textContent=`Health: ${characters[selectedEnemy.classList.value].health}`;
            let enemyhtml = "";
            enemyhtml = enemyhtml + `<div class= "${characters[selectedEnemy.classList.value].classname}" ><img class= "${characters[selectedEnemy.classList.value].classname}" src="${characters[selectedEnemy.classList.value].imageRight}" ><h3>${characters[selectedEnemy.classList.value].name} </h3><p class="heroHealth"> Health: ${characters[selectedEnemy.classList.value].health} </p></div>`;
            
            
            let defeatedEnemy = document.getElementsByClassName("pcFighter")[0];
            let changeCat = defeatedEnemy.getElementsByTagName('div')[0];
            defeatedEnemy.removeChild(changeCat);
            document.getElementsByClassName("deadZone")[0].appendChild(changeCat);
            
            enemyNum -= 1;
            fightmodus = false; 

            const charList = document.querySelector('.heroSelection');
            charList.addEventListener('click', yourCharacter , false); 
            yourCharacter(); 
            return;
        } 
    
        //GAMEOVER 
        else if (yourHP <= 0 || enemyHP <= 0 && enemyHP >= yourHP ) {
            getTextArea.innerHTML = "Gameover, you lost&#33; Refresh the window to play again." ;
            attackbutton.style.visibility="hidden";
            attackbutton.removeEventListener('click', attack ,false); 
            
           // yourHP = 0;
            characters[selectedHeroName.classList.value].health = 0;
            document.querySelector('.yrFighter .heroHealth').textContent=`Health: ${characters[selectedHeroName.classList.value].health}`;
            let herohtml = "";
            herohtml = herohtml + `<div class="${ characters[selectedHeroName.classList.value].classname }"><img class="${characters[selectedHeroName.classList.value].classname}" src="${characters[selectedHeroName.classList.value].imageLeft}" ><h3>"${characters[selectedHeroName.classList.value].name}"</h3><p class="heroHealth">Health: "${characters[selectedHeroName.classList.value].health}"</p></div>`;

            if (enemyHP <0){
                characters[selectedEnemy.classList.value].health = 0;
                document.querySelector('.pcFighter .heroHealth').textContent=`Health: ${characters[selectedEnemy.classList.value].health}`;
                let enemyhtml = "";
                enemyhtml = enemyhtml + `<div class= "${characters[selectedEnemy.classList.value].classname}" ><img class= "${characters[selectedEnemy.classList.value].classname}" src="${characters[selectedEnemy.classList.value].imageRight}" ><h3>${characters[selectedEnemy.classList.value].name} </h3><p class="heroHealth"> Health: ${characters[selectedEnemy.classList.value].health} </p></div>`;
            }
            return;
        } 
    
        //YOU WON
        else if (yourHP > 0 && enemyHP <= 0 && enemyNum === 2) {
            getTextArea.innerHTML = "Congrats, you won&#33; Refresh the window to play again." ;
            
            attackbutton.style.visibility="hidden";
            attackbutton.removeEventListener('click', attack ,false);
            
            characters[selectedEnemy.classList.value].health = 0;
            document.querySelector('.pcFighter .heroHealth').textContent=`Health: ${characters[selectedEnemy.classList.value].health}`;
            let enemyhtml = "";
            enemyhtml = enemyhtml + `<div class= "${characters[selectedEnemy.classList.value].classname}" ><img class= "${characters[selectedEnemy.classList.value].classname}" src="${characters[selectedEnemy.classList.value].imageRight}" ><h3>${characters[selectedEnemy.classList.value].name} </h3><p class="heroHealth"> Health: ${characters[selectedEnemy.classList.value].health} </p></div>`;

            let defeatedEnemy = document.getElementsByClassName("pcFighter")[0];
            let changeCat = defeatedEnemy.getElementsByTagName('div')[0];
           
            defeatedEnemy.removeChild(changeCat);
            document.getElementsByClassName("deadZone")[0].appendChild(changeCat);
            return;
            
        } 
    
        //CALCULATE POINTS
        else {
            getTextArea.innerHTML = "This round you punched "+yourHits +" times and kicked "+yourDamage+".<br/>Your enemy punched "+enemyHits+" times and kicked "+enemyDamage+"." ;
         
        let herohtml = "";
        herohtml = herohtml + '<div class="' + characters[selectedHeroName.classList.value].classname + '"><img class="' + characters[selectedHeroName.classList.value].classname + '" src="'+ characters[selectedHeroName.classList.value].imageLeft + '" ><h3>' + characters[selectedHeroName.classList.value].name + '</h3><p class="heroHealth">Health: ' + characters[selectedHeroName.classList.value].health + '</p></div>';
        let getYrFighter = document.querySelector(".yrFighter");
        getYrFighter.innerHTML = herohtml;

        let enemyhtml = "";
        enemyhtml = enemyhtml + '<div class="' + characters[selectedEnemy.classList.value].classname + '"><img class="' + characters[selectedEnemy.classList.value].classname + '" src="'+ characters[selectedEnemy.classList.value].imageRight + '" ><h3>' + characters[selectedEnemy.classList.value].name + '</h3><p class="heroHealth">Health: ' + characters[selectedEnemy.classList.value].health + '</p></div>';
        let getPcFighter = document.querySelector(".pcFighter");
        getPcFighter.innerHTML = enemyhtml;
        }   
}


document.addEventListener('DOMContentLoaded', function() {
    start();
}, false);