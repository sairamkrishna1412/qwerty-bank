// const usernameField = document.querySelector(".login-form--username");
// const passwordField = document.querySelector(".login-form--password");
// const loginButton = document.querySelector(".login-btn");
// const customersTable = document.querySelector(".customers-table");
// const userAccount = document.querySelector(".user-account");

const base = {
    usernameField: document.querySelector(".login-form--username"),
    passwordField: document.querySelector(".login-form--password"),
    loginButton: document.querySelector(".login-btn"),
    customersTable: document.querySelector(".customers-table"),
    userAccount: document.querySelector(".user-account"),
    loginText: document.querySelector(".user-login-head--text"),
    balance: document.querySelector(".balance-value"),
    balanceDate: document.querySelector(".balance-date"),
    movementsContainer: document.querySelector(".account-movements"),
    movementItem: document.querySelector(".movement-item"),
    summaryCredit: document.querySelector(".summary-value--in"),
    summaryDebit: document.querySelector(".summary-value--out"),
    transferUsername: document.querySelector(".transfer-form--username"),
    transferAmount: document.querySelector(".transfer-form--amount"),
    transferDescription: document.querySelector(".transfer-form--description"),
    transferSubmitBtn: document.querySelector(".submit-form--transfer"),
    paybillType: document.querySelector(".paybill-form--select"),
    paybillServiceNumber: document.querySelector(
        ".paybill-form--service-number"
    ),
    paybillAmount: document.querySelector(".paybill-form--amount"),
    paybillDescription: document.querySelector(".paybill-form--description"),
    paybillSubmitBtn: document.querySelector(".submit-form--paybill"),
    closeUsername: document.querySelector(".close-form--username"),
    closePassword: document.querySelector(".close-form--password"),
    closeSubmitBtn: document.querySelector(".submit-form--closeAcc"),
    payBillTypeRecharge: document.querySelector(".paybill-form--mobile"),
    payBillTypeElectricity: document.querySelector(
        ".paybill-form--service-number"
    ),
    newUserbtn: document.querySelector(".nav-main--new-user"),
    newUserDialog: document.querySelector(".new-user-dialog"),
    overlay: document.querySelector(".overlay"),
    newUserSignupBtn: document.querySelector(".signup-btn"),
    closeDialog: document.querySelector(".close-dialog"),
    newUser_name: document.querySelector(".new-user--name"),
    newUserEmail: document.querySelector(".new-user--email"),
    newUserUserName: document.querySelector(".new-user--username"),
    newUserPassword: document.querySelector(".new-user--password"),
    newUserRePassword: document.querySelector(".new-user--re-password"),
    logoutBtn: document.querySelector(".logout-btn"),
};

class User {
    constructor(name, email, username, password) {
        this.name = name;
        this.email = email;
        this.username = username;
        // this.phone = phone;
        this.password = password;
        this.balance = 10000;
        this.transactions = [
            // {
            //     value: -500,
            //     description: "To QB : water",
            //     date: "07/02/2018, 05:13",
            // },
            // {
            //     value: 15000,
            //     description: "From QB : stock",
            //     date: "12/06/1999, 06:22",
            // },
            // {
            //     value: 92500,
            //     description: "From QB : work",
            //     date: "12/08/2014, 12:45",
            // },
            {
                value: 10000,
                description: "From QB : new account",
                date: "11/11/2011, 06:15",
            },
        ];
    }
}
// let userAccount;
class App {
    #userAccount;
    #users = [];
    #accountsDetails = [
        ["sai ram krishna", "sai@gmail.com", "sai", "sai1234"],
        ["shiva ram", "shiva20@gmail.com", "shiva", "shiva1234"],
        ["suguna", "suguna14@gmail.com", "suguna", "suguna1234"],
        ["roopesh", "roopesh21@gmail.com", "roopesh", "roopesh1234"],
        ["himavanth", "varu10@gmail.com", "varshit", "varu1234"],
        ["deepika", "pinky08@gmail.com", "pinky", "pinky1234"],
        ["ranadheera", "rana29@gmail.com", "rana", "rana1234"],
        ["harika", "sweety19@gmail.com", "sweety", "sweety1234"],
        ["mounika", "mona19@gmail.com", "mona", "mona1234"],
        ["rekha", "rekha26@gmail.com", "rekha", "rekha1234"],
        ["dpl", "dpl24@gmail.com", "dpl", "dpl1234"],
    ];
    constructor() {
        //create default accounts on load
        this._createDefaultAccounts();
        //load user on login
        base.loginButton.addEventListener("click", this._loginUser.bind(this));
        //new Transaction
        base.transferSubmitBtn.addEventListener(
            "click",
            this._newTransaction.bind(this)
        );
        //billbay
        base.paybillType.addEventListener("change", this._toggleBillType);
        base.paybillSubmitBtn.addEventListener(
            "click",
            this._payBill.bind(this)
        );
        //close Account
        base.closeSubmitBtn.addEventListener(
            "click",
            this._closeAccount.bind(this)
        );
        //new User btn
        base.newUserbtn.addEventListener("click", this._openDialog.bind(this));
        //close Dialog
        base.closeDialog.addEventListener(
            "click",
            this._closeDialog.bind(this)
        );
        base.overlay.addEventListener("click", this._closeDialog.bind(this));
        //signup btn
        base.newUserSignupBtn.addEventListener(
            "click",
            this._createNewUser.bind(this)
        );
        //logout btn
        base.logoutBtn.addEventListener("click", this._logoutUser.bind(this));
    }
    _createDefaultAccounts() {
        this.#accountsDetails.forEach((ele) => {
            const acc = new User(...ele);
            this.#users.push(acc);
        });
        // console.log(this.#users);
        //update table after creating default accounts
        this._updateTable();
    }
    _updateTable() {
        base.customersTable.innerHTML = `
                <tr class="customers-table--head-row">
                    <th class="customer-table--colname">Name</th>
                    <th class="customer-table--colname">Email</th>
                    <th class="customer-table--colname">Username</th>
                    <th class="customer-table--colname">Password</th>
                    <th class="customer-table--colname">Balance</th>
                </tr>
            `;
        this.#users.forEach((user) => {
            const html = `
                    <tr class="customers-table--data-row">
                        <td class="customer-table-coldata">${user.name}</td>
                        <td class="customer-table-coldata">
                            ${user.email}
                        </td>
                        <td class="customer-table-coldata">${user.username}</td>
                        <td class="customer-table-coldata">${user.password}</td>
                        <td class="customer-table-coldata">${user.balance}</td>
                    </tr>
                    `;
            base.customersTable.insertAdjacentHTML("beforeend", html);
        });
    }
    _loginUser(e) {
        e.preventDefault();
        const username = base.usernameField.value;
        const password = base.passwordField.value;
        // console.log(username, password);
        base.usernameField.value = base.passwordField.value = "";
        base.passwordField.blur();
        this.#userAccount = this.#users.find(
            (user) => user.username === username
        );
        if (this.#userAccount?.password === password) {
            this._greetUser();
            this._updateUI();
            // console.log(this.#userAccount.balance);
        } else alert("Incorrect Username or Password. Please try again.");
    }
    _updateUI() {
        //update balance
        this._updateBalance();
        //update movements
        this._updateTransactions();
        //update summary
        this._calcSummary();
    }
    _showUser() {
        base.customersTable.classList.add("hidden");
        base.userAccount.classList.remove("hidden");
        base.logoutBtn.classList.remove("hidden");
    }
    _showTable() {
        base.customersTable.classList.remove("hidden");
        base.userAccount.classList.add("hidden");
        base.logoutBtn.classList.add("hidden");
        base.loginText.textContent = "Login to continue";
    }
    _greetUser() {
        this._showUser();
        base.loginText.textContent = `welcome back ${this.#userAccount.name}!`;
    }
    _updateBalance() {
        const balance = this.#userAccount.transactions.reduce(
            (acc, cur, i, arr) => acc + cur.value,
            0
        );
        this.#userAccount.balance = balance;
        // console.log(this.#userAccount);
        base.balance.textContent = `₹${balance}`;
        // base.balance.textContent =
        base.balanceDate.textContent = this._createDate();
    }
    _updateTransactions() {
        base.movementsContainer.innerHTML = "";
        this.#userAccount.transactions.forEach(function (
            transaction,
            index,
            arr
        ) {
            const type = transaction.value > 0 ? "credit" : "debit";
            const html = `
            <div class="movement-item">
                <div class="movement-sno movement-type--${type}">${
                arr.length - index
            }</div>
                <div class="movement-type movement-type--${type}">${type}</div>
                <div class="movement-date">${transaction.date}</div>
                <div class="movement-description">${
                    transaction.description
                }</div>
                <div class="movement-amount">₹${Math.abs(
                    transaction.value
                )}</div>
            </div>
            `;
            base.movementsContainer.insertAdjacentHTML("afterbegin", html);
        });
    }
    _calcSummary() {
        const credit = this.#userAccount.transactions.reduce(function (
            acc,
            cur,
            i,
            arr
        ) {
            if (cur.value > 0) return acc + cur.value;
            else return acc;
        },
        0);
        const debit = this.#userAccount.transactions.reduce(function (
            acc,
            cur,
            i,
            arr
        ) {
            if (cur.value < 0) return acc + cur.value;
            else return acc;
        },
        0);
        base.summaryCredit.textContent = credit;
        base.summaryDebit.textContent = Math.abs(debit);
    }
    _createDate() {
        const today = new Date();
        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Intl.DateTimeFormat("en-GB", options).format(today);
    }
    _newTransaction(e) {
        e.preventDefault();
        const toAccount = this.#users.find(
            (user) => user.username === base.transferUsername.value
        );
        const amount = Number(base.transferAmount.value);
        const description = base.transferDescription.value;
        if (toAccount) {
            if (amount > 0) {
                if (this.#userAccount.balance >= amount) {
                    if (toAccount.username !== this.#userAccount.username) {
                        const senderDescription = `To ${toAccount.username} : ${description}`;
                        const receiverDescription = `From ${
                            this.#userAccount.username
                        } : ${description}`;
                        const dateTime = this._createDate();
                        console.log(toAccount);
                        this.#userAccount.transactions.push({
                            value: -amount,
                            date: dateTime,
                            description: senderDescription,
                        });
                        toAccount.transactions.push({
                            value: amount,
                            date: dateTime,
                            description: receiverDescription,
                        });
                    } else alert("Cannot transfer money to yourself XD");
                } else alert("Not enough balance in account");
            } else alert("amount must be greater than 0");
        } else
            alert(
                "The username that you've entered doesn't match any account."
            );

        // if (
        //     toAccount &&
        //     amount > 0 &&
        //     this.#userAccount.balance >= amount &&
        //     toAccount.username !== this.#userAccount.username
        // ) {

        // }
        base.transferUsername.value = base.transferDescription.value = base.transferAmount.value =
            "";
        base.transferAmount.blur();
        base.transferDescription.blur();
        this._updateUI();
    }
    _toggleBillType() {
        base.payBillTypeElectricity.classList.toggle("hidden");
        base.payBillTypeRecharge.classList.toggle("hidden");
    }
    _payBill(e) {
        e.preventDefault();
        const type = base.paybillType.value;
        const number =
            type == "Electricity bill"
                ? base.payBillTypeElectricity.value
                : base.payBillTypeRecharge.value;
        const amount = base.paybillAmount.value;
        let description = base.paybillDescription.value;
        description = `${type} : ${description}`;

        if (amount > 0) {
            if (number.length == 10) {
                if (this.#userAccount.balance >= amount) {
                    this.#userAccount.transactions.push({
                        value: -amount,
                        date: this._createDate(),
                        description,
                    });
                } else alert("Not enough balance in account");
            } else {
                type == "Electricity bill"
                    ? alert("unique service number is a 10-digit number.")
                    : alert("Phone number must contain 10-digits.");
            }
        } else alert("amount must be greater than 0");

        // if (
        //     number.length == 10 &&
        //     amount > 0 &&
        //     this.#userAccount.balance >= amount
        // ) {
        // }
        base.payBillTypeElectricity.value = base.payBillTypeRecharge.value = base.paybillAmount.value = base.paybillDescription.value =
            "";
        base.paybillAmount.blur();
        base.paybillDescription.blur();
        this._updateUI();
    }
    _closeAccount(e) {
        e.preventDefault();
        if (
            this.#userAccount.username === base.closeUsername.value &&
            this.#userAccount.password === base.closePassword.value
        ) {
            const userIndex = this.#users.findIndex(
                (el) => el.username === this.#userAccount.username
            );
            this.#users.splice(userIndex, 1);
            setTimeout(this._showTable.bind(this), 1000);
            // this._showTable();
            base.closeUsername.value = base.closePassword.value = "";
            setTimeout(this._updateTable.bind(this), 1200);
            // this._updateTable();
            // alert("Account closed!");
        } else alert("Incorrect Username or Password. Please try again.");
    }
    _showDialog() {
        base.newUserDialog.classList.remove("hidden");
        base.overlay.classList.remove("hidden");
    }
    _hideDialog() {
        base.newUserDialog.classList.add("hidden");
        base.overlay.classList.add("hidden");
    }
    _openDialog(e) {
        e.preventDefault();
        // console.log("in opendialog");

        this._showDialog();
    }
    _closeDialog(e) {
        e.preventDefault();
        // console.log("in opendialog");

        this._hideDialog();
    }
    _createNewUser(e) {
        e.preventDefault();
        const name = base.newUser_name.value;
        const email = base.newUserEmail.value;
        const username = base.newUserUserName.value;
        const password = base.newUserPassword.value;
        const rePassword = base.newUserRePassword.value;
        if (username && name && email && password && rePassword) {
            if (!this.#users.some((el) => el.username === username)) {
                if (password.length >= 6) {
                    if (password === rePassword) {
                        const acc = new User(name, email, username, password);
                        this.#users.push(acc);
                        this._hideDialog();
                        // this._updateTable();
                        setTimeout(this._updateTable.bind(this), 200);
                        base.newUser_name.value = base.newUserEmail.value = base.newUserUserName.value = base.newUserPassword.value = base.newUserRePassword.value =
                            "";
                        base.newUserRePassword.blur();
                    } else alert("passwords dont match");
                } else alert("password is too short");
            } else alert("Username is already taken :(");
        } else alert("Please enter all fields");
    }
    _logoutUser() {
        setTimeout(this._showTable.bind(this), 500);
        setTimeout(this._updateTable.bind(this), 700);
        // this._updateTable();
        // this._showTable();
    }
}
const jessie = new App();

// base.loginButton.addEventListener("click", function (e) {
//     e.preventDefault();
//     base.customersTable.classList.toggle("hidden");
//     base.userAccount.classList.toggle("hidden");
// });
