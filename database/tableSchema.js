const tableSchema = {
    sql_userTable: `
        CREATE TABLE IF NOT EXISTS User ( user_ID INTEGER PRIMARY KEY, 
        user_Name TEXT,
        user_Password TEXT
        
        );
    `,
    sql_ChannelTable: `
        CREATE TABLE IF NOT EXISTS Channel (
            channel_ID INTEGER PRIMARY KEY,
            channel_Name TEXT NOT NULL,
            channel_Owner INTEGER, FOREIGN KEY (chanel_Owener) REFERENCES user(user_ID)
        );`,
        
        sql_noteTable: `
        CREATE TABLE IF NOT EXISTS Note (
            note_ID INTEGER PRIMARY KEY,
            note TEXT,
            created_at DATETIME,
            user_ID INTEGER, 
            FOREIGN KEY (user_ID) REFERENCES User(user_ID)
        );
    `
};

module.exports = {tableSchema};
