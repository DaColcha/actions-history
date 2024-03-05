const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function getAll() {
    const allActions = await prisma.actions.findMany()
    return allActions
}

export async function createAction(actionData) {
    try {
      // Destructure the object properties for clarity
      const { id_action, name_action, date_action, quantity, price, change_percentage, change, total } = actionData;
      return await prisma.user.create({
        data: {
          id_action,
          name_action,
          date_action,
          quantity,
          price,
          change_percentage,
          change,
          total,
        },
      });
    } catch (error) {
      console.error("Error creating action:", error);
    }
}

  //Objeto EJEMPLO
  const newActionData = {
    id_action: 2,
    name_action: 'GOOG',
    date_action: new Date('2024-03-05'),
    quantity: 5,
    price: 120,
    change_percentage: '-1%',
    change: 118.8,
    total: 600,
  };

  /* USAR ESTO CUANDO LO LLAMEN EN EL INDEX 
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
*/

