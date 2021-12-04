module.exports = {
    HOST: "192.168.2.9",
    USER: "root",
    PASSWORD: "",
    DB: "eSeal",
    dialect: "mysql",
    // port: "3306",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
