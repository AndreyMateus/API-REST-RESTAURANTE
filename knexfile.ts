export default {
    client: 'sqlite3',
    connection: {
        filename: './src/database/database.db',
    },
    migrations: {
        directory: "./src/database/migrations"
    },
    seeds: {
        directory: "./src/database/seeds"
    },
    useNullAsDefault: true,
    pool: {
        afterCreate: (connection: any, done: any) => {
            connection.run("PRAGMA foreign_keys = ON");
            done();
        }
    }
};