class Video{
    constructor(){
        this.name = "";
        this.xPosition = 0;
        this.yPosition = 0;
        this.widthSize = 200; 
        this.heightSize = 200;
        this.widthInSquares = 7;
        this.heightInSquares = 7;
        this.url = "https://i.imgur.com/zLVKzJp.mp4";
        this.vid;
        // this.vid = createVideo("https://i.imgur.com/zLVKzJp.mp", videoCallback)
        this.xPositionGrid = 0;
        this.yPositionGrid = 0;
        this.layerPosition = "back";
        this.snapToWidth = false;
        this.snapToHeight = false;
        this.deleteTransparency = 0;
        this.grabTransparency = 0;
        this.lock = false;
        this.lockTransparency = 10;
        
        this.loop = true;
        this.volume = 0;
    } 



    moveVIdeo(){
        if(!this.lock){
            
            if((mouseX >= this.xPosition - gridW && mouseX <= this.xPosition + gridW * 3) && (mouseY >= this.yPosition - gridH && mouseY <= this.yPosition + gridH * 3)){
                shiftControl = false;
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
                        
                            if(!shiftPressed ){
                            // if(!shiftPressed && (this.xPosition + this.widthSize <= newWidth)){
                                this.xPosition = this.xPositionGrid * gridW;
                                this.yPosition = this.yPositionGrid * gridH;
                            }
                            //for detaching <<??????
                            else{
                                videoArray[videoArrayIndex].xPosition = this.xPositionGrid * gridW ;
                                videoArray[videoArrayIndex].yPosition = this.yPositionGrid * gridW ;
    
                                //and to refresh the point positions
                                setTimeout(() => {
                                    // reportWindowSize();
                                    newWidth = windowWidth;
                                    newHeight = windowHeight;
                                    for (let i = 0; i < videoArray.length; i++) {
                                        videoArray[i].widthSize = videoArray[i].widthSize * xRatio;
                                        videoArray[i].heightSize = videoArray[i].heightSize * yRatio;
                                        videoArray[i].xPosition =  videoArray[i].xPositionGrid * gridW;
                                        videoArray[i].yPosition = videoArray[i].yPositionGrid * gridH;
                                        shiftControl = false;
                                      }
                                }, 100);
                            }
    
        
                        }
                    }
    
                }
            }
            else if((mouseX >= this.xPosition && mouseX <= this.xPosition + this.widthSize) && (mouseY >= this.yPosition && mouseY <= this.yPosition + this.heightSize)){
                this.grabTransparency = 200;
            }else{
                this.grabTransparency = 0;
            }
            
        }
    }

    //INFO & BIGER SMALLER
    giveVideoArrayInfo(index){
      
        //you can highlight which one you are curently chosing...
        if((mouseX >= this.xPosition && mouseX <= this.xPosition + this.widthSize) && (mouseY >= this.yPosition && mouseY <= this.yPosition + this.heightSize)){
            //when mouse moved you can see at which index you are on               
            videoArrayIndex = index;
            videoInfoName = videoArray[index].name;
            this.deleteTransparency = 255;
        }else{
            this.deleteTransparency = 10;
            this.grabTransparency = 0
        }

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
                    if(widhChange >= gridW * 4 && heighChange >= gridH * 5){
                        videoArray[index].widthSize = widhChange;
                        videoArray[index].heightSize = heighChange;
                    }
                }
            }
        }

    }
    

    videoDelete(){
        if(!this.lock){
            
            if((mouseX >= this.xPosition + deletePointXRadius/2 && mouseX <= this.xPosition + deletePointXRadius * 1.5) && ((mouseY >= this.yPosition  + deletePointXRadius/2 && mouseY <= this.yPosition  + deletePointXRadius * 1.5))){
                videoArray[videoArrayIndex] = videoArray[videoArray.length - 1];
                videoArray.pop();
            }   
        }
    }

    videoSnap(){
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
    videoLock(){
        if((mouseX >= this.xPosition + deletePointXRadius/2 && mouseX <= this.xPosition + deletePointXRadius/2 + deletePointXRadius) && (mouseY >= this.yPosition + deletePointXRadius*2 && mouseY <= this.yPosition + deletePointXRadius*2 + deletePointXRadius)){
            this.lock = !this.lock;
            if(this.lock){
                this.lockTransparency = 255;

            }else{
                this.lockTransparency = 10;
            }
        }
        
       
    }
    
}        

