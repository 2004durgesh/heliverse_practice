/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { addToTeam } from './redux/action/TeamActions';

const CardsItems = (item) => {
  // Define color constants for better readability
  const maleColor = '#0000FF'; // Blue
  const femaleColor = '#FF69B4'; // Pink
  const transgenderColor = '#800080'; // Purple

  const dispatch = useDispatch();

  const addToTeamHandler = () => {
    dispatch(addToTeam(item));
  };

  return (
    <View style={tw`flex-row items-center p-4 m-2 bg-white rounded-md shadow-md`}>
      <Image
        source={{
          uri: item.avatar,
        }}
        style={tw`w-32 h-32 rounded-full border`}
        PlaceholderContent={<ActivityIndicator size="large" color="#DB202C" />}
      />
      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-xl font-bold text-gray-800`}>{item.first_name} {item.last_name}</Text>
        <View style={tw`mt-2`}>
          <Text style={tw`text-lg text-gray-700 font-semibold`}>{item.domain}</Text>
          <Text style={tw`text-base text-gray-600`}>{item.email}</Text>
          <View style={tw`flex-row items-center mt-2`}>
            <FontAwesome
              name={
                item.gender === 'Male'
                  ? 'male'
                  : item.gender === 'Female'
                    ? 'female'
                    : 'transgender-alt'
              }
              size={20}
              color={
                item.gender === 'Male'
                  ? maleColor
                  : item.gender === 'Female'
                    ? femaleColor
                    : transgenderColor
              }
              style={tw`mr-2`}
            />
            <Text style={tw`text-lg font-bold text-gray-700`}>{item.gender}</Text>
          </View>
          <View style={tw`flex-row gap-3 items-center mt-2`}>
            <Text style={tw`text-lg font-bold ${item.available ? 'text-green-500' : 'text-red-500'}`}>
              {item.available ? 'Available' : 'Not Available'}
            </Text>
            {item.available ? (
              <TouchableOpacity style={tw`bg-blue-500 p-2 rounded-md`} onPress={addToTeamHandler}>
                <Text style={tw`text-lg font-bold text-white`}>Add to Team</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardsItems;
