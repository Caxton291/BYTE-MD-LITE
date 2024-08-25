 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY09wdWJQelRVMjVYczNnN1dGR2tHM1VPM1RaWEhKdnJTSnhxWlVBZUdtdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1NUelZ0c3JBcHljSEVIeGJSc2wyeTJMUGlrNU4rakhKd3dHWTdhcEJrWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyTjFGamVQamYwUGFlUWVnd3BNN0paWVZ3SnEzdnMrdFVRd2gzUXlOazJJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzemRxeEVhWWF1Q2VmczEzT251dXkrRDAwOHNFeEo4U29PczlYR3JmNW5VPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVLM2dpMEVmb2JPTTFISHR1RE5CNUxSakZ3RStTT3B0VUVoQU9memR3Vlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdjT2lkYmZGNlkwY2gzV29zWHVrd0dYQWNnWEFKSUw2QXlxSmhsOUlla2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0RsQlpWaC9lYTVrVlVwVDUxcHJkMlE4OUJkMWp0TFRmWVFpc3VMNkQzMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1puVzI0Sk02R3dQS3dKV3dybHNIUW9nT2Z0QmxpT1V2TDRVK1N2dXEzdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1UeEx1by9SNDFVWXhaN0tkWGJqQms3YlRMeWpkUHljeCtpaGt5c0kxVE5Qd1lvREtMZzF0TzNobEFGNllqbTdXelY3bTBnSkRlQ0JQQitGL3pFVER3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTQsImFkdlNlY3JldEtleSI6IlpZWHAxNFR4UGhLNCtpUUpxRW5nNjM1cjBsNkxGaG9PSkp5Mk80U1QxbVU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InlLcnVmS2ppU3F1QmxYYXRETHJtV2ciLCJwaG9uZUlkIjoiMzBlMzIyZTktNmEyYy00ZGVmLWE5MjktMTkwMTM0NDFhNTJjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilk2emk1b0EvSGRBY08rbnROcDZMU0ViK1ZXcz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYRnYzdXZHQ1pxTmlJMUptSllmZ2IyUURTaVU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNUZCS1ZFRVkiLCJtZSI6eyJpZCI6IjI1NDc5ODAzMzg0NDo0NEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTWlWMjdBRkVKMkNyN1lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQW84RGVPNEM3cksySHgveThYdEdaR3Z5Y2NoVWdTT2ZUY0pMeW90WXNEND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTnNTeExBY0dCT1JJSUYrdjBxMSthMTJaemF5V1NOdG9NbXRzWDBVUWxZRzhTSk1IRjh6ZElabm9XTk5RWTJxTnZ0UmFIaEI4T3E1bDczc3pmWURpRHc9PSIsImRldmljZVNpZ25hdHVyZSI6InVnV0JtMjBDMGx4aWh4L05qdThFZ24vTWp1NmNCQ2Y4bytLeTQ0R2Iwb2JmbnFLL0FDazFwK1FkZ0oyNGxZbVUzQ09Yemw3MnNDSytsaXZ5aktxYUNRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0Nzk4MDMzODQ0OjQ0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFLUEEzanVBdTZ5dGg4Zjh2RjdSbVJyOG5ISVZJRWpuMDNDUzhxTFdMQSsifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ2MjkyOTF9',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "Caxton",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254798033844",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'Caxton',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'available',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
