var queCounter = 0;
var ans;
var correctAnswerCounter = 0;
var wrongAnswerCounter = 0;
var attemptCounter = 0;
var unattemptCounter = 1;
// var questions;

function signUp(){
    // e.preventDefault();
    var password1 = document.getElementById('pwd').value;
    var password2 = document.getElementById('cpwd').value;

    function validate(){
        let fname = document.getElementById('fname').value.trim();
        let lname = document.getElementById('lname').value.trim();
        let email = document.getElementById('email').value.trim();
        let pswd = document.getElementById('pwd').value.trim();

        if(fname != "" && lname != "" && email != "" && pswd != ""){
            return true;
        }else{
            return false;
        }
    }

    if(password1 == password2 && validate()){
        let formData = {
            fname: document.getElementById('fname').value,
            lname: document.getElementById('lname').value,
            email: document.getElementById('email').value,
            pwd: document.getElementById('pwd').value
        }
        let personList = JSON.parse(localStorage.getItem('formData'));
        if(personList == null){
            dataArr = [];
        }else{
            dataArr = personList;
        }
        const newData =  JSON.stringify(formData);
        dataArr.push(newData)
        
        localStorage.setItem('formData', JSON.stringify(dataArr));
        document.getElementById('signup_msg').style.color = "green";
        document.getElementById('signup_msg').innerHTML = "Sign Up Successfully. Please Log In";
        document.getElementById('fname').value = "";
        document.getElementById('lname').value = "";
        document.getElementById('email').value = "";
        document.getElementById('pwd').value = "";
        document.getElementById('cpwd').value = "";
    }else{
        document.getElementById('signup_msg').style.color = "red";
        document.getElementById('signup_msg').innerHTML = "Provide Valid Information";
        document.getElementById('pwd').value = "";
        document.getElementById('cpwd').value = "";
    }
    
     
}

function logIn(){
    let email = document.getElementById("login_email").value;
    let pwd = document.getElementById("login_pwd").value;

    let personList = JSON.parse(localStorage.getItem('formData'));

    let resp;
    personList.forEach(element => {
        let data = JSON.parse(element);
        let e = data.email;
        let p = data.pwd;
        console.log(e);
        if(data.email == email && data.pwd == pwd){
            var fullName = data.fname+" "+data.lname;
            const userInfo = {name: fullName, email: data.email};
            localStorage.setItem("isLogin", JSON.stringify(userInfo));
            resp = "success";
        }
    });

    if(resp == "success"){
        location.href = "ExamPage.html";
    }else{
        document.getElementById("wrong_credentials").innerHTML = "Invalid Credentials";
        document.getElementById("login_email").value = "";
        document.getElementById("login_pwd").value = "";
    }
}

function exampage(){
    debugger
    const isLogin = localStorage.getItem("isLogin");
    const userInfo = JSON.parse(isLogin);
    var username = userInfo.name;
    var userEmail = userInfo.email;
    document.getElementById("profile_name").innerHTML = username;
    document.getElementById("profile_email").innerHTML = userEmail;
    document.getElementById('timer').innerHTML = 05 + ":" + 10;
    startTimer();
    getQuizQuestions(queCounter);
    queCounter = queCounter+1;

}

function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if(s==59){m=m-1}
    if(m<0){
        //location.href = "ResultPage.html";
        //document.getElementById('resultInput').innerHTML = "Your result";
      return
    }
    document.getElementById('timer').innerHTML = m + ":" + s;
    setTimeout(startTimer, 1000);
    
    function checkSecond(sec) {
        if (sec < 10 && sec >= 0) {
            sec = "0" + sec
        }; // add zero in front of numbers < 10
        if (sec < 0) {sec = "59"};
        return sec;
    }
}

async function getQuizQuestions(i){
    debugger
    console.log("==>"+i);
    const response = await fetch('https://raw.githubusercontent.com/attainu/attainu-eagle/master/assignments/week-4/day-4/quiz.json')
    const questions = await response.json();
    console.log(questions);
    const questionObject = await questions[i];
    var que = questionObject.question;
    ans = questionObject.answer;

    console.log("======"+que);
    queNumber = i+1;
    document.getElementById("currentQues").innerHTML = queNumber;
    document.getElementById("que").innerHTML = que;
}

function loadQuestionOnSubmit(){
    var userAnswer = document.getElementById("ans").value;
    var finalAns = userAnswer.trim();

    if(queCounter > 9){
        //loadResultToLocalStorage();
        //window.location.href = "ResultPage.html";
        // onloadResult();
        let resultHtml = `<h1>YOUR RESULT</h1> 
        
        <div id="result" >
            <label>CORRECT: </label><span id="correct">${correctAnswerCounter}</span><br>
            <label>WRONG: </label><span id="wrong">${wrongAnswerCounter}</span><br>
            <label>ATTEMPT: </label><span id="attempt">${attemptCounter}</span><br>
            <label>UNATTEMPT: </label><span id="unattempt">${unattemptCounter}</span><br>
            <label>SCORE: </label><span id="score">${correctAnswerCounter}</span>
        </div>`;

        document.getElementById("TimeContainer").innerHTML = resultHtml;
        document.getElementById("bodyContainer").innerHTML = "";
    }

    if(finalAns == ""){
        unattemptCounter += 1;

    }else{
        attemptCounter += 1;
        if(finalAns.toLowerCase() == ans.toLowerCase()){
            correctAnswerCounter += 1;
        }else{
            wrongAnswerCounter += 1;
        }
    }
    
    getQuizQuestions(queCounter);
    queCounter = queCounter + 1;
    
    document.getElementById("ans").value = "";
}

function loadQuestionOnSkip(){
    if(queCounter > 9){
        //loadResultToLocalStorage();
        // window.location.href = "ResultPage.html";
        // onloadResult();
        //document.getElementById("quizSection").innerHTML = onloadResult();

        let resultHtml = `<h1>YOUR RESULT</h1> 
        
        <div id="result" >
            <label>CORRECT: </label><span id="correct">${correctAnswerCounter}</span><br>
            <label>WRONG: </label><span id="wrong">${wrongAnswerCounter}</span><br>
            <label>ATTEMPT: </label><span id="attempt">${attemptCounter}</span><br>
            <label>UNATTEMPT: </label><span id="unattempt">${unattemptCounter}</span><br>
            <label>SCORE: </label><span id="score">${correctAnswerCounter}</span>
        </div>`;

        document.getElementById("TimeContainer").innerHTML = resultHtml;
        document.getElementById("bodyContainer").innerHTML = "";
    }

    unattemptCounter += 1;

    getQuizQuestions(queCounter);
    queCounter = queCounter + 1;
    document.getElementById("ans").value = "";   
}

function loadResultToLocalStorage(){
    localStorage.setItem('correctValue', correctAnswerCounter);
    localStorage.setItem('wrongValue', wrongAnswerCounter);
    localStorage.setItem('attemptvalue', attemptCounter);
    localStorage.setItem('unattemptValue', unattemptCounter);
}

function loadResultToLocalStorageOnAbort(){
    debugger
    localStorage.setItem('correctValue', correctAnswerCounter);
    localStorage.setItem('wrongValue', wrongAnswerCounter);
    localStorage.setItem('attemptvalue', attemptCounter);
    let unattemptCounter =  10-attemptCounter;
    localStorage.setItem('unattemptValue', unattemptCounter);
}


function onloadResult(){
    var correctAnswer = localStorage.getItem("correctValue");
    document.getElementById("correct").innerHTML = correctAnswer;

    var wrongAnswer = localStorage.getItem("wrongValue");
    document.getElementById("wrong").innerHTML = wrongAnswer;

    var attemptQues = localStorage.getItem("attemptvalue");
    document.getElementById("attempt").innerHTML = attemptQues;

    var unattemptQues = localStorage.getItem("unattemptValue");
    document.getElementById("unattempt").innerHTML = unattemptQues;

    document.getElementById("score").innerHTML = correctAnswer+"/"+10;
}

function abort(){
    //loadResultToLocalStorageOnAbort();
    //location.href = "ResultPage.html";
    let resultHtml = `<h1>YOUR RESULT</h1> 
        
        <div id="result" >
            <label>CORRECT: </label><span id="correct">${correctAnswerCounter}</span><br>
            <label>WRONG: </label><span id="wrong">${wrongAnswerCounter}</span><br>
            <label>ATTEMPT: </label><span id="attempt">${attemptCounter}</span><br>
            <label>UNATTEMPT: </label><span id="unattempt">${unattemptCounter}</span><br>
            <label>SCORE: </label><span id="score">${correctAnswerCounter}</span>
        </div>`;

        document.getElementById("TimeContainer").innerHTML = resultHtml;
        document.getElementById("bodyContainer").innerHTML = "";
}

function logout(){
    localStorage.removeItem("isLogin");
    localStorage.removeItem("correctValue");
    localStorage.removeItem("unattemptValue");
    localStorage.removeItem("attemptvalue");
    localStorage.removeItem("wrongValue");

    location.href = "LogInPage1.html";
}

function restartExam(){
  location.reload(true);
}