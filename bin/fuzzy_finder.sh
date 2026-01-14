#!/bin/bash

read -p "enter file Name: " FILE_NAME
CURRENT_DIR=$(pwd)
FILES=()
MATCHED_FILES=()

function traverse() {
for file in "$1"/*
do
    if [ ! -d "${file}" ] ; then
        FILES+=("${file}")
    else
        traverse "${file}"
    fi
done
}

traverse ${CURRENT_DIR}

function fuzzy_find(){
    for file in ${FILES[@]}
    do
        for char_name in ${FILE_NAME}
        do
            INDEXES=()
            FILE_MATHED=()
            for (( k=0; k<${#char_name}; k++))
            do
                for (( i=0; i<${#file}; i++))
                do
                    #echo "char: ${file:$i:1}, user input char: ${char_name:$k:1}"
                    if [[ ${file:$i:1} == ${char_name:$k:1} ]]
                    then
                        INDEXES+=(${i})
                        FILE_MATHED+=(${file})
                        #echo "matched at index ${i}, char: ${file:$i:1}"
                    fi
                done
            done
            PERIVIOUS_FILE=""
            for index in ${INDEXES[@]}
            do
                COUNT=0
                if [[ ${PERIVIOUS_FILE} == $FILE_MATHED[1] ]]
                    echo "something"
                fi
                ##echo "index: ${index}, file: ${FILE_MATHED[${COUNT}]}"
                #PERIVIOUS_FILE=$FILE_MATHED[1]
                #((COUNT++))
            done
            #for matched_file in ${FILE_MATHED[@]}
            #do
            #    #echo "matched file: ${matched_file}"
            #done
        done
    done
}

fuzzy_find
