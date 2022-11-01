const userTransformer = (user) => {
    if (user) {
        console.log('1111111111')
        // delete user['dataValues']['id']
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

const ItemTransformer = (item) => {
    if (item) {
        item.forEach(singleItem => {
        // delete singleItem['dataValues']['id']
        delete singleItem['dataValues']['categoryId']
        delete singleItem['dataValues']['isReturned']
        delete singleItem['dataValues']['deleteAt']
        delete singleItem['dataValues']['createdAt']
        delete singleItem['dataValues']['updatedAt']
        delete singleItem["dataValues"]["userId"]
        singleItem['dataValues']['User'] = userItemTransformer(singleItem["dataValues"]["User"])
        });
    }
    return item
}

const userItemTransformer = (user) => {
    if (user) {
        delete user['dataValues']['id']
        delete user['dataValues']['password']
        delete user['dataValues']['userTypeId']
        delete user['dataValues']['isActive']
        delete user['dataValues']['deleteAt']
        delete user['dataValues']['createdAt']
        delete user['dataValues']['updatedAt']
    }
    return user
}

module.exports = {
    userTransformer,
    userInfoTransformer,
    ItemTransformer
}