import { computeBmi, bmiToText, comment, BMRString } from './calculator';

function checkInput() {
    const pre = document.getElementById('preWeight').value;
    const after = document.getElementById('afterWeight').value;
    const height = document.getElementById('height').value;
    const age = document.getElementById('age').value;
    let target = document.getElementById("genderBox");
    const gender =  target.options[target.selectedIndex].value;

    console.log(pre, after, height, age, gender);

    if(!(pre && after && height && age && gender)) {
        alert('입력값을 입력해주세요');
    }
}

const getInputValues = () => ({
  weights: [
    document.getElementById('preWeight').value,
    document.getElementById('afterWeight').value,
  ],
  height: document.getElementById('height').value,
});

const update = bmis => {
  ['preBMI', 'afterBMI'].forEach((id, index) => {
    const bmi = bmis[index];
    document.getElementById(id).innerText = `${bmi}(${bmiToText(bmi)})`;
  });
  document.getElementById('comment').innerText = comment(bmis);
};

function BMIcalculator() {
    console.log('BMIcalculator');

    // 입력값들을 받는다.
    const { weights, height } = getInputValues();

    // BMI를 계산한다.
    const bmis = weights.map(weight => computeBmi(weight, height));

    // 결과값들을 출력한다.
    update(bmis);

}

function resetInput() {
    document.getElementById('preWeight').value = '';
    document.getElementById('afterWeight').value = '';
    document.getElementById('height').value = '';
    document.getElementById('age').value = '';
}

function BMRcalculator() {
    const pre = document.getElementById('preWeight').value;
    const after = document.getElementById('afterWeight').value;
    const height = document.getElementById('height').value;
    const age = document.getElementById('age').value;

    let target = document.getElementById("genderBox");
    const gender =  target.options[target.selectedIndex].value;

    if(gender==="man") {
        const preResult = 66.47 + (13.75 * pre) + (5 * height) - (6.76 * age);
        const afterResult = 66.47 + (13.75 * after) + (5 * height) - (6.76 * age);
        var BMRList = [preResult.toFixed(2), afterResult.toFixed(2)];
    } else {
        const preResult = 655.1 + (9.56 * pre) + (1.85 * height) - (4.68 * age);
        const afterResult = 655.1 + (9.56 * after) + (1.85 * height) - (4.68 * age);
        var BMRList = [preResult, afterResult];

    }
    document.getElementById('preBMR').innerHTML   = BMRList[0] + '(빅맥 ' + BMRString(BMRList[0]).toFixed(1) + '개)';
    document.getElementById('afterBMR').innerHTML = BMRList[1] + '(빅맥 ' + BMRString(BMRList[1]).toFixed(1) + '개)';
}

document.addEventListener('DOMContentLoaded', function() {

    //계산버튼을 누른다.
    document.getElementById('button').addEventListener('click', function() {
        checkInput();
        BMIcalculator();
        BMRcalculator();
    })

    //리셋을 클릭하면 리셋한다.
    document.getElementById('button2').addEventListener('click', function() {
        resetInput();
    })
}, false);
