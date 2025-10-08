const userModel = require('../models/user.model');


module.exports.createUser = async ({
    firstname, lastname, email, password, address,phone,pincode
}) => {
    if (!firstname || !email || !password || ! address) {
        throw new Error('All fields are required');
    }
    const user = await userModel.create({
        fullname: {
            firstname,
            lastname,
        },
        phone,
        address,
        pincode,
        email,
        password,
    })

    return user;
}

module.exports.updateUser = async (id, updates) => {
    if (!id) throw new Error('User id required');
    console.log("first",updates);
    // Use { new: true } to return the updated document
    const user = await userModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
    return user;
}

module.exports.deleteUser = async (id) => {
    if (!id) throw new Error('User id required');
    const res = await userModel.findByIdAndDelete(id);
    return res;
}