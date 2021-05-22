import cors from 'cors';

const allowedOrigins = ['http://localhost:3000'];

export const optionsCors: cors.CorsOptions = {
    origin: allowedOrigins
};
