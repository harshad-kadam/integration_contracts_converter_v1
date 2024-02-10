var openAiResponse = context.getVariable("openAiResponse.content");
var tokenCount = context.getVariable("tokenCount") || 0;

// Function to unescape special characters in a JSON string
function unescapeJsonString(jsonString) {
  return jsonString.replace(/\\(.)/g, (_, escapedChar) => {
    // Replace escaped characters with their unescaped counterparts
    var escapeMap = {
      n: '\n',
      t: '\t',
      r: '\r'
    };
    return escapeMap[escapedChar] || escapedChar;
  });
}

try{
    openAiResponse=JSON.parse(openAiResponse);
    openAiResponse=unescapeJsonString(openAiResponse.choices[0].message.content);
    tokenCount= tokenCount + openAiResponse.usage.total_tokens;
}catch(e){
    context.setVariable("response.content","Something Went Wrong!\nFree Tier Limit of 700 tokens Reached.\nTokens will be restored after 10 days.\nPlease Contact Administrator or Purchase Higher Tier.");
}

context.setVariable("tokenCount",tokenCount);
context.setVariable("openAiResponse",openAiResponse);
context.setVariable("response.header.Content-Type","application/text");
context.setVariable("response.content",openAiResponse);
