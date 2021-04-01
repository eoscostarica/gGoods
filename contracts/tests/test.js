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
const proxy_acc='eoscrprox111';
const voter_acc='eoscrvoter11';

const rateproducer_priv_key='5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';
const rateproducer_pub_key='EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';


const signatureProvider = new JsSignatureProvider([rateproducer_priv_key]);
const rpc = new JsonRpc('http://localhost:8888', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
const get = require('lodash.get')
var chai = require('chai'),assert = chai.assert;


var bp_accts_25 = [
                "eoscrprodo11","eoscrprodo12","eoscrprodo13","eoscrprodo14","eoscrprodo15",
                "eoscrprodo21","eoscrprodo22","eoscrprodo23","eoscrprodo24","eoscrprodo25",
                "eoscrprodo31","eoscrprodo32","eoscrprodo33","eoscrprodo34","eoscrprodo35",
                "eoscrprodo41","eoscrprodo42","eoscrprodo43","eoscrprodo44","eoscrprodo45",
                "eoscrprodo51","eoscrprodo52","eoscrprodo53","eoscrprodo54","eoscrprodo55"
                 ];
var bp_accts_21 = [
                "eoscrprodo11","eoscrprodo12","eoscrprodo13","eoscrprodo14","eoscrprodo15",
                "eoscrprodo21","eoscrprodo22","eoscrprodo23","eoscrprodo24","eoscrprodo25",
                "eoscrprodo31","eoscrprodo32","eoscrprodo33","eoscrprodo34","eoscrprodo35",
                "eoscrprodo41","eoscrprodo42","eoscrprodo43","eoscrprodo44","eoscrprodo45",
                "eoscrprodo51"
                 ];
var bp_accts_10 = [
                "eoscrprodo11","eoscrprodo12","eoscrprodo13","eoscrprodo14","eoscrprodo15",
                "eoscrprodo21","eoscrprodo22","eoscrprodo23","eoscrprodo24","eoscrprodo25"
                 ];

describe ('gGoods unit tests', function(){


 
});
