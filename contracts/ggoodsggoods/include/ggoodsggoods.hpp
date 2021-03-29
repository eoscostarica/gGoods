//  (C) 2020 https://github.com/MythicalGames/dgoods
/*
* @file
* @author  (C) 2021 by eoscostarica [ https://eoscostarica.io ]
* @version 1.1.0
*
* @section DESCRIPTION
*  Header file for the declaration of all functions related with the lifeggoodsggoods contract
*
* Smart contract lifeggoodsggoods, EOSIOHackathon  "Beyond Blockchain"
*
*    WebSite:        https://eoscostarica.io
*    GitHub:         https://github.com/eoscostarica/Ggoods
*
*/
#pragma once

#include <eosio/asset.hpp>
#include <eosio/symbol.hpp>
#include <eosio/eosio.hpp>
#include <eosio/time.hpp>
#include <eosio/singleton.hpp>
#include <string>
#include <vector>

#include "utility.hpp"

using namespace std;
using namespace eosio;
using namespace utility;

CONTRACT ggoodsggoods: public contract {
    public:
        using contract::contract;

        ggoodsggoods(name receiver, name code, datastream<const char*> ds)
            : contract(receiver, code, ds) {}        
        /**
        *
        *  The first action you must call on the contract is setconfig.
        *
        * @param symbol - symbol of the token,
        * @param version - version of the token,
        *
        */
        ACTION setconfig(const symbol_code& symbol,
                         const string& version);

        /**
        *
        *  This action creates a token
        *
        * @param issuer - name of the issuer
        * @param rev_partner - the name of the rev_partner,
        * @param category - the category for the token
        * @param token_name - the token name
        * @param fungible - is fungible flag
        * @param burnable - is burnable flag
        * @param sellable - is sellable flag
        * @param transferable - istransferable flag,
        * @param rev_split - rev_split
        * @param base_uri - uri,
        * @param max_issue_days - number of days,
        * @param max_supply - amount of supply
        *
        * @memo  the token type must be created
        */
        ACTION create(const name& issuer,
                      const name& rev_partner,
                      const name& category,
                      const name& token_name,
                      const bool& fungible,
                      const bool& burnable,
                      const bool& sellable,
                      const bool& transferable,
                      const double& rev_split,
                      const string& base_uri,
                      const uint32_t& max_issue_days,
                      const asset& max_supply);

        /**
        *
        *  This action issues a token
        *
        * @param to -  account name
        * @param category - the category for the token
        * @param token_name - name of the token 
        * @param quantity - 
        * @param relative_uri - 
        * @param memo - issue memo
        *
        */
        ACTION issue(const name& to,
                     const name& category,
                     const name& token_name,
                     const asset& quantity,
                     const string& relative_uri,
                     const string& memo);

        /**
        *
        *  This action freeze the max supply
        * @param category - category name
        * @param token_name - token name
        *
        */    
        ACTION freezemaxsup( const name& category, const name& token_name );

        /**
        *
        *  This action burn a nft 
        *
        * @param owner - the acct name of the nft owner
        * @param dgood_ids - idsof the assetsto burn
        *
        */
        ACTION burnnft(const name& owner,
                       const vector<uint64_t>& dgood_ids);

       
        /**
        *
        *  This action burn a nft  by category name
        *
        *
        * @param owner - the acct name of the nft owner
        * @param category_name_id - the category i
        * @param quantity - amount of token to burn
        *
        */
        ACTION burnft(const name& owner,
                      const uint64_t& category_name_id,
                      const asset& quantity);
        /**
        *
        *  This action buy a nft
        * @param from - from account name
        * @param to - to account name
        * @param quantity - quantity of nft
        * @parammemo -transaction memo
        *
        */
        void buynft(const name& from,
                    const name& to, 
                    const asset& quantity,
                     const string& memo);

        /**
        *
        *  This action confirms a sale
        *
        * @param newowner - the name of the receiver account
        * @param owner - the name of the sender account
        * @param quantity - # of token
        * @param batch_id - batch_id
        *
        */
        ACTION confirmsale(const name& newowner, 
                           const name& owner, 
                           const asset& quantity, 
                           const uint64_t& batch_id);

        /**
        *
        *  This action transfer a nft
        *
        * @param from - sender account name
        * @param to - receiver account name
        * @param dgood_ids - ids of all assets
        * @param memo -transaction memo
        *
        */
        ACTION transfernft(const name& from,
                           const name& to,
                           const vector<uint64_t>& dgood_ids,
                           const string& memo);

        /**
        *
        *  This action transfer a ft
        *
        * @param from - sender account name
        * @param to - receiver account name
        * @param category - the name of the category
        * @param token_name - the name of the token
        * @param quantity - 
        * @param memo -transaction memo
        *
        */
        ACTION transferft(const name& from,
                          const name& to,
                          const name& category,
                          const name& token_name,
                          const asset& quantity,
                          const string& memo);

        /**
        *
        *  This action list a nft sale
        * @param seller - seller account name
        * @param dgood_ids - list of the assets ids
        * @param sell_by_days - 
        * @param is_donable - is donable flag
        * @param net_sale_amount - 
        *
        */
        ACTION listsalenft(const name& seller,
                           const vector<uint64_t>& dgood_ids,
                           const uint32_t sell_by_days,
                           const bool is_donable,
                           const asset& net_sale_amount);

        /**
        *
        *  This action close a nft sale
        *
        * @param seller - the user account name
        * @param batch_id - the hash(user+name)
        *
        */
        ACTION closesalenft(const name& seller,
                            const uint64_t& batch_id);

        /**
        *
        *  This action log a call
        *
        * @param dgood_id - asset id
        *
        */
        ACTION logcall(const uint64_t& dgood_id);

        /**
        *
        *  This action log a sale
        *
        * @param dgood_id - list of the assets ids
        * @param seller - seller account name
        * @param buyer - buyer account name
        * @param receiver - receiver account name
        *
        */
        ACTION logsale(const vector<uint64_t>& dgood_ids,
                       const name& seller,
                       const name& buyer,
                       const name& receiver);


        TABLE lockednfts {
            uint64_t dgood_id;
            uint64_t primary_key() const { return dgood_id; }
        };

        // now() gets current time in sec
        // uint32_t 604800 is 1 week in seconds
        TABLE asks {
            uint64_t batch_id;
            vector<uint64_t> dgood_ids;
            name seller;
            asset amount;
            time_point_sec expiration;
            bool is_donable;
            uint64_t primary_key() const { return batch_id; }
            uint64_t get_seller() const { return seller.value; }
        };

        TABLE tokenconfigs {
            name standard;
            string version;
            symbol_code symbol;
            uint64_t category_name_id;
            uint64_t next_dgood_id;
        };

        TABLE categoryinfo {
            name category;
            uint64_t primary_key() const { return category.value; }
        };


        // scope is category, then token_name is unique
        TABLE dgoodstats {
            bool           fungible;
            bool           burnable;
            bool           sellable;
            bool           transferable;
            name           issuer;
            name           rev_partner;
            name           token_name;
            uint64_t       category_name_id;
            asset          max_supply;
            time_point_sec max_issue_window;
            asset          current_supply;
            asset          issued_supply;
            double         rev_split;
            string         base_uri;
            uint64_t primary_key() const { return token_name.value; }
        };

        // scope is self
        TABLE dgood {
            uint64_t id;
            uint64_t serial_number;
            name owner;
            name category;
            name token_name;
            std::optional<string> relative_uri;
            uint64_t primary_key() const { return id; }
            uint64_t get_owner() const { return owner.value; }
        };

        EOSLIB_SERIALIZE( dgood, (id)(serial_number)(owner)(category)(token_name)(relative_uri) )

        // scope is owner
        TABLE accounts {
            uint64_t category_name_id;
            name category;
            name token_name;
            asset amount;
            uint64_t primary_key() const { return category_name_id; }
        };

        using config_index = singleton< "tokenconfigs"_n, tokenconfigs >;
        using account_index = multi_index< "accounts"_n, accounts >;
        using category_index = multi_index< "categoryinfo"_n, categoryinfo>;
        using stats_index = multi_index< "dgoodstats"_n, dgoodstats>;
        using dgood_index = multi_index< "dgood"_n, dgood,
            indexed_by< "byowner"_n, const_mem_fun< dgood, uint64_t, &dgood::get_owner> > >;
        using ask_index = multi_index< "asks"_n, asks,
            indexed_by< "byseller"_n, const_mem_fun< asks, uint64_t, &asks::get_seller> > >;
        using lock_index = multi_index< "lockednfts"_n, lockednfts>;
      private:
        /**
        *
        *  calculates the fees
        *
        * @param dgood_ids - list of the assets ids
        * @param ask_amount - amount
        * @param seller - seller account name
        *
        */
        map<name, asset> _calcfees(vector<uint64_t> dgood_ids,
                                   asset ask_amount,
                                    name seller);

        /**
        *
        *  change the owner
        *
        * @param from - seller account name
        * @param to - receiver account name
        * @param dgood_ids - list of the assets ids
        * @param memo - transactions' memo
        * @param istransfer - trans flag
        *
        */
        void _changeowner( const name& from, 
                           const name& to, 
                           const vector<uint64_t>& dgood_ids, 
                           const string& memo, 
                           const bool& istransfer);

        /**
        *
        *  check asset
        *
        * @param amount - amount of aseset
        * @param fungible - fungible flag
        *
        */
        void _checkasset( const asset& amount, const bool& fungible );

        /**
        *
        *  mint a asset
        *
        * @param to - to account name
        * @param issuer - issuer account name
        * @param category - category name
        * @param token_name - token_name
        * @param issued_supply - supply
        * @param relative_uri - uri
        *
        */
        void _mint(const name& to, 
                   const name& issuer, 
                   const name& category, 
                   const name& token_name,
                   const asset& issued_supply, 
                   const string& relative_uri);
                  
        /**
        * returns the next good id
        *  
        *   @return a uint64_t
        */
        uint64_t _nextdgoodid();

        /**
        *
        *  add balance
        *
        * @param owner - owner account name
        * @param issuer - issuer account name
        * @param category - category name
        * @param token_name - token name
        * @param category_name_id - category id
        * @param quantity -
        *
        */
        void _add_balance(const name& owner, 
                         const name& issuer, 
                         const name& category, 
                         const name& token_name,
                         const uint64_t& category_name_id, 
                         const asset& quantity);

        /**
        *
        *  sub balance
        *
        * @param owner - the user account name
        * @param category_name_id - category id
        * @param quantity
        *
        */
        void _sub_balance(const name& owner,
                          const uint64_t& category_name_id, 
                          const asset& quantity);
};
