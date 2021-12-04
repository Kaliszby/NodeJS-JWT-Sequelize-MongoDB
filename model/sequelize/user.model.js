module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define(
        "user",
        {
            username: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            role: {
                type: Sequelize.STRING,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );

    return user;
};
