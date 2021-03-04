# EOSCR Boilerplate

[![N|Solid](https://github.com/eoscostarica/eos-rate/raw/master/docs/eoscostarica-logo-black.png)](https://eoscostarica.io/)

![](https://img.shields.io/github/license/eoscostarica/full-stack-boilerplate) ![](https://img.shields.io/badge/code%20style-standard-brightgreen.svg) ![](https://img.shields.io/badge/%E2%9C%93-collaborative_etiquette-brightgreen.svg) ![](https://img.shields.io/twitter/follow/eoscostarica.svg?style=social&logo=twitter) ![](https://img.shields.io/github/forks/eoscostarica/full-stack-boilerplate?style=social)

A highly scalable skeleton with best practices, fullstack monorepo containing our front end and backend boilerplates 

## Version

- 0.1.0

# Features!

This boilerplate features all the latest tools and practices in the industry.

- hapi
- hasura
- webapp

## Installation

### Before to start

Somethings you need before getting started:

- [git](https://git-scm.com/)
- [node.js](https://nodejs.org/es/)
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)

### First time

Copy the `.env.example` then update the environment variables according to your needs

```
cp .env.example .env
```

## Development

### Quick start

1.  Clone this repo using `git clone --depth=1 https://github.com/eoscostarica/full-stack-boilerplate.git <YOUR_PROJECT_NAME>`
2.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.
3.  Run `make run` in order to start the project using docker compose.
    _At this point you can navigate to `http://localhost:3000`

## File Structure

Within the download you'll find the following directories and files:

```
boilerplate/
├── hapi
├── hasura
├── wallet
└── webapp
```

## License

MIT © [EOS Costa Rica](https://eoscostarica.io)

## Contributing

Please Read EOS Costa Rica's [Open Source Contributing Guidelines](https://developers.eoscostarica.io/docs/open-source-guidelines).

Please report bugs big and small by [opening an issue](https://github.com/eoscostarica/full-stack-boilerplate/issues)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<table>
  <tr>
    <td align="center"><a href="https://github.com/xavier506"><img src="https://avatars0.githubusercontent.com/u/5632966?v=4" width="100px;" alt="Xavier Fernandez"/><br /><sub><b>Xavier Fernandez</b></sub></a><br /><a href="#ideas-xavier506" title="Ideas, Planning, & Feedback">🤔</a> <a href="#blog-xavier506" title="Blogposts">📝</a> <a href="#talk-xavier506" title="Talks">📢</a> <a href="#infra-xavier506" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
 <td align="center"><a href="https://github.com/tetogomez">
      <img src="https://avatars3.githubusercontent.com/u/10634375?s=460&v=4" width="100px;" alt="Teto Gomez"/><br /><sub><b>Teto Gomez</b></sub></a><br /><a href="https://github.com/eoscostarica/eosrate/commits?author=tetogomez" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/eoscostarica/eosrate/commits?author=tetogomez" title="Code">💻</a> <a href="#review-tetogomez" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://github.com/adriexnet">
      <img src="https://avatars3.githubusercontent.com/u/5375168?s=460&u=542a27a00b761d98851991c6a6d5f78d7b35a2b2&v=4" width="100px;" alt="Adriel Diaz"/><br /><sub><b>Adriel Diaz</b></sub></a><br /><a href="https://github.com/eoscostarica/eosrate/commits?author=adriexnet" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/eoscostarica/eosrate/commits?author=adriexnet" title="Code">💻</a> <a href="#review-adriexnet" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## About EOS Costa Rica

<p align="center">
	<a href="https://eoscostarica.io">
		<img src="https://github.com/eoscostarica/eos-rate/raw/master/docs/eoscostarica-logo-black.png" width="300">
	</a>
</p>
<br/>

EOS Costa Rica is an independently-owned, self-funded, bare-metal Genesis block producer that provides stable and secure infrastructure for EOSIO blockchains. We support open source software for our community while offering enterprise solutions and custom smart contract development for our clients.

[eoscostarica.io](https://eoscostarica.io)
