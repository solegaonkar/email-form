# Email Form

A simple reusable React Component that can be embedded in your website.
Expects Bootstrap v 4 or 5 imported into the page.

It is compiled and hosted on static.krazyminds.com.

### Include in the HTML
https://static.krazyminds.com/emailform.js 
https://static.krazyminds.com/emailform.css

### Sample Implementation
https://static.krazyminds.com/emailform.html 

## AWS Implementation

### DynamoDB
This requires one record in the DynamoDB table - for each user subscribing to the form.

```javascript
{
  "context": "USERID",
  "email": "destination.email@gmail.com",
  "id": "config",
  "stats": {
    "emailCount": 3
  }
}
```

This ID should be used in the div added to the HTML page.

### Environment Variables
The Lambda Function Requires two environment variables:

```javascript
const tableName = process.env.TABLE_NAME;
const snsArn = process.env.TABLE_NAME;
```

### API Gateway
Simple API Gateway configuration - to invoke the Lambda with Proxy Integration

## Deploy
Follow these steps to build and deploy on your AWS account:
- Build the React project for prod
```npm run-script build --prod```
- In the generated code, find build/index.html
- It has some JS code within, and includes two JS files. Merge them all into one JS file
- So we have a JS file and a CSS file. Add them to any HTML where you want the Email Form. 
- The form will appear wherever it finds the 
```html
<div class="email-form">USERID</div>
```
