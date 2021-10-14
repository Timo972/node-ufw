# node-ufw
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f9a7a766864543c9bf60a28364d35880)](https://www.codacy.com/gh/Timo972/node-ufw/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Timo972/node-ufw&amp;utm_campaign=Badge_Grade)
[![Node.js Package](https://github.com/Timo972/node-ufw/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Timo972/node-ufw/actions/workflows/npm-publish.yml)   
Inspired by https://www.npmjs.com/package/ufw

## Requirements
- ufw
  - python3

## Installation
As easy as it could be:
```bash
npm i --save @timo972/ufw
```

## Usage
This is just the basic usage. For more information take a look at the [Typescript types](types/index.d.ts) and/or checkout [ufw](https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands) / [pyufw](https://github.com/5tingray/pyufw) documentation
```js
import { allow, deleteRule, Rule, Protocol, getRules } from '@timo972/ufw'

const myRule = new Rule()
// all setter methods are chainable ex: myRule.port(7788).from('ip') ...
// when you do not set proto explicitly it will be interpreted as Protocol.ANY
myRule.proto(Protocol.TCP) // Protocol.UDP or Protocol.ANY possible too
// optional set from where to allow connection
myRule.from('192.168.178.1') // pass ipv4 or ipv6
// optional set to where allow connection
myRule.to('192.168.178.1')
// set port
myRule.port(7788)

async function applyRule() {
  await allow(myRule)
}

applyRule()

async function getRulesAndDelete() {
  // get active rules
  const rules = await getRules()
  // rules contains an object of the format {id (number): rule (string)}

  // get id of first rule
  const id = Object.keys(rules)[0]

  await deleteRule(id)
}
```

[npm-image]: https://img.shields.io/npm/v/@timo972/ufw.svg
[npm-url]: https://npmjs.org/package/@timo972/ufw
[node-version-image]: http://img.shields.io/node/v/@timo972/ufw.svg
[node-version-url]: http://nodejs.org/download/
[downloads-image]: https://img.shields.io/npm/dm/@timo972/ufw.svg
[downloads-url]: https://npmjs.org/package/@timo972/ufw
