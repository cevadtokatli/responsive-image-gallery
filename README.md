# Responsive Image Gallery
Responsive image gallery that supports category system for web and mobile browsers.
For more information you can take a look at the demo: [Demo](https://cevadtokatli.github.io/responsive-image-gallery/)

## NPM
``` 
npm install --save-dev responsive-image-gallery
```

## Installation
You can simply import Responsive Image Gallery and create a new object.
```
import Gallery from 'responsive-image-gallery';

const gallery = new Gallery({
    el: '#gallery'
});
```

You can also add the script file into your html.
```
<script src="/node_modules/responsive-image-gallery/dist/responsive-image-gallery.min.js"></script>
<script>
var gallery = new ResponsiveImageGallery({
    el: '#gallery'
});
</script>
```

```
<div>
    <ul id="bar">
        <li category="*">ALL</li>
        <li category="abstract">Abstract</li>
        <li category="space">Space</li>
    </ul>
    <div id="gallery”>
        <img src="abstract01.jpg" category="abstract" />
        <img src="space01.jpg" category="space" />
        <img src="abstract02.jpg" category="abstract" />
        <img src="space02.jpg" category="space" />
        <img src="abstract03.jpg" category="abstract" />
        <img src="space03.jpg" category="space" />
    </div>
</div>

<script src="/node_modules/responsive-image-gallery/dist/responsive-image-gallery.min.js"></script>
<script>
var gallery = new Gallery({
    el: '#gallery',
    bar: '#bar'
});
</script>
```

## Configuration
### Options
Option | Type | Default | Description
------ | ---- | ------- | -----------
el | string \| HTMLElement* | null | Container element.
bar | string \| HTMLElement* | null | Bar element.
active | string | “*” | Specifies the initial active category.
timing | string | “ease” | Specifies the speed curve of an animation. Takes all the values CSS3 can take. *(like ease, linear, cubic-bezier, step)*
duration | number | 500 | Defines how long an animation should take to complete one cycle. *(as milliseconds)*
minWidth | number | 250 | Specifies the minimum width of a gallery element.
maxWidth | number |500 | Specifies the maximum width of a gallery element.
height | number | 80 | Sets the height according to the width. *(as percent)*
horizontalSpace | number | 10 | Specifies the horizontal space between gallery elements.
verticalSpace | number | 10 | Specifies the vertical space between gallery elements.
overflow | boolean | false | Allows elements to overflow if the container element's width is smaller than `minWidth`.
grid | boolean | true | Enables grid view.

<span style="font-size:.9rem;">*: You can give an HTML element or a CSS selector (like `#gallery`, `.container > div:first-child`)</span>

### Methods
Method | Params | Return | Description
------ | ------ | ------ | -----------
get | | string | Returns the active category.
set  | category: string, animate: boolean | void | Sets the active category.
getTiming | | string | Returns timing value.
setTiming | timing:string | void | Sets timing value.
getDuration | | number | Returns duration.
setDuration | duration:number | void | Sets duration.
destroy | | void | Destroys the gallery.

## IE Support
IE 10 is not supported and patches to fix problems will not be accepted.

## License
Responsive Image Gallery is provided under the [MIT License](https://opensource.org/licenses/MIT).

## Related Projects
* [Responsive Image Gallerty React](https://github.com/cevadtokatli/responsive-image-gallery-react)