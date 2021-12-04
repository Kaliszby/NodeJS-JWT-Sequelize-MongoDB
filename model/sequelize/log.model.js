module.exports = (sequelize, Sequelize) => {
    const log = sequelize.define(
        "e_state",
        {
            item_id: {
                type: Sequelize.INTEGER(5),
                primaryKey: true,
                autoIncrement: true
            },
            dev_id: {
                type: Sequelize.STRING(15),
            },
            e_id: {
                type: Sequelize.STRING(15),
            },
            e_lat: {
                type: Sequelize.FLOAT(10, 6),
            },
            e_status: {
                type: Sequelize.INTEGER(1),
            },
            e_lng: {
                type: Sequelize.FLOAT(10, 6),
            },
            e_time: {
                type: Sequelize.DATE,
            }
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );

    return log;
};
