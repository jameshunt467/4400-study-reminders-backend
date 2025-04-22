aws lambda create-function `
  --function-name HelloWorld `
  --runtime nodejs18.x `
  --role arn:aws:iam::730335360654:role/LabRole `
  --handler index.handler `
  --zip-file fileb://function.zip
