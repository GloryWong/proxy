#!/usr/bin/env node

const args = process.argv.slice(2);

const [title, ...envNames] = args;
console.log(title, ...envNames.map((v) => process.env[v]).filter((v) => !!v));
