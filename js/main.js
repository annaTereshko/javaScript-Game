
function el(css){
    return document.querySelector(css);
};


     function kollision(a,b){
         
         if(a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.h + a.y > b.y
         ){
             return true;
         }else{
             
             return false;
         };
         
     }; //ENDE kollision
    
    
    
    
    let cklickNumber = 0;
    let score = 0;
    let treff= 0;
    let elternSammler = {};
    let elternIndex = 0;    
    let x=0;
    let y=0;
    let kinderSammler = {};
    let kinderIndex = 0;
    let birdsQuantity = 0;
    let mouthPositionX = 100;
    let control = true;
    
    
  


   
let basketObject= {
    
            basket:         0,
            x:              0, //left
            y:              620, //top
            w:              80,
            h:              80,
    setBasket: function(){
        
            this.basket=document.createElement('img');
            this.basket.src = 'img/basket.png';
			this.basket.id = 'basket'
            el('#container').appendChild(this.basket);
            this.basket.style.height ='80px';
            
            this.x= mouthPositionX;
            this.y= 620;
            this.w=80;
            this.h=80; 
			this.basket.style.top = this.y + 'px';
    }
    
};//ENDE Basket Objekt
 


    
    let birdObject= {
        birdRandom:     0,
        birdImg:        0,
        basket:         0,
        size :          0,
        speedX :        0,
        speedY:         0,
        x:              0, //left
        y:              0, //top
        w:              0,
        h:              0,
        rx:             0,
        ry:             0,
        birds:          true,
        randomBird:     0,
		id:				0,
        
        
        setBird: function(){ 
            
         

        if(this.birds){ // make Birds
            
            this.size = Math.ceil(Math.random()*60)+50;
            this.birdImgRandom = Math.ceil(Math.random()*8);
            this.birdImg = document.createElement('img');
            this.birdImg.addEventListener('mousedown', removeBirds);
            this.birdImg.addEventListener('mousedown', rechneTreffe);
            this.birdImg.src = 'img/bird_'+this.birdImgRandom+'.png';
            el('#container').appendChild(this.birdImg);
            this.birdImg.className = "birds";  
            
            this.birdImg.setAttribute('data-nr', elternIndex);  
            this.birdImg.style.height = this.size+'px';
            
            this.h = this.size;
            this.w = this.size;
                //BIRDS von links und rechts
            
            if (elternIndex % 2 === 0){
				this.x = zufall(-20,0);
				
			}else{
				 this.x = zufall(710,720);
				
			}; //ENDE if
                
            this.y = Math.ceil(Math.random()*300);
                
            this.speedX = Math.ceil(Math.random()*2)+1;
            this.speedY = Math.ceil(Math.random()*2)+1;   
                
            elternSammler[elternIndex] = this;
      
            elternIndex++;
            

                
        } //ENDE if this.birds
                
            else{
                
                //Birds Quantity in elternSammler
                
               
				//#####################################################
				// Last change
				
				let keys = Object.keys(elternSammler);
				let randomNum= Math.floor(Math.random()*keys.length);
				
				this.randomBird = elternSammler[keys[randomNum]]
				
				if (keys.length > 0 ){
                 this.y = this.randomBird.y;
                 this.x = this.randomBird.x;					
					
                // this.y = elternSammler[this.randomBird].y;
                // this.x = elternSammler[this.randomBird].x;
                }
				
				// Last change
				//#####################################################
				
				
                this.speedY = 1;
                this.speedX = 0;
                this.id = kinderIndex;
                
                this.CoinImg = document.createElement('img');
                this.CoinImg.src = 'img/coin.png';
                el('#container').appendChild(this.CoinImg);
                this.CoinImg.className = "coins";  
                this.CoinImg.setAttribute('data-nr', kinderIndex);  
			
                this.CoinImg.style.height = '20px';
                this.w=20;
                this.h=20;
                
        
                kinderSammler[kinderIndex] = this;
                kinderIndex++;
                
        }; // ENDE else
        
           

    
    },// ENDE setBird
        
        
        //Birds bewegen
        
        move: function(){
            
     
        
            if(this.x > 680){
            this.rx = 1;
            this.speedX = Math.ceil(Math.random()*2)+1;
        
            };    
    
            if(this.x < 0){
            this.rx = 0;
            this.speedX = Math.ceil(Math.random()*2)+1;
        
            };
        
            
            
        
            if(this.y > 400){
            this.ry = 1;
            this.speedY = Math.ceil(Math.random()*2)+1;
        
        
            };
        
            if(this.y < 50){
            this.ry = 0;
            this.speedY = Math.ceil(Math.random()*2)+1;
        
        
            };

    
        
            if(this.rx===1){this.x -= this.speedX;};
            if(this.rx===0){this.x += this.speedX;};
            if(this.ry===1){this.y -= this.speedY;};
            if(this.ry===0){this.y += this.speedY;};
        

            
            
            this.birdImg.style.left = this.x+'px';
            this.birdImg.style.top = this.y+'px';
                

    
        },// ENDE move
        
        // Cooins bewegen
        
         moveCoins: function(){
            
            this.y += this.speedY;
            this.CoinImg.style.top = this.y+'px';
            this.CoinImg.style.left = this.x+'px';
             
	   //Kollisionsabfrage
             
        if(kollision(this, basketObject)){
           
            
            score=score+5;
            
            el('#scoreCount').innerHTML='SCORE: ' + score;
            
            el('#container').removeChild(this.CoinImg);
			  delete kinderSammler[this.id];
            
            
			 
            };
			
			 // ENDE KollisionsAbfrage
        
		      //Wenn coins den bottom von container erreicht haben, werden sie gelöscht
		
            if(this.y > 720){
				   
				 delete kinderSammler[this.id];
				    console.log(kinderSammler)
				
				el('#container').removeChild(this.CoinImg);
     
             };

 
    
         }, //ENDE  moveCoins
        
        
};// ENDE Objekt
    
   


//Damit Birds zufällig entweder von rechts oder von links erscheinen

function zufall(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
    
    
} 


//make Birds Objects

let makeBirds = setInterval( 
    
                function(){
                    let klon = Object.create(birdObject);
                    klon.setBird();
                    
                    birdsQuantity = Object.keys(elternSammler).length;
                },  // elterbSammler length
    
                2000);
    
    

 //make Coin Objects

let makeCoins = setInterval(
    
                function(){
                let klon = Object.create(birdObject);
                klon.birds = false;
                klon.setBird(); 
				
                }, 
   
                5000);

 //make Basket Object
  
function makeBasket(){
    
    let basketObj;
    basketObj = Object.create(basketObject);
    basketObj.setBasket();
    
};
    

//Bewegung aktivieren 
function moveObjects(){
    
/*    let newBirdsObject={};
    let BirdNumber;*/
    
        for(let i in elternSammler){    
        
       elternSammler[i].move();
        
        
    //Hier habe ich die Function Birds Kollision angefangen, funktioniert aber noch nich fehlerfrei
        
 /*       if(i>0){ 
        
            for(let ii in newBirdsObject){
        
                if(kollision(elternSammler[i], newBirdsObject[ii])) {
                   
                delete elternSammler[i];
                let deleteFirstBird = document.querySelector('img[data-nr="' + i + '"]');
                el('#container').removeChild(deleteFirstBird);
                    
                    
                    
                   
                let dataNumber = newBirdsObject[ii].id;
                    
                let deleteSecondBird = document.querySelector('img[data-nr="' + dataNumber + '"]');
                el('#container').removeChild(deleteSecondBird);
                delete newBirdsObject[ii];
                      
                
                break;  
                
                    
                };

                    
                newBirdsObject.i=elternSammler[i];
                newBirdsObject.i.id=i;
                console.log(newBirdsObject.i);
       
            };
            
            
        };
    */
         
    };
              
  for(let i in kinderSammler){
			
			 kinderSammler[i].moveCoins();
			
  };

    
requestAnimationFrame(moveObjects);
  
};//ENDE moveObjects
    

//Delete Birds Objects und html Elemente
function removeBirds(){
    
    let id = this.getAttribute('data-nr');
    delete elternSammler[id];
    let deleteBird = document.querySelector('img[data-nr="' + id+ '"]');
    el('#container').removeChild(deleteBird);
    
}; //ENDE removeBirds

// Counter ershaffen
let counter = document.createElement('div'); 
el("#container").appendChild(counter);
counter.id="counter";


//Counter aktivieren

function countdown() {
            
            let seconds=60;
            function counterActivate() {   
	        seconds--;
	        el('#counter').innerHTML = seconds;    
       
                
            if(seconds<10){
             el('#counter').innerHTML = '0'+seconds;        
            };
	       if( seconds > 0 ) {
	            setTimeout(counterActivate, 1000);
	        }        
                
            else {
	          alert('GAME OVER, YOUR SCORE: '+score);
	        };    
                
	    } //ENDE  counterActivate 
    	counterActivate();
	};// ENDE countdown


    
    
// divs für Score und Treffe erschaffen
    
let scoreCount=document.createElement('div');
el("#score").appendChild(scoreCount);
scoreCount.id="scoreCount";
    
let treffCount=document.createElement('div');
el("#score").appendChild(treffCount);
treffCount.id="treffCount";
    
    

//hier werden Treffe gerechnet

function rechneTreffe(){
    treff++;
    el('#treffCount').innerHTML='TREFF: '+treff;
    
    score++; 
    
    el('#scoreCount').innerHTML='SCORE: ' + score;
    
}; //ENDE treffCount 
    
    
// div für Fehlschüsse
let fehlSchusse=document.createElement('div');
el("#score").appendChild(fehlSchusse);
fehlSchusse.id="fehlSchusse";

//hier werden fehlschüsse gerechnet
                        
function fehlGeschossen(){
        
    cklickNumber++;
    
    el('#fehlSchusse').innerHTML='FEHLSCHÜSSE: '+cklickNumber++;
    
    score--;  
        
    el('#scoreCount').innerHTML='SCORE: ' + score;
    
};   // ENDE fehlGeschossen



//wenn ist nicht auf Bird gecklickt wird werden fehlSchüsse zugerechnet
    
el('#container').addEventListener('click', fehlGeschossen);
    

//Hier wird die Mouseposition gespeichert
    
el('#container').addEventListener('mousemove', function (e) {
    
   

	let x = e.clientX -el('#container').offsetLeft - 40;
	 mouthPositionX = x;
	 basketObject.x = x;
	if (x > 0 && x < 716  ){
		 el('#basket').style.left = x +'px' ;
		
	};
 
});
    
    

makeBasket();
moveObjects();
countdown();







	





	
