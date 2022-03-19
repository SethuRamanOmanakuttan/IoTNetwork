

#this script adds new user id to the already existing peer user folder in organisation
#in order to add new users just increment the users count variable in the user-config.yaml file and run this script
#once you have the new credentials , make sure you add it to the wallet before using the credential for transactions
../../bin/cryptogen extend --config=./user-config.yaml --input="../organizations"
echo "Generated new user credentials"