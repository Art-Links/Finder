

const userTransformer = (user) => {
    if (user) {
        console.log('1111111111')
        // delete user['dataValues']['id']
        delete user['dataValues']['passwordConfirmation']
        delete user['dataValues']['password']
        delete user['dataValues']['userTypeId']
        delete user['dataValues']['isActive']
        delete user['dataValues']['deletedAt']
        delete user['dataValues']['createdAt']
        delete user['dataValues']['updatedAt']
        user['dataValues']['UserType'] = user['dataValues']['UserType']['type']
        user['dataValues']['UserInfo'] = userInfoTransformer(user["dataValues"]["UserInfo"])
    }
    return user
}

const userInfoTransformer = (userInfo) => {
    // console.log(userInfo)
    if (userInfo) {
        delete userInfo['dataValues']['id']
        if (userInfo['dataValues']['UserId'])
            delete userInfo['dataValues']['UserId']
        delete userInfo['dataValues']['createdAt']
        delete userInfo['dataValues']['updatedAt']
        if (userInfo['dataValues']['userId'])
            delete userInfo['dataValues']['userId']
    }
    return userInfo
}

const showdesTransformer = (des) => {
    const transfomerDes = {
        des:'',
    }
    if (des) {
        transfomerDes.des = des.description
        return transfomerDes
    }
    return des
}

const ItemTransformer = (item) => {
    const transformeredItem = {
        id: 0,
        name: '',
        img: '',
        latX: '',
        longY: '',
        city: '',
        state: '',
        street: '',
        des:'',
        User: {
            id: '',
            userName: '',
            email: ''
        },
        Category: {
            name: '',
            icon: ''
        }
    }
    if (item) {
        transformeredItem.id = item.id
        transformeredItem.name = item.name
        transformeredItem.img = item.blurImage
        transformeredItem.latX = item.lat
        transformeredItem.longY = item.lng
        transformeredItem.city = item.city
        transformeredItem.state = item.state
        transformeredItem.street = item.street
        transformeredItem.des = item.description   
        transformeredItem.User.id = item?.User?.id
        transformeredItem.User.userName = item?.User?.userName
        transformeredItem.User.email = item.User?.email
        transformeredItem.Category.name = item?.Category?.name
        transformeredItem.Category.icon = item?.Category?.icon
        return transformeredItem
    }

    return item
}

const itemsTransformer = (items) => {
    const transformeredItems = []
    if (items?.length > 0) {
        items?.map(item => {
            transformeredItems.push(ItemTransformer(item))
        })
        return transformeredItems
    }
    return items
}


const CategoryTransformers = (Category) => {
    const transformeredCategory = {
        name: '',
        icon: ''
    }
    if (Category) {
        transformeredCategory.name = Category.name
        transformeredCategory.icon = Category.icon
        return transformeredCategory
    }

    return Category
}


const CategoryTransformer = (Category) => {
    const transformeredCategory = {
        name: '',
        icon: ''
    }
    if (Category) {
        transformeredCategory.name = Category.name
        transformeredCategory.icon = Category.icon
        return transformeredCategory
    }

    return Category
}

const CategoriesTransformer = (items) => {
    const transformeredCategories = []
    if (items?.length > 0) {
        items?.map(item => {
            transformeredCategories.push(CategoryTransformer(item))
        })
        return transformeredCategories
    }
    return items
}


const AdminTransformer = (admin) => {
    const transformeredAdmin = {
        // id:0,
        name: '',
        email: '',
        password: '',
        userType: {
            type: '',
        }
    }
    if (admin) {
        // transformeredAdmin.id = admin.id
        transformeredAdmin.name = admin.userName
        transformeredAdmin.email = admin.email
        transformeredAdmin.password = admin.password
        transformeredAdmin.userType.type = admin.UserType.type
        return transformeredAdmin
    }

    return admin
}

const AdminsTransformer = (admins) => {
    const transformeredAdmins = []
    if (admins?.length > 0) {
        admins?.map(admin => {
            transformeredAdmins.push(AdminTransformer(admin))
        })
        return transformeredAdmins
    }
    return admins
}


const AdminTransformers = (admin) => {
    const transformeredAdmin = {
        // id:0,
        name: '',
        email: '',
        password: '',
        userType: {
            type: '',
        }
    }
    if (admin) {
        // transformeredAdmin.id = admin.id
        transformeredAdmin.name = admin.userName
        transformeredAdmin.email = admin.email
        transformeredAdmin.password = admin.password
        transformeredAdmin.userType.type = admin.UserType.type
        return transformeredAdmin
    }

    return admin
}

module.exports = {
    userTransformer,
    userInfoTransformer,
    ItemTransformer,
    itemsTransformer,
    CategoriesTransformer,
    CategoryTransformers,
    AdminsTransformer,
    AdminTransformers,
    showdesTransformer
}