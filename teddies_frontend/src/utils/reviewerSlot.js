const members = ['Jun', 'Hanako', 'Yuki', 'Kota', 'Haruka', 'Masashi'];

let name;

while (true) {
  const prompt = require('prompt-sync')();

  name = prompt('User name: ');

  if (!name) {
    process.exit();
  }

  if (
    members.some((member) => {
      return member.toLocaleLowerCase() === name.toLocaleLowerCase();
    })
  ) {
    validInput = true;
    break;
  }

  console.log("Username doesn't exist");
}

const filteredMember = members.filter(
  (member) => member.toLowerCase() !== name.toLowerCase(),
);

const reviewer =
  filteredMember[Math.floor(Math.random() * filteredMember.length)];

console.log(`Reviewer: ${reviewer}`);

process.exit();
