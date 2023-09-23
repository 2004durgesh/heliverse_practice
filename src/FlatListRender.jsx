/* eslint-disable prettier/prettier */
import React from 'react';
import { View, FlatList} from 'react-native';
import CardsItems from './CardsItems';
import tw from 'twrnc';

const FlatListRender = ({data}) => {
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => <CardsItems {...item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={tw`pb-84`}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default FlatListRender