const uri = '/api/Expenses';
const uri1 = '/api/Categories';
const uri2 = '/api/PaymentMethods';

function addItem() {
    let categoryselect = document.getElementById('select_listc');
    let category = categoryselect.options[categoryselect.selectedIndex].value;

    let paymentselect = document.getElementById('select_listp');
    let payment = paymentselect.options[paymentselect.selectedIndex].value;

    const addNameTextbox = document.getElementById('product-title');
    const addAmountTextbox = document.getElementById('user-amount');
    const addcreateddateTextbox = document.getElementById('cdate');
    const adddateTextbox = document.getElementById('date');


    const item = {
        description: addNameTextbox.value.trim(),
        amount: addAmountTextbox.value.trim(),
        createddate: addcreateddateTextbox.value.trim(),
        date: adddateTextbox.value.trim(),
        category: category,
        paymentmethod: payment
    };
    console.log(item);
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            console.log("Successful");
            addNameTextbox.value = '';
            addAmountTextbox.value = '';
            category = '',
            payment = '',
            addcreateddateTextbox.value = '';
            adddateTextbox.value = '';
            window.location.href = "https://localhost:44331/Pages/expensepage.html";
        })
        .catch(error => console.error('Unable to add item.', error));
}


//Logic to display category.
function DisplayCategory(categories) {

    var select_listc = document.getElementById('select_listc');

    categories.forEach(category => {
        console.log(category.name);
        const opt = document.createElement('option');
        opt.value = category.name;
        opt.innerHTML = category.name;
        select_listc.appendChild(opt);

    })
}
//Logic to display Payments
function DisplayPayments(payment) {

    var select_listp = document.getElementById('select_listp');

    payment.forEach(payment => {
        console.log(payment.name);
        const opt = document.createElement('option');
        opt.value = payment.name;
        opt.innerHTML = payment.name;
        select_listp.appendChild(opt);

    })
}

//function to add category
function getallCategory() {
    fetch(uri1)
        .then(data => data.json())
        .then(response => DisplayCategory(response))
        .catch(error => console.error('unable to view all category.', error));
}


//function to add paymentmethod.
function getallPayments() {
    fetch(uri2)
        .then(data => data.json())
        .then(response => DisplayPayments(response))
        .catch(error => console.error('unable to view all category.', error));
}



function totalExpenses() {
    fetch(uri)
        .then(data => data.json())
        .then(response => calculatetotalexpense(response))
        .catch(error => console.error('unable to view all category.', error));
}

var total = 0;

function calculatetotalexpense(data) {
    data.forEach(expense => {
        total += expense.amount;
    })
    console.log(total);
    const opt = document.getElementById('expenditure-value');
    opt.value = total;
    opt.innerHTML = total;
}












