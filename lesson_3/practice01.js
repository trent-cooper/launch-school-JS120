// function createInvoice(obj = {}) {
//   let newObj = {
//     total() {
//       return this.phone + this.internet;
//     }
//   };
  
//   if (obj.hasOwnProperty('phone')) {
//     newObj.phone = obj.phone;
//   } else {
//     newObj.phone = 3000;
//   }

//   if (obj.hasOwnProperty('internet')) {
//     newObj.internet = obj.internet;
//   } else {
//     newObj.internet = 5500;
//   }

//   return newObj;
// }

function createInvoice(obj = {}) {
  return {
    phone: obj.phone || 3000,
    internet: obj.internet || 5500,
    phonePaid: 0,
    internetPaid: 0,
    amountPaid: 0,

    total() {
      return this.phone + this.internet;
    },

    addPayment(...args) {
      args.forEach(obj => {
        if (obj.phone) {
          this.phonePaid += obj.phone;
        }
        if (obj.internet) {
          this.internetPaid += obj.internet;
        } 
        if (obj.amount) {
          this.amountPaid += obj.amount;
        }
      });
    },

    amountDue() {
      let due = (this.phone + this.internet);
      let paid = (this.phonePaid + this.internetPaid + this.amountPaid);
      return due - paid;
    }
  }
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoices);

console.log(invoiceTotal(invoices)); // 31000

