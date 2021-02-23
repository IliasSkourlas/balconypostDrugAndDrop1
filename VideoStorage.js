class VideoStorage{
    constructor(){
        this.name = "";
        this.url = "";
        this.vid;
        this.xPosition = 0;
        this.yPosition = 0;
        this.widthSize = 100;
        this.heightSize = 100;

        this.chooseTransparency = 10;

    }


    giveVideoStorageArrayInfo(index){
        if((mouseX >= this.xPosition && mouseX <= this.xPosition + this.widthSize) && (mouseY >= this.yPosition && mouseY <= this.yPosition + this.heightSize)){

            //when mouse moved you can see at which index you are on
            videoStorageArrayIndex = index;
            videoStorageInfoName = videoStorageArray[index].name;
            this.chooseTransparency = 100;
            print(this.name)
            print("at index " + index);

        }else{
            this.chooseTransparency = 10;
        }
    }
    
}

