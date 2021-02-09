class Link{
    constructor(){
        this.linkSrc;
        this.xPosition = 0
        this.yPosition = 0;
        this.xPositionGrid = 20;
        this.yPositionGrid = 20;
        this.widthSize = gridW;
        this.heightSize = gridH;
        this.widthInSquares = 7;
        this.heightInSquares = 7;
        this.linkSize = 40;
        this.linkStyle = "italic";
        this.linkColor = "#000000";
        this.linkOpacity = 100;
        this.linkFont = 'Helvetica';
        this.linkLetterSpacing = 0;
        this.linkLetterSpacing = 0;
        this.linkTitle = "...";
        this.focusedOpacity = 1;
        this.focusedColor = "#000000";
        this.snapToWidth = false;
        this.snapToHeight = false;
        this.deleteTransparency = 100;
        this.lock = false;
        this.lockTransparency = 10;

    }

    moveLink(){
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
                    linkArray[linkArrayIndex].xPosition = this.xPositionGrid * gridW ;
                    linkArray[linkArrayIndex].yPosition = this.yPositionGrid * gridW ;

                    //and to refresh the point positions
                    setTimeout(() => {
                      // reportWindowSize();
                      newWidth = windowWidth;
                      newHeight = windowHeight;
                      for (let i = 0; i < linkArray.length; i++) {
                        linkArray[i].widthSize = linkArray[i].widthSize * xRatio;
                        linkArray[i].heightSize = linkArray[i].heightSize * yRatio;
                        linkArray[i].xPosition =  linkArray[i].xPositionGrid * gridW;
                        linkArray[i].yPosition = linkArray[i].yPositionGrid * gridH;
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

        //INFO & BIGER SMALLER SIZE
        giveLinkArrayInfo(index){
          // let saveOpacity;
          //info
          if(!shiftControl){//<<<<<????i dont know about that !shiftControl
              if((mouseX >= this.xPosition - 10 && mouseX <= this.xPosition + this.widthSize) && ((mouseY >= this.yPosition - deletePointXOffset - 10 && mouseY <= this.yPosition + this.heightSize))){
                //when mouse moved you can see at which index you are on
                linkArrayIndex = index;
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
                      if(widhChange >= gridW * 1 && heighChange >= gridH * 1){
                        linkArray[index].widthSize = widhChange;
                        linkArray[index].heightSize = heighChange;
                        // print(heighChange)
                      }
                  }
              }
            }
          }
 
      }

    //open link
    linkClicked(){
      if((mouseX >= this.xPosition && mouseX <= this.xPosition + this.widthSize) && ((mouseY >= this.yPosition && mouseY <= this.yPosition + this.heightSize))){
        console.log(this.linkSrc + " Will be opend !");
        if(!logdIn){
          window.open(this.linkSrc, "_blank");
        }
      }
    }
     

    linkDelete(){
      if(!this.lock){
        if((mouseX >= this.xPosition - 10 && mouseX <= this.xPosition + 10) && ((mouseY >= this.yPosition - deletePointXOffset - 10 && mouseY <= this.yPosition - deletePointXOffset + 10))){
          linkArray[linkArrayIndex] = linkArray[linkArray.length - 1];
          linkArray.pop();
        }
    }
    }

    linkSnap(){
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
  linkLock(){
      if((mouseX >= this.xPosition && mouseX <= this.xPosition+ deletePointXRadius) && (mouseY >= this.yPosition && mouseY <= this.yPosition + deletePointXRadius)){
          this.lock = !this.lock;
          if(this.lock){
              this.lockTransparency = 255;

          }else{
              this.lockTransparency = 10;
          }
      }
      
     
  }

}


