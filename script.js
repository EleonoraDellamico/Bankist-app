'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data simulation API JSON
const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [ 200, 450, -400, 3000, -650, -130, 70, 1300 ],
	interestRate: 1.2, // %
	pin: 1111
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [ 5000, 3400, -150, -790, -3210, -1000, 8500, -30 ],
	interestRate: 1.5,
	pin: 2222
};

const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [ 200, -200, 340, -300, -20, 50, 400, -460 ],
	interestRate: 0.7,
	pin: 3333
};

const account4 = {
	owner: 'Sarah Smith',
	movements: [ 430, 1000, 700, 50, 90 ],
	interestRate: 1,
	pin: 4444
};

const accounts = [ account1, account2, account3, account4 ];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

////////////////////////////////////////////////////////////////
//we passs parametres to the function better then a global scope
const displayMovements = function(movements) {
	//to cut html
	containerMovements.innerHTML = '';
	//add new part in the html
	movements.forEach(function(mov, i) {
		const type = mov > 0 ? 'deposit' : 'withdrawal';

		const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;
		//use insertAdjacenthtml to insert to the html--this method recive 2 parametres 1 the position 2 the string we want to add in the html.
		containerMovements.insertAdjacentHTML('afterbegin', html);
	});
};
displayMovements(account1.movements);
//console.log(containerMovements.innerHTML);

//CALCULATE CURRENT BALANCE
const calcDisplayBalance = function(movements) {
	const balance = movements.reduce((acc, mov) => acc + mov, 0);
	labelBalance.textContent = `${balance} €`;
};
calcDisplayBalance(account1.movements);

//CALCULATE THE SUM
const calcDisplaySummary = function(movements) {
	const incomes = movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
	labelSumIn.textContent = `${incomes} €`;
	const out = movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0);
	labelSumOut.textContent = `${Math.abs(out)}€`;
	//calculate the interest
	const interest = movements
		.filter((mov) => mov > 0)
		.map((deposit) => deposit * 1.2 / 100)
		.filter((int, i, arr) => {
			console.log(arr);
			return int >= 1;
		})
		.reduce((acc, int) => acc + int, 0);
	labelSumInterest.textContent = `${interest} `;
};
calcDisplaySummary(account1.movements);

//CREATE A USER NAME
const createUsernames = function(accs) {
	accs.forEach(function(acc) {
		acc.username = acc.owner //see the object for owner, here we have modifide the array adding the username value
			.toLowerCase()
			.split(' ')
			.map((name) => name[0]) //return the first letter
			.join('');
	});
};

createUsernames(accounts);
//console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([ [ 'USD', 'United States dollar' ], [ 'EUR', 'Euro' ], [ 'GBP', 'Pound sterling' ] ]);

const movements = [ 200, 450, -400, 3000, -650, -130, 70, 1300 ];

/////////////////////////////////////////////////
