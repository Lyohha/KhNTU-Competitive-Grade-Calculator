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

    let engInput = $this.querySelector('[name="eng-value"]');
    let logicInput = $this.querySelector('[name="logic-value"]');
    let specInput = $this.querySelector('[name="spec-value"]');


    let engValue = parseInt(engInput.value);
    let logichValue = parseInt(logicInput.value);
    let specValue = parseInt(specInput.value);

    console.log(engValue);
    console.log(logichValue);
    console.log(specValue);

    let calculatedSubjects = [];

    window.calculatorConfig.forEach(function(value, index) {

        let tableItem = {
            name: value.name,
            grade: 0,
            good: false,
            result: 0,
            subjectParts: [
                {
                    title: 'Іноземна мова',
                    value: engValue + ' * ' + value.eng + ' = ' + ((engValue * value.eng).toFixed(3))
                },
                {
                    title: 'ТЗНК',
                    value: logichValue + ' * ' + value.logic + ' = ' + ((logichValue * value.logic).toFixed(3))
                },
                {
                    title: 'Фаховий іспит',
                    value: specValue + ' * ' + value.spec + ' = ' + ((specValue * value.spec).toFixed(3))
                },
            ],
        };

        let result = value.eng * engValue + value.logic * logichValue + value.spec * specValue;

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
    $td.innerHTML = 'Іноземна мова';
    $trHead.append($td);

    $td = document.createElement('td');
    $td.innerHTML = 'ТЗНК';
    $trHead.append($td);

    $td = document.createElement('td');
    $td.innerHTML = 'Фаховий іспит';
    $trHead.append($td);


    $coefTable.append($tHead);

    window.calculatorConfig.forEach(function(value, index) {
        let $line = document.createElement('tr');

        let $td = null;

        $td = document.createElement('td');
        $td.innerHTML = value.name;
        $line.append($td);

        $td = document.createElement('td');
        $td.innerHTML = value.eng;
        $line.append($td);

        $td = document.createElement('td');
        $td.innerHTML = value.logic;
        $line.append($td);

        $td = document.createElement('td');
        $td.innerHTML = value.spec;
        $line.append($td);
        
        $coefTable.append($line);
    });

    document.querySelector('[js-coef-table]').append($coefTable);
}

fillCoefTable();