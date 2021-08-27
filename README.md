# Project Metra 

## Requirements
* Node JS > 14.4.0
* NPM > 6.14.5
* Docker > 19.03.8

## Install
### Node/NPM
* $ git clone https://github.com/WasatchFlatlander/metra.git
* $ cd metra
* $ npm i
### Docker Compose
* $ docker-compose up

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
query Query {
	getSchedule(name: "bnsf")
}
```
####  (3) getSchedules
```
query Query {
	getSchedules {
        name,
        times
    }
}
```
####  (4) getNextBusyTime(time: number)
```
query Query {
	getNextBusyTime(time:  5)
}
```