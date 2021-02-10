////////////////////////////////////////////BALCONYPOST

//////////////////////
var database;
let logdIn = false;
let preview = false;
let loginControl = true;
let userId;

let gridW;
let gridH;
let matrixX = 0;
let matrixY = 0;
let sizeRatio; //not in use
let xRatio = 1; //for responsive multiplication acording to screen
let yRatio = 1;
let decrease = true;
let increase = false;

let  canv;
let newWidth;
let newHeight;
let backgroundColor = "#ffffff";

let thing;
let myArray = [];
let artArray = [];
let linkArray = [];
let readFromDatabase = false;

let myArrayIndex;
let artArrayIndex = 0;
let arrayInfoName; 
let controlWindow = false;
let addArt = false;

let writeText = false;
let changeSize = false;
let temporaryTextAreaWidth = 300;
let temporaryTextAreaHeight = 400;
let temporaryTextSize = 30;
let temporaryStyle = "normal";
let temporaryFont = "Helvetica";
let temporaryTextColor = 0;
let temporaryTextOpacity = 100;
let temporaryLinkOpacity  = 255;//older
let temporaryLetterSpacing = 0;
let temporaryBlue = 0;

let temporaryTextArea;//?
let temporaryLinkXPosition = 0;
let temporaryLinkYPosition = 0;

let write;
let word;
let textArray = [];
let message = "";
let textArrayIndex;
let xWhereToWrite;
let yWhereToWrite;
let linkSrc;
let xPosition;
let yPosition;
let linkArrayIndex; 
let linkControl = false;

let shiftControl = false;
let shiftPressed = false;
let tabControl = false;
let authControl = false;

//for deleting
deletePointXOffset = 35;
deletePointXRadius = 15;

//Mouse movement
let xMouse;      
let yMouse;  
window.addEventListener('mousemove', function(e){
  xMouse = e.x;      
  yMouse = e.y;      
})
//Cursor
let cursorControl = "arrow";
let memory = 1;
let myScroll = false;

let memoryFromUrl = false;
let newMemory;
////////////////////////////////////////////Url Parameters
getUrlParameters();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////SETUP
function setup(){
  newWidth = windowWidth;
  newHeight = windowHeight;
  sizeRatio = newWidth/newHeight;
  print("sizeRatio " + sizeRatio);
  xWhereToWrite = newWidth/4;
  yWhereToWrite = newHeight/10;

  //Auth
  signInButton = createButton("Sign In");
  signInButton.position (40, 40);
  signInButton.mousePressed(toSignInFunction); 
  signInButton.hide();
  signInButton.class('authButton');

  signUpButton = createButton("Sign Up");
  signUpButton.position (320, 40);
  signUpButton.mousePressed(toSignUpFunction); 
  signUpButton.hide();
  signUpButton.class('authButton');
  //
  nameInput = createInput("", "text");
  nameInput.position (40, 80);
  nameInput.attribute("placeholder", "user name:");
  nameInput.hide();
  nameInput.class('authInput');

  emailInput = createInput("", "email");
  emailInput.position (40, 130);
  emailInput.attribute("placeholder", "email:");
  emailInput.hide();
  emailInput.class('authInput');

  passwordInput = createInput("", "password");
  passwordInput.position (40, 180);
  passwordInput.attribute("placeholder", "password:");
  passwordInput.hide();
  passwordInput.class('authInput');

  //Submit
  submitLogInButton = createButton("Log in");
  submitLogInButton.position (40, 240);
  submitLogInButton.mousePressed(submitLogInFunction); 
  submitLogInButton.hide();
  submitLogInButton.class('authButton');

  submitSignUpButton = createButton("Sign up");
  submitSignUpButton.position (40, 240);
  submitSignUpButton.mousePressed(submitSignUpFunction); 
  submitSignUpButton.hide();
  submitSignUpButton.class('authButton');
  //
  //Logout
  logoutButton = createButton("Logout");
  logoutButton.position (newWidth- 100, 20);
  logoutButton.mousePressed(logoutButtonFunction); 
  logoutButton.hide();
  logoutButton.class('controlWindow');

  //LINK input title & button
  linkInputUrl = createInput("", 'url');
  linkInputUrl.attribute("placeholder", "url:");
  linkInputUrl.size(400);
  linkInputUrl.hide();
  linkInputUrl.class('controlWindow');
  linkInputTitle = createInput("", 'url');
  linkInputTitle.attribute("placeholder", "Title:");
  linkInputTitle.size(400);
  linkInputTitle.hide();
  linkInputTitle.class('controlWindow');
  linkSubmit = createButton("OK");
  linkSubmit.mousePressed(enterLink);
  linkSubmit.size(50, 30);
  linkSubmit.hide();
  linkSubmit.class('controlWindow');

  linkFocusOpacity = createInput("100", "number");
  linkFocusOpacity.attribute("placeholder", "opacity");
  linkFocusOpacity.attribute("min", "0");
  linkFocusOpacity.attribute("max", "100");
  linkFocusOpacity.size(50);
  linkFocusOpacity.hide();
  linkFocusOpacity.class('controlWindow');

  linkFocusColor = createInput("#000000", "color");
  linkFocusColor.size(50);
  linkFocusColor.class('controlWindow');
  linkFocusColor.hide();

 ////load image for Storage
  inputImage = createFileInput(uploadImageToFirebase);
  inputImage.position(30, 430 + 80);
  inputImage.size(85, 22)
  inputImage.class('controlWindow');
  inputImage.id("photo");
  inputImage.hide();

  //Color background
  backgroundColorInput = createInput("#ffffff", "color");
  backgroundColorInput.position(30, 80);
  backgroundColorInput.hide();
  backgroundColorInput.class('controlWindow');
  //Background Opacity
  backgroundOpacity = createInput("100", "number")
  backgroundOpacity.position(30, 130);
  backgroundOpacity.attribute("min", "0");
  backgroundOpacity.attribute("max", "100");
  backgroundOpacity.mousePressed(chooseStyle);
  backgroundOpacity.changed(letterSpacingFunction);
  backgroundOpacity.class('controlWindow');
  backgroundOpacity.hide();

  //TEXTAREA 
  temporaryTextArea = createElement('textarea');   
  temporaryTextArea.attribute("style","display:none");
  temporaryTextArea.attribute("placeholder", "click in here ...");

  //TEXT Button
  textButton = createButton("OK ");
  textButton.mousePressed(writeNewText);
  textButton.class('controlWindow');
  textButton.hide();
  
  //TEXT SIZE input
  inputTextSize = createInput("25", "number")
  inputTextSize.size(50);
  inputTextSize.mousePressed(chooseTextSize);
  inputTextSize.changed(textSizeFunction);
  inputTextSize.class('controlWindow');
  inputTextSize.hide();
  //TEXT STYLE
  dropDownStyle  = createSelect();
  dropDownStyle.size(80);
  dropDownStyle.option("normal")
  dropDownStyle.option("italic")
  dropDownStyle.mousePressed(chooseStyle);
  dropDownStyle.changed(styleFunction);
  dropDownStyle.class('controlWindow');
  dropDownStyle.hide();
  //TEXT SAFE FONDS
  dropDownFont = createSelect();
  dropDownFont.size(80);
  dropDownFont.option("Arial")
  dropDownFont.option("Arial-black")
  dropDownFont.option("Helvetica")
  dropDownFont.option("Courier New")
  dropDownFont.option("Courier")
  dropDownFont.option("Times")
  dropDownFont.option("Georgia")
  dropDownFont.option("Impact")
  dropDownFont.option("Comic Sans MS")
  dropDownFont.option("Trebuchet MS")
  dropDownFont.option("Garamond")
  dropDownFont.option("Verdana")
  dropDownFont.option("Bookman Old Style")
  dropDownFont.option("Palatino")
  dropDownFont.mousePressed(chooseStyle);
  dropDownFont.changed(fontFunction);
  dropDownFont.class('controlWindow');
  dropDownFont.hide();
  //TEXT COLOR 
  inputTextColor = createInput("#000000", "color");//<<<<
  inputTextColor.size(40);
  inputTextColor.mousePressed(chooseStyle);
  inputTextColor.changed(inputTextColorFunction);
  inputTextColor.class('controlWindow');
  inputTextColor.hide();
  //TEXT OPACITY
  inputTextOpacity = createInput("100", "number");
  inputTextOpacity.size(40);
  inputTextOpacity.attribute("min", "0");
  inputTextOpacity.attribute("max", "100");
  inputTextOpacity.mousePressed(chooseStyle);
  inputTextOpacity.changed(textOpacityFunction);
  inputTextOpacity.class('controlWindow');
  inputTextOpacity.hide();
  // letter-spacing
  inputLetterSpacing = createInput(0, "number");
  inputLetterSpacing.attribute("min", "0");
  inputLetterSpacing.attribute("max", "10");
  inputLetterSpacing.size(50);
  inputLetterSpacing.mousePressed(chooseStyle);
  inputLetterSpacing.changed(letterSpacingFunction);
  inputLetterSpacing.class('controlWindow');
  inputLetterSpacing.hide();
  
  //line-Height
  inputLineHeight = createInput("100", "number");
  inputLineHeight.attribute("min", "0");
  inputLineHeight.attribute("max", "1000");
  inputLineHeight.size(50);
  inputLineHeight.mousePressed(chooseStyle);
  inputLineHeight.changed(letterSpacingFunction);
  inputLineHeight.class('controlWindow');
  inputLineHeight.hide();
//<<<<<<<<<<<<<<<<<<<
  //Button that SAVES in to Firebase
  uploadButton = createButton("upload");
  uploadButton.mousePressed(deleteUpload);
  // uploadButton.mousePressed(uploadPositionsToFirebase);
  uploadButton.position(30, 280);
  uploadButton.hide();
  uploadButton.class('controlWindow');
  
  //Button that DELETES Firebase
  deleteButton = createButton("delete");
  deleteButton.mousePressed(deleteDataToFirebase);
  deleteButton.position(30, 330);
  deleteButton.hide();
  deleteButton.class('controlWindow');

  //Add art from Firebase
  addArtButton = createButton("ART");
  addArtButton.mousePressed(addArtFunction);
  addArtButton.position(30, 380);
  addArtButton.hide();
  addArtButton.class('controlWindow');

  //memory 1
  memoryButton1 = createButton("1");
  memoryButton1.mousePressed(memory1Function);
  memoryButton1.position(30, 20);
  memoryButton1.hide();
  memoryButton1.class('controlWindow');
  //memory2 
  memoryButton2 = createButton("2");
  memoryButton2.mousePressed(memory2Function);
  memoryButton2.position(30+80, 20);
  memoryButton2.hide();
  memoryButton2.class('controlWindow');
  //memory3 
  memoryButton3 = createButton("3");
  memoryButton3.mousePressed(memory3Function);
  memoryButton3.position(30+80+80, 20);
  memoryButton3.hide();
  memoryButton3.class('controlWindow');
  //memory4 
  memoryButton4 = createButton("4");
  memoryButton4.mousePressed(memory4Function);
  memoryButton4.position(30+80+80+ 80, 20);
  memoryButton4.hide();
  memoryButton4.class('controlWindow');
  //memory5 
  memoryButton5 = createButton("5");
  memoryButton5.mousePressed(memory5Function);
  memoryButton5.position(30+80+80+80+ 80, 20);
  memoryButton5.hide();
  memoryButton5.class('controlWindow');

  //memory display
  memoryDisplay = createP("memory");
  memoryDisplay.position(30, 200);
  memoryDisplay.hide();
  memoryDisplay.class('controlWindow');

  //resize canvas
  window.addEventListener('resize', reportWindowSize); //<<<<<later !!!!!!
  
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////AUTH
//For FIREBASE
var firebaseConfig = {
  apiKey: "AIzaSyCbUbsIK7pKBYmTfiXpYS0EC5rtTRJ0wY8",
  authDomain: "draganddropsite1.firebaseapp.com",
  databaseURL: "https://draganddropsite1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "draganddropsite1",
  storageBucket: "draganddropsite1.appspot.com", //do i need?
  messagingSenderId: "1027861168853",//do i need?
  appId: "1:1027861168853:web:8f8bea094d3dff6b60d85c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
database = firebase.database();

const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById("btnSignUp");
const btnLogout = document.getElementById("btnLogout");

//Login
function submitLogInFunction(){
  const email = emailInput.value();
  const pass = passwordInput.value();
  firebase.auth().signInWithEmailAndPassword(email, pass)
  .then((userCredential) => {
    // var user = userCredential.user;
    signUpButton.hide();
    submitLogInButton.hide();
    signInButton.hide();
    nameInput.hide();
    emailInput.hide();
    passwordInput.hide();
    submitSignUpButton.hide();

  })
  .catch((error) => {
    console.log(error.code);
    console.log(error.message);
    alert("oops...try again !")//diffrent message?? 
  });

}

//Signup 
function submitSignUpFunction(){
    //TODO: Check foe real email
    const email = emailInput.value();
    const pass = passwordInput.value();
    const name = nameInput.value();
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      // let user = userCredential.user;
      signUpButton.hide();
      submitLogInButton.hide();
      signInButton.hide();
      nameInput.hide();
      emailInput.hide();
      passwordInput.hide();
      submitSignUpButton.hide();

      saveMember(name, email);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      alert("oops...try again !")
    });
}

//Logout
function logoutButtonFunction(){
  firebase.auth().signOut().then(() => {
    console.log("Sign-out successful.");

  }).catch((error) => {
    console.log(error);
  });
}

//realtime listener
//SUCCESSFUL LOGED IN  
firebase.auth().onAuthStateChanged((firebaseUser) => {
  console.log("!USER CHANGE!");
  if(firebaseUser){
    //eraze previous user
    myArray = [];
    for (let i = 0; i < textArray.length; i++) {
      textArray[i].newTextArea.attribute("style","display:none");
    }
    logdIn = true;
    userId = firebaseUser.uid;
    print(userId)
    loadDefaultMemory();
  }
  //UNSUCCESSFUL LOGED IN
  else{
    console.log("NOT LOGED IN");
    //eraze previous user
    myArray = [];
    for (let i = 0; i < textArray.length; i++) {
      textArray[i].newTextArea.attribute("style","display:none");
    }
    //get  Memory from url 
    let p = getUrlParameters();
    newMemory = p.substring(p.indexOf("-") + 1, p.length)
    if(!isNaN(newMemory) && newMemory !== ""){
      memoryFromUrl = true;
      print(">>>>memory from URL: " + newMemory)
    }else if(newMemory === null){
      print("NULL")
    }
    else{
      memoryFromUrl = false;
    }

    ///get  USER from url 
    let userNameFromUrl;
    if(!p.includes("-")){
      userNameFromUrl = p.substring(1);
    }else{
      userNameFromUrl = p.substring(1, p.indexOf("-"))
    }
    print("name "+ userNameFromUrl)
    //1st read members and if members.name = xxx 
    if(userNameFromUrl === "kevi" || userNameFromUrl === "Kevi" || userNameFromUrl === "KEVI"){
      console.log("user: KEVI");
      userId = "ojA8Hvl5LIdsIHLlciFRYijtnag1";
      loadDefaultMemory();
    }
    else {
      console.log("START UP PAGE")
      userId = "IbAWZbY3YbTD4Ux6rHelKThP4Cg2";
      loadDefaultMemory();
    }

    
    logdIn = false;
    controlWindow = false;
    writeText = false;
    addArt = false;
    hideControlWindow();
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////DRAW
function draw(){
  canv = createCanvas(newWidth, newHeight);
  noStroke();
  //backgrount convert hex
  let hexBackgroud = backgroundColorInput.value();
  let red = unhex(hexBackgroud.substr(1,2));
  let green = unhex(hexBackgroud.substr(3,2));
  let blue = unhex(hexBackgroud.substr(5,2));
  let alpha = map(backgroundOpacity.value(), 0, 100, 0, 255);
  background(red,green,blue ,parseInt(alpha,10));

  sizeRatio = newWidth/newHeight;
  gridW = newWidth/50;
  gridH = newHeight/50;
  let wPointTran;
  let hPointTran;

  memoryDisplay.elt.innerHTML = memory;
  memoryDisplay.elt.style.fontSize = "30px";
  //
  // print(myScroll)
  // myScroll = false;
  //
  
  //GRID draw 
  if(logdIn && !preview){

    //use SHIFT for detaching
    if(keyIsDown(16)){
      shiftPressed = true;
    }else{
      shiftPressed = false;
    }

    for(let x = 0; x<= newWidth; x += gridW){
      for(let y = 0; y<= newHeight; y += gridH){
        noFill();
        stroke(200,0,0);
        rect(x, y,gridW, gridH)
  
        if((mouseX >= x && mouseX <= x + gridW)&&(mouseY >= y && mouseY < y + gridH)){
          if(!shiftControl){
            fill(250,250,0);
          }else{
            fill(0,250,0);
          }
          rect(x, y,gridW, gridH)
  
        }
      }
    }
  }
  noStroke();
  
  //read from myArray and draw IMAGE & INFO control text
  for (let i = 0; i < myArray.length; i++) {
    let img = myArray[i].img;
    img.hide();

    let x;
    let y;
    x = myArray[i].xPositionGrid * gridW;
    y = myArray[i].yPositionGrid * gridH;

    ///IMAGES... FULL SCREEN or NOT responsive background
    
    //snap to width & height
    if(myArray[i].snapToWidth && myArray[i].snapToHeight){
      let snapW  = myArray[i].widthInSquares * gridW;
      myArray[i].widthSize = myArray[i].widthInSquares * gridW;
      let snapH  = myArray[i].heightInSquares * gridH;
      myArray[i].heightSize  = myArray[i].heightInSquares * gridH;      
      image(img, x, y, snapW, snapH); 
    }
    //width is snaped
    else if(myArray[i].snapToWidth){
      let snapW  = myArray[i].widthInSquares * gridW;
      myArray[i].widthSize = myArray[i].widthInSquares * gridW;
      image(img, x, y, snapW, myArray[i].heightSize); 
    }
    //height
    else if(myArray[i].snapToHeight){
      let snapH  = myArray[i].heightInSquares * gridH;
      myArray[i].heightSize  = myArray[i].heightInSquares * gridH;
      image(img, x, y, myArray[i].widthSize, snapH);
    }
    else{
      image(img, x, y, myArray[i].widthSize, myArray[i].heightSize); 
    }

    //delete & snap points & lock
    if(logdIn && !shiftPressed){

      //delete
      stroke(255);
      fill(240,0,0,myArray[i].deleteTransparency);
      circle(myArray[i].xPosition + deletePointXRadius, myArray[i].yPosition + deletePointXRadius , deletePointXRadius);
      //lock
      if(myArray[i].lock){
        stroke(0, myArray[i].deleteTransparency - 150);
        myArray[i].lockTransparency = 255;
      }else{
        stroke(0, myArray[i].deleteTransparency - 100)
        myArray[i].lockTransparency = 10;
      }
      fill(200, myArray[i].lockTransparency);
      rect(myArray[i].xPosition + deletePointXRadius/2, myArray[i].yPosition + deletePointXRadius*2 , deletePointXRadius);
      
      //snap at width or height grid
      if(myArray[i].snapToWidth){
        wPointTran = 100; 
      }else{
        wPointTran = 0;
      }
      if(myArray[i].snapToHeight){
        hPointTran = 100;
      }else{
        hPointTran = 0;
      };

      // at heigth
      stroke(0, myArray[i].deleteTransparency);
      fill(0,0,0, wPointTran);
      circle(myArray[i].xPosition + myArray[i].widthSize - deletePointXRadius, myArray[i].yPosition + deletePointXRadius , deletePointXRadius);
      
      // at heigth
      fill(0,0,0, hPointTran);
      circle(myArray[i].xPosition + myArray[i].widthSize - deletePointXRadius, myArray[i].yPosition + myArray[i].heightSize - deletePointXRadius , deletePointXRadius);
    }

    //PRINT INFO when draged you can see at which index you are on
    if(logdIn){
      noStroke();
      textSize(30);
      fill(100, 255);
      text(myArrayIndex, 120,  110);
      text(arrayInfoName, 150,  110);
  
      //cursor control when grab
      if((mouseX >= myArray[i].xPosition && mouseX <= myArray[i].xPosition + gridW * 4) && (mouseY >= myArray[i].yPosition && mouseY <= myArray[i].yPosition + gridH * 4)){
      cursorControl = "hand";
      }
      //cursor control when click snap Width
      else if((mouseX <= myArray[i].xPosition + myArray[i].widthSize - deletePointXRadius/2 && mouseX >= myArray[i].xPosition + myArray[i].widthSize - deletePointXRadius * 1.5) && ((mouseY >= myArray[i].yPosition  + deletePointXRadius/2 && mouseY <= myArray[i].yPosition  + deletePointXRadius * 1.5))){
          cursorControl = "hand";
      }
      //cursor control when click snap Height
      else if((mouseX <= myArray[i].xPosition + myArray[i].widthSize - deletePointXRadius/2 && mouseX >= myArray[i].xPosition + myArray[i].widthSize - deletePointXRadius * 1.5) && ((mouseY <= myArray[i].yPosition + myArray[i].heightSize - deletePointXRadius/2 && mouseY >= myArray[i].yPosition + myArray[i].heightSize - deletePointXRadius * 1.5))){
          cursorControl = "hand";
      }
    }
  }

  //read from artArray
  if(addArt === true){
    let previewXPosition = - 100;
    let previewYPosition = newHeight - 100;
    for (let i = 0; i < artArray.length; i++) {
      let img = artArray[i].img;  
      img.hide();
      previewXPosition +=  100;
      
      //when preview becomes biger than the width the height - 100
      if(previewXPosition >= newWidth){
        previewXPosition = 0;
        previewYPosition -= 100;
      }
      artArray[i].xPosition = previewXPosition;
      artArray[i].yPosition = previewYPosition;
      image(img, artArray[i].xPosition, artArray[i].yPosition, 100, 100);
      // if(addArt){
      //   noStroke();
      //   textSize(30);
      //   fill(100, 255);
      //   text(arrayInfoName, 30,  30);
      // }
    }

  }else{
    fill(0);
  }

  //TEXT 
  textButton.position(xWhereToWrite - deletePointXOffset - 55,  yWhereToWrite - deletePointXOffset);
  inputTextSize.position(xWhereToWrite - deletePointXOffset + 20,  yWhereToWrite - deletePointXOffset);
  dropDownStyle.position(xWhereToWrite - deletePointXOffset + 80,  yWhereToWrite - deletePointXOffset);
  dropDownFont.position(xWhereToWrite - deletePointXOffset + 165,  yWhereToWrite - deletePointXOffset );
  inputLetterSpacing.position(xWhereToWrite - deletePointXOffset + 250,  yWhereToWrite - deletePointXOffset);
  inputLineHeight.position(xWhereToWrite - deletePointXOffset + 310,  yWhereToWrite - deletePointXOffset );//<<<<change
  inputTextColor.position(xWhereToWrite - deletePointXOffset + 370, yWhereToWrite - deletePointXOffset);
  inputTextOpacity.position(xWhereToWrite - deletePointXOffset + 420, yWhereToWrite - deletePointXOffset);
  //TextArray
  //border
  if(writeText){
    temporaryTextArea.elt.style.border='2px solid rgb(9, 255, 1)';
  }else{
    temporaryTextArea.elt.style.border="transparent";
    }

  if(textArray.length !== 0){
    /////////////////////////////////////////
    for (let i = 0; i < textArray.length; i++) {    

      let x;
      let y;
      x = textArray[i].xPositionGrid * gridW;
      y = textArray[i].yPositionGrid * gridH;

      textArray[i].newTextArea.position(x, y);
      if(textArray[i].xPosition + textArray[i].widthSize > newWidth){
        textArray[i].widthSize = newWidth - textArray[i].xPosition;
      }
      if(textArray[i].yPosition + textArray[i].heightSize > newHeight){
        textArray[i].heightSize = newHeight - textArray[i].yPosition ;
      }
      textArray[i].newTextArea.size(textArray[i].widthSize, textArray[i].heightSize);

      textArray[i].newTextArea.elt.value = textArray[i].message;
      textArray[i].newTextArea.elt.style.fontSize = textArray[i].textSize +"px" ;
      textArray[i].newTextArea.elt.style.color = textArray[i].textColor;
      textArray[i].newTextArea.elt.style.opacity = textArray[i].textOpacity;
      textArray[i].newTextArea.elt.style.fontStyle = textArray[i].textStyle ;
      textArray[i].newTextArea.elt.style.fontFamily = textArray[i].textFont ;
      textArray[i].newTextArea.elt.style.letterSpacing = textArray[i].textLetterSpacing + "px" ;
      textArray[i].newTextArea.elt.style.lineHeight = textArray[i].lineHeight + "%";
      // //backgroundColor
      // print(myScroll)
      // if(myScroll){
        
      //   textArray[i].newTextArea.elt.style.backgroundColor = "#ffffff60";
      // }else{
      //   textArray[i].newTextArea.elt.style.backgroundColor = "#ffffff00";
      // }

      //

      if(!logdIn){
        textArray[i].newTextArea.elt.disabled = true;
        // textArray[i].newTextArea.elt.style.resize = "none";
      }else{
        textArray[i].newTextArea.elt.disabled = false;
        // textArray[i].newTextArea.elt.style.resize = "both";

      }
      //red circle for deleting
      if(logdIn){
        fill(240,0,0,textArray[i].deleteTransparency);
        stroke(255);
        circle(x, y - deletePointXOffset, deletePointXRadius);

      }

    }

  }

  //TEMPORARY text is writen before being pushed in to the array 
  temporaryTextArea.position(xWhereToWrite, yWhereToWrite);
  // temporaryTextArea.elt.autofocus = true;
  if(shiftControl){
    let xWpoint = xWhereToWrite + temporaryTextArea.elt.scrollWidth;
    let yHpoint = yWhereToWrite + temporaryTextArea.elt.scrollHeight;
    //for width ajastment
    if(mouseX >= xWpoint && mouseX < xWpoint + 100 && (mouseY >= yWhereToWrite && mouseY <= yHpoint)){
      if(xWpoint < newWidth){
        temporaryTextAreaWidth += 10;
      }
    }
    else if(mouseX > xWpoint -100 && mouseX < xWpoint && (mouseY >= yWhereToWrite && mouseY <= yHpoint)){
      if(temporaryTextAreaWidth >= gridW*2){
        temporaryTextAreaWidth -= 10;
      }
    }
    //for height
    if((mouseY > yHpoint  && mouseY < yHpoint + 100) && (mouseX >= xWhereToWrite && mouseX <= xWpoint )){
      if(yHpoint < newHeight){
        temporaryTextAreaHeight += 10;
      }
    }
    else if(mouseY > yHpoint -100 && mouseY < yHpoint && (mouseX >= xWhereToWrite && mouseX <= xWpoint )){
      if(temporaryTextAreaHeight >gridH*2){
        temporaryTextAreaHeight -= 10;
      }
    }
  }
  temporaryTextArea.size(temporaryTextAreaWidth, temporaryTextAreaHeight);
  temporaryTextArea.elt.style.fontSize = temporaryTextSize + "px";
  temporaryTextArea.elt.style.fontFamily = temporaryFont;
  temporaryTextArea.elt.style.color = inputTextColor.value();
  temporaryTextArea.elt.style.opacity = temporaryTextOpacity;
  temporaryTextArea.elt.style.fontStyle = temporaryStyle;
  temporaryTextArea.elt.style.letterSpacing = temporaryLetterSpacing + "px";
  temporaryTextArea.elt.style.lineHeight = inputLineHeight.value() + "%";

  //////LINK//////////////////////////////////////////////////////////////////
  if(!linkControl){
    temporaryLinkXPosition = (matrixX * gridW) - gridW; 
    temporaryLinkYPosition = (matrixY * gridH) - gridH;
  }

  if(logdIn){
    linkInputUrl.position(temporaryLinkXPosition, temporaryLinkYPosition + gridH*2);
    linkInputTitle.position(temporaryLinkXPosition, temporaryLinkYPosition + gridH*4);
    linkSubmit.position(temporaryLinkXPosition, temporaryLinkYPosition + gridH*6);
    linkFocusColor.position(temporaryLinkXPosition + 60, temporaryLinkYPosition + gridH*6);
    linkFocusOpacity.position(temporaryLinkXPosition +120, temporaryLinkYPosition + gridH*6);
  }else{
    linkInputUrl.hide();
    linkInputTitle.hide();
    linkSubmit.hide();
  }

  if(linkArray.length !== 0){
    let colorAlpha;
    
    for (let i = 0; i < linkArray.length; i++) {   
      
      //cursor when over a link
      if((mouseX >= linkArray[i].xPosition && mouseX <= linkArray[i].xPosition + linkArray[i].widthSize) && ((mouseY >= linkArray[i].yPosition && mouseY <= linkArray[i].yPosition + linkArray[i].heightSize))){
        cursorControl = "hand";
        colorAlpha = color(linkArray[i].focusedColor);
        colorAlpha.setAlpha(map(linkArray[i].focusedOpacity, 0, 1, 0, 255));
        fill(colorAlpha);
      }else{
      //color is changed by the Text Menu
      colorAlpha = color(linkArray[i].linkColor);
      colorAlpha.setAlpha(map(linkArray[i].linkOpacity, 0, 1, 0, 255));
      fill(colorAlpha);
      }

      let x;
      let y;
      x = linkArray[i].xPositionGrid * gridW;
      y = (linkArray[i].yPositionGrid * gridH);

      textFont(linkArray[i].linkFont);
      textSize(linkArray[i].linkSize);//put an biger limit?
      //link style
      switch (linkArray[i].linkStyle) {
        case "normal":  
          textStyle(NORMAL)
          break;
        case "italic":
          textStyle(ITALIC)
          break;
          
        default:
          break;
      }
      noStroke();

      //TITLE
      textAlign(LEFT, TOP)
      text(linkArray[i].linkTitle, x, y );
  
      if(logdIn && !shiftPressed){
        //delete circle
        fill(240,0,0,linkArray[i].deleteTransparency);
        stroke(255);
        circle(x, y - deletePointXOffset, deletePointXRadius);
        noFill();

        stroke(100, 255, random(0, 200));
        //snap to width & height
        if(linkArray[i].snapToWidth && linkArray[i].snapToHeight){
          let snapW  = linkArray[i].widthInSquares * gridW;
          linkArray[i].widthSize = linkArray[i].widthInSquares * gridW;
          let snapH  = linkArray[i].heightInSquares * gridH;
          linkArray[i].heightSize  = linkArray[i].heightInSquares * gridH;      
          rect(x, y, snapW, snapH); 
        }
        //width is snaped
        else if(linkArray[i].snapToWidth){
          let snapW  = linkArray[i].widthInSquares * gridW;
          linkArray[i].widthSize = linkArray[i].widthInSquares * gridW;
          rect(x, y, snapW, linkArray[i].heightSize); 
        }
        //height is snaped
        else if(linkArray[i].snapToHeight){
          let snapH  = linkArray[i].heightInSquares * gridH;
          linkArray[i].heightSize  = linkArray[i].heightInSquares * gridH;
          rect(x, y, linkArray[i].widthSize, snapH);
        }
        else{
          rect(x, y, linkArray[i].widthSize, linkArray[i].heightSize);
        }
        noStroke();

        //lock
        if(linkArray[i].lock){
          stroke(0, linkArray[i].deleteTransparency - 150);
          linkArray[i].lockTransparency = 255;
        }else{
          stroke(0, linkArray[i].deleteTransparency - 100)
          linkArray[i].lockTransparency = 10;
        }
        fill(200, linkArray[i].lockTransparency);
        rect(linkArray[i].xPosition , linkArray[i].yPosition , deletePointXRadius);

        //snap at width or height grid
        if(linkArray[i].snapToWidth){
          wPointTran = 100; 
        }else{
          wPointTran = 0;
        }
        if(linkArray[i].snapToHeight){
          hPointTran = 100;
        }else{
          hPointTran = 0;
        };

        // at heigth
        stroke(0, linkArray[i].deleteTransparency);
        fill(0,0,0, wPointTran);
        circle(linkArray[i].xPosition + linkArray[i].widthSize - deletePointXRadius, linkArray[i].yPosition + deletePointXRadius , deletePointXRadius);
        
        // at heigth
        fill(0,0,0, hPointTran);
        circle(linkArray[i].xPosition + linkArray[i].widthSize - deletePointXRadius, linkArray[i].yPosition + linkArray[i].heightSize - deletePointXRadius , deletePointXRadius);
      }

    }
  }
  //cursorControl
  switch (cursorControl) {
    case "arrow":
      cursor(ARROW)
      break;
    case "hand":
      cursor(HAND)
      break;
    default:
      break;
  }
 
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////FUNCTIONS
function keyPressed(){
  print("KEYCODE: " + keyCode);

  //only if user is loged in
  if(logdIn){

    switch (keyCode) {
      //TAB test db
      case 20:
        
        break;
      //CONTROL  
      case 17:
      controlWindow = !controlWindow;
      if(controlWindow){
        // listArtStorage();
        linkControl = false;
        hideLinkControl();
        
        inputImage.show();
        uploadButton.show();
        deleteButton.show();
        logoutButton.show();
        backgroundColorInput.show();
        backgroundOpacity.show();
        addArtButton.show();
        memoryButton1.show();
        memoryButton2.show();
        memoryButton3.show();
        memoryButton4.show();
        memoryButton5.show();
        memoryDisplay.show();
      }else{
        hideControlWindow();
        addArt = false;
      }
        break;

      //SHIFT control
      case 16:
        shiftControl = ! shiftControl;
        break;
  
      //ENTER
      case 13: //you can do better
        if(controlWindow && !writeText){
          thing = new Thing();
          thing.xPositionGrid = matrixX;
          thing.yPositionGrid = matrixY;
          thing.xPosition = thing.xPositionGrid * gridW;
          thing.xPosition = thing.xPositionGrid * gridW;
          myArray.push(thing);
          myArray[myArray.length - 1].xPosition = mouseX;
          myArray[myArray.length - 1].yPosition = mouseY;
          myArray[myArray.length - 1].url = artArray[artArrayIndex].url;
          myArray[myArray.length - 1].img = artArray[artArrayIndex].img;
          myArray[myArray.length - 1].name = artArray[artArrayIndex].name;
          mouseDragged();
          // addArt = false;
        }
        break;

        //ALT for LINK
        case 18:
          writeText = false;
          controlWindow = false;
          addArt = false;
        linkControl = !linkControl;
        if(linkControl){
          linkInputUrl.show();
          linkInputTitle.show();
          linkSubmit.show();
          linkFocusColor.show();
          linkFocusOpacity.show();

          hideControlWindow();
          hideTextWindow();
        }
        else if(!linkControl){
          hideLinkControl();
        }
        break;
  
      //P
      case 80:
        console.log();("////////////")
        console.log();("myArray: " + myArray); 
        // print("textArray: " + textArray); 
        break;
  
      //= double the object on wich the cursor is
      case 187:
        if(!writeText){
          thing = new Thing();
          myArray.push(thing);
          myArray[myArray.length - 1].name = myArray[myArrayIndex].name;
          myArray[myArray.length - 1].xPositionGrid = myArray[myArrayIndex].xPositionGrid + 1;
          myArray[myArray.length - 1].yPositionGrid = myArray[myArrayIndex].yPositionGrid + 4;
          myArray[myArray.length - 1].xPosition = (myArray[myArrayIndex].xPositionGrid+ 1) * gridW;
          myArray[myArray.length - 1].yPosition = (myArray[myArrayIndex].yPositionGrid+ 4 )* gridH;
          myArray[myArray.length - 1].widthSize = myArray[myArrayIndex].widthSize;
          myArray[myArray.length - 1].heightSize= myArray[myArrayIndex].heightSize;
          myArray[myArray.length - 1].url = myArray[myArrayIndex].url;
          myArray[myArray.length - 1].img = createImg(myArray[myArrayIndex].url, '');
        }
        break;
  
      //-
      case 189:
        if(addArt){
          var storageRef = firebase.storage().ref();
          var nameRef = storageRef.child('art/' + arrayInfoName);
          nameRef.delete().then(function() {
            listArtStorage();
            console.log();("File deleted successfully")
          }).catch(function(error) {
            console.log();(error)      
          });     
        }
        break;
        //COMAND to push something infront or back
        case 91:
          if(myArrayIndex !==0){
            let a = myArray[myArrayIndex]; 
            myArray[myArrayIndex] = myArray[myArrayIndex - 1];
            myArray[myArrayIndex - 1] = a;
          }
          break;
        //ESC
        case 27:
          if(logdIn){
            preview = !preview;
          }
          break;

        default:
          break;
    }

  }
  //If NOT logdin and you press CONTROL
  else{
    if(keyCode === 17 && loginControl){
      signInButton.position(40, 40);
      signUpButton.position(320, 40);
      signInButton.show();
      // signUpButton.show();//only for now<<<<<<<
      loginControl = false;
    }
    else if(keyCode === 17 && !loginControl){
      signInButton.hide();
      signUpButton.hide();
      nameInput.hide();
      emailInput.hide();
      passwordInput.hide();
  
      submitLogInButton.hide();
      submitSignUpButton.hide();

      loginControl = true;
    }
  }

}

function reportWindowSize(){
  console.log("new width * height :" + newWidth + " * " + newHeight);
  // newWidth =  window.innerWidth;
  newWidth = windowWidth;
  // newHeight =  window.innerHeight;
  newHeight = windowHeight;

  //going smaller
  if(newWidth <= 1500  && decrease ){
    decrease = false;
    increase = true;
    // xRatio /= 1.2;
    // yRatio /= 1.2;  //if to FIX it just live it 1 
    xRatio = 1;
    yRatio = 1; 
  }
  else if(newWidth > 1500 && increase ){
    increase = false;
    decrease = true;
    // xRatio = 1.2;
    // yRatio = 1.2;  //if to FIX it just live it 1
    xRatio = 1;
    yRatio = 1;  
  }
  else{
    xRatio = 1;
    yRatio = 1;
  }

  setTimeout(() => {
    for (let i = 0; i < myArray.length; i++) {
      myArray[i].widthSize = myArray[i].widthSize * xRatio;
      myArray[i].heightSize = myArray[i].heightSize * yRatio;
      myArray[i].xPosition =  myArray[i].xPositionGrid * gridW;
      myArray[i].yPosition = myArray[i].yPositionGrid * gridH;
    }
  }, 100);
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
//matrix point
function giveGridPoint(){
  let mX = 0;
  let mY = 0;

    for(let x = 0; x <= newWidth; x += gridW){
        mX += 1;
        mY = 0;

        for(let y = 0; y <= newHeight; y += gridH){
          mY = mY + 1;
          if((xMouse >= x && xMouse < x + gridW ) && (yMouse >= y && yMouse < y + gridH)){
            matrixX = mX;
            matrixY = mY;
            // print("matrixY " + matrixY)
          }
        }

    }
}
//HIDE
function hideControlWindow(){
  inputImage.hide();
  uploadButton.hide();
  deleteButton.hide();
  logoutButton.hide();
  backgroundColorInput.hide();
  backgroundOpacity.hide();
  addArtButton.hide();
  memoryButton1.hide();
  memoryButton2.hide();
  memoryButton3.hide();
  memoryButton4.hide();
  memoryButton5.hide();
  memoryDisplay.hide();
  
}
function hideLinkControl(){
  linkInputUrl.hide();
  linkInputTitle.hide();
  linkSubmit.hide();
  linkFocusColor.hide();
  linkFocusOpacity.hide();

}
function hideTextWindow(){
  textButton.hide();
  inputTextSize.hide();
  dropDownStyle.hide();
  dropDownFont.hide();
  inputTextColor.hide();
  inputLetterSpacing.hide();
  inputLineHeight.hide();
  inputTextOpacity.hide();
  temporaryTextArea.hide();
}
//from URL
function getUrlParameters(){
  return window.location.search;
}

////////////////////////////SIGN
function toSignInFunction(){
  // signInMenu = true;
  signInButton.hide();
  submitSignUpButton.hide();
  nameInput.hide();
  // signUpButton.show();
  emailInput.show();
  signUpButton.position(newWidth - 270, 40);
  passwordInput.show();
  submitLogInButton.show();
}
function toSignUpFunction(){
  print("wewrwqe")
  // signUpMenu = true;
  signUpButton.hide();
  submitLogInButton.hide();
  signInButton.position(newWidth - 270, 40);
  
  signInButton.show();
  nameInput.show();
  emailInput.show();
  passwordInput.show();
  submitSignUpButton.show();
}
//////////////////////////////////////////////TEXT
function keyTyped(){
  chooseMemoryWithKeys();
  if(logdIn && !changeSize  && keyCode !== 13 && keyCode !== 187 && keyCode !== 189 && keyCode !== 49 && keyCode !== 50 && keyCode !== 51 && keyCode !== 52 && keyCode !== 53 && !linkControl ){
    writeText = true;
    textButton.show();
    inputTextSize.show();
    dropDownStyle.show();
    dropDownFont.show();
    inputTextColor.show();
    inputLetterSpacing.show();
    inputLineHeight.show();
    inputTextOpacity.show();
    temporaryTextArea.show();

    hideControlWindow();
    hideLinkControl();
    controlWindow = false;
    addArt = false;
    loginControl = true;
  }
}
function writeNewText(){
  //get what is type in the temporaryTextArea
  message =  temporaryTextArea.elt.value;
  //erase temporary
  temporaryTextArea.elt.value = "";

  //only if textArea not empty
  if(message !== ""){
    word = new Writing();
    word.message = message;
    word.textColor = inputTextColor.value();
    word.textLetterSpacing = temporaryLetterSpacing;
    word.lineHeight = inputLineHeight.value();
    word.textOpacity = temporaryTextOpacity;
    word.textSize = temporaryTextSize;
    word.textStyle = temporaryStyle;
    word.textFont = temporaryFont;
    word.xPositionGrid = matrixX;
    word.yPositionGrid = matrixY;
    word.xPosition = matrixX * gridW;
    word.yPosition = matrixY * gridH;
    word.newTextArea = createElement("textarea");
    word.newTextArea.class("textElement");
    //?????? is it expencive ????
    // word.newTextArea.elt.onscroll =  function (){
    //   myScroll = true;
    // } 
    // //
    word.widthSize = temporaryTextAreaWidth;
    word.heightSize = temporaryTextAreaHeight;
    textArray.push(word);
    message = "";
  }

  hideTextWindow();
  writeText = false;
  changeSize = false;
}
//when i click on the size input 
function chooseTextSize(){
  changeSize = true;
  writeText = false;
}
//after i enter a new size
function textSizeFunction(){
  changeSize = false;
  temporaryTextSize = parseInt(inputTextSize.value());
}
function chooseStyle(){//???same  like above
  changeSize = true;
  writeText = false;
}
function styleFunction(){
  changeSize = false;
  temporaryStyle = dropDownStyle.value();
}
function fontFunction(){
  changeSize = false;
  temporaryFont = dropDownFont.value();
}
function inputTextColorFunction(){
  changeSize = false;
}
function letterSpacingFunction(){
  changeSize = false;
  temporaryLetterSpacing = inputLetterSpacing.value();
}
function textOpacityFunction(){
  changeSize = false;
  temporaryTextOpacity = inputTextOpacity.value()/100;
}

//////////////////////////////////////////////LINK
function enterLink(){
  link = new Link();
  link.linkSrc = linkInputUrl.value();
  link.xPositionGrid = temporaryLinkXPosition/gridW;
  link.yPositionGrid = temporaryLinkYPosition/gridH;
  link.xPosition = temporaryLinkXPosition;
  link.yPosition = temporaryLinkYPosition;
  link.linkColor = inputTextColor.value();;
  link.linkOpacity = temporaryTextOpacity;//<<<!
  link.linkFont = temporaryFont;
  link.linkSize = temporaryTextSize;
  link.linkStyle = temporaryStyle;
  link.linkTitle = linkInputTitle.value();
  link.focusedOpacity = linkFocusOpacity.value()/100;
  link.focusedColor = linkFocusColor.value();
  //automatic width
  link.widthSize = textWidth(linkInputTitle.value());
  if(link.widthSize <= 0){
    link.widthSize  = gridW * 2;
  }
  link.heightSize = gridH * 2;
  linkArray.push(link);

  linkInputUrl.hide();
  linkInputTitle.hide();
  linkSubmit.hide();
  linkFocusColor.hide();
  linkFocusOpacity.hide();
  linkControl = false;
}

//Choose file ... uploads to firrebase Storage (images etc...)
function uploadImageToFirebase(){
  const selectedFile = document.querySelector("#photo").files[0];
  print(selectedFile);
  const metadata = {
    contentType: selectedFile.type
  }
  //Create Refrence
  const storageRef = firebase.storage().ref();
  const artRef = storageRef.child('art');
  const fileRef = artRef.child(selectedFile.name);

  var uploadTask = fileRef.put(selectedFile, metadata);

  uploadTask
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then(url => {
    alert("image uploaded with url: " + url);
    listArtStorage();

  }).catch(function(error) {
    console.log(error);
  });

}

//////////////////////////////////////////////List art from firebase
function listArtStorage(){
  // controlWindow = true;
  addArt = true;
  var storageRef = firebase.storage().ref();
  var artRef = storageRef.child('art');

  //initialise artArray first
  artArray = [];
  //listAll
  artRef.listAll().then(function(res) {

    console.log("///ART////");
    res.items.forEach(function(itemRef) {
      console.log(itemRef.name);
      displayImage(itemRef);
    }); 
    
  }).catch(function(error) {
    console.log("!ERROR WITH LISTING FILE!");
    console.log(error);
  });

  console.log("//////////");
}
function displayImage(imageRef) {
  imageRef.getDownloadURL().then(function(url) {
    art = new ArtStorage();
    art.name = imageRef.name;
    art.url = url;
    art.img = createImg(url, '');
    // myArray[i].img = createImg(myArray[i].url, '');
    art.xPosition;
    art.yPosition;
    artArray.push(art);
    
  }).catch(function(error) {
    console.log("ERROR WITH DISPLAYING URL!");
    console.log(error);
  });
}
function deleteDataToFirebase(){
  deletePositionsToFirebase();
  deleteTextsToFirebase();
  deleteLinkToFirebase();
}

function deleteUpload(){
  deletePositionsToFirebase(uploadPositionsToFirebase);
  deleteTextsToFirebase(uploadTextsToFirebase);
  deleteLinkToFirebase(uploadLinksToFirebase);
  uploadBackgroundToFirebase();
}

//////////////////////////////////////////////Memory
//from the keys
function chooseMemoryWithKeys(){
  if(controlWindow){
    switch (keyCode) {
      case 49:
        memory = 1;
        break;
      case 50:
        memory = 2;
        break;
      case 51:
        memory = 3;
        break;
      case 52:
        memory = 4;
        break;
      case 53:
        memory = 5;
        break;
    
      default:
        break;
    }
  }
}
function memory1Function(){
  myArray = [];
  memory = 1;
  for (let i = 0; i < textArray.length; i++) {
    textArray[i].newTextArea.attribute("style","display:none");
  }
  loadFromFirebase();
  saveDefaultMemory();
}
function memory2Function(){
  myArray = [];
  memory = 2;
  for (let i = 0; i < textArray.length; i++) {
    textArray[i].newTextArea.attribute("style","display:none");
  }
  loadFromFirebase();
  saveDefaultMemory();
}
function memory3Function(){
  myArray = [];
  memory = 3;
  for (let i = 0; i < textArray.length; i++) {
    textArray[i].newTextArea.attribute("style","display:none");
  }
  loadFromFirebase();
  saveDefaultMemory();
}
function memory4Function(){
  myArray = [];
  memory = 4;
  for (let i = 0; i < textArray.length; i++) {
    textArray[i].newTextArea.attribute("style","display:none");
  }
  loadFromFirebase();
  saveDefaultMemory();
}
function memory5Function(){
  myArray = [];
  memory = 5;
  for (let i = 0; i < textArray.length; i++) {
    textArray[i].newTextArea.attribute("style","display:none");
  }
  loadFromFirebase();
  saveDefaultMemory();
}


//////////////////////////////////////////////UPLOAD... to upload to firrebase Realtime Database (data...)
function saveMember(name, email){
  // if(userId )
  let data = {
      userId: userId,
      name: name,
      email: email
  }
  let members = database.ref('users/members');
  members.push(data, finished);
  function finished(error) {
    if (error) {
      console.log('ooops member not saved');
    } else {
      console.log('positions member saved!');
    }
  }

}

function saveDefaultMemory(){
  firebase.database().ref(`users/${userId}/defaultMemory`).set({
    defaultMemory: memory
  });
}
function loadDefaultMemory(){
  const defaultMemory = firebase.database().ref(`users/${userId}/defaultMemory`); 
  defaultMemory.once('value', gotDefaultMemory, errDefaultMemory);

}
function uploadPositionsToFirebase(){
  if(myArray.length !== 0 ){
    for (let i = 0; i < myArray.length; i++) {
      var data = { //!! i am curently not uploading img ... is that ok?
        name: myArray[i].name,
        xPosition: myArray[i].xPosition,
        yPosition: myArray[i].yPosition,
        xPositionGrid: myArray[i].xPositionGrid,
        yPositionGrid: myArray[i].yPositionGrid,
        widthSize: myArray[i].widthSize,
        heightSize: myArray[i].heightSize,
        lock: myArray[i].lock,
        snapToWidth: myArray[i].snapToWidth,
        snapToHeight:myArray[i].snapToHeight,
        widthInSquares: myArray[i].widthInSquares,
        heightInSquares: myArray[i].heightInSquares,
        url: myArray[i].url,
      }
      // console.log(data);
      var positions = database.ref(`users/${userId}/${memory}/positions`);
      positions.push(data, finished);
      function finished(error) {
        if (error) {
          console.log('ooops data not saved');
        } else {
          console.log('positions data saved!');
        }
      }
    }
  }else{
    console.log("THERE IS NOTHING TO UPLOAD");
  }

}
function uploadTextsToFirebase(){
  if(textArray.length !== 0 ){
    for (let i = 0; i < textArray.length; i++) {
      var data = { 
        message: textArray[i].message,
        // newTextArea: textArray[i].newTextArea,
        xPosition: textArray[i].xPosition,
        yPosition: textArray[i].yPosition,
        xPositionGrid: textArray[i].xPositionGrid,
        yPositionGrid: textArray[i].yPositionGrid,
        widthSize: textArray[i].widthSize,
        heightSize: textArray[i].heightSize,
        widthInSquares: textArray[i].widthInSquares,
        heightInSquares: textArray[i].heightInSquares,
  
        textSize: textArray[i].textSize,
        textStyle: textArray[i].textStyle,
        textColor: textArray[i].textColor,
        textLetterSpacing: textArray[i].textLetterSpacing,
        lineHeight: textArray[i].lineHeight,
        textOpacity: textArray[i].textOpacity,
        textFont: textArray[i].textFont,
        deleteTransparency: textArray[i].deleteTransparency,
        focusedTransparency: textArray[i].focusedTransparency,
        snapToWidth: textArray[i].snapToWidth,
        snapToHeight:textArray[i].snapToHeight
      }
      // console.log(data);
      const texts = database.ref(`users/${userId}/${memory}/texts`);
      texts.push(data, finished);
      function finished(error) {
        if (error) {
          console.log('ooops text data not saved at ');
          console.log(error);
        } else {
          console.log('texts data saved!');
        }
      }

    }

  }else{
    console.log("THERE IS NOTHING TO UPLOAD");
  }
}
function uploadLinksToFirebase(){
  if(linkArray.length !== 0 ){
    for (let i = 0; i < linkArray.length; i++) {
      var data = {
        linkSrc: linkArray[i].linkSrc,
        xPosition: linkArray[i].xPosition,
        yPosition: linkArray[i].yPosition,
        xPositionGrid: linkArray[i].xPositionGrid,
        yPositionGrid: linkArray[i].yPositionGrid,
        widthSize: linkArray[i].widthSize,
        heightSize: linkArray[i].heightSize,
        widthInSquares: linkArray[i].widthInSquares,
        heightInSquares: linkArray[i].heightInSquares,
        
        linkColor: linkArray[i].linkColor,
        linkOpacity: linkArray[i].linkOpacity,
        linkFont: linkArray[i].linkFont,
        linkSize: linkArray[i].linkSize,
        linkStyle: linkArray[i].linkStyle,
        linkTitle: linkArray[i].linkTitle,
        focusedOpacity: linkArray[i].focusedOpacity,
        focusedColor: linkArray[i].focusedColor,

        snapToWidth: linkArray[i].snapToWidth,
        snapToHeight: linkArray[i].snapToHeight,
        deleteTransparency: linkArray[i].deleteTransparency,
        lock: linkArray[i].lock,
        lockTransparency: linkArray[i].lockTransparency
      }
      // console.log(data);
      const links = database.ref(`users/${userId}/${memory}/links`);
      links.push(data, finished);
      function finished(error) {
        if (error) {
          console.log('ooops links data not saved ');
          console.log(error);
        } else {
          console.log('links data saved!');
        }
      }

    }

  }else{
    console.log("THERE IS NOTHING TO UPLOAD");
  }
}
function uploadBackgroundToFirebase(){   
  firebase.database().ref(`users/${userId}/${memory}/backgroundColor`).set({
    backgroundColor: backgroundColorInput.value(),
    backgroundOpacity: backgroundOpacity.value()
  });
}
function deletePositionsToFirebase(callback){//<<<
  let positions = database.ref(`users/${userId}/${memory}/positions`);
  positions.remove()
  .then(function(){
    console.log("Remove positions succeded.")
    callback();//where to locate the callback??
  })
  .catch(function(error){
    console.log("Remove positions failed: " + error.message);
  });
}
function deleteTextsToFirebase(callback){//<<<
  let texts = database.ref(`users/${userId}/${memory}/texts`);
    texts.remove()
    .then(function(){
      console.log("Remove texts succeded.")
      callback();
    })
    .catch(function(error){
      console.log("Remove texts failed: " + error.message);//what hapens with deleteUpload() if error in delete?
    });
}
function deleteLinkToFirebase(callback){//<<<
  let links = database.ref(`users/${userId}/${memory}/links`);
  links.remove()
    .then(function(){
      console.log("Remove links succeded.")
      callback();
    })
    .catch(function(error){
      console.log("Remove links failed: " + error.message);
    });
}

function addArtFunction(){
  listArtStorage();
}
//////////////////////////////////////////////LOAD from Firebase
function loadFromFirebase(){
  let positions = database.ref(`users/${userId}/${memory}/positions`); 
  positions.once('value', gotPositions, errPositions);

  let texts = database.ref(`users/${userId}/${memory}/texts`);
  texts.once('value', gotTexts, errTexts);

  let links = database.ref(`users/${userId}/${memory}/links`);
  links.once('value', gotLinks, errLinks);

  let backColor = database.ref(`users/${userId}/${memory}/backgroundColor`);
  backColor.once('value', gotbackgroundColor, errbackgroundColor);


}
function gotPositions(data){
  if(data.val() !== null){
    myArray = [];
    let info = data.val();
    let keys = Object.keys(info);
    // console.log(keys);
    let x; 
    let y;
    let w;
    let h;
    let fW;
    let fH;
    let lock;
    let xGrid;
    let yGrid;
    let wSquares;
    let hSquares;
    let url;
    //Put a security LIMIT on the number of the keys array!!
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      x =  info[k].xPositionGrid * gridW;
      y =  info[k].yPositionGrid * gridH;
      w =  info[k].widthSize;
      h =  info[k].heightSize;
      lock = info[k].lock;
      fW = info[k].snapToWidth;
      fH = info[k].snapToHeight;
      xGrid = info[k].xPositionGrid;
      yGrid = info[k].yPositionGrid;
      wSquares = info[k].widthInSquares;
      hSquares = info[k].heightInSquares;
      url = info[k].url;
      n = info[k].name;
   
      thing = new Thing();
      myArray.push(thing);
      myArray[i].xPosition = x;
      myArray[i].yPosition = y;
      myArray[i].xPositionGrid = xGrid;
      myArray[i].yPositionGrid = yGrid;
      myArray[i].lock = lock;
      myArray[i].widthSize = w;
      myArray[i].heightSize = h;
      myArray[i].snapToWidth = fW;
      myArray[i].snapToHeight = fH;
      myArray[i].widthInSquares = wSquares;
      myArray[i].heightInSquares = hSquares;
      myArray[i].url = url;
      myArray[i].name = n; 
      myArray[i].img = createImg(myArray[i].url, '');
    }

  }else{
    console.log("DATABASE IS EMPTY");
  }

  // console.log(data.val());
}
function gotTexts(data){
  if(data.val() !== null){
    textArray = [];
    let info = data.val();
    let keys = Object.keys(info);
    // console.log(keys);
   
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];

      words = new Writing();
      textArray.push(words);

      textArray[i].message = info[k].message;
      textArray[i].xPosition = info[k].xPositionGrid * gridW;
      textArray[i].yPosition = info[k].yPositionGrid* gridH;
      textArray[i].xPositionGrid = info[k].xPositionGrid;
      textArray[i].yPositionGrid = info[k].yPositionGrid;
      textArray[i].widthSize = info[k].widthSize;
      textArray[i].heightSize = info[k].heightSize;
      textArray[i].widthInSquares = info[k].widthInSquares;
      textArray[i].heightInSquares = info[k].heightInSquares;
      textArray[i].textSize = info[k].textSize;
      textArray[i].textStyle = info[k].textStyle;
      textArray[i].textColor = info[k].textColor;
      textArray[i].textLetterSpacing = info[k].textLetterSpacing;
      textArray[i].lineHeight = info[k].lineHeight;
      textArray[i].textOpacity = info[k].textOpacity;
      textArray[i].textFont = info[k].textFont;
      textArray[i].deleteTransparency = info[k].deleteTransparency;//<<<
      textArray[i].focusedTransparency = info[k].focusedTransparency;
      textArray[i].snapToWidth = info[k].snapToWidth;
      textArray[i].snapToHeight = info[k].snapToHeight;

      textArray[i].newTextArea = createElement("textarea");

    }

  }else{
    console.log("DATABASE IS EMPTY");
    textArray = [];
  }

  // console.log(data.val());
}
function gotLinks(data){
  if(data.val() !== null){
    linkArray = [];
    let info = data.val();
    let keys = Object.keys(info);
    // console.log(keys);
   
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      link = new Link();
      linkArray.push(link);

      linkArray[i].linkSrc = info[k].linkSrc;
      linkArray[i].xPosition = info[k].xPositionGrid * gridW;
      linkArray[i].yPosition =  info[k].yPositionGrid * gridH;
      linkArray[i].xPositionGrid = info[k].xPositionGrid;
      linkArray[i].yPositionGrid = info[k].yPositionGrid;
      linkArray[i].widthSize = info[k].widthSize;
      linkArray[i].heightSize = info[k].heightSize;
      linkArray[i].widthInSquares = info[k].widthInSquares;
      linkArray[i].heightInSquares = info[k].heightInSquares;
      
      linkArray[i].linkColor = info[k].linkColor;
      linkArray[i].linkOpacity = info[k].linkOpacity;
      linkArray[i].linkFont = info[k].linkFont;
      linkArray[i].linkSize = info[k].linkSize;
      linkArray[i].linkStyle = info[k].linkStyle;
      linkArray[i].linkTitle = info[k].linkTitle;
      linkArray[i].focusedOpacity = info[k].focusedOpacity;
      linkArray[i].focusedColor = info[k].focusedColor;

      linkArray[i].snapToWidth = info[k].snapToWidth;
      linkArray[i].snapToHeight = info[k].snapToHeight;
      linkArray[i].deleteTransparency = info[k].deleteTransparency;
      linkArray[i].lock = info[k].lock;
      linkArray[i].lockTransparency = info[k].lockTransparency;

    }

  }else{
    console.log("DATABASE IS EMPTY");
    linkArray = [];
  }

}
function gotbackgroundColor(data){
  if(data.val() !== null){
    let info = data.val();
    backgroundColorInput.elt.value = info.backgroundColor;
    backgroundOpacity.elt.value = info.backgroundOpacity;
  }else{
    console.log("DATABASE IS EMPTY");
  }

}
function gotDefaultMemory(data){
  // memoryFromUrl implication should not come here to be evaluated but... for now ok 
  if(!memoryFromUrl){

    if(data.val() !== null){
      let info = data.val();
      memory = info.defaultMemory;
      
      print("memory " + memory);
      loadFromFirebase();
    }else{
      print(data)
      console.log("DATABASE IS EMPTY");
    }

  }else{
    memory = newMemory;
    print("memory " + memory);
    loadFromFirebase();
  }

}
function errDefaultMemory(err){
  console.log('ERROR!!!!!!!DefaultMemory!!!!!!!');
  console.log(err);
}

function errPositions(err){
  console.log('ERROR!!!!POSITIONS!!!!!!!!!');
  console.log(err);
}
function errTexts(err){
  console.log('ERROR!!!!!!!TEXT!!!!!!!');
  console.log(err);
}
function errLinks(err){
  console.log('ERROR!!!!!!!LINK!!!!!!!');
  console.log(err);
}
function errbackgroundColor(err){
  console.log('ERROR!!!!!!!backgroundColor!!!!!!!');
  console.log(err);
}

//////////////////////////////////////////////MOVE&PRESS things around 
function mouseDragged(){
  //If  Draged move
  if(logdIn){

    if(myArray.length !== 0){
      for (let i = 0; i < myArray.length; i++) {
        myArray[i].moveThing();
      }
    }
  
    if(textArray.length !==0){
      for (let i = 0; i < textArray.length; i++) {
        textArray[i].moveWriting(i);      
      }
    }
  
    if(linkArray.length !==0 ){
      for (let i = 0; i < linkArray.length; i++) {
        linkArray[i].moveLink(i);
      }
    }
  }

}

function mouseMoved(){
  cursorControl = "arrow";
  for (let i = 0; i < linkArray.length; i++) {
    linkArray[i].giveLinkArrayInfo(i);
  }

  if(logdIn){//<<<if array.lenght >0 <<<< at each
    //x and y matrix point
    giveGridPoint();

    if(myArray.length !=0){
      for (let i = 0; i < myArray.length; i++) {
        myArray[i].giveMyArrayInfo(i);
      }
    }
    if(textArray.length !=0){
      for (let i = 0; i < textArray.length; i++) {
        textArray[i].giveTextArrayInfo(i);
      }
    }
    if(linkArray.length !=0){
      for (let i = 0; i < linkArray.length; i++) {
        linkArray[i].giveLinkArrayInfo(i);
      }
    }  
  
  }
}

function mousePressed() {
    //open this link
    if(linkArray !== 0 ){
      for (let i = 0; i < linkArray.length; i++) {
        linkArray[i].linkClicked(); 
      }
    }

  if(logdIn ){

    //so that it willnotmove while choosing text size style textarea etc 
    if(!changeSize && (mouseX < xWhereToWrite || mouseX > xWhereToWrite + temporaryTextArea.elt.scrollWidth + 10) || !changeSize &&(mouseY < yWhereToWrite || mouseY > yWhereToWrite + temporaryTextArea.elt.scrollHeight + 10)){
      xWhereToWrite = mouseX;
      yWhereToWrite = mouseY;
    }
    //delete this image
    if(myArray.length !==0 ){
      for (let i = 0; i < myArray.length; i++) {
        //athingDeletet at the end of this order
        myArray[i].thingSnap();
        myArray[i].thingLock();
        myArray[i].thingDelete();
      }
    } 
  
    //info for Art
    if(artArray.length !== 0){
      for (let i = 0; i < artArray.length; i++) {
        artArray[i].giveArtArrayInfo(i);
      }
    }
    //delete this link
    if(linkArray !== 0 ){
      for (let i = 0; i < linkArray.length; i++) {
        linkArray[i].linkSnap();
        linkArray[i].linkLock();
        linkArray[i].linkDelete();
      }
    }
    //delete this Text
    if(textArray !== 0){
      for (let i = 0; i < textArray.length; i++) {
        textArray[i].textDelete();
      }
    }
    
  }

}



//DO NOW
//
//
//Git
//git page at domain
//url/Name/Memory
//
//
//ESC like logout
//SPACE bar to save canvas picture
//
//
//
//
//TESTER for a week
//READ & LEARN firbase examples



//BUGS
//with deleting different image
//catch with problematic images ERROR
//
//
//
//
//different browsers >> safari (when cotrol cant see images from firbase)


