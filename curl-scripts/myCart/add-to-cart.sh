# TOKEN='' ItemId='' UserId='' sh curl-scripts/myCart/add-to-cart.sh

curl 'http://localhost:4741/toMyCart' \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "cartItem": {
      "itemId": "'"${ItemId}"'",
      "shopper": "'"${UserId}"'"
    }
  }'

echo
