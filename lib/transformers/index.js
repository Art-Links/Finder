const userTransformer = (user) => {
    if (user) {
        delete user['dataValues']['password']
        delete user['dataValues']['userTypeId']
        delete user['dataValues']['isActive']
        delete user['dataValues']['deleteAt']
        delete user['dataValues']['createdAt']
        delete user['dataValues']['updatedAt']
        user['dataValues']['UserType'] = user['dataValues']['UserType']['type']
        user['dataValues']['UserInfo'] = userInfoTransformer(user["dataValues"]["UserInfo"])
    }
    return user
}

const userInfoTransformer = (userInfo) => {
    // console.log(userInfo)
    if(userInfo){
        delete userInfo['dataValues']['id']
        if(userInfo['dataValues']['UserId'])
        delete userInfo['dataValues']['UserId']
        delete userInfo['dataValues']['createdAt']
        delete userInfo['dataValues']['updatedAt']
        if(userInfo['dataValues']['userId'])
        delete userInfo['dataValues']['userId']
    }
    return userInfo
}

module.exports = {
    userTransformer,
    userInfoTransformer
}