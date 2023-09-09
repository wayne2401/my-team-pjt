

const readline = require('readline');

// const numbers = [];
// for (let n = 0; n <= 9; n++) {   // 숫자의 범위. 0~9 이다
//     numbers.push(n);    // const numbers = [] 에 0~9의 숫자를 추가해줌.
// }

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 위 for문( line 1~4 )을 대체 가능. ( 같은 결과를 출력함. )

const answer = [];
for (let n = 0; n < 3; n++) {     //3번 반복. 3보다 작다라고 알수 있지만 0,1,2 이기에 3이 맞음.
    const index = Math.floor(Math.random() * numbers.length);
    answer.push(numbers[index]);   // 호출한 값을 push가 넣어줌.
    numbers.splice(index, 1);     // 중복되지 않도록 호출한 값(1개씩 호출이니 1개)을 splice(다음 선택에서 제거해줌.)
}
// console.log(answer);     //를 사용하게 되면 이제 랜덤으로 3개의 숫자를 출력하게 된다. 
// 위 line까지 참고 사이트 링크 : https://ts2ree.tistory.com/119

// 하기 코드는 Chat-GPT와 반복확인으로 완성.

let tries = 0; // 시도한 회차
const maxTries = 9; // 최대 시도 횟수

function checkInput(input) {
    if (input.length !== 3) {    // input이 3자리 숫자가 아닐경우
        return "3자리 숫자를 입력하세요.";  // 3자리 숫자를 입력하라는 문구 출력.
    }
    if (new Set(input).size !== 3) {  // !==3이 없다면 false가 된다.
        return "중복값 사용 불가."; // 중복된 숫자가 있는 경우 알람발생.
    }
    return null; 
}

function playGame(value) {
    const inputError = checkInput(value);
    if (inputError) {
        console.log(inputError);
        return;
    }

    const guess = value.split('').map(Number); // 값을 각 자릿수로 나눔

    let strike = 0;
    let ball = 0;       // 기본 strike와 ball

    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === guess[i]) {
            strike++;   //  입력값이 결과값,위치값이 맞으면 strike가 1씩 증가한다.
        } else if (answer.includes(guess[i])) {
            ball++;     //  입력값이 결과값과 같고 위치가 다르면 ball이 1씩 증가한다.
        }
    }

    const result = ("공격숫자" +value + ": " + strike + " 스트라이크 " + ball + " 볼"); // #위치 
    tries++;

    if (strike === answer.length) {
        console.log(tries + "번 만에 통과.");
        rl.close(); // 게임 종료
        return;
    }

    if (tries >= maxTries) {
        console.log("마지막 9회차 패배!");
        rl.close(); // 게임 종료
        return;
    }

    console.log(`${tries}회차 - ${result}`);   // #위치 - 해당부분의 배치를 조절하여 결과값의 출력배치를 조절가능.
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput() {
    rl.question('세 자리 숫자를 입력하세요: ', (input) => {
        playGame(input);
        if (tries < maxTries) {
            getUserInput(); // 다음 입력을 기다립니다.
        } else {
            rl.close();
        }
    });
}

getUserInput();
