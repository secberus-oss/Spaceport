# SpaceportJS

Componentized, Centralized, and grouped worker threads for NodeJS, the Browser, and any Worker supporting machines.

## Description

[https://en.wikipedia.org/wiki/Thread_pool#:~:text=In%20computer%20programming%2C%20a%20thread,execution%20by%20the%20supervising%20program.](Definition of thread pooling)

Spaceport takes the difficulties of developing and designating workers into a simple framework. Creating

## Getting Started

### Dependencies

* NodeJS (Preferably the lastest)

### Installing

To get spaceport into your project, execute the following:

`npm install [placeholder_for_resolution]` 


### Basic CargoBay

```
import spaceport, {cargoBay} from 'spaceportjs'

const MyCargoBay = new cargoBay({
 // TOO: Add config 
})

// Later

// Post messages to all workers

MyCargoBay.ship();

// Run specifics

MyCargoBay.ship({
  // TODO: Add config
})
```
### Asynchronous code [default]
> Todo: update this section with real content
* If you wish to await workers, you can await the response. This comes with additional configuration options, such as
`promiseTimeout`

```
const MyCargoBay = new cargoBay({
  promisify: true,
  promiseTimeout: 5000, // Will resolve all promises after this amount of time with true if they have not resolved.
})

// With async/await
const MyData = await cargoBay.ship();

// Or, alternatively

const MyData = cargoBay.ship().then(res => {
  // Do something
})
```
### Use with Aggregators

* Aggregators are used in situations where the requests or jobs can apply themselves without an await, promise, or other code.
* In most cases, aggregators are great for filtering, lazyloading, and other 
```
const MyCargoBay = new cargoBay({
 useAggregator: true
})

// Later
MyCargoBay.ship();

// Later
const currentData = MyCargoBay.aggregatedData(); // Will get an instance of the current aggregatedData


// Use with React
const currentData = React.useMemo(() =>  MyCargoBay.aggregatedData()}, [MyCargoBay])
```

## Contributing
> Todo: Add contributing documentation

### Prerequisites
* git
* Node

1. Fork and clone this repository
2. Make sure all tests pass with `npm run test`
3. Make changes
4. Create a pull request with accurate labels, issue numbers, and information for the reviewer.


## Authors

* [Sigkar](https://github.com/sigkar)
* [colemars](https://github.com/colemars)
* [reeannvirginia](https://github.com/reeannvirginia)

## Version History


## License

This project is licensed under the MIT License - see the LICENSE file for details
