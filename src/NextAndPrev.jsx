/* eslint-disable prettier/prettier */
import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const NextAndPrev = ({prevFunc,nextFunc,page}) => {
    return (
        <View style={tw`flex flex-row justify-between items-center mx-4 my-4`}>
            <TouchableOpacity onPress={prevFunc} style={tw`bg-white pr-1 rounded-full w-12 h-12 justify-center items-center`}>
                <FontAwesome name="chevron-left" size={30} color="#DB202C" />
            </TouchableOpacity>
            <Text style={tw`font-bold text-sm text-gray-700`}>Current Page: {page}</Text>
            <TouchableOpacity onPress={nextFunc} style={tw`bg-white pl-1 rounded-full w-12 h-12 justify-center items-center`}>
                <FontAwesome name="chevron-right" size={30} color="#DB202C" />
            </TouchableOpacity>
        </View>
    )
}

export default NextAndPrev