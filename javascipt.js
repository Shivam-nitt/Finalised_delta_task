let box= document.querySelectorAll(".text");

let saareBox=document.querySelectorAll("#gridItems");
let direction={x:0,y:0};
let buttonText= document.querySelector("#button");
let turn=0;
function changeTurn(){
    if(turn==0){
        turn=1;
    }else{
        turn=0;
    }
}

// saareBox.forEach((Element,index)=>{
//     if(Element.textContent!==""){
//         console.log(Element.textContent);
//    console.log(index);
//     }
// })   

let b="";
let ind="";


saareBox.forEach((Element,index)=>{
    if(Element.textContent!==""){
        Element.addEventListener("click",function(){
            b=Element.textContent;
        console.log(Element.textContent);
        console.log(index);  

    
        
            //to give color to neighbouring elements---
            if(Element.textContent==="cannon"||Element.textContent==="tank"||Element.textContent==="ricochet"||Element.textContent==="semi ricochet"||Element.textContent==="titan"){
                console.log("i will color");

                HighlightNeighbours(Element.textContent,index);
               

                //change turn button it is working.... 
                changeTurn();
                if(turn==1){
                    UpperMovement(b,index);
                    buttonText.textContent="turn of 2nd player";
                }else{
                    lowerMovement(b,index);
                    buttonText.textContent="turn of 1st player";
                }  
    }})
    }})


// this function is for playing the moves


function UpperMovement(content,index){
if(index%8!==0){
    const neighbours=[saareBox[index+1],saareBox[index+8],saareBox[index-8],saareBox[index+9],saareBox[index-7],saareBox[index-1],saareBox[index-9],saareBox[index+7],saareBox[index]];

    console.log(neighbours);

    neighbours.forEach(Element=>{

        Element.addEventListener("click",function(){
            
            Element.textContent=content;
            for(let i=0;i<=7;i++){
                if(
                    neighbours[i].textContent===""
                )neighbours[i].style.backgroundColor='rgb(165, 210, 228)';
            }
            neighbours[8].textContent="";
        })
        })
        
    }}



    // for lower element......

    
    function lowerMovement(content,index){
        if(index%8!==0){
            const neighbours=[saareBox[index+1],saareBox[index+8],saareBox[index-8],saareBox[index+9],saareBox[index-7],saareBox[index-1],saareBox[index-9],saareBox[index+7],saareBox[index]];
        
            console.log(neighbours);
        
            neighbours.forEach(Element=>{
        
                Element.addEventListener("click",function(){
                    Element.textContent=content;
                    for(let i=0;i<=7;i++){
                        if(   neighbours[i].textContent==="" )
                            neighbours[i].style.backgroundColor='rgb(165, 210, 228)';
                    }
                    neighbours[8].textContent="";
                })
                })
            }}
        
    





// saareBox.forEach(Element=>{
//     let a="";
       
//             Element.addEventListener("click",function(){
//                 if(Element.textContent===""&& index=){
//                 Element.textContent=b;
//                 Element.style.backgroundColor='orange';


// //for purana dabba ka element htaane ke liye
//                 saareBox.forEach((Element,index)=>{
//                 if(Element.textContent===b&&index===ind){
//                     console.log(index);
//                     console.log("erased");
//                     Element.innerHTML=a;
//                     Element.style.backgroundColor="blue";
//                    }
//                     })
//             })
            
//                 // move wala function ....  
//             }})



            function HighlightNeighbours(text,index){

                //for leftmost element....
            if(index%8===0){
                console.log("for leftmost items"+ index%8)
                const neighboursIndex=[
                    index+1,index+8,index-8,index+9,index-7
                ]
                neighboursIndex.forEach(i=>{
                    console.log("im in function");
                    if( i>=0 && i<64 && saareBox[i].textContent===""){
                        saareBox[i].style.backgroundColor='pink';
                    }
                })
            }
                //for rightmost element....
    
            if(index%8===7){
                const neighboursIndex=[
                index-1,index+8,index+7,index-8,index-9
                ]
                neighboursIndex.forEach(i=>{
                    console.log("im in function");
                    if( i>=0&& i<64 && saareBox[i].textContent===""){
                        saareBox[i].style.backgroundColor='pink';
                    }
                })

            }

            //for others element...
            if(index%8!==0&&index%8!==7){
                const neighboursIndex=[
                    index+1,index-1,index+8,index-9,index+9,index-8,index-7,index+7
                ]
                neighboursIndex.forEach(i=>{
                    console.log("im in function");
                    if( i>=0&& i<64 && saareBox[i].textContent===""){
                        saareBox[i].style.backgroundColor='pink';
                    }
                })
            }

            }