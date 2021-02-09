class Thing{
    constructor(){
        this.name = "";
        this.xPosition = 0;
        this.yPosition = 0;
        this.widthSize = 200; 
        this.heightSize = 200;
        this.widthInSquares = 7;
        this.heightInSquares = 7;
        this.url = "";
        this.img;
        this.image = null;
        this.xPositionGrid = 20;
        this.yPositionGrid = 20;
        this.snapToWidth = false;
        this.snapToHeight = false;
        this.deleteTransparency = 0;
        this.lock = false;
        this.lockTransparency = 10;
    }      

    moveThing(){
        if(!this.lock){

            if((mouseX >= this.xPosition && mouseX <= this.xPosition + gridW * 4) && (mouseY >= this.yPosition && mouseY <= this.yPosition + gridH * 4)){
                let grabMatrixX = 0;
                let grabMatrixY = 0;
                for(var x = 0; x <= newWidth; x += gridW){
                    grabMatrixX += 1;
                    grabMatrixY = 0;
    
                    for(var y = 0; y <= newHeight; y += gridH){
                        grabMatrixY = grabMatrixY + 1;
                        // 
                        if((mouseX >= x && mouseX <= x + gridW && mouseY >= y && mouseY <= y + gridH)){
                            //grap from the top left ... 
                            this.xPositionGrid = grabMatrixX -2;
                            this.yPositionGrid = grabMatrixY -2;
                        
                            if(!shiftPressed){
                                this.xPosition = this.xPositionGrid * gridW;
                                this.yPosition = this.yPositionGrid * gridH;
                            }
                            //for detaching
                            else{
                                myArray[myArrayIndex].xPosition = this.xPositionGrid * gridW ;
                                myArray[myArrayIndex].yPosition = this.yPositionGrid * gridW ;
    
                                //and to refresh the point positions
                                setTimeout(() => {
                                    // reportWindowSize();
                                    newWidth = windowWidth;
                                    newHeight = windowHeight;
                                    for (let i = 0; i < myArray.length; i++) {
                                        myArray[i].widthSize = myArray[i].widthSize * xRatio;
                                        myArray[i].heightSize = myArray[i].heightSize * yRatio;
                                        myArray[i].xPosition =  myArray[i].xPositionGrid * gridW;
                                        myArray[i].yPosition = myArray[i].yPositionGrid * gridH;
                                        shiftControl = false;
                                      }
                                    
                                }, 100);
                            }
    
        
                        }
                    }
    
                }
            }
    
        }
    }

    //INFO & BIGER SMALLER
    giveMyArrayInfo(index){

        if(!shiftControl){
            //you can highlight which one you are curently chosing...
            if((mouseX >= this.xPosition && mouseX <= this.xPosition + this.widthSize) && (mouseY >= this.yPosition && mouseY <= this.yPosition + this.heightSize)){
                //when mouse moved you can see at which index you are on               
                myArrayIndex = index;
                arrayInfoName = myArray[index].name;
                this.deleteTransparency = 255;
            }else{
                this.deleteTransparency = 10;
            }
        }
        else{
                if(!this.lock){

                    //grab it only by the right botom 
                    if((mouseX >= this.xPosition + this.widthSize - gridW * 4 && mouseX <= this.xPosition + this.widthSize) && (mouseY >= this.yPosition + this.heightSize - gridH * 4 && mouseY <= this.yPosition + this.heightSize)){
                        //BIGER SMALLER
                        if(shiftControl){
                            let positionDifrenceX = matrixX - this.xPositionGrid + 1;
                            let positionDifrenceY = matrixY - this.yPositionGrid + 1;
                            let widhChange = gridW * positionDifrenceX; 
                            let heighChange = gridH * positionDifrenceY;
                            
                            //can't become smaller than 
                            if(widhChange >= gridW * 4 && heighChange >= gridH * 4){
                                myArray[index].widthSize = widhChange;
                                myArray[index].heightSize = heighChange;
                            }
                        }
                    }
                }
            
        }

    }

    thingDelete(){
        if(!this.lock){
            
            if((mouseX >= this.xPosition + deletePointXRadius/2 && mouseX <= this.xPosition + deletePointXRadius * 1.5) && ((mouseY >= this.yPosition  + deletePointXRadius/2 && mouseY <= this.yPosition  + deletePointXRadius * 1.5))){
              myArray[myArrayIndex] = myArray[myArray.length - 1];
              myArray.pop();
            }   
        }
    }

    thingSnap(){
        if(!this.lock){

            //snap Width
            if((mouseX <= this.xPosition + this.widthSize - deletePointXRadius/2 && mouseX >= this.xPosition + this.widthSize - deletePointXRadius * 1.5) && ((mouseY >= this.yPosition  + deletePointXRadius/2 && mouseY <= this.yPosition  + deletePointXRadius * 1.5))){
                this.snapToWidth = !this.snapToWidth;
                if(this.snapToWidth){
                    this.widthInSquares = this.widthSize/gridW;
                }
            }
            //snap Heigth 
            else if((mouseX <= this.xPosition + this.widthSize - deletePointXRadius/2 && mouseX >= this.xPosition + this.widthSize - deletePointXRadius * 1.5) && ((mouseY <= this.yPosition + this.heightSize - deletePointXRadius/2 && mouseY >= this.yPosition + this.heightSize - deletePointXRadius * 1.5))){
                this.snapToHeight = !this.snapToHeight;
                if(this.snapToHeight){
                    this.heightInSquares = this.heightSize/gridH;
                }
            }
        }
        
    }
    thingLock(){
        if((mouseX >= this.xPosition + deletePointXRadius/2 && mouseX <= this.xPosition + deletePointXRadius/2 + deletePointXRadius) && (mouseY >= this.yPosition + deletePointXRadius*2 && mouseY <= this.yPosition + deletePointXRadius*2 + deletePointXRadius)){
            this.lock = !this.lock;
            if(this.lock){
                
                print("lock")
                this.lockTransparency = 255;

            }else{
                print("unlock")
                this.lockTransparency = 10;
            }
        }
        
       
    }
}        

