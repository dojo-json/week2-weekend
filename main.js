
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${ this.name }`);
};

const person = new Person('Person');

console.log(person);
person.sayHello();

function Parent(name) {
  Person.call(this, name);
}

Parent.prototype = Object.create(Person.prototype);
Parent.prototype.constructor = Parent;

Parent.prototype.assignChores = function(chore) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (chore.completed) {
        resolve(chore.payment);
      } else {
        reject(new Error(chore.punishment));
      }
    }, random(2000));
  });
}

function random(arrayOrNumber) {
  return Math.floor(
    Math.random() * (Array.isArray(arrayOrNumber) ? arrayOrNumber.length : arrayOrNumber)
  );
}

function randomPunishment() {
  const punishments = ['go to bed early', 'have birthday taken away', 'not use electronics, ever'];
  return punishments[random(punishments)];
}

function randomChore() {
  const chores = ['dishes', 'mowing lawn', 'laundry', 'dusting'];
  return chores[random(chores)];
}



const parent = new Parent('Jason');
console.log(parent);
parent.sayHello();

function Chore() {
  this.task = randomChore();
  this.completed = false;
  this.payment = random(100);
  this.punishment = randomPunishment();
}


function Child(name) {
  Person.call(this, name);

  this.savings = 0;
}

Child.prototype = Object.create(Person.prototype);
Child.prototype.constructor = Child;

Child.prototype.doChores = function(chore, promiseOfPaymentOrPunishment) {
  chore.completed = random(100) > 50;

  promiseOfPaymentOrPunishment
    .then(payment => {
      // handle success

      console.log(`${ this.name } successfully completed ${ chore.task } and receives $${ payment }`);

      this.savings += payment;

    })
    .then(() => {
      this.seeSavings();
    })
    .catch(error => {
      // handle error
      console.log(`${ this.name } failed to complete ${ chore.task } and must ${ error.message }`);
    });
};

Child.prototype.seeSavings = function() {
  console.log(`${ this.name } has $${ this.savings } saved!`);
};

const child = new Child('Never');

for (let index = 0; index < 4; index++) {
  const chore = new Chore();
  child.doChores(chore, parent.assignChores(chore));
}




//
