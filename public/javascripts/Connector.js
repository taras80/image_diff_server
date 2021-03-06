/**
 * The prototype offers functionality to send requests to the server.
 * **/
var Connector = function () {
};

/* -----  Specialised Request Methods ----- */

/**
 * Gets the currently active job.
 *
 * @param {Function} callback Called when the request is done.
 * **/
Connector.prototype.getActiveJob = function (callback) {
    this.sendRequest('/', 'GET', null, callback);
};

/**
 * Deletes an image set.
 *
 * @param {String} id The id of the image set to be deleted.
 * @param {Function} callback Called when the request is done.
 * **/
Connector.prototype.delete = function (id, callback) {
    this.sendRequest('/' + id, 'DELETE', null, callback);
};

/**
 * Calculates the diff images for all images. Does not wait until the computation is done.
 *
 * @param {Function} callback Called when the request is done.
 * **/
Connector.prototype.refreshAll = function (callback) {
    this.sendRequest('/checkAll', 'POST', null, callback);
};

/**
 * Makes a new image to a reference image.
 *
 * @param {String} id The id of the image set for which the new image should be made the reference image.
 * @param {Function} callback Called when the request is done.
 * **/
Connector.prototype.makeToNewReferenceImage = function (id, callback) {
    this.sendRequest('/' + id + '/makeToNewReferenceImage', 'PUT', null, callback);
};

/**
 * Returns the image set with the given id.
 *
 * @param {String} id The id of the image set which should be retrieved.
 * @param {Function} callback Called when the request is done. Has the image set as parameter.
 * **/
Connector.prototype.getImageSet = function (id, callback) {
    this.sendRequest('/' + id + '/getImageSet', 'GET', null, callback);
};

/**
 * Modifies the ignore areas of an image set.
 *
 * @param {String} id The id for which the ignore areas should be modified.
 * @param {Object[]} ignoreAreas An array of ignore areas.
 * @param {Function} callback Called when the request is done.
 * **/
Connector.prototype.modifyIgnoreAreas = function (id, ignoreAreas, callback) {
    console.log('Ignore areas:', ignoreAreas);
    this.sendRequest('/' + id + '/modifyIgnoreAreas', 'PUT', { ignoreAreas: ignoreAreas }, callback);
};

/**
 * Modifies the check areas of an image set.
 *
 * @param {String} id The id for which the check areas should be modified.
 * @param {Object[]} checkAreas An array of check areas.
 * @param {Function} callback Called when the request is done.
 * **/
Connector.prototype.modifyCheckAreas = function (id, checkAreas, callback) {
	console.log('Check areas:', checkAreas);
	this.sendRequest('/' + id + '/modifyCheckAreas', 'PUT', { checkAreas: checkAreas }, callback);
};

/**
 * Add/create a project.
 *
 * @param {String} name Name of the new project.
 * @param {Function} callback Called when the request is done.
 */
Connector.prototype.addProject = function (name, callback) {
    this.sendRequest('/addProject', 'POST', { name: name }, callback);
};

/**
 * Edit an existing project.
 *
 * @param {String} newName The new name of the project.
 * @param {String} id Project which should be modified.
 * @param {Function} callback callback Called when the request is done.
 */
Connector.prototype.editProject = function (newName, id, callback) {
    this.sendRequest('/' + id + '/editProject', 'PUT', { name: newName }, callback);
};

/**
 * Deletes a project.
 *
 * @param {String} id Id of the project to be deleted.
 * @param {Function} callback  callback Called when the request is done.
 */
Connector.prototype.removeProject = function (id, callback) {
    this.sendRequest('/' + id + '/removeProject', 'DELETE', null, callback);
};

/**
 * Assign an image set to another project.
 *
 * @param {String} imageSetId The id of the image set which should be assigned to another project.
 * @param {String} projectIdFrom Id of the current project.
 * @param {String} projectIdTo Id of the project it should be assigned to.
 * @param {Function} callback callback Called when the request is done.
 */
Connector.prototype.assignImageSetToProject = function (imageSetId, projectIdFrom, projectIdTo, callback) {
    this.sendRequest('/' + imageSetId + '/assignImageSetToProject', 'PUT', { projectIdFrom : projectIdFrom, projectIdTo: projectIdTo }, callback);
};

/* ----- General Methods ----- */

/**
 * Sends an ajax request.
 *
 * @param {String} url The url to which the request will be send.
 * @param {String} method The request method. 'POST', 'GET', ...
 * @param {Object} data The data which should be send in the body.
 * @param {Function} callback Called when the request is done. Has the data as parameter if the call was a success, else the message.
 * **/
Connector.prototype.sendRequest = function (url, method, data, callback) {
    var serverEndpoint = this.getServerEndpoint() + 'api' + url;
	data = data ? data : {};
    console.log('Attempting a request to ' + url + ' with method ' + method + ' and data ' + data);

    $.ajax({
        method: method,
        url: serverEndpoint,
        data: JSON.stringify(data),
       contentType:"application/json; charset=utf-8",
       dataType:"json"
    })
    .done(function (data) {
        console.log('Request was successful: ', url, method, data);

        if (callback) {
            if (typeof data.data === 'undefined' || data.data === null) {
                callback(data.message);
            }else if (typeof data.data === 'object') {
                callback(data.data);
            } else {
                callback(JSON.parse(data.data));
            }
        }
    })
    .fail(function (data) {
        console.log('Request failure: ', url, method, data);
        callback(data.message);
    });
};

/**
 * Returns the server endpoint/host to which the requests will be send. The value will be retrieved from the local storage.
 *
 * @return {String} Returns the server endpoint/host to which the requests will be send.
 * **/
Connector.prototype.getServerEndpoint = function () {
    if(!localStorage.imageDiffServerEndpoint){
        localStorage.imageDiffServerEndpoint = location.href
    }

    return localStorage.imageDiffServerEndpoint;
};

/**
 * Sets the server endpoint/host to which the requests will be send. The value will be saved in the local storage.
 *
 * @param {String} endpoint The endpoint/host to be saved.
 * **/
Connector.prototype.setServerEndpoint = function (endpoint) {
    localStorage.imageDiffServerEndpoint = endpoint;
};