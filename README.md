# myResizerLibrary

## Features

myResizerLibrary enables change width and height of a custom HTML containers

## Installation

```html
<script type="text/javascript" src="resizer.js"></script>
```

## How to use
1) create HTML container with specific id

```html
<div id="myDiv"></div>
```
2) call method `createResizer()` and set the id as its argument
```js
(function () {
  myResizerLibrary.createResizer("myDiv");
})();
```
