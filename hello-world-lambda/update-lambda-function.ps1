# PowerShell script to update the HelloWorld Lambda function
aws lambda update-function-code `
  --function-name HelloWorld `
  --zip-file fileb://function.zip