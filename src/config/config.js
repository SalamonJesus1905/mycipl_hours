import dotenv from 'dotenv';
import path from 'path';
import joi from 'joi';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = joi.object()
    .keys({
        PORT: joi.number().default(8000),
        MONGODB_URL: joi.string().required().description('Mongo DB url'),
        JWT_TOKEN_SECRET:joi.string().required().description('JWT_TOKEN_SECRET'),
        JWT_EXPIRY_TIME:joi.string().required().description('JWT_EXPIRY_TIME'),
    })
    .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
export default {
    port: envVars.PORT,
    mongoose: {
    url: envVars.MONGODB_URL
    },
    jwt: {
        secret: envVars.JWT_TOKEN_SECRET,
        expiryTime: envVars.JWT_EXPIRY_TIME,
    }
};
