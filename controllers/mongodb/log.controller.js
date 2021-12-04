const db_mongodb = require("../../model/mongodb");
const Log = db_mongodb.log;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

// exports.findAll = (req, res) => {
//     Log.find()
//         .then((data) => {
//             res.send({ Items: data });
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving users.",
//             });
//         })
// }

exports.index = (req, res) => {
    Log.find()
        .then((data) => {
            res.send({ Items: data });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users.",
            });
        })
}

// Retrieve all Logs from the database.
exports.findAll = (req, res) => {

    const { page, size, search, start, end } = req.query;

    var query = {};

    if (search) {
        query.msgID = { $regex: new RegExp(search), $options: "i" }
    }

    if (start && end) {
        if (start == end) {
            query = { tDate: start }
        } else {
            query.tDate = { $gte: start, $lt: end }
        }
    }

    const { limit, offset } = getPagination(page, size);

    Log.paginate(query, { offset, limit })
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                Items: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};

// exports.create = (req, res) => {
//     if (!req.body.msgID) {
//         res.status(400).send({ message: "Content can not be empty!" });
//         return;
//     }

//     // Create a Tutorial
//     const log = new Log({
//         msgID: req.body.msgID,
//         msgBody: req.body.msgBody,
//     });

//     log
//         .save(log)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the Tutorial."
//             });
//         });
// };