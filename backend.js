//getting reference to the laureates Table
const laureatesTableElement = document.querySelector("#laureatesTable");

getData(newFilters);

//variables
var newFilters;
var responseJSON;

//function for fetcing the prams based in the filters
document.getElementById('filters').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Array.from(formData.entries()).reduce((memo, [key, value]) => ({
        ...memo,
        [key]: value,
    }), {});
    newFilters = JSON.stringify(data);
    getData(data);

});


async function getData(newFilters) {
    // URL for the Nobel Prize Data
    const urlNobelPrize = new URL("http://api.nobelprize.org/v1/prize.json");
     
    //appending the params to the URL if filters is not empty
    if(newFilters != undefined) {
        Object.keys(newFilters).forEach(key => urlNobelPrize.searchParams.append(key, newFilters[key]));
    }

    //fetching the data using the fetch API
    const response = await fetch(urlNobelPrize, {
        method: 'GET'
    });

    //checking for the errors
    if(response.ok) {
        responseJSON = await response.json();
        console.log(responseJSON);
        dataParserAndListing(responseJSON);
    }
    else {
        console.log("Response_Error" + responseJSON.status);
    }
}


function dataParserAndListing(jsonData) {
    //const keys = jsonData.data;
    jsonData.prizes.forEach(function (key) {
        key.laureates.forEach(function (sampleData) {
            console.log(sampleData.id);
            renderList(key.year, key.category, sampleData.id, sampleData.firstname, sampleData.surname);
        });
    });
}

function printerFunction(year, category, id, firstname, surname) {
    return `
        <tr>
            <td>
                ${year}
            </td>
            <td>
                ${category}
            </td>
            <td>
                ${id}
            </td>
            <td>
                ${firstname}
            </td>
            <td>
                ${surname}
            </td>
        </tr>
    `;
}

function renderList(year, category, id, firstname, surname) {
    laureatesTableElement.innerHTML += printerFunction(year, category, id, firstname, surname);
}