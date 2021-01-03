import types from '../../providers/type';

// handle draw based on the element type & details
// return the element to replace, there could be any updates to the element
const drawHandler = (context, element) => {
    switch (element.type) {
        case types.IMAGE:
            return imageHandler(context, element);
        case types.HIGHLIGHT:
            return highlightHandler(context, element);
        default:
            return element;
    }
};

const imageHandler = (context, img) => {
    if (img.imgCache) {
        context.drawImage(img.imgCache, img.x, img.y, img.w, img.h);
        return img;
    } 
    const base_image = new Image();
    base_image.src = img.src;
    base_image.crossOrigin = "anonymous";
    base_image.onload = function(){
      img.imgCache = base_image;
      // set height & width if not already set
      let nh = base_image.naturalHeight;
      let nw = base_image.naturalWidth;
      img.w = img.w === -1 ? nw : img.w;
      img.h = img.h === -1 ? nh : img.h;
      context.drawImage(base_image, img.x, img.y, img.w, img.h);
    }
    return img;
}

const highlightHandler = (context, elem) => {
    context.strokeRect(elem.x, elem.y, elem.w, elem.h);
}

export default drawHandler;