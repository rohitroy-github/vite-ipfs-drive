export function shortenMetamaskAddress(address) {
  if (!address || typeof address !== "string") {
    return "Invalid address";
  }

  const trimmedAddress = address.slice(0, 12) + "...." + address.slice(-12);

  return trimmedAddress;
}
