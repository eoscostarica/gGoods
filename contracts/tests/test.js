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

describe ('gGoods unit tests', function(){
  it("gGoods: testing setconfig with wrong symbol", async () => {
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
      assert.equal(err, "not valid symbol");
    }
  });
 
});
