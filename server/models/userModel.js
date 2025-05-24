const userSchema = require("../schema/userSchema");
const bcrypt = require("bcrypt");


const userRegistration = (name, email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isUserAvailable = await userSchema.findOne({ email });

            if (isUserAvailable) {
                reject("Email Already Exists");
            }

            const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));

            const obj = {
                name,
                email,
                password: hashPassword
            }

            const userData = new userSchema(obj);
            const userDb = await userData.save();

            resolve(userDb);

        } catch (error) {
            reject(error);
        }
    })
}


const findUserWithEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDb = await userSchema.findOne({ email });
            resolve(userDb);
        } catch (error) {
            reject(error);
        }
    })
}

const findUserWithUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDb = await userSchema.findById(userId).select("-password");
            resolve(userDb);
        } catch (error) {
            reject(error);
        }
    })
}

const creditBalance = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDb = await userSchema.findById(userId).select("-password");
            resolve(userDb);
        } catch (error) {
            reject(error);
        }
    })
}

const reduceCreditBalance = (userId, currentCreditBalance) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDb = await userSchema.findByIdAndUpdate(userId, { creditBalance: currentCreditBalance - 1 }, { new: true }).select("-password");
            resolve(userDb)
        } catch (error) {
            reject(error);
        }
    })
}

const updateUserProperty = (userId, updatedProperty) => {
    return new Promise(async (resolve, reject) => {
        try {
            await userSchema.findByIdAndUpdate(userId, updatedProperty);
            resolve();
        } catch (error) {
            reject(error);
        }
    })

}


module.exports = { userRegistration, findUserWithEmail, creditBalance, findUserWithUserId, reduceCreditBalance, updateUserProperty };

