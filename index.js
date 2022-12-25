const { Client, Events, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnection } = require('@discordjs/voice');
const { join } = require('node:path');
require('dotenv').config();

// import { Client, Events, GatewayIntentBits } from 'discord.js';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
const player = createAudioPlayer();

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
console.log(process.env.DISCORD_TOKEN)

client.on('voiceStateUpdate', (oldState, newState) => {
	// console.log(newState)
	if (newState.member.id === process.env.USER_ID && oldState.channelId === null) {
		console.log(__dirname)
		const happy_birthday = createAudioResource(join(__dirname, 'happy_birthday.mp3'));
		console.log('User joined voice')
		const connection = joinVoiceChannel({
			channelId: newState.channelId,
			guildId: newState.guild.id,
			adapterCreator: newState.guild.voiceAdapterCreator,
		});
		console.log(happy_birthday)
		console.log('get audio file')

		setTimeout(() => {

			player.play(happy_birthday);
			const subscription = connection.subscribe(player);
			console.log('play audio file')
			if (subscription) {
				setTimeout(() => subscription.unsubscribe(), 5_000);
			}
			setTimeout(() => connection.destroy(), 5_000);
		}, 5_000);
	}
});


client.login(process.env.DISCORD_TOKEN);


