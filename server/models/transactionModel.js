const transactionSchema = require("../schema/transactionSchema");

const newTransaction = (details) => {
    return new Promise(async(resolve, reject) => {
        try {
            const newTransactionData = new transactionSchema(details);
            const transactionDB = await newTransactionData.save();
            resolve(transactionDB); 
        } catch (error) {
            reject(error);
        }
    })
}

const findTransactionByID = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const transactionDb = await transactionSchema.findById(id);
            resolve(transactionDb);
        } catch (error) {
            reject(error);
        }
    })
}

const updateTransactionProperty = (transactionId, updatedProperty) => {
    return new Promise(async (resolve, reject) => {
        try {
            await transactionSchema.findByIdAndUpdate(transactionId, updatedProperty);
            resolve();
        } catch (error) {
            reject(error);
        }
    })

}

module.exports = {newTransaction, findTransactionByID, updateTransactionProperty};