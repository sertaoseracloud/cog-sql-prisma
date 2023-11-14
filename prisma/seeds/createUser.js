const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
});

const fakerUser = () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
})


async function main() {
    prisma.$connect()
    console.log('Starting seeds')
    const createdUser = await prisma.user.create({
        data: fakerUser()
    })
    console.log(JSON.stringify(createdUser, null, 2))

    
    // POST http://localhost:3333/users
    //const createdUser = await prisma.user.create({
        //data: {
            //email: 'engcfraposo@gmail.com',
            //name: 'Cláudio Raposo'
        //}
    //})
    //console.log(JSON.stringify(createdUser, null, 2))

    // GET http://localhost:3333/users
    //const users = await prisma.user.findMany()
    //console.log(JSON.stringify(users, null, 2))

    // GET http://localhost:3333/users/:id
   // const user = await prisma.user.findUnique({
        //where: {
            //id: 1
        //}
    //})
    //console.log(JSON.stringify(user, null, 2))

    //PUT/PATCH http://localhost:3333/users/:id
    //const updatedUser = await prisma.user.update({
        //where: {
            //id: 1
        //},
        //data: {
            //name: 'Josefino Alefin'
        //}
    //})
    //console.log(JSON.stringify(updatedUser, null, 2))
    
    //DELETE http://localhost:3333/users/:id
    //const deleteUser = await prisma.user.delete({
        //where: {
            //id: 1,
        //}
    //})
    //console.log(JSON.stringify(deleteUser, null, 2))

}

main()
.catch((e) => console.error(e))
.finally(async () => {
    await prisma.$disconnect();
})
