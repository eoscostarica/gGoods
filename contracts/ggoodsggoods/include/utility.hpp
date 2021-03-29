//  (C) 2020 https://github.com/MythicalGames/dgoods
/*
* @file
* @author  (C) 2021 by eoscostarica [ https://eoscostarica.io ]
* @version 1.1.0
*
* @section DESCRIPTION
*  Header file for the utility functions related with the lifeggoodsggoods contract
*
* Smart contract lifeggoodsggoods, EOSIOHackathon  "Beyond Blockchain"
*
*    WebSite:        https://eoscostarica.io
*    GitHub:         https://github.com/eoscostarica/Ggoods
*
*/
#pragma once

#include <string>
#include <algorithm>
#include <cctype>
#include <locale>
#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

namespace utility {

    /**
    *
    *  trim from left (in place)
    *
    * @param s - string to trim
    * 
    * @return a string
    */
    static inline void ltrim(string& s) {
        s.erase( s.begin(), find_if( s.begin(), s.end(), [](int ch) {
            return !isspace(ch);
        }));
    }

    /**
    *
    *  trim from right (in place)
    *
    * @param s - string to trim
    * 
    * @return a string
    */
    static inline void rtrim(string& s) {
        s.erase( find_if( s.rbegin(), s.rend(), [](int ch) {
            return !isspace(ch);
        }).base(), s.end());
    }
 
    /**
    *
    *  trim from both ends (in place)
    *
    * @param s - string to trim
    * 
    * @return a string
    */
    static inline string trim(string s) {
        ltrim(s);
        rtrim(s);
        return s;
    }

    /**
    *
    *  process the , caracter within memo
    *
    * @param memo - the user account name
    * 
    * @return a tuple<uint64_t, name>
    *
    */
    tuple<uint64_t, name> parsememo(const string& memo) {
        auto comma_pos = memo.find(',');
        string errormsg = "malformed memo: must have batch_id,to_account";
        check ( comma_pos != string::npos, errormsg );
        if ( comma_pos != string::npos ) {
            check( ( comma_pos != memo.size() - 1 ), errormsg );
        }
        // will abort if stoull throws error since wasm no error checking
        uint64_t batch_id = stoull( trim( memo.substr( 0, comma_pos ) ) );
        name to_account = name( trim ( memo.substr( comma_pos + 1 ) ) );
        return make_tuple(batch_id, to_account);
    }
}
