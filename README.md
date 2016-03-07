I love working on long train/plane trips.

However, they have lots of Internet connectivity interruptions, if any Internet connectivity at all.

Fortunately, all the stuff I work on in [CartoDB](https://github.com/cartodb) is run locally, so lack of a connection isn't really a problem.

Except for basemaps. And I **really** need those basemaps to have an idea of where I am.

*Help Me I'm Lost (HIL)* is a sort of map server that generates super-barebones png tiles so that I can work offline with basemaps.

**Installation**

HIL needs cairo to work

```
brew install cairo
```

After that, just `npm install` and...

```
node index
```