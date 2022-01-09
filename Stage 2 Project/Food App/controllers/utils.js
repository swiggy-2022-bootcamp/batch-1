const constructAddress = (address) => {
  return {
    houseno: address.houseno,
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip
  }
}

module.exports = {
  constructAddress
}