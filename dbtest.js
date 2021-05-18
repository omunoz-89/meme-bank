const db = require('./models')
const user = require('./models/user')

// async function addBankToUser(){
//     const user = await db.user.findone({where: {user_name: 'omunoz'}})
//     const bank = await db.bank.findOrCreate({
//       where:{userName: `${user.user_name}`}
//     })
//     bank.addUser(user)
//   }
//   addBankToUser()

const createUser = () => {
  const user = db.user.create({
      first_name: 'Omar',
      last_name: 'Munoz',
      user_name: 'omunoz',
      email: 'test@gmail.com',
      password: '123456789',
    })
}
// createUser()

const addMeme = () => {
    const meme = db.meme.create({
        userId: 1,
        img_url: 'https://i.imgflip.com/4/30b1gx.jpg',
        top_text: 'Test',
        bottom_text: 'Test',
        title: 'This is a Test'
    })
    }
    // addMeme()

    const addMemeUser2 = () => {
        const meme = db.meme.create({
            userId: 2,
            img_url: 'https://i.imgflip.com/4/30b1gx.jpg',
            top_text: 'Test',
            bottom_text: 'Test',
            title: 'User 2 Meme'
        })
        }
        addMemeUser2()