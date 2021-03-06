/**
 * Constructor.
 *
 * @constructor
 * **/
var ImageModel = function () {
    this.height = 0;
    this.width = 0;
    this.name = '';
    this.path = '';
};

/* ----- Getter ----- */

/**
 * Returns the image height.
 *
 * @return {Number} Returns the height.
 * **/
ImageModel.prototype.getHeight = function () {
    return this.height;
};

/**
 * Returns the image width.
 *
 * @return {Number} Returns the image width.
 * **/
ImageModel.prototype.getWidth = function () {
    return this.width;
};

/**
 * Returns the image name together with its suffix.
 *
 * @return {String} Returns the image name together with its suffix.
 * **/
ImageModel.prototype.getName = function () {
    return this.name;
};

/**
 * Returns the image path including the image name and its suffix.
 *
 * @return {String} Returns the image path including the image name and its suffix.
 * **/
ImageModel.prototype.getPath = function () {
    return this.path;
};

/* ----- Setter ----- */

/**
 * Sets the image height.
 *
 * @param {Number} height Sets the image height.
 * **/
ImageModel.prototype.setHeight = function (height) {
    this.height = height;
};

/**
 * Sets the image width.
 *
 * @param {Number} width Sets the image width.
 * **/
ImageModel.prototype.setWidth = function (width) {
    this.width = width;
};

/**
 * Sets the image name including its type suffix.
 *
 * @param {String} name Sets the image name.
 * **/
ImageModel.prototype.setName = function (name) {
    this.name = name;
};

/**
 * Sets the image path.
 *
 * @param {String} path Sets the image path.
 * **/
ImageModel.prototype.setPath = function (path) {
    this.path = path;
};

/* ----- Others ----- */

/**
 * Loads the given data with an image structure into this image.
 *
 * @param {Object} data The object containing the image data. Must have the structure of this image object.
 * **/
ImageModel.prototype.load = function (data) {
    this.setPath(data.path);
    this.setName(data.name);
    this.setHeight(data.height);
    this.setWidth(data.width);
};

module.exports = ImageModel;