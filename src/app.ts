
import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/github.controller';

(() => {
    main();
})();

function main() {
    const app = express();
    const githubController = new GithubController();

    app.use( express.json() );

    app.post('/api/github', githubController.webhookHandler );

    app.listen( envs.PORT, () => {
        console.log(`App running in port ${ envs.PORT }`);
    } )
}