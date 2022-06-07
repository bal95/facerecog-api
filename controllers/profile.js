const handleProfile=(req,res,knex)=>{
    const {id}=req.params
    knex.select('*').from('users').where({id})
        .then(user=>{
            console.log(user)
            if(user.length) res.json(user[0])
            else res.status(400).json('no user found')
        })
        .catch(err=>res.status(400).json('error getting user'))
}

module.exports={
    handleProfile,
}