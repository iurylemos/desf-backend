import { SetupServer } from "./server";
import { Database } from './database/database';

(async (): Promise<void> => {
    try {
        const server = new SetupServer(8000);
        const database = new Database();
        await database.connection();
        await server.init();
        server.start();

        const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
        for (const exitSignal of exitSignals) {
            process.on(exitSignal, async () => {
                try {
                    await server.close();
                    console.log(`App exited with success`);
                    process.exit();
                } catch (error) {
                    console.log(`App exited with error: ${error}`);
                    process.exit();
                }
            });
        }
    } catch (error) {
        console.error(`App exited with error: ${error}`);
        process.exit();
    }
})();