// core modules
// file system
const fs = require('fs');
// readline
// const readline = require('readline');
// third party module
const validator = require('validator');
// readline interface
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

//membuat folder data apabila tidak ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts json jika belom ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath,'[]','utf-8');
}

// membuat fungsi untuk menanyakan pertanyaan
// const questions = (ask) => {
//   return new Promise((resolve, reject) => {
//     rl.question(ask, (inputVariable) => {
//       resolve(inputVariable);
//     })
//   })
// }

// membuat fungsi untuk menampung jawaban
const getAnswer = (name, phoneNumber, email) => {
  const contact = {name, phoneNumber, email};
  const file = fs.readFileSync('data/contacts.json', 'utf8');
  const contacts = JSON.parse(file);

  // validasi nama menggunakan method find
  const duplicate = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
  if (duplicate) {
    console.log("Nama Sudah Terdaftar, Silahkan Gunakan Nama Lain");
    // mengembalikan nilai false jika duplikat
    return false;
  } 

  // validasi nomor telepon
  if(phoneNumber) {
    if(!validator.isMobilePhone(phoneNumber, 'id-ID')) {
      console.log("Nomor Telepon Tidak Valid, Silahkan Isi Nomor Telepon yang Valid");
      // mengembalikan nilai false jika nomor tidak valid
      return false;
    }
  }

  // validasi email
  if(email) {
    if(!validator.isEmail(email)) {
      console.log("Email Tidak Valid, Silahkan Isi Email yang Valid");
      // mengembalikan nilai false jika email tidak valid
      return false;
    }
  }

  contacts.push(contact);
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));
  console.log(`Terimakasih ${name} sudah memasukkan data`);
  // rl.close();
}

module.exports = { getAnswer }
