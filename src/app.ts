
import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/github.controller';
import { GitHubService } from './presentation/services/github.service';

(() => {
    main();
})();

function main() {
    const app = express();
    const githubService = new GitHubService();
    const githubController = new GithubController( githubService );

    app.use( express.json() );

    app.post('/api/github', githubController.webhookHandler );

    app.listen( envs.PORT, () => {
        console.log(`App running in port ${ envs.PORT }`);
    } )
}