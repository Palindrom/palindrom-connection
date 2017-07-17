# &lt;palindrom-connection&gt; [![Build Status](https://travis-ci.org/Palindrom/palindrom-connection.svg?branch=gh-pages)](https://travis-ci.org/Palindrom/palindrom-connection)
---
> Custom Element that encapsulates [Palindrom](https://github.com/Palindrom/Palindrom), and channels its callback calls into DOM events.

```html
  <palindrom-connection remote-url="http://you.palindrom.url"></palindrom-connection>
```

## Frameworks

For the mean time, you can use it seamlessly with Polymer 1.x using [`palindrom-polymer`](https://github.com/Palindrom/palindrom-polymer). In the near future there will be middlewares for React and Vue.

## Demo

- [Check it live!](http://Palindrom.github.io/palindrom-connection/demo)
- [test suite](http://Palindrom.github.io/palindrom-connection/test)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install palindrom-connection --save
```

Or [download as ZIP](https://github.com/Palindrom/palindrom-connection/archive/master.zip).

## Usage

1. Import Web Components' polyfill, if needed:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/palindrom-connection/palindrom-connection.html">
    ```

3. Start using it!

    ```html
    <palindrom-connection remote-url="http://you.palindrom.url"></palindrom-connection>
    ```
    It establishes the Palindrom connection when attached. All the changes made
    in browser are sent to the server via WebSocket or HTTP, as
    [JSON Patch](https://tools.ietf.org/html/rfc6902)es.
    All the changes from server are also received and propagated to your HTML using DOM events.

## Attributes & Properties


Attribute                       | Options   | Default | Description
---                             | ---       | ---     | ---
debug | `Boolean` | `false` | Set to `true` to enable debugging mode
listen-to | `String` | `document.body` | DOM node to listen to (see PalindromDOM listenTo attribute)
local-version-path | `JSONPointer` | `/_ver#c$` | local version path, set to falsy do disable Versioned JSON Patch communication
obj | `Proxy` | `{}` | **notifies** Object that will be synced
ot | `Boolean` | `true` | `false` to disable OT
ping-interval-s | `Number` | `5` | Interval in seconds between heartbeat patches, `0` - disable heartbeat
purity | `Boolean` | `false` | `true` to enable purist mode of OT
remote-url | `String` | `window.location` | The remote's URL
remote-version-path | `JSONPointer` | `/_ver#s` | remote version path, set it to falsy to disable Double Versioned JSON Patch communication
use-websocket | `Boolean` | `true` | Set to false to disable WebSocket (use HTTP)

## Events

Name                       | Description
---                             | ---     
patch-applied | Fired when patch gets applied
patch-received | Fired when patch gets received
patch-sent | Fired when patch gets send
socket-state-changed | Fired when web socket state changes
reconnection-countdown | Fired when reconnecting. has `milliseconds` property in details, denoting number of milliseconds to scheduled reconnection
reconnection-end | Fired after successful reconnection

## Reconnection and heartbeats

See [Palindrom docs](https://github.com/Palindrom/Palindrom#heartbeat-and-reconnection).
`pingIntervalS` is directly forwarded to Palindrom, `reconnection-countdown` and `reconnection-end` events are directly based on respective callbacks.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Development and Testing

In order to develop it locally we suggest to use [polyserve](https://npmjs.com/polyserve) tool to handle bower paths gently.

1. Install the global NPM modules [bower](http://bower.io/) & [polyserve](https://npmjs.com/polyserve): `npm install -g bower polyserve`
2. Make a local clone of this repo: `git clone git@github.com:Palindrom/palindrom-connection.git`
3. Go to the directory: `cd palindrom-connection`
4. Install the local dependencies: `bower install`
5. Start the development server: `polyserve -p 8000`
6. Open the demo: [http://localhost:8000/components/palindrom-connection/](http://localhost:8000/components/palindrom-connection/)
7. Open the test suite: [http://localhost:8000/components/palindrom-connection/test/](http://localhost:8000/components/palindrom-connection/test/)

## History

For detailed changelog, check [Releases](https://github.com/Palindrom/palindrom-connection/releases).

## License

MIT
