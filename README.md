<div align="center">
  <p>
    <a href="https://github.com/dismord/dismord">
      <img src="./img/banner.png" alt="Dismord" width="546">
    </a>
  </p>
  <p>
    <a href="https://npmjs.com/create-dismord">
      <img src="https://img.shields.io/npm/v/create-dismord.svg?style=flat-square&color=9cf" alt="npm">
    </a>
  </p>
</div>

## About

```Dismord``` is a simple but awesome ```NodeJs``` build tool.

It can help you create a ```DiscordJs``` project quickly and faster.

## Installation

With ```npm```:
```powershell
$ npm create dismord
```

With ```yarn```:
```powershell
$ yarn create dismord
```

With ```pnpm```:
```powershell
$ pnpm create dismord
```

## Usage

### Init

Install and answer the questions at the terminal.

Change the path to your project:
```powershell
$ cd PROJECTPATH
```

Install the packages your project needs:
```powershell
$ npm install
```

Enter bot ```ID``` and ```TOKEN``` in ```.env``` file:
```env
ID=123456789012345678
TOKEN=IWILLNERVERSHOWYOUMYTOKENLOL
```

Run your bot:
```powershell
$ npm run bot
```

### Add Command

Create ```myname.js``` file in ```cmds``` folder.

Require ```slashCommandBuilder```:

```javascript
// 13.6.0
const { SlashCommandBuilder } = require('@discordjs/builders');

// 14.4.0
const { SlashCommandBuilder } = require('discord.js');
```

Add ```module.exports```:

```javascript
// 13.6.0
const { SlashCommandBuilder } = require('@discordjs/builders');

// 14.4.0
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	
};
```

Create a new ```slashCommandBuilder```, then set its ```name``` and ```description```:

```javascript
// 13.6.0
const { SlashCommandBuilder } = require('@discordjs/builders');

// 14.4.0
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('myname').setDescription('what is my name')
};
```

Add an ```interaction```:

```javascript
// 13.6.0
const { SlashCommandBuilder } = require('@discordjs/builders');

// 14.4.0
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('myname').setDescription('what is my name'),
	async execute(interaction) {
		
	}
};
```

Reply the ```user.tag``` of asker:

```javascript
// 13.6.0
const { SlashCommandBuilder } = require('@discordjs/builders');

// 14.4.0
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('myname').setDescription('what is my name'),
	async execute(interaction) {
		interaction.reply({ content: interaction.user.tag });
	}
};
```

### Delete Command

You can just delete ```myname.js``` file in ```cmds``` folder.