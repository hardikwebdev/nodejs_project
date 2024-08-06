require('dotenv').config();//instatiate environment variables
let fs = require('fs');

CONFIG = {} //Make this global to use all over the application

CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '3000';
CONFIG.timezone     = process.env.TIMEZONE  || '+05:30';
CONFIG.localtimezone = process.env.localtimezone || "Asia/Kolkata";

CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_name = process.env.DB_NAME || 'name';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || '';

CONFIG.db_name_2 = process.env.DB_NAME_2 || 'name';
CONFIG.db_user_2 = process.env.DB_USER_2 || 'root';
CONFIG.db_password_2 = process.env.DB_PASSWORD_2 || '';

CONFIG.jwt_encryption_admin = process.env.JWT_ENCRYPTION_ADMIN || 'jwt_please_change';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';

CONFIG.LIVE_IMAGE_URL_PATH = `${process.env.LIVE_IMAGE_URL_PATH}` || '';
CONFIG.filePath = `${process.env.FILEPATH}/` || '';
CONFIG.storePath = `${process.env.UPLOAD_IMAGE_PATH}/` || '';
CONFIG.host = process.env.Host;
CONFIG.redisPort = process.env.redisPort || 6379;
CONFIG.redisUrl = process.env.redisUrl || 'localhost';
CONFIG.redisCacheTime = process.env.redisCacheTime || 30;

CONFIG.API_VERSION = process.env.API_VERSION || '0';

CONFIG.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
CONFIG.welcomeemail = process.env.welcomeemail || "";

CONFIG.BASE_URL = process.env.BASE_URL || "";
CONFIG.API_URL = `${process.env.API_URL}` || "";

CONFIG.SMS_USERNAME = process.env.SMS_USERNAME;
CONFIG.SMS_PASSWORD = process.env.SMS_PASSWORD;
CONFIG.SMS_URL = process.env.SMS_URL;