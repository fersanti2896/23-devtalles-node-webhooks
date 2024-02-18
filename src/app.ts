
import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/github.controller';
import { GitHubService } from './presentation/services/github.service';
import { DiscordService } from './presentation/services/discord.service';
import { GithubMiddleware } from './presentation/middlewares/github-sha256.middleware';

(() => {
    main();
})();

function main() {
    const app = express();
    const githubService = new GitHubService();
    const discordService = new DiscordService();
    const githubController = new GithubController( githubService, discordService );

    app.use( express.json() );
    app.use( GithubMiddleware.verifySignature );

    app.post('/api/github', githubController.webhookHandler );

    app.listen( envs.PORT, () => {
        console.log(`App running in port ${ envs.PORT }`);
    } )
}