const uri = '/api/Expenses';
const uri1 = '/api/Categories';
const uri2 = '/api/PaymentMethods';

let edit_form = document.getElementById('hideedit');
edit_form.style.display = 'none';

let Expenses = [];


// Define a function to fetch and display expense data
function fetchExpenseData() {
    const expenseTableBody = document.querySelector("#expenseTableBody");

    fetch(uri)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(item => {
                const row = expenseTableBody.insertRow();
                row.insertCell().textContent = item.description;
                row.insertCell().textContent = item.amount;
                row.insertCell().textContent = item.category;
                row.insertCell().textContent = item.paymentmethod;
                row.insertCell().textContent = item.createddate;
                row.insertCell().textContent = item.date;

                const actionsCell = row.insertCell(); // Create a new cell for actions
                const editButton = document.createElement("button"); // Create edit button element
                editButton.innerText = "Edit";
                editButton.classList.add("edit-button"); // Add CSS class to button
                actionsCell.appendChild(editButton); // Add button to actions cell
                editButton.setAttribute("onclick", `getExpense(${item.expenseId})`)

                const deleteButton = document.createElement("button"); // Create delete button element
                deleteButton.innerText = "Delete";
                deleteButton.classList.add("delete-button"); // Add CSS class to button
                actionsCell.appendChild(deleteButton); // Add button to actions cell
                deleteButton.setAttribute("onclick", `deleteExpense(${item.expenseId})`)
                Expenses.push(item);
            });
        })
        .catch(error => console.error(error));
}

// Find the button element and attach the fetchExpenseData function to the click event
const fetchExpenseButton = document.querySelector("#fetchExpenseButton");
fetchExpenseButton.addEventListener("click", fetchExpenseData);

//DELETE API CALL
function deleteExpense(expenseId) {
    fetch(`${uri}/${expenseId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(window.location.reload())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

// Find the delete buttons and attach the deleteExpense function to the click event
const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach(button => {
    button.addEventListener("click", event => {
        console.log(expenseId);
        const expenseId = event.target.dataset.expenseId;
        deleteExpense(expenseId);
    });
});


function updatenote(id) {

    let description = document.getElementById('description');
    let amount = document.getElementById('amount')
    let createddate = document.getElementById('createddate').value;
    let date = document.getElementById('date').value;

    var update_id = parseInt(document.getElementById('id').value);
    console.log(update_id);


    const expense = {
        expenseId: update_id,
        description: document.getElementById('description').value.trim(),
        amount: document.getElementById('amount').value.trim(),
        createddate: createddate,
        date: date,
    };

    console.log(expense);

    fetch(`${uri}/${update_id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
    })
        .then(() => console.log("succ"))
        .then(() => fetchExpenseData())
        .catch(error => console.error('unable to update Expense.', error));

    closeInput();


}

function closeInput() {

    document.getElementById('editform').style.display = 'none';

}


function getExpense(id) {
    const expense = Expenses.find(expense => expense.expenseId == id);
    console.log(expense);
    console.log(id)
    document.getElementById('id').value = expense.expenseId;
    document.getElementById('description').value = expense.description;
    document.getElementById('amount').value = expense.amount;

    const cexpenseDate = new Date(expense.createddate);
    const formattedDate1 = cexpenseDate.getFullYear() + "-" + (cexpenseDate.getMonth() + 1).toString().padStart(2, "0") + "-" + cexpenseDate.getDate().toString().padStart(2, "0");
    document.getElementById('createddate').value = formattedDate1;

    const expenseDate = new Date(expense.date);
    const formattedDate = expenseDate.getFullYear() + "-" + (expenseDate.getMonth() + 1).toString().padStart(2, "0") + "-" + expenseDate.getDate().toString().padStart(2, "0");
    document.getElementById('date').value = formattedDate;

    let addcategory = document.getElementById('select_listc');
    for (var i = 0; i < addcategory.options.length; i++) {
        if (addcategory.options[i].value == expense.category) {
            addcategory.selectedIndex = i;
            break;
        }
    }


    let addpaymentmethod = document.getElementById('select_listp');
    for (var i = 0; i < addpaymentmethod.options.length; i++) {
        if (addpaymentmethod.options[i].value == expense.paymentmethod) {
            addpaymentmethod.selectedIndex = i;
            break;
        }
    }

    edit_form.style.display = 'block';
}


//Logic for total expense, category view, and paymentmethod view.
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



function getallCategory() {
    fetch(uri1)
        .then(data => data.json())
        .then(response => DisplayCategory(response))
        .catch(error => console.error('unable to view all category.', error));
}


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

function getallPayments() {
    fetch(uri2)
        .then(data => data.json())
        .then(response => DisplayPayments(response))
        .catch(error => console.error('unable to view all category.', error));
}


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
