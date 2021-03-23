#!/bin/bash
#
# author  (C) 2021 by eoscostarica [ https://eoscostarica.io ]
# WebSite:        https://eoscostarica.io
# GitHub:         https://github.com/eoscostarica
#
# version 1.0.0
#
#  DESCRIPTION
#    the main propouse of this script is create a new smart contract  
#    based on https://github.com/MythicalGames/dgoods
#

CONTRACT_NAME='ggoodsggoods'

# clone dgoods directory

cp dgoods $CONTRACT_NAME -rf
cd $CONTRACT_NAME

#change the files names
mv dgoods_spec.md  ${CONTRACT_NAME}_spec.md

#change name references
# README.md
sed -i'.old' "s/(dgoods_spec.md)/("$CONTRACT_NAME"_spec.md)/" README.md

# Makefile
sed -i'.old' "s/dgoods.abi/"$CONTRACT_NAME".abi/" Makefile
sed -i'.old' "s/dgoods.wasm/"$CONTRACT_NAME".wasm/" Makefile
sed -i'.old' "s/dgoods.abi/"$CONTRACT_NAME".abi/" Makefile
sed -i'.old' "s/dgoods/"$CONTRACT_NAME"/" Makefile
sed -i'.old' "s/dgoods* /"$CONTRACT_NAME"/" Makefile

#example_usage.md

sed -i'.old' "s/dgood.token/"$CONTRACT_NAME"/" example_usage.md
sed -i'.old' "s/dgoods/"$CONTRACT_NAME"/" example_usage.md


#CMakeLists.txt
sed -i'.old' "s/dgoods/"$CONTRACT_NAME"/" CMakeLists.txt