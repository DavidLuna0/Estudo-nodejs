module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Preencha o campo"
                }
            }
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    });

    return User;
}