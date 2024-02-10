try {
    var jsonResponse = context.getVariable("response.content") || "{}";
    jsonResponse = JSON.parse(jsonResponse);
    var renameFieldsMap = context.getVariable("response.header.Rename-Fields.values.string") || "{}";
    var removeFieldsList = context.getVariable("response.header.Remove-Fields.values.string") || "[]";
    renameFieldsMap = JSON.parse(renameFieldsMap);
    removeFieldsList = JSON.parse(removeFieldsList);
    var excludeResponseKeysArray = ['transType', 'accountNum', 'accntNum'];
    var transTypesMap= context.getVariable("transTypesMap");
    var transType = context.getVariable("transType");
    transTypesMap= JSON.parse(transTypesMap) || {};
    renameFieldsMap=snakeToCamel(renameFieldsMap);
    removeFieldsList=snakeToCamel(removeFieldsList);
    
    //Merge entries from renameFieldsMap into keyConversionMap
    for (var key in renameFieldsMap) {
        if (renameFieldsMap.hasOwnProperty(key) && key && renameFieldsMap[key]) {
            keyConversionMap[key] = renameFieldsMap[key];
        }
    }

    if(removeFieldsList.length !== 0){
        removeFieldsList.forEach(function (element) {
            excludeResponseKeysArray.push(element);
        });
    }
    
    //custom rule
    if(jsonResponse){
        if (jsonResponse.hasOwnProperty("accountNum") || jsonResponse.hasOwnProperty("accntNum")){
            var customObject= {
			    "id": "CUST_idXXXXXXXXXXXXXXXXXXXXXXXX",
		    };
		    customObject = Object.assign(customObject, jsonResponse);
		    jsonResponse=customObject;
        }
    }
    
    //jsonResponse=groupDetector(jsonResponse);
    var transformedJson = transformJson(
        jsonResponse,
        excludeResponseKeysArray,
        keyConversionMap
    );
    
    context.setVariable("response.content",JSON.stringify(transformedJson, null, 2));
    context.setVariable("response.header.X-INTEGRATION-Resource-Location","https://kadamharshad25-eval-prod.apigee.net/api/v1/conv/ert"+getTransType(transType));
}
catch (e) {
    context.setVariable("response.content",JSON.stringify(e, null, 2));
    context.setVariable("error.content",JSON.stringify(renameFieldsMap, null, 2));
    print(e);
}