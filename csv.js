    document.querySelector('[js-csv-form]').addEventListener('submit', function(event) {
        event.preventDefault();
        let $this = this;

        let $text = $this.querySelector('textarea');
        let text = $text.value;

        let lines = text.split('\n');

        let jsonArray = [];

        lines.forEach(function(line, index) {
            if(index == 0)
                return;
            let columns = line.split(';');
            if(columns.length == 1)
                columns = line.split(',');
            if(columns.length == 1)
                return;
            let obj = {
                "name": columns[0],
                "ukr": parseFloat(columns[1].replace(',', '.')),
                "math": parseFloat(columns[2].replace(',', '.')),
                "history": parseFloat(columns[3].replace(',', '.')),
                "geo": parseFloat(columns[9].replace(',', '.')),
                "eng": parseFloat(columns[4].replace(',', '.')),
                "chem": parseFloat(columns[7].replace(',', '.')),
                "phis": parseFloat(columns[6].replace(',', '.')),
                "bio": parseFloat(columns[5].replace(',', '.')),
                "lit": parseFloat(columns[8].replace(',', '.')),
                // "con": columns[0],
                // "coef": columns[0],
            };

            if(columns[10].length > 0) 
                obj.con =  parseFloat(columns[10].replace(',', '.'));
            if(columns[11].length > 0) 
                obj.coef =  parseFloat(columns[11].replace(',', '.'));

            jsonArray.push(obj);
        });

        $text.value = JSON.stringify(jsonArray);
    });