const bcrypt = require('bcrypt');

const saltRounds = 10;

export async function saltAndHashPassword(password: string) {
  const hash = await bcrypt.hash(password, saltRounds);
  
  return hash;
}