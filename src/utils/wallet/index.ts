export const getWalletInfo = (client: any) => {
  return new Promise((res, rej) => {
    client
      .fundingWallet()
      .then((response: any) => {
        res(response.data);
      })
      .catch(rej);
  });
};
