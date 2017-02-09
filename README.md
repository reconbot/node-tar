# node-tar-esnext

Tar for Node.js. Fork from [npm/tar](https://github.com/npm/node-tar) that cleans up a few things for use in strict mode and es modules. The goal of this project is to disappear eventually.

[![NPM](https://nodei.co/npm/tar-esnext.png)](https://nodei.co/npm/tar-esnext/)

## API

See `examples/` for usage examples.

### var tar = require('tar-esnext')

Returns an object with `.Pack`, `.Extract` and `.Parse` methods.

### tar.Pack([properties])

Returns a through stream. Use
[fstream](https://npmjs.org/package/fstream) to write files into the
pack stream and you will receive tar archive data from the pack
stream.

This only works with directories, it does not work with individual files.

The optional `properties` object are used to set properties in the tar
'Global Extended Header'. If the `fromBase` property is set to true,
the tar will contain files relative to the path passed, and not with
the path included.

### tar.Extract([options])

Returns a through stream. Write tar data to the stream and the files
in the tarball will be extracted onto the filesystem.

`options` can be:

```js
{
  path: '/path/to/extract/tar/into',
  strip: 0, // how many path segments to strip from the root when extracting
}
```

`options` also get passed to the `fstream.Writer` instance that `tar`
uses internally.

### tar.Parse()

Returns a writable stream. Write tar data to it and it will emit
`entry` events for each entry parsed from the tarball. This is used by
`tar.Extract`.
