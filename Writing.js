class Writing{
    constructor(){
        this.message;
        this.newTextArea;
        this.xPosition = 0;
        this.yPosition = 0;
        this.widthSize = 400;
        this.heightSize = 400;
        this.widthInSquares = 7;
        this.heightInSquares = 7 ;
        this.xPositionGrid = 20;
        this.yPositionGrid = 20;
        this.textSize = 30;
        this.textStyle = "italic";
        this.textColor = "#000000";
        this.textLetterSpacing = 0;
        this.lineHeight = 1;
        this.textOpacity = 100;
        this.textFont = 'Helvetica';
        this.deleteTransparency = 100;
        this.focusedTransparency = 180;
        this.snapToWidth = false;
        this.snapToHeight = false;
        this.deleteTransparency = 0;
        
    }

    moveWriting(){
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
                        //for detaching ??????
                        else{
                            textArray[textArrayIndex].xPosition = this.xPositionGrid * gridW ;
                            textArray[textArrayIndex].yPosition = this.yPositionGrid * gridW ;
                            
                            //and to refresh the point positions
                            setTimeout(() => {
                                // reportWindowSize();
                                newWidth = windowWidth;
                                newHeight = windowHeight;
                                for (let i = 0; i < textArray.length; i++) {
                                    textArray[i].widthSize = textArray[i].widthSize * xRatio;//???
                                    textArray[i].heightSize = textArray[i].heightSize * yRatio;
                                    textArray[i].xPosition =  textArray[i].xPositionGrid * gridW;
                                    textArray[i].yPosition = textArray[i].yPositionGrid * gridH;
                                    shiftControl = false;
                                  }
                                
                            }, 100);
                        }

    
                    }
                }

            }
        }
    }

    //INFO & BIGER SMALLER
    giveTextArrayInfo(index){
        //info
        if(!shiftControl){
            if((mouseX >= this.xPosition - 10 && mouseX <= this.xPosition + 100) && ((mouseY >= this.yPosition - deletePointXOffset - 15 && mouseY <= this.yPosition + 10))){
                //when mouse moved you can see at which index you are on
                textArrayIndex = index;
                // arrayFileName = myArray[index].name;
                this.focusedTransparency = 255;
                this.deleteTransparency = 255;
            }else{
                this.deleteTransparency = 100;
                this.focusedTransparency = 180;          
            }
        }
        else{
            //grab it only by the right botom 
            if((mouseX >= this.xPosition + this.widthSize - gridW * 5 && mouseX <= this.xPosition + this.widthSize) && (mouseY >= this.yPosition + this.heightSize - gridH * 5 && mouseY <= this.yPosition + this.heightSize)){
                //BIGER SMALLER
                if(shiftControl){
                    // print(xWpoint +" "+yHpoint);
                    let positionDifrenceX = matrixX - this.xPositionGrid + 1;
                    let positionDifrenceY = matrixY - this.yPositionGrid + 1;
                    let widhChange = gridW * positionDifrenceX; 
                    let heighChange = gridH * positionDifrenceY;
                    
                    //can't become smaller than 
                    if(widhChange >= gridW * 1 && heighChange >= gridH * 1 ){
                        // textArray[index].heightSize = 100 + "px";
                        textArray[index].widthSize = widhChange;
                        textArray[index].heightSize = heighChange;
                        // print(heighChange)
                    }
                  
                }
            }

        }
    }

    textDelete(){
        if((mouseX >= this.xPosition - 10 && mouseX <= this.xPosition + 10) && ((mouseY >= this.yPosition - deletePointXOffset - 10 && mouseY <= this.yPosition - deletePointXOffset + 10))){
          this.newTextArea.attribute("style","display:none");

          textArray[textArrayIndex] = textArray[textArray.length - 1];
          textArray.pop();
        }
      }

    // thingSnap(){
    //     //snap Width
    //     if((mouseX <= this.xPosition + this.widthSize - deletePointXRadius/2 && mouseX >= this.xPosition + this.widthSize - deletePointXRadius * 1.5) && ((mouseY >= this.yPosition  + deletePointXRadius/2 && mouseY <= this.yPosition  + deletePointXRadius * 1.5))){
    //         this.snapToWidth = !this.snapToWidth;
    //         if(this.snapToWidth){
    //             this.widthInSquares = this.widthSize/gridW;
    //         }
    //     }
    //     //snap Heigth 
    //     else if((mouseX <= this.xPosition + this.widthSize - deletePointXRadius/2 && mouseX >= this.xPosition + this.widthSize - deletePointXRadius * 1.5) && ((mouseY <= this.yPosition + this.heightSize - deletePointXRadius/2 && mouseY >= this.yPosition + this.heightSize - deletePointXRadius * 1.5))){
    //         this.snapToHeight = !this.snapToHeight;
    //         if(this.snapToHeight){
    //             this.heightInSquares = this.heightSize/gridH;
    //         }
    //     } 
    
    // }  
}

