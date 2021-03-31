<p align="center">
	<a href="https://ggoods.io">
		<img height="180" src="./docs/ggoods-logo.svg" >
	</a>
</p>

# NFTs that enable communities to raise funds

<p align="center">
	<a href="https://git.io/col">
		<img src="https://img.shields.io/badge/%E2%9C%93-collaborative_etiquette-brightgreen.svg" alt="Collaborative Etiquette">
	</a>
  <a href="#">
		<img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="Code Style">
	</a>
	<a href="#">
		<img src="https://img.shields.io/github/license/eoscostarica/Ggoods" alt="MIT">
	</a>
  <a href="#">
		<img src="https://img.shields.io/twitter/follow/eoscostarica.svg?style=social&logo=twitter" alt="Twitter">
	</a>
  <a href="#">
		<img src="https://img.shields.io/github/forks/eoscostarica/Ggoods?style=social" alt="Forks">
	</a>
</p>

[gGoods](https://ggoods.io) is an open-source NFT standard that enables organizations and communities to create their own NFTs to raise funds. Creating an NFT is easy and straightforward using our avatar creator. The NFTs are then purchased by donors as collectables that not only support a cause but can be integrated into countless applications such as games, emojis, chat stickers, avatars etc.

## Why gGoods?

Life is beginning to return to normal for many industries. Unfortunately this is not the case for many NGOs, who are being hit particularly hard by the economic effects of the pandemic. As sales slowed, jobs were lost and financial challenges persist, it is proving to be difficult for communities to raise and maintain donations. 2019 broke records of charitable donations ever recorded. However 2020 was disastrous for many charitable causes and 2021 will undoubtedly continue to be tough. 

One report reveals that 1 in 5 donors have stopped giving altogether and are not prepared to resume any funding activities until the economy fully recovers. This scenario will likely be familiar to organizations in operation during the 2008 financial crisis, where giving sharply declined during the recession.  

The economic downturn has affected incoming revenue for many not-for-profits and there appears to be no easy solution. 

That is not to say that NGOs are powerless. gGoods is an innovative low-cost solution that charities can leverage to help boost their funding, even during this difficult period.

By minting and selling NFTs in our marketplace, gGoods can help communities and NGOs solve the immediate liquidity issues caused by economic slowdowmn. gGoods enable voluntary donations and payment subscriptions in exchange for an NFT. This is unique, innovative funding strategy that NGOs can apply to help reduce the negative financial impact to their organization while engaging with their supporters.

## Who’s behind gGoods?
gGoods was created by a group of Costa Rican techies at [EOS Costa Rica](https://eoscostarica.io). It was our submission to the 2021 [Beyond Blockchain EOSIO Hackathon](https://block.one/news/launches-beyond-blockchain-hackathon/) organized by block.one.

## About the hackathon
The 2021 Beyond Blockchain EOSIO Hackathon was organized by [block.one](https://block.one/), a leading technology company that launched the EOSIO blockchain protocol, to encourage teams to develop a solution that could bring positive change at scale to communities around the world. The judging committee included Google, Galaxy Interactive and Mythical Games. 

# About the technology

## What is blockchain?
We deploy EOSIO blockchain technology to create gGoods. A blockchain is a decentralized ledger that registers transactions within a network of various computers or nodes. Once a transaction is validated by the network and registered in the chain, it remains immutable and cannot be altered or hacked, improving transparency and trust. 

[Learn more about blockchain](https://eoscostarica.medium.com/what-is-blockchain-an-introduction-9535ed3e6005)

## What is EOSIO?
Block.one launched the EOSIO blockchain protocol in 2018 as an open-source technology to help solve real-world problems. EOSIO offers scalability, flexibility, and a developerfriendly tech that uses the C++ language to program smart contracts. 

[Explore EOSIO](https://guide.eoscostarica.io/docs/eos-learn/eosio-protocol)

## What are NFTs?
NFTs or non-fungible tokens are unique, rare, and indivisible cryptographic digital assets representing collectibles, digital artwork, tickets to an event, or in-game items. In gaming, NFTs enable users to collect assets that they can use as in-game items or trade with their peers.

[Read more on NFTs](https://medium.com/dgoods/introducing-dgoods-7204a90193f4)

# How did we build gGoods?

This project features the following tech stack:

- **[Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine)**
- **[EOSIO](https://eos.io)** ([Jungle testnet](https://jungle3.bloks.io/account/ggoodsggoods))
- **[dGgoods](https://github.com/MythicalGames/dgoods)** (We forked the dGgoods Smart Contracts)
- **[IPFS](https://ipfs.io/)** 
- **[React JS](https://reactjs.org/)**
- **[Material UI](https://material-ui.com/)**
- **[hasura](https://hasura.io) GraphQL engine**
- **[hapi](https://hapi.dev/)** (HTTP API)

**EOSCR Boilerplate**

We built this project using our own [EOSIO project boilerplate](https://github.com/eoscostarica/full-stack-boilerplate), a highly scalable skeleton including best practices. This fullstack monorepo contains our front end and backend boilerplates.

## Installation

## Before you Start

Somethings you need before getting started:

- [git](https://git-scm.com/)
- [node.js](https://nodejs.org/es/)
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)

## First Time

Copy the `.env.example` then update the environment variables according to your needs.

```
cp .env.example .env
```

## Quick Start

1.  Clone this repo using `git clone --depth=1 https://github.com/eoscostarica/Ggoods.git <YOUR_PROJECT_NAME>`.
2.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.
3.  Run `make run` in order to start the project using docker compose.

At this point you can navigate to `http://localhost:3000`.

## File Structure

## File Structure

Within the repo you'll find the following directories:

```
.
├── contracts ..................... gGoods Smart Contract
├── docs .......................... Diagrams and Images for docs
├── hasura ........................ Hasura GraphQL Engine
├── hapi .......................... HTTP API 
├── kubernetes .................... Kubernetes Manifests 
├── utils ......................... Makefiles for project build
├── wallet ........................ EOSIO Wallet Service
└── webapp ........................ ReactJS Web Application
```

## Infrastructure Diagram

<p align="center">
  <img src="docs/img/infra.svg" />
</p>

## Services

<p align="center">
  <img src="docs/img/services.svg" />
</p>

## Tech Stack Description

### Web Application

This FullStack Template uses [React.js](https://reactjs.org) as a Frontend Library which together with other tools like [Apollo Client](https://www.apollographql.com/docs/react/), [GraphQL](https://graphql.org/) and [Material UI](https://material-ui.com/) brings a robust solution for building Single Page Applications out of the box.

### Backend

#### Hasura GraphQL Server

[Hasura](https://hasura.io/) technology maps a [PostgreSQL](https://www.postgresql.org/) database and provides a reliable and easy-to-use API. This allow us to focus on critical features of our projects, delegating mechanic CRUD (Create, Read, Update, Delete) operations.
Hasura also enables custom REST handling capabilities with the possibility to integrate a custom REST server, that way we can extend the base CRUD functionalities and build custom business logic.

#### Hapi REST Server

We need to handle REST custom requests coming from the Hasura GraphQL server. For this, we use [hapi.dev](https://hapi.dev/), which is a simple and easy-to-use backend framework.

### EOSIO Blockchain Technology Integration

As a company that delivers EOSIO blockchain-based solutions, we build a template which contains EOSIO integration, specifically [eosjs](https://github.com/EOSIO/eosjs). This allow us to iterate quickly over the more challenging features of our projects.

### Interplanetary File System (IPFS)

We use IPFS to store the assets that are displayed in the Web Application. IPFS is a decentralized storage that uses blockchain technology to provide auditability and availability of the assets. IPFS can be configured to setup your own node and validate the data, but this time we are using the public IPFS access, i.e. public endpoints.

### Google Kubernetes Engine Cluster

At EOS Costa Rica, we build software taking into consideration a high availability of the services that can integrate it. For this, we use [Kubernetes](https://kubernetes.io/), that allows to isolate modules in order to reduce the risk of the system collapsing. In the image above, you can take a look at our representation of the architecture we consider is more suitable to our purposes.

# Version

- 0.1.0

# License

MIT © [EOS Costa Rica](https://eoscostarica.io).

# Contributing

Please Read EOS Costa Rica's [Open Source Contributing Guidelines](https://developers.eoscostarica.io/docs/open-source-guidelines).

Please report bugs big and small by [opening an issue](https://github.com/eoscostarica/Ggoodsissues)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/JustinCast"><img src="https://avatars.githubusercontent.com/u/17890146?v=4?s=100" width="100px;" alt=""/><br /><sub><b>JustinCast</b></sub></a><br /><a href="https://github.com/eoscostarica/Ggoods/commits?author=JustinCast" title="Code">💻</a> <a href="https://github.com/eoscostarica/Ggoods/commits?author=JustinCast" title="Documentation">📖</a> <a href="#ideas-JustinCast" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-JustinCast" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#research-JustinCast" title="Research">🔬</a> <a href="https://github.com/eoscostarica/Ggoods/pulls?q=is%3Apr+reviewed-by%3AJustinCast" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://eoscostarica.io/"><img src="https://avatars.githubusercontent.com/u/1179619?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jorge Murillo</b></sub></a><br /><a href="#a11y-murillojorge" title="Accessibility">️️️️♿️</a> <a href="#design-murillojorge" title="Design">🎨</a> <a href="#ideas-murillojorge" title="Ideas, Planning, & Feedback">🤔</a> <a href="#research-murillojorge" title="Research">🔬</a> <a href="https://github.com/eoscostarica/Ggoods/pulls?q=is%3Apr+reviewed-by%3Amurillojorge" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/edgar-eoscostarica"><img src="https://avatars.githubusercontent.com/u/40245170?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Edgar Fernandez</b></sub></a><br /><a href="#business-edgar-eoscostarica" title="Business development">💼</a> <a href="#content-edgar-eoscostarica" title="Content">🖋</a> <a href="https://github.com/eoscostarica/Ggoods/commits?author=edgar-eoscostarica" title="Documentation">📖</a> <a href="#ideas-edgar-eoscostarica" title="Ideas, Planning, & Feedback">🤔</a> <a href="#video-edgar-eoscostarica" title="Videos">📹</a></td>
    <td align="center"><a href="https://github.com/ldrojas"><img src="https://avatars.githubusercontent.com/u/29232417?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Luis Diego Rojas</b></sub></a><br /><a href="#blog-ldrojas" title="Blogposts">📝</a> <a href="#business-ldrojas" title="Business development">💼</a> <a href="#content-ldrojas" title="Content">🖋</a> <a href="https://github.com/eoscostarica/Ggoods/commits?author=ldrojas" title="Documentation">📖</a> <a href="#ideas-ldrojas" title="Ideas, Planning, & Feedback">🤔</a> <a href="#research-ldrojas" title="Research">🔬</a></td>
    <td align="center"><a href="https://github.com/roafroaf"><img src="https://avatars.githubusercontent.com/u/40480825?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rodolfo Perez</b></sub></a><br /><a href="#design-roafroaf" title="Design">🎨</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/leister-francisco-alvarez-campos-65b7801bb/"><img src="https://avatars.githubusercontent.com/u/28828796?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Leister Francisco Alvarez Campos</b></sub></a><br /><a href="https://github.com/eoscostarica/Ggoods/commits?author=leisterfrancisco" title="Code">💻</a> <a href="#ideas-leisterfrancisco" title="Ideas, Planning, & Feedback">🤔</a> <a href="#research-leisterfrancisco" title="Research">🔬</a> <a href="https://github.com/eoscostarica/Ggoods/pulls?q=is%3Apr+reviewed-by%3Aleisterfrancisco" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/AngeloCG97"><img src="https://avatars.githubusercontent.com/u/51149817?v=4?s=100" width="100px;" alt=""/><br /><sub><b>AngeloCG97</b></sub></a><br /><a href="https://github.com/eoscostarica/Ggoods/commits?author=AngeloCG97" title="Code">💻</a> <a href="#ideas-AngeloCG97" title="Ideas, Planning, & Feedback">🤔</a> <a href="#research-AngeloCG97" title="Research">🔬</a> <a href="https://github.com/eoscostarica/Ggoods/pulls?q=is%3Apr+reviewed-by%3AAngeloCG97" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/kuronosec"><img src="https://avatars.githubusercontent.com/u/6999429?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andres Gomez</b></sub></a><br /><a href="#infra-kuronosec" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#mentoring-kuronosec" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/eoscostarica/Ggoods/pulls?q=is%3Apr+reviewed-by%3Akuronosec" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/JeanVegaD"><img src="https://avatars.githubusercontent.com/u/19317138?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jean Vega</b></sub></a><br /><a href="https://github.com/eoscostarica/Ggoods/commits?author=JeanVegaD" title="Code">💻</a> <a href="#design-JeanVegaD" title="Design">🎨</a> <a href="#ideas-JeanVegaD" title="Ideas, Planning, & Feedback">🤔</a> <a href="#research-JeanVegaD" title="Research">🔬</a> <a href="https://github.com/eoscostarica/Ggoods/pulls?q=is%3Apr+reviewed-by%3AJeanVegaD" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/stephaniedelgadobrenes/"><img src="https://avatars.githubusercontent.com/u/31549144?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Steph Delgado</b></sub></a><br /><a href="https://github.com/eoscostarica/Ggoods/commits?author=steph222" title="Code">💻</a> <a href="#design-steph222" title="Design">🎨</a> <a href="#ideas-steph222" title="Ideas, Planning, & Feedback">🤔</a> <a href="#research-steph222" title="Research">🔬</a> <a href="https://github.com/eoscostarica/Ggoods/pulls?q=is%3Apr+reviewed-by%3Asteph222" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/kriskoin"><img src="https://avatars.githubusercontent.com/u/3965944?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kriskoin</b></sub></a><br /><a href="https://github.com/eoscostarica/Ggoods/commits?author=kriskoin" title="Code">💻</a> <a href="#ideas-kriskoin" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/eoscostarica/Ggoods/pulls?q=is%3Apr+reviewed-by%3Akriskoin" title="Reviewed Pull Requests">👀</a></td><td align="center"><a href="https://github.com/xavier506"><img src="https://avatars0.githubusercontent.com/u/5632966?v=4" width="100px;" alt="Xavier Fernandez"/><br /><sub><b>Xavier Fernandez</b></sub></a><br /><a href="#ideas-xavier506" title="Ideas, Planning, & Feedback">🤔</a> <a href="#blog-xavier506" title="Blogposts">📝</a> <a href="#talk-xavier506" title="Talks">📢</a> <a href="#infra-xavier506" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
 <td align="center"><a href="https://github.com/tetogomez">
      <img src="https://avatars3.githubusercontent.com/u/10634375?s=460&v=4" width="100px;" alt="Teto Gomez"/><br /><sub><b>Teto Gomez</b></sub></a><br /><a href="https://github.com/eoscostarica/eosrate/commits?author=tetogomez" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/eoscostarica/eosrate/commits?author=tetogomez" title="Code">💻</a> <a href="#review-tetogomez" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://github.com/adriexnet">
      <img src="https://avatars3.githubusercontent.com/u/5375168?s=460&u=542a27a00b761d98851991c6a6d5f78d7b35a2b2&v=4" width="100px;" alt="Adriel Diaz"/><br /><sub><b>Adriel Diaz</b></sub></a><br /><a href="https://github.com/eoscostarica/eosrate/commits?author=adriexnet" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/eoscostarica/eosrate/commits?author=adriexnet" title="Code">💻</a> <a href="#review-adriexnet" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->


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
