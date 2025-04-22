# PowerShell script to invoke the HelloWorld Lambda function
aws lambda invoke `
  --function-name HelloWorld `
  --payload '{}' `
  response.json

# Display the response
Get-Content response.json