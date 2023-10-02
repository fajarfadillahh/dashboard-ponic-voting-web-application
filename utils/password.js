import bcrypt from "bcrypt";

export async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salt);
  return result;
}

export async function verify(password, encrypted) {
  const result = await bcrypt.compare(password, encrypted);
  return result;
}
