var uuid = require('uuid/v4');
var ImageModel = require('./ImageModel');
var MarkedArea = require('./MarkedArea');

/**
 * Constructor. Adds empty ImageModel objects as its reference, new and diff images.
 *
 * @constructor
 * **/
var ImageSetModel = function () {
    this.difference = 0;
    this.distance = 0;
    this.error = '';
    this.isThresholdBreached = false;
    this.id = uuid();
    this.referenceImage = new ImageModel();
    this.newImage = new ImageModel();
    this.diffImage = new ImageModel();
    this.ignoreAreas = [];
	this.checkAreas = [];
};

/* ----- Getter ----- */

/**
 * Returns the percentual pixel difference of the reference and new image.
 *
 * @return {Number} Returns the percentual pixel difference of the reference and new image.
 * **/
ImageSetModel.prototype.getDifference = function () {
    return this.difference;
};

/**
 * Returns the distance of the reference and new image.
 *
 * @return Returns the distance difference of the reference and new image.
 * **/
ImageSetModel.prototype.getDistance = function () {
    return this.distance;
};

/**
 * Returns the error text.
 *
 * @return {String} Returns the error text.
 * **/
ImageSetModel.prototype.getError = function () {
    return this.error;
};

/**
 * Returns the id.
 *
 * @return {String} Returns the id.
 * **/
ImageSetModel.prototype.getId = function () {
    return this.id;
};

/**
 * Returns the reference image.
 *
 * @return {ImageModel} Returns the reference image.
 * **/
ImageSetModel.prototype.getReferenceImage = function () {
    return this.referenceImage;
};

/**
 * Returns the new image.
 *
 * @return {ImageModel} Returns the new image.
 * **/
ImageSetModel.prototype.getNewImage = function () {
    return this.newImage;
};

/**
 * Returns the diff image.
 *
 * @return {ImageModel} Returns the diff image.
 * **/
ImageSetModel.prototype.getDiffImage = function () {
    return this.diffImage;
};

/**
 * Returns the ignore areas.
 *
 * @return {MarkedArea[]} The ignore areas.
 * **/
ImageSetModel.prototype.getIgnoreAreas = function () {
    return this.ignoreAreas;
};

/**
 * Returns the check areas.
 *
 * @return {MarkedArea[]} The check areas.
 * **/
ImageSetModel.prototype.getCheckAreas = function () {
	return this.checkAreas;
};

/**
 * Returns the threshold breached status.
 *
 * @return {Boolean} The threshold breached state.
 * **/
ImageSetModel.prototype.getThresholdBreachedState = function () {
    return this.isThresholdBreached;
};


/* ----- Setter ----- */

/**
 * Sets the id.
 *
 * @param {String} id Sets the id. must be unique to avoid  side effects.
 * **/
ImageSetModel.prototype.setId = function (id) {
    this.id = id;
};

/**
 * Sets the percentual pixel difference between the reference and new image.
 *
 * @param {Number} difference The difference between the reference and new image.
 * **/
ImageSetModel.prototype.setDifference = function (difference) {
    this.difference = difference;
};

/**
 * Sets the distance between the reference and new image.
 *
 * @param {Number} distance The distance between the reference and new image.
 * **/
ImageSetModel.prototype.setDistance = function (distance) {
    this.distance = distance;
};

/**
 * Sets the error reason.
 *
 * @param {String} error The error reason.
 * **/
ImageSetModel.prototype.setError = function (error) {
    this.error = error;
};

/**
 * Sets the reference image.
 *
 * @param {ImageModel} image The reference image.
 * **/
ImageSetModel.prototype.setReferenceImage = function (image) {
    this.referenceImage = image;
};

/**
 * Sets the new image.
 *
 * @param {ImageModel} image The new image.
 * **/
ImageSetModel.prototype.setNewImage = function (image) {
    this.newImage = image;
};

/**
 * Sets the diff image.
 *
 * @param {ImageModel} image The diff image.
 * **/
ImageSetModel.prototype.setDiffImage = function (image) {
    this.diffImage = image;
};

/**
 * Sets the ignore areas.
 *
 * @param {MarkedArea[]} ignoreAreas The ignore areas to be set.
 * **/
ImageSetModel.prototype.setIgnoreAreas = function (ignoreAreas) {
  this.ignoreAreas = ignoreAreas;
};

/**
 * Sets the check areas.
 *
 * @param {MarkedArea[]} checkAreas The ignore areas to be set.
 * **/
ImageSetModel.prototype.setCheckAreas = function (checkAreas) {
	this.checkAreas = checkAreas;
};

/**
 * Sets the threshold breached state.
 *
 * @param {Boolean} isThresholdBreached Sets the threshold breached state.
 * **/
ImageSetModel.prototype.setThresholdBreachedState = function (isThresholdBreached) {
    this.isThresholdBreached = isThresholdBreached;
};

/* ----- Other ----- */

/**
 * Loads the given data with an image set structure into this image set.
 *
 * @param {Object} data The object containing the image set data. Must have the structure of this image set object.
 * **/
ImageSetModel.prototype.load = function (data) {
    var that = this;

    this.setDistance(data.distance);
    this.setDifference(data.difference);
    this.setError(data.error);
    this.id = data.id;
    this.isThresholdBreached = data.isThresholdBreached;

    this.getReferenceImage().load(data.referenceImage);
    this.getNewImage().load(data.newImage);
    this.getDiffImage().load(data.diffImage);

    this.setIgnoreAreas(this.__loadMarkedAreas(data.ignoreAreas));
	this.setCheckAreas(this.__loadMarkedAreas(data.checkAreas));
};

/**
 * Loads marked areas from the general object into MarkedArea objects.
 *
 * @param markedAreas The markedAreas which should be loaded into proper MarkedArea objects.
 * @return {Array} The result array with the MarkedArea objects. Empty if there was nothing to load.
 * @private
 */
ImageSetModel.prototype.__loadMarkedAreas = function(markedAreas) {
    var newMarkedAreas = [];

    if (markedAreas) {
		markedAreas.forEach(function (markedAreaData) {
			var newMarkedArea = new MarkedArea();

			newMarkedArea.load(markedAreaData);
			newMarkedAreas.push(newMarkedArea);
		});
    }

    return newMarkedAreas;
};

module.exports = ImageSetModel;