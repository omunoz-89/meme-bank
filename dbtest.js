async function addBankToUser(){
    const userBank = await db.bank.findOrCreate({
      where:{userName: `${user.user_name}`}
    })
    lexus.addPlayer(steph)
  }
  addBankToUser()