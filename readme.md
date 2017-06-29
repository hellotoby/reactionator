# Reactionator

![](https://media.giphy.com/media/HY2tEPTzqHYwE/giphy-downsized.gif)

Retrieves a Facebook post's reactions for you.

## Installation

`npm install reactionator -g`

or

`yarn global add reactionator`

## Requirements

Reactionator has a few requirements in order to work properly.

- A Facebook App ID and Secret (you can get one here: [https://developers.facebook.com](https://developers.facebook.com))
- The page or user ID of the post owner (you can find it here: [https://findmyfbid.com/](https://findmyfbid.com/)).
- The post ID which you would like reactions for

## Options

```
-h, --help                    output usage information
-V, --version                 output the version number
-a --app, [app]               Facebook app ID
-s --secret [secret]          Facebook app secret
-p --page [page]              Facebook page ID
-i, --id [id]                 Facebook post ID
-t, --timeout [milliseconds]  The number of milliseconds to watch the url.
-l, --limit [limit]           The total number of reactions to return, defaults to 1000
```

## Output

Reactionator will output an object which looks like this:

```javascript
{ NONE: 0,
  LIKE: 8,
  LOVE: 2,
  WOW: 0,
  HAHA: 0,
  SAD: 1,
  ANGRY: 1,
  THANKFUL: 0,
  PRIDE: 0 }
```
