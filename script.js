// variable area
let budgetBtn = document.getElementById('budget-btn');
let budget = document.getElementById('budget');
let totalBudget = document.getElementById('total-budget');
let title = document.getElementById('title');
let cost = document.getElementById('cost');
let totalExp = document.getElementById('total-exp');
let totalBalance = document.getElementById('total-balance');
let expBtn = document.getElementById('exp-btn');
let expList = document.getElementById('expence_list');


// store budget in localStorage
budgetBtn.onclick = function (e) {
    if (budget.value != "") {
        localStorage.setItem("budget", budget.value);
        location.href = location.href;
    } else {
        alert("Budget is empty!");
    }
}

// store product in localStorage
expBtn.onclick = function (e) {
    e.preventDefault();
    if (title.value != "" && cost.value != "") {
        var p_title = title.value;
        var p_cost = cost.value;

        var data = {
            p_title: p_title,
            p_cost: p_cost
        }
        var string = JSON.stringify(data);
        localStorage.setItem("budget_" + title.value, string);
        location.href = location.href;
    } else {
        alert("Expence feild is empty!");
    }
}

// get data from localStorage
function all_data() {
    var i;
    for (i = 0; i < localStorage.length; i++) {
        var all_keys = localStorage.key(i);
        if (all_keys.match("budget_")) {
            var json_data = localStorage.getItem(all_keys);
            var json_parse = JSON.parse(json_data);
            expList.innerHTML += `
                <tr>
                    <td>${json_parse.p_title}</td>
                    <td class="price">${json_parse.p_cost}</td>
                    <td class="action">
                        <button class="edt-btn"><i class='bx bxs-edit'></i></button>
                        <button class="del-btn"><i class='bx bxs-trash'></i></button>
                    </td>
                </tr>
            `;
        }
    }
    var price_tag = document.getElementsByClassName("price");
    var price = [];
    for (i = 0; i < price_tag.length; i++) {
        price[i] = price_tag[i].innerHTML;
    }

    var price_int = [];
    for (i = 0; i < price.length; i++) {
        price_int.push(parseInt(price[i]));
    }

    var finalPrice = 0;
    for (i = 0; i < price_int.length; i++) {
        finalPrice += price_int[i];
    }

    totalExp.innerHTML = finalPrice;
    totalBudget.innerHTML = localStorage.getItem("budget");

    var t_buget = totalBudget.innerHTML;
    var t_expence = totalExp.innerHTML;
    totalBalance.innerHTML = t_buget - t_expence;


    // delete code
    var delBtn = document.getElementsByClassName('del-btn');
    for (i = 0; i < delBtn.length; i++) {
        delBtn[i].onclick = function () {
            var cnf = window.confirm("Do you wanna delete it?");
            if (cnf) {
                var del_parent = this.parentElement;
                var tbl_parent = del_parent.parentElement;
                var productTitle = tbl_parent.children[0].textContent;
                localStorage.removeItem("budget_" + productTitle);
                location.href = location.href;
            } else {
                alert("Your data is safe.")
            }
        }
    }

    // edit code
    var edtBtn = document.getElementsByClassName('edt-btn');

    for (i = 0; i < edtBtn.length; i++) {
        edtBtn[i].onclick = function () {
            var cnf = window.confirm("Do you wanna update it?");
            if (cnf) {

                var edit_parent = this.parentElement;
                var edit_tbl_parent = edit_parent.parentElement;
                var productTitle = edit_tbl_parent.children[0].textContent;
                var produntCost = edit_tbl_parent.children[1].textContent;

                title.value = productTitle;
                cost.value = produntCost;

                title.focus();

                expBtn.innerText = 'Update data';
                expBtn.style.cssText = `
                    background-color: green;
                    border-color:green;
                `;

                expBtn.onclick = function () {
                    localStorage.removeItem("budget_" + productTitle);
                    var p_title = title.value;
                    var p_cost = cost.value;

                    var data = {
                        p_title: p_title,
                        p_cost: p_cost
                    }
                    var string = JSON.stringify(data);
                    localStorage.setItem("budget_" + title.value, string);
                    location.href = location.href;
                }

            } else {
                alert("Your data is safe.")
            }
        }
    }
}
all_data();