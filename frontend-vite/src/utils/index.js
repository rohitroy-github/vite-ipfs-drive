export function shortenMetamaskAddress(address) {
  if (!address || typeof address !== "string") {
    return "Invalid address";
  }

  const trimmedAddress = address.slice(0, 10) + "...." + address.slice(-10);

  return trimmedAddress;
}
