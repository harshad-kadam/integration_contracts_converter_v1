//main converter function
function transformJson(response, excludeKeys, keyConversionMap) {
    var isArray = Array.isArray(response);

    if (isArray || typeof response === 'object') {
        var transformedObject = isArray ? [] : {};
        for (var key in response) {
            if (response.hasOwnProperty(key) && excludeKeys.indexOf(key) === -1) {
                
                if (typeof response[key] === "string" && key.toLowerCase().includes("status")) {
                    response[key] = mapStatusToReason(response[key]) || "UNKNOWN_STATUS";
                }
                if (typeof response[key] === "string" && key.toLowerCase().includes("country")) {
                    response[key] = fetchCountryName(response[key]) || "";
                }

                var newKey = keyConversionMap[key.toLowerCase()] || convertToSnakeCase(key);

                var transformedValue = transformJson(
                    response[key],
                    excludeKeys,
                    keyConversionMap
                );
                var newObj = {};
                newObj[newKey] =
                        typeof transformedValue === 'object'
                            ? transformedValue
                            : transformedValue;
                    transformedObject[newKey] = newObj[newKey];
            }
        }
        return transformedObject;
    } else {
        return response;
    }
}

//case converter function
function convertToSnakeCase(str) {
    return str.replace(/[A-Z][a-z]+/g, function(match, offset) {
        return offset === 0 ? match.toLowerCase() : '_' + match.toLowerCase();
    });
}

//kvm logic based on pathsuffix || else throw not implemented error if pathsuffix not configured in kvm
function getTransType(transType) {
    // Default to "/ping" if not found
    return transTypesMap[transType] || "/ping"; 
}
    
function snakeToCamel(obj) {
    if (obj instanceof Array) {
        return obj.map(item => snakeToCamel(item));
    } else if (obj !== null && typeof obj === 'object') {
        var newObj = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var conNewKey = keyConversionMap[key.toLowerCase()];//might need to remove lowercase
                if(conNewKey){
                    newObj[conNewKey] = snakeToCamel(obj[key]);
                    conNewKey=undefined;//might require to delete old key
                }else{
                    var newKey = key.replace(/_([a-z])/g, (_, match) => match.toUpperCase());
                    newObj[newKey] = snakeToCamel(obj[key]);
                }
            }
        }
        return newObj;
    } else {
        return obj;
    }
}

//-----------------common prefix grouping generixc algo---------------------------
//common prefix alorithm nLOGn TC
function longestCommonPrefix(arrayOfParity) {
    var keys = arrayOfParity;

    if (keys.length === 0) {
        return ''; // No keys, return an empty string
    }

    // Sort keys to bring similar ones together
    keys.sort();

    var firstKey = keys[0];
    var lastKey = keys[keys.length - 1];
    var minLength = Math.min(firstKey.length, lastKey.length);

    var commonPrefix = '';

    for (var i = 0; i < minLength; i++) {
        if (firstKey.charAt(i) === lastKey.charAt(i)) {
            commonPrefix += firstKey.charAt(i);
        } else {
            break; // Stop when a difference is encountered
        }
    }

    // Ensure the minimum prefix length is 3 characters
    return commonPrefix.length >= 3 ? commonPrefix : '';
}

//function to find common prefix to create new object group
function groupByCommonPrefix(keys) {
    var grouped = {};

    keys.forEach((key) => {
        var prefix = key.substring(0, 3); // Adjust the prefix length as needed
        grouped[prefix] = grouped[prefix] || [];
        grouped[prefix].push(key);
    });

    return grouped;
}

//function to find common prefix to create new object group
function groupDetector(obj) {
    var keys = Object.keys(obj);

    if (keys.length === 0) {
        return ''; // No keys, return an empty string
    }

    var parityMap = groupByCommonPrefix(keys);
    var processedObj = {};
    for (var groupKey in parityMap) {

        if (parityMap.hasOwnProperty(groupKey)) {
            var arrayOfParity = parityMap[groupKey];
            //var processedObj=output;
            var newKey="";
            if(arrayOfParity.length === 1){
                newKey=arrayOfParity[0];
            }else{
                newKey=longestCommonPrefix(arrayOfParity);
            }
            
            if(newKey!=="")
            if (obj.hasOwnProperty(newKey)) {
                if (typeof obj[newKey] === 'object') {
                    processedObj[newKey] = obj[newKey];
                } else {
                    processedObj[newKey] = obj[newKey];
                }
            }else{
                var newArrOfParity=[]; var flagIncosistency=false;
                for(i=0; i<arrayOfParity.length; i++){
                    newArrOfParity[i]=arrayOfParity[i].substring(newKey.length);
                    if(newArrOfParity[i].length<=2){
                        flagIncosistency=true;
                    }
                }
                
                if(!flagIncosistency){
                    processedObj[newKey] = processedObj[newKey] || {};
                    var currentSubObj = processedObj[newKey];
                    for(i=0; i<arrayOfParity.length; i++){
                        currentSubObj[newArrOfParity[i]]=obj[arrayOfParity[i]];
                        //delete obj[arrayOfParity[i]];
                    }
                }else{
                    for(i=0; i<arrayOfParity.length; i++){
                        if (obj.hasOwnProperty(arrayOfParity[i])) {
                            if (typeof obj[newKey] === 'object') {
                                processedObj[arrayOfParity[i]]=obj[arrayOfParity[i]];
                            } else {
                                processedObj[arrayOfParity[i]]=obj[arrayOfParity[i]];
                            }
                        }
                    }
                }
            }

        }
    }
    return processedObj;
}

//-----------------common prefix grouping generixc logic !! end's here !!---------------------------

/**
 * Maps the provided account status to its corresponding status reason.
 *
 * @param {string} status - The account status to be mapped.
 * @returns {string} The corresponding status reason or undefined if not found.
 */
function mapStatusToReason(status) {
    for (var i = 0; i < statusReasonMapping.length; i++) {
        for (var j = 1; j < statusReasonMapping[i].length; j++) {
            if (status == statusReasonMapping[i][j]) {
                return statusReasonMapping[i][0];
            }
        }
    }
}

/**
 * Retrieves the country name based on the provided country code.
 *
 * @param {string} code - The country code to look up.
 * @returns {string} The corresponding country name or the original code if not found.
 */
function fetchCountryName(code) {
    if (checkNonEmpty(code)) {
        if (isoCountries.hasOwnProperty(code)) {
            return isoCountries[code];
        } else {
            return code;
        }
    }
}

/**
 * Checks if the provided value is not empty.
 *
 * @param {any} inputValue - The value to be checked.
 * @returns {boolean} Returns true if the value is not empty, otherwise false.
 */
function checkNonEmpty(inputValue) {
    if (inputValue === "" || inputValue === null || inputValue === undefined) {
        return false;
    } else {
        return true;
    }
}
