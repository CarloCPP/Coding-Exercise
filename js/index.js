// invalid token
// http://data.fixer.io/api/latest?access_key=fe3a9b3f9ac173a3e51d8ea22951cf95
// my token
// http://data.fixer.io/api/latest?access_key=343f29e70b6557c9aed42f7b8432e303

// sorting?
// validation?
// any frameworks limitation?
// onload or onclick?


// const url = 'http://data.fixer.io/api/latest?access_key=fe3a9b3f9ac173a3e51d8ea22951cf95'
const url = 'http://data.fixer.io/api/latest?access_key=343f29e70b6557c9aed42f7b8432e303'

var ratesList = [];
var mutatedRatesList = [];
var isNormalDataLoaded = false;
var isMutatedDataLoaded = false;





const fetchData = async () => {
    console.log('Fetching data');
    // fetch('https://aURLforErrorTesting/users', { method: 'get' })
    fetch(url, { method: 'get' })
        .then(
            response => response.json()
        )
        .then(json => {
            document.getElementById('isNormalDataLoaded').innerText = "Normal Table (loaded)"
            var isNormalDataLoaded = true;
            document.getElementById('isMutatedDataLoaded').innerText = "Mutated Table (+10.0002) (loaded)"
            var isMutatedDataLoaded = true;

            console.log(json.rates)
            ratesList = json.rates;
            // mutatedRatesList = json.rates;//remove this later
            // console.log(typeof (ratesList));

            // do validation for empty list
            if (Object.keys(ratesList).length === 0) {
                console.log("Not lst");

                return;
            }
            console.log("Not empty");

            // normal list
            console.log('ratesList: ', ratesList);
            for (let [key, value] of Object.entries(ratesList)) {
                // var ratesKey = document.createTextNode(key);
                // var ratesValue = document.createTextNode(value);


                var normalTable = document.getElementById("normalTable");
                var normalTableRow = normalTable.insertRow(-1);
                var ratesKeyCell = normalTableRow.insertCell(0);
                var ratesValueCell = normalTableRow.insertCell(1);
                ratesKeyCell.innerHTML = key;
                ratesValueCell.innerHTML = value;




                if (key == "HKD") {
                    console.log(`key of ${key} and value of ${value} has key with HKD`);
                    ratesKeyCell.style.border = 'solid'
                    ratesKeyCell.style.borderColor = 'red'

                    ratesValueCell.style.border = 'solid'
                    ratesValueCell.style.borderColor = 'red'

                }

                if (isRateEven(value)) {
                    console.log(`key of ${key} and value of ${value} has value of Even number`);
                    ratesKeyCell.style.border = 'solid'
                    ratesKeyCell.style.borderColor = 'red'
                    ratesValueCell.style.border = 'solid'
                    ratesValueCell.style.borderColor = 'red'

                }



            }


            //mutatedRatesList 
            // +10.0002
            mutatedRatesList = Object.assign({}, ratesList);
            const keyList = Object.keys(mutatedRatesList);
            keyList.map((key) => (mutatedRatesList[key] += 10.0002))








            console.log('mutatedRatesList: ', mutatedRatesList);

            for (let [key, value] of Object.entries(mutatedRatesList)) {


                var mutatedTable = document.getElementById("mutatedTable");
                var mutatedTableRow = mutatedTable.insertRow(-1);
                var ratesKeyCell = mutatedTableRow.insertCell(0);
                var ratesValueCell = mutatedTableRow.insertCell(1);
                ratesKeyCell.innerHTML = key;
                ratesValueCell.innerHTML = value;

                if (key == "HKD") {
                    console.log(`key of ${key} and value of ${value} has key with HKD`);
                    ratesKeyCell.style.border = 'solid'
                    ratesKeyCell.style.borderColor = 'red'

                    ratesValueCell.style.border = 'solid'
                    ratesValueCell.style.borderColor = 'red'

                }
                if (isRateEven(value)) {
                    console.log(`key of ${key} and value of ${value} has value of Even number`);
                    ratesKeyCell.style.border = 'solid'
                    ratesKeyCell.style.borderColor = 'red'
                    ratesValueCell.style.border = 'solid'
                    ratesValueCell.style.borderColor = 'red'

                }

            }


        }

        )
        .catch(
            (err) => {
                console.log(err);

                var normalTable = document.getElementById("normalTable");
                var normalTableRow = normalTable.insertRow(-1);
                var ratesKeyCell = normalTableRow.insertCell(0);
                var ratesValueCell = normalTableRow.insertCell(1);
                ratesKeyCell.innerHTML = "ERROR!";
                ratesValueCell.innerHTML = "ERROR! ";

                var mutatedTable = document.getElementById("mutatedTable");
                var mutatedTableRow = mutatedTable.insertRow(-1);
                var ratesKeyCell = mutatedTableRow.insertCell(0);
                var ratesValueCell = mutatedTableRow.insertCell(1);
                ratesKeyCell.innerHTML = "ERROR!";
                ratesValueCell.innerHTML = "ERROR! ";

            }
        )

}



fetchData();

const isRateEven = (rateValue) => {

    //change str to float
    if (typeof (rateValue) == 'string') {
        rateValue = parseFloat(rateValue)
    }
    //change float to int
    var rateValue = Math.floor(rateValue);
    console.log(`isRateEven(): ${(rateValue % 2 - 1) ? true : false}`);

    return (rateValue % 2) - 1

}


// Test case
// isRateEven('4') // true
// isRateEven('3.3') // false
// isRateEven(4) // true
// isRateEven(3.3) // false


