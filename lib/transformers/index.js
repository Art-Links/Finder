

const userTransformer = (user) => {
    if (user) {
        // console.log('1111111111')
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

const OneUserTransformer = (user) => {
    const transformereduser = {
        name: '',
        email: ''
    }
    if (user) {
        transformereduser.name = user.userName
        transformereduser.email = user.email
        return transformereduser
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
        des: '',
        createdAt: '',
        User: {
            id: '',
            userName: '',
            email: ''
        },
        Category: {
            name: '',
            icon: ''
        },
        // Questions: [
        //     question= ''
        // ]
    }
    if (item) {
        transformeredItem.id = item.id
        transformeredItem.name = item.name
        transformeredItem.img = "http://localhost:3000" + '/uploads/' + item.blurImage
        transformeredItem.latX = item.lat
        transformeredItem.longY = item.lng
        transformeredItem.city = item.city
        transformeredItem.state = item.state
        transformeredItem.street = item.street
        transformeredItem.des = item.description
        transformeredItem.createdAt = item.createdAt
        transformeredItem.User.id = item?.User?.id
        transformeredItem.User.userName = item?.User?.userName
        transformeredItem.User.email = item.User?.email
        transformeredItem.Category.name = item?.Category?.name
        transformeredItem.Category.icon = "http://localhost:3000" + '/uploads/' + item?.Category?.icon
        // transformeredItem.questions = [...item?.Questions]  
        return transformeredItem
    }

    return item
}

const itemTransformer = (item) => {
    const transformeredItem = {
        id: 0,
        name: '',
        img: '',
        latX: '',
        longY: '',
        city: '',
        state: '',
        street: '',
        des: '',
        createdAt: '',
        // User: {
        //     id: '',
        //     userName: '',
        //     email: ''
        // },
        Category: {
            name: '',
            icon: ''
        },
    }
    if (item) {
        transformeredItem.id = item.id
        transformeredItem.name = item.name
        transformeredItem.img = "http://localhost:3000" + '/uploads/' + item.blurImage
        transformeredItem.latX = item.lat
        transformeredItem.longY = item.lng
        transformeredItem.city = item.city
        transformeredItem.state = item.state
        transformeredItem.street = item.street
        transformeredItem.des = item.description
        transformeredItem.createdAt = item.createdAt
        // transformeredItem.User.id = item?.User?.id
        // transformeredItem.User.userName = item?.User?.userName
        // transformeredItem.User.email = item.User?.email
        transformeredItem.Category.name = item?.Category?.name
        transformeredItem.Category.icon = "http://localhost:3000" + '/uploads/' + item?.Category?.icon
        transformeredItem.questions = [...item?.Questions]
        return transformeredItem
    }

    return item
}


const OneItemTransformer = (item) => {
    const transformeredItem = {
        id: 0,
        name: '',
        // img: '',
        latX: '',
        longY: '',
        city: '',
        state: '',
        street: '',
        des: '',
    }
    if (item) {
        transformeredItem.id = item.id
        transformeredItem.name = item.name
        // transformeredItem.img = item.blurImage
        transformeredItem.latX = item.lat
        transformeredItem.longY = item.lng
        transformeredItem.city = item.city
        transformeredItem.state = item.state
        transformeredItem.street = item.street
        transformeredItem.des = item.description
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


const AllItemTransformer = (item) => {
    const transformeredItem = {
        id: 0,
        name: '',
        img: '',
        latX: '',
        longY: '',
        city: '',
        state: '',
        street: '',
        des: '',
        createdAt: '',
        User: {
            id: '',
            userName: '',
            email: ''
        },
        Category: {
            name: '',
            icon: ''
        },
        // Questions: [
        //     question= ''
        // ]
    }
    if (item) {
        transformeredItem.id = item.id
        transformeredItem.name = item.name
        transformeredItem.img = "http://localhost:3000" + '/uploads/' + item.blurImage
        transformeredItem.latX = item.lat
        transformeredItem.longY = item.lng
        transformeredItem.city = item.city
        transformeredItem.state = item.state
        transformeredItem.street = item.street
        transformeredItem.des = item.description
        transformeredItem.createdAt = item.createdAt
        transformeredItem.User.id = item?.User?.id
        transformeredItem.User.userName = item?.User?.userName
        transformeredItem.User.email = item.User?.email
        transformeredItem.Category.name = item?.Category?.name
        transformeredItem.Category.icon = "http://localhost:3000" + '/uploads/' + item?.Category?.icon
        transformeredItem.questions = [...item?.Questions]  
        return transformeredItem
    }

    return item
}

const AllItemsTransformer = (items) => {
    const transformeredItems = []
    if (items?.length > 0) {
        items?.map(item => {
            transformeredItems.push(AllItemTransformer(item))
        })
        return transformeredItems
    }
    return items
}


const CategoryTransformers = (Category) => {
    const transformeredCategory = {
        id: '',
        name: '',
        icon: ''
    }
    if (Category) {
        transformeredCategory.id = Category.id
        transformeredCategory.name = Category.name
        transformeredCategory.icon = Category.icon
        return transformeredCategory
    }

    return Category
}


const CategoryTransformer = (Category) => {
    const transformeredCategory = {
        id: '',
        name: '',
        icon: ''
    }
    console.log("befor if Category.icon", Category.icon)
    if (Category) {
        console.log("Category.icon", Category.icon)
        transformeredCategory.id = Category.id
        transformeredCategory.name = Category.name
        transformeredCategory.icon = "http://localhost:3000" + '/uploads/' + Category.icon
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

const PhotoTransformer = (path) => {
    return "http://localhost:3000" + '/uploads/' + path
}

const AdminTransformer = (admin) => {
    const transformeredAdmin = {
        id: 0,
        name: '',
        email: '',
        password: '',
        userTypeId: '',
        userType: {
            type: '',
        }
    }
    if (admin) {
        transformeredAdmin.id = admin.id
        transformeredAdmin.name = admin.userName
        transformeredAdmin.email = admin.email
        transformeredAdmin.password = admin.password
        transformeredAdmin.userTypeId = admin.userTypeId
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
        id: 0,
        name: '',
        email: '',
        password: '',
        userTypeId: '',
        userType: {
            type: '',
        }
    }
    if (admin) {
        transformeredAdmin.id = admin.id
        transformeredAdmin.name = admin.userName
        transformeredAdmin.email = admin.email
        transformeredAdmin.password = admin.password
        transformeredAdmin.userTypeId = admin.userTypeId
        transformeredAdmin.userType.type = admin.UserType.type
        return transformeredAdmin
    }

    return admin
}

const UserInfoTransformer = (info) => {
    const transformeredInfo = {
        id: 0,
        avatar: '',
        bgPic: '',
        phone: '',
        city: '',
        state: '',
        street: '',
        // street: '',
        // des:'',
        // User: {
        //     id: '',
        //     userName: '',
        //     email: ''
        // },
        // Category: {
        //     name: '',
        //     icon: ''
        // }
    }
    if (info) {
        transformeredInfo.id = info.id
        transformeredInfo.avatar = info.avatar
        transformeredInfo.bgPic = info.bgPic
        transformeredInfo.phone = info.phone
        transformeredInfo.city = info.city
        transformeredInfo.state = info.state
        transformeredInfo.street = info.street
        // transformeredInfo.des = info.description   
        // transformeredInfo.User.id = info?.User?.id
        // transformeredInfo.User.userName = info?.User?.userName
        // transformeredInfo.User.email = info.User?.email
        // transformeredInfo.Category.name = info?.Category?.name
        // transformeredInfo.Category.icon = info?.Category?.icon
        return transformeredInfo
    }

    return info
}

const UserInfosTransformer = (info) => {
    const transformeredUnfos = []
    if (info?.length > 0) {
        info?.map(info => {
            transformeredUnfos.push(UserInfoTransformer(info))
        })
        return transformeredUnfos
    }
    return info
}


const QuestionTransformer = (ques) => {
    const transformeredQues = {
        // id: 0,
        question: '',
        // bgPic: '',
        // phone: '',
        // city: '',
        // state: '',
        // street: '',
        // street: '',
        // des:'',
        // User: {
        //     id: '',
        //     userName: '',
        //     email: ''
        // },
        // Category: {
        //     name: '',
        //     icon: ''
        // }
    }
    if (ques) {
        // transformeredQues.id = ques.id
        transformeredQues.question = ques.question
        // transformeredQues.bgPic = ques.bgPic
        // transformeredQues.phone = ques.phone
        // transformeredQues.city = ques.city
        // transformeredQues.state = ques.state
        // transformeredQues.street = ques.street
        // transformeredQues.des = ques.description   
        // transformeredQues.User.id = ques?.User?.id
        // transformeredQues.User.userName = ques?.User?.userName
        // transformeredQues.User.email = ques.User?.email
        // transformeredQues.Category.name = ques?.Category?.name
        // transformeredQues.Category.icon = ques?.Category?.icon
        return transformeredQues
    }

    return ques
}

const QuestionsTransformer = (ques) => {
    const transformeredques = []
    if (ques?.length > 0) {
        ques?.map(ques => {
            transformeredques.push(QuestionTransformer(ques))
        })
        return transformeredques
    }
    return ques
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
    UserInfoTransformer,
    UserInfosTransformer,
    QuestionsTransformer,
    QuestionTransformer,
    OneItemTransformer,
    OneUserTransformer,
    PhotoTransformer,
    itemTransformer,
    AllItemsTransformer
}