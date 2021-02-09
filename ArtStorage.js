class ArtStorage{
    constructor(){
        this.name = "";
        this.url = "";
        this.img;
        this.xPosition = 0;
        this.yPosition = 0;
        this.widthSize = 100;
        this.heightSize = 100;

    }


    giveArtArrayInfo(index){
        if((mouseX >= this.xPosition && mouseX <= this.xPosition + this.widthSize) && (mouseY >= this.yPosition && mouseY <= this.yPosition + this.heightSize)){

            //when mouse moved you can see at which index you are on
            artArrayIndex = index;
            arrayInfoName = artArray[index].name;
            print(this.name)
            print("yP "+this.yPosition)

        }
    }
    
}

