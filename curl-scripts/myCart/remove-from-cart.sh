# TOKEN='' CartItemId='' UserId='' sh curl-scripts/myCart/remove-from-cart.sh

curl "http://localhost:4741/fromMyCart/${CartItemId}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \

echo
