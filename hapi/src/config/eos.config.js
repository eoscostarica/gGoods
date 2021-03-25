module.exports = {
  endpoint: process.env.HAPI_EOS_API_ENDPOINT,
  chainId: process.env.HAPI_EOS_API_CHAIN_ID,
  baseAccount: process.env.HAPI_EOS_BASE_ACCOUNT,
  baseAccountPassword: process.env.HAPI_EOS_BASE_ACCOUNT_PASSWORD,
  walletUrl: process.env.HAPI_EOS_WALLET_URL,
  dgoodsAccount: process.env.HAPI_DGOODS_ACCOUNT,
  dgoodsPassword: process.env.HAPI_DGOODS_PASSWORD,
  dgoodsToken: process.env.HAPI_DGOODS_TOKEN,
  mailApproveOrganization: process.env.HAPI_MAIL_APPROVE_ORGANIZATION
}
