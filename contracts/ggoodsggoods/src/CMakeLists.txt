project(ggoodsggoods)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

set(EOSIO_WASM_OLD_BEHAVIOR "Off")
find_package(eosio.cdt)

add_contract( ggoodsggoods ggoodsggoods ggoodsggoods.cpp )
target_include_directories( ggoodsggoods PUBLIC ${CMAKE_SOURCE_DIR}/../include )
target_ricardian_directory( ggoodsggoods ${CMAKE_SOURCE_DIR}/../ricardian )
