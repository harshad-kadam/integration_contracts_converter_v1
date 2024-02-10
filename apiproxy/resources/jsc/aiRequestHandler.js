// Function to unescape special characters and remove line breaks from a JSON string
function unescapeAndFlattenJsonString(jsonString) {
  return jsonString.replace(/\\(.)/g, (_, escapedChar) => {
    // Replace escaped characters with their unescaped counterparts
    var escapeMap = {
      n: '',
      t: '',
      r: ''
    };
    return escapeMap[escapedChar] || escapedChar;
  }).replace(/\r?\n/g, ''); // Remove line breaks
}
var reqPayload=context.getVariable("request.content");

if (!reqPayload.toLowerCase().includes("xsl")) {
    context.setVariable("errorFlag",true);
} 

reqPayload=JSON.stringify(unescapeAndFlattenJsonString(reqPayload));
context.setVariable("request.content", reqPayload);
context.setVariable("reqPayload", reqPayload);