/**
 * Creates the select area for images prototype.
 * @param {Object} $targetDiv The jQuery object under which the ignore area select stuff will be added.
 * @constructor
 * **/
var CompareImages = function ($targetDiv) {
    this.$container = $targetDiv;
    this.__init();
    this.bindEvents();
};

/**
 * Displays the ignore area modification window.
 *
 * @param {String} imagePath The image path to the image which should be displayed in the ignore image window.
 * @param {ImageSet} imageSet The image which contains the image information.

  * **/
 CompareImages.prototype.show = function (referenceImagePath, newImagePath) {
    this.__createMarkup(referenceImagePath, newImagePath);
};

/**
 * Binds the event handler to the ui elements.
 * **/
CompareImages.prototype.bindEvents = function () {
    var that = this;

    //  Cancel window
    this.$container.on('click', 'button[data-action=modifyMarkedAreasRegionCancel]', function () {
        that.$container.hide();
        that.$container.html('');
    });
};

/**
 * Init stuff.
 * **/
CompareImages.prototype.__init = function () {
    this.$container.hide();
};

/**
 * Creates the markup for the modify ignore area window and displays it.
 *
 * @param {String} referenceImagePath The image path to the image which should be displayed in the ignore image window.
 * @param {String} newImagePath The image which contains the image information.
 * **/
CompareImages.prototype.__createMarkup = function (referenceImagePath, newImagePath) {
    var content =
        '<div class="modifyMarkedAreasRegion">'
        + '<div class="modifyMarkedAreasRegionImageArea"  id="modifyMarkedAreasRegionImageArea">'
        + '<div class="modifyMarkedAreasRegionImageAreaInner">'
        + '</div>'
        + '</div>'
        + '<script>'
        + 'new juxtapose.JXSlider("#modifyMarkedAreasRegionImageArea",'
        + '[{src: "' + referenceImagePath + '"},'
        + '{src: "' + newImagePath + '"}],'
        + '{animate: true,'
        + 'startingPosition: "50%", makeResponsive: true});'
        + '</script>'
        + '<div class="modifyMarkedAreasRegionButtonBar">'
        + '<button data-action="modifyMarkedAreasRegionCancel">Close</button>'
        + '</div>'
        + '</div>';

    this.$container.html($(content));
    this.$container.show();
};