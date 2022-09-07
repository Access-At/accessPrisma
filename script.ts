import client from "./client";

async function main() {
  // const user = client.user;
  // client.
  // await client.;
  // prisma.
  // const user = await prisma.user.create({
  //   data: {
  //     email: "assada@gmail.com",
  //     username: "teest",
  //     password: "asadsadasd",
  //   },
  // });
  // const thread = await prisma.thread.
  //   prisma.user.create({ data: { name: "Bebas" } });
  // console.log(user);
}

main()
  .catch((e) => console.log(e))
  .finally(async () => client.$disconnect);
