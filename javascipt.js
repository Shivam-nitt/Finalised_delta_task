let saareBox = document.querySelectorAll("#chotaDabba");
let UpperBox=document.querySelectorAll(".upper");
let LowerBox=document.querySelectorAll(".lower");
let turn = 0;
let turnvalue = 0;
let buttonText=document.querySelector("#button");

function changeTurn() {
    if (turn === 0) {
        turn = 1;
        turnvalue = 1;
    } else {
        turnvalue = 0;
        turn = 0;
    }
}

function HighlightNeighbours(index) {
    let neighboursIndex = [];

    if (index % 8 === 0) {
        neighboursIndex = [index + 1, index + 8, index - 8, index + 9, index - 7];
    } if (index % 8 === 7) {
        neighboursIndex = [index - 1, index + 8, index + 7, index - 8, index - 9];
    } if(index % 8!==0&&index %8 !==7) {
        neighboursIndex = [index + 1, index - 1, index + 8, index - 9, index + 9, index - 8, index - 7, index + 7];
    }

    neighboursIndex.forEach(i => {
        if (i >= 0 && i < 64 && saareBox[i].textContent === "") {
            saareBox[i].style.backgroundColor = 'pink';
        }
    });

    return neighboursIndex;
}

UpperBox.forEach((element, index) => {
    element.addEventListener("click", function() {
        if (turnvalue === 0) {
            let clickedText = element.textContent;
            let index1;

            saareBox.forEach((saareElement, saareIndex) => {
                if (saareElement.classList.contains("upper") && saareElement.textContent === clickedText) {
                    index1 = saareIndex;
                    console.log(index1);
                    console.log("im in saare box of upperBox");
                }
            });

            const neighboursIndex = HighlightNeighbours(index1);
            changeTurn();
            UpperMovement(clickedText, neighboursIndex, element);
            fireBulletUpper();
            console.log(turn, turnvalue);
        }
    });
});

LowerBox.forEach((element, index) => {
    element.addEventListener("click", function() {
        if (turnvalue === 1) {
            let clickedText = element.textContent;
            let index1;

            saareBox.forEach((saareElement, saareIndex) => {
                if (saareElement.classList.contains("lower") && saareElement.textContent === clickedText) {
                    index1 = saareIndex;
                    console.log(index1);
                    console.log("im in saare box of lowerBox");
                }
            });

            const neighboursIndex = HighlightNeighbours(index1);
            changeTurn();
            LowerMovement(clickedText, neighboursIndex, element);
fireBulletlower();
            console.log(turn, turnvalue);
            console.log(element);
        }
    });
});


function UpperMovement(content, neighbours, originalElement) {
    neighbours.forEach(index => {
        if (saareBox[index]) { // Check if the element exists

            function onClick() {
                if (saareBox[index].textContent === "") { // Only move if the target is empty
                    saareBox[index].textContent = content;
                    saareBox[index].classList.add("upper");
                    buttonText.textContent="Turn of 2nd player"

                    originalElement.textContent = "";
                    originalElement.classList.remove("upper");

                    // for Resetting the background color of all neighbors and remove event listeners
                    neighbours
                    .forEach(i => {
                        if (saareBox[i]) {
                            saareBox[i].style.backgroundColor = '';
                            saareBox[i].removeEventListener("click", onClick); // Remove the event listener
                        }
                    });
                    fireBulletUpper();
                    applyEventListeners();
                }
            }

            
            saareBox[index].addEventListener("click", onClick);
        }
    });
} 

// for getting array of boxes through which bullet will pass
let indexOfBullet;
function fireBulletUpper(){
    let bulletArray=[];
   for(i=0;i<64;i++){
    if(saareBox[i].textContent==="cannon"&&saareBox[i].classList.contains("upper")){
        indexOfBullet=i;
        bulletArray.push(indexOfBullet);
    }
   }console.log(indexOfBullet);
     for(i=0;i<=8;i++){
console.log(indexOfBullet+"im in for condition"); 
        if(saareBox[indexOfBullet].textContent===""){
            bulletArray.push(indexOfBullet);
            console.log("im in bullet condition");
        }
        indexOfBullet=indexOfBullet+8;

        if(indexOfBullet>63||saareBox[indexOfBullet].textContent!==""){
            break;
        }
    }console.log(bulletArray);
}

//for getting array of boxes through which bullet of lowerbox will pass
function fireBulletlower(){
    let bulletArray=[];
   for(i=63;i>0;i--){
    if(saareBox[i].textContent==="cannon"&&saareBox[i].classList.contains("lower")){
        indexOfBullet=i;
        bulletArray.push(indexOfBullet);
    }
   }console.log(indexOfBullet);
     for(i=0;i<=8;i++){
console.log(indexOfBullet+"im in for condition"); 
        if(saareBox[indexOfBullet].textContent===""){
            bulletArray.push(indexOfBullet);
            console.log("im in bullet condition");
        }
        indexOfBullet=indexOfBullet-8;

        if(indexOfBullet>63||saareBox[indexOfBullet].textContent!==""){
            break;
        }
    }console.log(bulletArray);
}


function LowerMovement(content, neighbours, originalElement) {
    neighbours.forEach(index => {
        if (saareBox[index]) {
            function onClick() {
                if (saareBox[index].textContent === "") { 
                    saareBox[index].textContent = content;
                    saareBox[index].classList.add("lower");
                    buttonText.textContent="Turn of 1st player";


                    originalElement.textContent = "";
                    originalElement.classList.remove("lower");

                    // Reset the background color of all neighbors and remove event listeners
                    neighbours.forEach(i => {
                        if (saareBox[i]) {
                            saareBox[i].style.backgroundColor = '';
                            saareBox[i].removeEventListener("click", onClick); 
                        }
                    });
                    fireBulletlower();
                    // Reapply event listeners
                    applyEventListeners();
                }
            }

            // Add the event listener
            saareBox[index].addEventListener("click", onClick);
        }
    });
}

function applyEventListeners() {
    saareBox.forEach(element => {
        element.removeEventListener("click", handleUpperClick);
        element.removeEventListener("click", handleLowerClick);

        if (element.classList.contains("upper")) {
            element.addEventListener("click", handleUpperClick);
        } else if (element.classList.contains("lower")) {
            element.addEventListener("click", handleLowerClick);
        }
    });
}

function handleUpperClick(event) {
    if (turnvalue === 0) {
        let element = event.target;
        let clickedText = element.textContent;             
        console.log("im in handle upper click"+clickedText);
        buttonText.textContent="Turn of 2nd player";
        
        let index1;
        saareBox.forEach((saareElement, saareIndex) => {
            if (saareElement.classList.contains("upper") && saareElement.textContent === clickedText) {
                index1 = saareIndex;
            }
        });

        const neighboursIndex = HighlightNeighbours(index1);
        changeTurn();
        UpperMovement(clickedText, neighboursIndex, element);
        fireBulletUpper();
        console.log(turn, turnvalue);
    }
}

function handleLowerClick(event) {
    if (turnvalue === 1) {
        let element = event.target;
        let clickedText = element.textContent;
        console.log(clickedText+"im in handle lower click")
        buttonText.textContent="Turn of 1st player";
       
        let index1;
        saareBox.forEach((saareElement, saareIndex) => {
            if (saareElement.classList.contains("lower") && saareElement.textContent === clickedText) {
                index1 = saareIndex;
            }
        });

        const neighboursIndex = HighlightNeighbours(index1);
        changeTurn();
        LowerMovement(clickedText, neighboursIndex, element);
        fireBulletlower();
        console.log(turn, turnvalue);
    }
}

applyEventListeners();




