export const delay = ms =>
  new Promise(resolve => setTimeout(() => resolve(true), ms));

const random_boolean = () => Math.random() >= 0.5;

export async function reserveHotel() {
  await delay(1500);
  return new Promise((resolve, reject) => {
    if (random_boolean()) {
      resolve(true);
    }
    reject('Ktoś Cię uprzedził, wybierz inny hotel i spróbuj ponownie.');
  });
}

export async function loginUser(password) {
  await delay(1500);
  return new Promise((resolve, reject) => {
    if (password === 'admin') {
      resolve(true);
    }
    reject('Prawidłowe hasło to `admin`');
  });
}
