console.log('start calculator');
console.log(window.calculatorConfig);

let $checkBoxes = document.querySelectorAll('[js-checkbox]');
let $radioBoxs = document.querySelectorAll('[js-radiobox]');
let $table = document.querySelector('[js-result-table]');

function onRadioBoxChange(event) {

    let $this = this;

    $radioBoxs.forEach(function($radioBox, index) {
        $radioBox.closest('.input_line').querySelector('[type="number"]').disabled = true;
    });

    $this.closest('.input_line').querySelector('[type="number"]').disabled = false;
}

$radioBoxs.forEach(function($radioBox, index) {
    $radioBox.addEventListener('change', onRadioBoxChange);
});

function onCheckBoxChange(event) {

    let $this = this;

    $this.closest('.input_line').querySelector('[type="number"]').disabled = !$this.checked;

}

$checkBoxes.forEach(function($checkBoxe, index) {
    $checkBoxe.addEventListener('change', onCheckBoxChange);
});


document.querySelector('[js-calculator_form]').addEventListener('submit', function(event) {
    event.preventDefault();

    console.log('calculate form');

    let $this = this;

    let ukrInput = $this.querySelector('[name="ukr-value"]');
    let mathInput = $this.querySelector('[name="math-value"]');
    let historyInput = $this.querySelector('[name="history-value"]');
    let conInput = $this.querySelector('[name="con-value"]');
    let subject4RadioBox = $this.querySelector('[name="subject-4"]:checked').value;
    let subject4Input = $this.querySelector('[name="' + subject4RadioBox + '-value"]');
    let conCheckbox = $this.querySelector('[name="con-cb"]').checked;


    let ukrValue = parseInt(ukrInput.value);
    let mathValue = parseInt(mathInput.value);
    let historyValue = parseInt(historyInput.value);
    let conValue = parseInt(conInput.value);
    let subject4Value = parseInt(subject4Input.value);

    console.log(ukrValue);
    console.log(mathValue);
    console.log(historyValue);
    console.log(conValue);
    console.log(subject4Value);

    let calculatedSubjects = [];

    const SUBJECTS = {
        "geo": "Географія",
        "eng": "Іноземна мова",
        "chem": "Хімія",
        "phis": "Фізика",
        "bio": "Біологія",
        "lit": "Українська література",
    };

    window.calculatorConfig.forEach(function(value, index) {
        if(!conCheckbox && value.con != null) 
            return;

        let tableItem = {
            name: value.name,
            grade: 0,
            good: false,
            result: 0,
            subjectParts: [
                {
                    title: 'Українська мова',
                    value: ukrValue + ' * ' + value.ukr + ' = ' + ((ukrValue * value.ukr).toFixed(3))
                },
                {
                    title: 'Математика',
                    value: mathValue + ' * ' + value.math + ' = ' + ((mathValue * value.math).toFixed(3))
                },
                {
                    title: 'Історія України',
                    value: historyValue + ' * ' + value.history + ' = ' + ((historyValue * value.history).toFixed(3))
                },
                {
                    title: SUBJECTS[subject4RadioBox] + ':',
                    value: subject4Value + ' * ' + value[subject4RadioBox] + ' = ' + ((subject4Value * value[subject4RadioBox]).toFixed(3))
                },
            ],
        };

        let topPart = value.ukr * ukrValue + value.math * mathValue + value.history * historyValue;
        let bottomValue = value.ukr + value.math + value.history;

        topPart += subject4Value * value[subject4RadioBox];
        bottomValue += value[subject4RadioBox];

        tableItem.topPart = topPart;
        tableItem.bottomValue = bottomValue;

        if(value.con != null) {
            topPart += conValue * value.con;
            bottomValue += value.con;

            tableItem.subjectParts.push({
                title: 'Творчий конкурс',
                value: conValue + ' * ' + value.con + ' = ' + ((conValue * value.con).toFixed(3))
            })
        }

        let result = topPart / bottomValue;

        if(value.coef != null) {
            result *= value.coef;
            tableItem.subjectParts.push({
                title: 'Галузевий коефіцієнт',
                value: value.coef,
            })
        }

        if(result >= 130)
            tableItem.good = true;

        tableItem.result = result;
        tableItem.grade = result.toFixed(3);
        calculatedSubjects.push(tableItem);
    });

    calculatedSubjects.sort(function(x, y) {
        if(x.result < y.result) 
            return 1;
        if(x.result > y.result)
            return -1;
        return 0;
    })

    console.log(calculatedSubjects);

    $table.innerHTML = '<div class="result-line"><div class="result-spec head">Спеціальність</div><div class="result-grade head">Конкурсний бал</div><div class="result-subjects head"> Предметні складники</div></div>';

    calculatedSubjects.forEach(function(value, index) {
        let $line = document.createElement('div');
        $line.classList.add('result-line');

        if(value.good)
            $line.classList.add('good');

        let $spec = document.createElement('div');
        $spec.classList.add('result-spec');
        $spec.innerHTML = value.name;
        $line.append($spec);

        let $grade = document.createElement('div');
        $grade.classList.add('result-grade');
        $grade.innerHTML = value.grade;
        $line.append($grade);

        let $subjects = document.createElement('div');
        $subjects.classList.add('result-subjects');

        value.subjectParts.forEach(function(subject, sindex) {
            let $subject = document.createElement('div');
            $subject.classList.add('result-subject');
            $subject.innerHTML = ' <span>' + subject.title + ':</span> ' + subject.value;
            $subjects.append($subject);
        });
        $line.append($subjects);


        $table.append($line);
    });
});

function fillCoefTable() {
    let $coefTable = document.createElement('table');
    $coefTable.classList.add('coef-table');

    let $tHead = document.createElement('thead');

    let $trHead = document.createElement('tr');
    $tHead.append($trHead);

    let $td = null;

    $td = document.createElement('td');
    $td.innerHTML = 'Спеціальність';
    $trHead.append($td);

    $td = document.createElement('td');
    $td.innerHTML = 'Українська мова';
    $trHead.append($td);

    $td = document.createElement('td');
    $td.innerHTML = 'Математика';
    $trHead.append($td);

    $td = document.createElement('td');
    $td.innerHTML = 'Історія України';
    $trHead.append($td);

    $td = document.createElement('td');
    $td.innerHTML = 'Географія';
    $trHead.append($td);

    $td = document.createElement('td');
    $td.innerHTML = 'Іноземна мова';
    $trHead.append($td);

    $td = document.createElement('td');
    $td.innerHTML = 'Хімія';
    $trHead.append($td);

    $td = document.createElement('td');
    $td.innerHTML = 'Фізика';
    $trHead.append($td);

    $td = document.createElement('td');
    $td.innerHTML = 'Біологія';
    $trHead.append($td);

    $td = document.createElement('td');
    $td.innerHTML = 'Українська література';
    $trHead.append($td);

    $td = document.createElement('td');
    $td.innerHTML = 'Творчий конкурс';
    $trHead.append($td);

    $coefTable.append($tHead);

    window.calculatorConfig.forEach(function(value, index) {
        let $line = document.createElement('tr');

        let $td = null;

        $td = document.createElement('td');
        $td.innerHTML = value.name;
        $line.append($td);

        $td = document.createElement('td');
        $td.innerHTML = value.ukr;
        $line.append($td);

        $td = document.createElement('td');
        $td.innerHTML = value.math;
        $line.append($td);

        $td = document.createElement('td');
        $td.innerHTML = value.history;
        $line.append($td);

        $td = document.createElement('td');
        $td.innerHTML = value.geo;
        $line.append($td);

        $td = document.createElement('td');
        $td.innerHTML = value.eng;
        $line.append($td);

        $td = document.createElement('td');
        $td.innerHTML = value.chem;
        $line.append($td);

        $td = document.createElement('td');
        $td.innerHTML = value.phis;
        $line.append($td);

        $td = document.createElement('td');
        $td.innerHTML = value.bio;
        $line.append($td);

        $td = document.createElement('td');
        $td.innerHTML = value.lit;
        $line.append($td);

        
        $td = document.createElement('td');
        if(value.con != null) {
            $td.innerHTML = value.con;
        }
        $line.append($td);

        $coefTable.append($line);
    });

    document.querySelector('[js-coef-table]').append($coefTable);
}

fillCoefTable();