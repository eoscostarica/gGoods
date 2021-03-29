#!/bin/bash
#
# author  (C) 2021 by eoscostarica [ https://eoscostarica.io ]
# WebSite:        https://eoscostarica.io
# GitHub:         https://github.com/eoscostarica
#
# version 1.0.0
#
#  DESCRIPTION
#    the main propouse of this script is to be used in 
#    offline bare-metal setups. It create a new smart contract  
#    based on https://github.com/MythicalGames/dgoods, 
#    it must run on contracts folder
#

# New contract name
CONTRACT_NAME='ggoodsggoods'

# clone dgoods directory
cp dgoods $CONTRACT_NAME -rf
cd $CONTRACT_NAME

#change the files names
mv dgoods_spec.md  ${CONTRACT_NAME}_spec.md

#change name references
# README.md
sed -i.old "s/(dgoods_spec.md)/("$CONTRACT_NAME"_spec.md)/" README.md

# Makefile
sed -i.old "s/dgoods.abi/"$CONTRACT_NAME".abi/" Makefile
sed -i.old "s/dgoods.wasm/"$CONTRACT_NAME".wasm/" Makefile
sed -i.old "s/dgoods.abi/"$CONTRACT_NAME".abi/" Makefile
sed -i.old "s/dgoods/"$CONTRACT_NAME"/" Makefile
sed -i.old "s/dgoods* /"$CONTRACT_NAME"/" Makefile

#example_usage.md
sed -i.old "s/dgood.token/"$CONTRACT_NAME"/" example_usage.md
sed -i.old "s/dgoods/"$CONTRACT_NAME"/" example_usage.md

#CMakeLists.txt
sed -i.old "s/dgoods/"$CONTRACT_NAME"/" CMakeLists.txt

# /src/CMakeLists.txt
cd src
sed -i.old "s/dgoods/"$CONTRACT_NAME"/" CMakeLists.txt
sed -i.old "s/dgoods dgoods.cpp/"$CONTRACT_NAME" "$CONTRACT_NAME".cpp/" CMakeLists.txt

# /src/dgoods.cpp change name
mv dgoods.cpp $CONTRACT_NAME.cpp
sed -i.old "s/<dgoods.hpp>/<"$CONTRACT_NAME".hpp>/" $CONTRACT_NAME.cpp
sed -i.old "s/dgoods::/"$CONTRACT_NAME"::/" $CONTRACT_NAME.cpp
sed -i.old "s/dgoods,/"$CONTRACT_NAME",/" $CONTRACT_NAME.cpp
#get out of /src
rm *.old
cd ..

# /ricardian/dgoods.contracts.md change name
cd ricardian
mv dgoods.contracts.md $CONTRACT_NAME.contracts.md

# /include/dgoods.hpp change name
cd ../include
mv dgoods.hpp $CONTRACT_NAME.hpp
sed -i.old "s/dgoods(/"$CONTRACT_NAME"(/" $CONTRACT_NAME.hpp
sed -i.old "s/dgoods:/"$CONTRACT_NAME":/" $CONTRACT_NAME.hpp

#get out of /include
rm *.old
cd ..
rm *.old