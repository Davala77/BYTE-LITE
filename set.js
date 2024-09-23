 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0lVVUJpWkRqRGRWWVVYVlAyWDBXbDdvd1dvRElMLzBHVStGSnJUVmczWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEdidDhmdUFUUit1MEtzbUhieGhVZXdmOW1INDd3Qy80MXJuSnRJVit3dz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSng1MHRDNCszMW9zbmdYWnpoWklrbjM3QVZ5ZVcvSE1hZXRJMENieW5ZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnbnpWUmw0YVdYZHBsS3lDZVVWVnJ1Mld1bEtkYWVuM1JrNU1hNkZwd2p3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVCdjVNQWsvbWdTd3BNNjgvSFBIZERBOEpaTkIzcFlWcnF4NWpTcGt5Mm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRpN1JxSllTMERENGh1UG5rRjRnVVlYWmZMbTh6NXEvMXMvRjBSQm5YVjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEFhMjNIZTg0WHRrbm9ZWk9xRzB3Y0RZdSsyQlg1NnptQnc4MjBNRTgxND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWw2Vzg3YnJRRTI0eVUzakdGKzE4bkJaUFlUSmN4cS8vajJxUFVKSy9FRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitTdlk5d0FLSUx2NWR0QUtmYkN3YnFVOFBKMUxCWEUrWEw5REhBc0s5aTRVT1NrNWJmNlZSVnRCanRERkRiYWhsMWtUOVVyRTUxc1IzYXBuS3Mvdmp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU1LCJhZHZTZWNyZXRLZXkiOiJERlhwVGhTZDNIK1pQbkc1aXZDSUZ5TEt1N3ZhU1BsVFBQYkJxU0N3aEpBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnUjk4QVg2c1NKdXZWS2F6MTNiZkdRIiwicGhvbmVJZCI6IjZmM2MxYjQyLWU1MWItNGY1MC05YmViLTYzYzg2YzM2OGVkNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyT0p0N0Nka0RLcStlWWxXSExJbzl1MzlFazA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRm1wUFZaemkyby9EZ1RTaHRPa09yb0YxaUY4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkhDSzQ3Q0tYIiwibWUiOnsiaWQiOiIyNTQ3NDMyOTA1NTA6NzVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0llRzJZVUZFUHJGeDdjR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Inl6V3JXSXIxbVVselp0Z3lzMVd6TmQrUVRka050WStYY1R5MUExOWprUlk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlVnK3lCL3hsblR0UDB4UXY1dC9CdkZ6MWREWkhFY2N6R1h1MWU3bW5Ob2U2QXJmTWhQM0YwWmptRGEvcWtkOEZ5MzNjN0d2NGdWaUZXVWtHMkZDbUFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJrOGg2YVJVQktBeCtaR3BQZVF6bmw4dGUrZkpBNktzK1d3K21DZXpXU1RLNW1XcVNzSWltRDNleDVvWUJsTkp5bEp0bGY3aUp3VW05bURHNlpFVHNqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc0MzI5MDU1MDo3NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjczFxMWlLOVpsSmMyYllNck5Wc3pYZmtFM1pEYldQbDNFOHRRTmZZNUVXIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI3MTI4MzI4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFpdyJ9',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254743290550",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
