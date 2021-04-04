/*
* @file
* @author  (C) 2021 by eoscostarica [ https://eoscostarica.io ]
* @version 1.1.0
*
* @section DESCRIPTION
*  basic unit test for ggoodsggoods contract's action
*
* Smart contract ggoodsggoods, EOSIOHackathon  "Beyond Blockchain"
*
*    WebSite:        https://eoscostarica.io
*    GitHub:         https://github.com/eoscostarica/Ggoods
*
*/

const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder

const contract_name="ggoodsggoods";

const rateproducer_priv_key='5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';
const rateproducer_pub_key='EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';


const signatureProvider = new JsSignatureProvider([rateproducer_priv_key]);
const rpc = new JsonRpc('http://localhost:8888', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
const get = require('lodash.get')
var chai = require('chai'),assert = chai.assert;
//
// reset the smart contract before run the script
// cleos set code --clear ggoodsggoods
// cleos set contract --clear ggoodsggoods
// cleos set contract ggoodsggoods ../ggoodsggoods ggoodsggoods.wasm ggoodsggoods.abi -p ggoodsggoods@active
//
describe ('gGoods unit tests', function(){


  it("gGoods: testing action SETCONFIG with wrong symbol", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "setconfig",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                symbol: "tckt",
                version: "1.0",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "not valid symbol");
    }
  });

  it("gGoods: testing action CREATE without initialize ", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "create",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                issuer: "ggoodsggoods", 
                rev_partner: "ggoodsggoods",
                category: "concert1",
                token_name: "ticket1",
                fungible: false,
                burnable: false,
                sellable: true,
                transferable: false,
                rev_split: 0.05,
                base_uri: "https:/eoscostarica.io",
                max_issue_days: 0,
                max_supply: "1000 TCKT",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "singleton does not exist");
    }
  });
  

  it("gGoods: testing action SETCONFIG ", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "setconfig",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                symbol: "TCKT",
                version: "1.0",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\n action SETCONFIG caught exception: " + err);
    }
  });

  it("gGoods: testing action SETCONFIG with dup category ", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "setconfig",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                symbol: "TCKT",
                version: "2.0",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "Token with category and token_name exists");
    }
  });

  it("gGoods: testing action CREATE with wrong symbol", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "create",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                issuer: "ggoodsggoodf", 
                rev_partner: "ggoodsggoods",
                category: "concert1",
                token_name: "ticket1",
                fungible: false,
                burnable: false,
                sellable: true,
                transferable: false,
                rev_split: 0.05,
                base_uri: "https:/eoscostarica.io",
                max_issue_days: 0,
                max_supply: "1000 TCKG",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "Symbol must match symbol in config");

    }
  });

  it("gGoods: testing action CREATE with wrong issuer", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "create",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                issuer: "ggoodsggoodf", 
                rev_partner: "ggoodsggoods",
                category: "concert1",
                token_name: "ticket1",
                fungible: false,
                burnable: false,
                sellable: true,
                transferable: false,
                rev_split: 0.05,
                base_uri: "https:/eoscostarica.io",
                max_issue_days: 0,
                max_supply: "1000 TCKT",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "issuer account does not exist");

    }
  });

  it("gGoods: testing action CREATE NFT with max_supply = 0 ", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "create",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                issuer: "ggoodsggoodf", 
                rev_partner: "ggoodsggoods",
                category: "concert1",
                token_name: "ticket1",
                fungible: false,
                burnable: false,
                sellable: true,
                transferable: false,
                rev_split: 0.05,
                base_uri: "https:/eoscostarica.io",
                max_issue_days: 0,
                max_supply: "0 TCKT",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "NFT amount must be >= 1");

    }
  });

  it("gGoods: testing action CREATE FT with max_supply = 0 ", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "create",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                issuer: "ggoodsggoodf", 
                rev_partner: "ggoodsggoods",
                category: "concert1",
                token_name: "ticket1",
                fungible: true,
                burnable: false,
                sellable: true,
                transferable: false,
                rev_split: 0.05,
                base_uri: "https:/eoscostarica.io",
                max_issue_days: 0,
                max_supply: "0 TCKT",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "amount must be positive");

    }
  });

  it("gGoods: testing action CREATE NFT with wrong rev_partner", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "create",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                issuer: "ggoodsggoods", 
                rev_partner: "ggoodsggoodr",
                category: "concert1",
                token_name: "ticket1",
                fungible: false,
                burnable: false,
                sellable: true,
                transferable: false,
                rev_split: 0.05,
                base_uri: "https:/eoscostarica.io",
                max_issue_days: 5,
                max_supply: "0 TCKT",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "rev_partner account does not exist");

    }
  });

  it("gGoods: testing action CREATE NFT with wrong rev_split", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "create",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                issuer: "ggoodsggoods", 
                rev_partner: "ggoodsggoods",
                category: "concert1",
                token_name: "ticket1",
                fungible: false,
                burnable: false,
                sellable: true,
                transferable: false,
                rev_split: 5,
                base_uri: "https:/eoscostarica.io",
                max_issue_days: 5,
                max_supply: "0 TCKT",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "rev_split must be between 0 and 1");

    }
  });

  it("gGoods: testing action CREATE NFT ", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "create",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                issuer: "ggoodsggoods", 
                rev_partner: "ggoodsggoods",
                category: "concert1",
                token_name: "ticket1",
                fungible: false,
                burnable: false,
                sellable: true,
                transferable: false,
                rev_split: 0.05,
                base_uri: "https:/eoscostarica.io",
                max_issue_days: 0,
                max_supply: "100 TCKT",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\n action CREATE caught exception: " + err);
    }
  });

  it("gGoods: testing action ISSUE with wrong to account", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "issue",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                to: "ggoodsggoodx",
                category: "concert1",
                token_name: "ticket1",
                quantity: "1 TCKT",
                relative_uri: "www.eoscostaria.io",
                memo: "sell by eoscostaruca",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "to account does not exist");
    }
  });
  

  it("gGoods: testing action ISSUE with wrong category", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "issue",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                to: "ggoodsggoods",
                category: "concert2",
                token_name: "ticket1",
                quantity: "1 TCKT",
                relative_uri: "www.eoscostaria.io",
                memo: "sell by eoscostaruca",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "Token with category and token_name does not exist");
    }
  });
  
  it("gGoods: testing action ISSUE with wrong quantity", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "issue",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                to: "ggoodsggoods",
                category: "concert1",
                token_name: "ticket1",
                quantity: "500 TCKT",
                relative_uri: "www.eoscostaria.io",
                memo: "sell by eoscostaruca",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
   
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "Cannot issue more than max supply");
      
    }
  });

  it("gGoods: testing action ISSUE ", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "issue",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                to: "ggoods.acct1",
                category: "concert1",
                token_name: "ticket1",
                quantity: "1 TCKT",
                relative_uri: "www.eoscostaria.io",
                memo: "sell by eoscostaruca",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\n action ISSUE caught exception: " + err);
    }
  });

  it("gGoods: testing action TRANFERNFT with big array ", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "transfernft",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                from: "ggoods.acct1",
                to: "ggoods.acct2",
                catetogory: "concert1",
                dgood_ids: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                memo: "sell by eoscostaruca",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
        let errorMessage = get(err, "json.error.details[0].message");
        errorMessage &&
          (errorMessage = errorMessage
            .replace("assertion failure with message:", "")
            .trim());
        assert.equal(
          "eosio_assert_message_exception",
          get(err, "json.error.name") || ""
        );
        assert.equal(errorMessage, "max batch size of 20");
      
    }
  });
  
  it("gGoods: testing action TRANFERNFT transfer with self", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "transfernft",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                from: "ggoods.acct1",
                to: "ggoods.acct1",
                catetogory: "concert1",
                dgood_ids: [1],
                memo: "sell by eoscostaruca",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
        let errorMessage = get(err, "json.error.details[0].message");
        errorMessage &&
          (errorMessage = errorMessage
            .replace("assertion failure with message:", "")
            .trim());
        assert.equal(
          "eosio_assert_message_exception",
          get(err, "json.error.name") || ""
        );
        assert.equal(errorMessage, "cannot transfer to self");
      
    }
  });

  it("gGoods: testing action TRANFERNFT ", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: "transfernft",
              authorization: [
                {
                  actor: contract_name,
                  permission: "active",
                },
              ],
              data: {
                from: "ggoodsggoods",
                to: "ggoods.acct1",
                catetogory: "concert1",
                dgood_ids: [1],
                memo: "sell by eoscostaruca",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\n action TRANFERNFT caught exception: " + err);
    }
  });
  
 
});
