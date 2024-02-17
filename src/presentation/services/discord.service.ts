import { envs } from '../../config';

export class DiscordService {
    private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;
    
    constructor() {}

    async notify( message: string ) {
        const body = {
            content: message,
            embeds: [
                {
                    image: { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzAxeXlyYnJlbWptMjE0Z2RnZ29yaHJtbTY3ZTR0c2h6cXVxd3ZxMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZZiLDJ98R2GOY/giphy.gif" }
                }
            ]
        }

        const resp = await fetch( this.discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        } );

        if( !resp.ok ) {
            console.log('Error sending message to discord');

            return false;
        } 

        return true;
    }
}