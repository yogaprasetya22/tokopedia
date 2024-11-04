import { web } from "./application/web";
import { logger } from "./application/logging";
import * as dotenv from "dotenv";
dotenv.config();

web.listen(5000, () => {
    logger.info(`Server is running on http://localhost:5000`);
});

export default web;
