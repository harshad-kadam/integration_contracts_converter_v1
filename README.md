# Apigee Proxy for Data Conversion🛡️🛡️

🚀 Welcome to the Apigee XML/JSON Transformation Proxy, a powerful tool designed to simplify and optimize data format conversions in the API Gateway environment. This comprehensive solution caters to various transformation needs, allowing you to seamlessly convert XML to JSON, JSON to XML, generate XSL for XML transformations, and perform specialized contracts conversion.

## Features

1. **XML to JSON Conversion**
   - Transform XML data to JSON effortlessly.

2. **JSON to XML Conversion**
   - Convert JSON data to XML format with ease.

3. **XSL for XML Transformation**
   - Apply XSL transformations to XML documents for advanced customization.

4. **Contracts Convert**
   - Convert XML to Snake Case JSON with controlled mapping.


## Getting Started

Follow the steps below to set up and use the Converter API.

### Prerequisites

- Apigee
- API Management
- JavaScript
- Git | GitHUb

## How to Use

### XML to JSON Conversion

Endpoint: `/xmltojson`

Example Request:
```xml
<?xml version="1.0" encoding="UTF-8"?>
    <company>
      <name>ABC Corporation</name>
      <employees>
        <employee>
          <id>1</id>
          <name>John Doe</name>
          <position>Software Engineer</position>
          <salary>80000</salary>
        </employee>
        <employee>
          <id>2</id>
          <name>Jane Smith</name>
          <position>Project Manager</position>
          <salary>100000</salary>
        </employee>
      </employees>
      <departments>
        <department>
          <id>101</id>
          <name>Engineering</name>
          <location>Building A</location>
        </department>
        <department>
          <id>102</id>
          <name>Marketing</name>
          <location>Building B</location>
        </department>
      </departments>
    </company>
```

Endpoint: `/jsontoxml`

Example Request:
```json
{
      "name": "ABC Corporation",
      "employees": {
        "employee": [
          {
            "id": "1",
            "name": "John Doe",
            "position": "Software Engineer",
            "salary": "80000"
          },
          {
            "id": "2",
            "name": "Jane Smith",
            "position": "Project Manager",
            "salary": "100000"
          }
        ]
      },
      "departments": {
        "department": [
          {
            "id": "101",
            "name": "Engineering",
            "location": "Building A"
          },
          {
            "id": "102",
            "name": "Marketing",
            "location": "Building B"
          }
        ]
      }
    }
```

Endpoint: `/xsl`

Example Request:
```xml
Write XSL for removal of node cardNumber & cardCvv from below XML payload.
<cardDetails>
  <cardHolderName>Harshad Kadam</cardHolderName>
  <cardBrand>MasterCard</cardBrand>
  <cardNumber>5105105105105100</cardNumber>
  <expDate>1228</expDate>
  <cardCvv>342</cardCvv>
</cardDetails>
```

Endpoint: `/`

Example Request:
```xml
<?xml version="1.0" encoding="UTF-8"?>
    <company>
      <name>ABC Corporation</name>
      <employees>
        <employee>
          <id>1</id>
          <name>John Doe</name>
          <position>Software Engineer</position>
          <salary>80000</salary>
        </employee>
        <employee>
          <id>2</id>
          <name>Jane Smith</name>
          <position>Project Manager</position>
          <salary>100000</salary>
        </employee>
      </employees>
      <departments>
        <department>
          <id>101</id>
          <name>Engineering</name>
          <location>Building A</location>
        </department>
        <department>
          <id>102</id>
          <name>Marketing</name>
          <location>Building B</location>
        </department>
      </departments>
    </company>
```
#### Curl For Reference
```c
curl --location 'https://kadamharshad25-eval-prod.apigee.net/api/v1/xsl' \
--header 'Content-Type: application/text' \
--data 'Write XSL for removal of node cardNumber & cardCvv from below XML payload.
<cardDetails>
  <cardHolderName>Harshad Kadam</cardHolderName>
  <cardBrand>MasterCard</cardBrand>
  <cardNumber>5105105105100</cardNumber>
  <expDate>1225555</expDate>
  <cardCvv>342</cardCvv>
</cardDetails>'
```

## What can be improved

- **Caching Optimization:** Maximize performance with advanced caching strategies.

- **Traffic Management**: Optimize traffic handling for scalability and implement rate-limiting strategies.

- **Logging Integration**: Seamless integration with logging solutions like Sumo Logic, Splunk, or Loggly.

- **CORS Restrictions**: Strengthen CORS policies with configurable restrictions based on specific use cases.

- Algorithm Refinement: Explore memoization techniques to optimize algorithms and fine-tune processing logic.

## Installation

1. Clone the repository:
   git clone https://github.com/your-username/converter-api.git

2. Create feature_yourname branch & git checkout to feature branch

3. Open folder with VSCode

4. Add your changes 

5. Git commit & push changes

6. Create PR n share on kadamharshad25@gmail.com

7. I will merge to main code. 

8. You did it. 🏆

9. __(Optional)__ For environmental setup use link: https://docs.google.com/document/d/19An6Qq28GvWQvlN0RcnXVWYyBxVHjKHqn5qD7p3vDrc/edit

10. Join Our channel https://t.me/apigeedeveloper

# 😊Thanks for being here🚀