# Project Metra 

## Requirements
* Node JS > 14.4.0
* NPM > 6.14.5

## Install
* $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
* $ cd metra
* $ npm ci

## Running the project

* Development  - npm run dev
* Production - npm run build && npm run start

## Querying Data
* Load - http://localhost:4000
* Click - Query Your Data (This opens up the graphql sandbox).
* Using the Sandbox - https://www.apollographql.com/docs/studio/explorer/

### Sample GraphQL Queries
####  (1) setSchedule(name: string, times: number[])
```
mutation Mutation {
	setSchedule(name: "bnsf", times: [10,20,30]) {
		name,
		times
	}
}
```
####  (2) getSchedule(name: string)
```
mutation Query {
	getSchedule(name: "bnsf") {
		name,
		times
	}
}
```
####  (3) getNextBusyTime(time: number)
```
mutation Query {
	getNextBusyTime(time:  5)
}
```