# PowerShell script to update the saveReminder Lambda function

# Remove the existing function.zip if it exists
if (Test-Path -Path "function.zip") {
    Remove-Item -Path "function.zip" -Force
}

# Create a new function.zip containing index.js and node_modules
Compress-Archive -Path @("index.js", "../../node_modules/*") -DestinationPath "function.zip" -Force

# Update the Lambda function
aws lambda update-function-code `
  --function-name listReminders `
  --zip-file fileb://function.zip