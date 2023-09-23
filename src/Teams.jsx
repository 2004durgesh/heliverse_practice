/* eslint-disable prettier/prettier */
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { Image } from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import tw from 'twrnc';

const Teams = () => {
  const teamMembers = useSelector((state) => state.team.teamMembers);
  const uniqueMemberIds = new Set();
  // Define color constants for better readability
  const maleColor = '#0000FF'; // Blue
  const femaleColor = '#FF69B4'; // Pink
  const transgenderColor = '#800080'; // Purple
  return (
    <ScrollView style={tw`p-4 bg-gray-100`}>
      <Text style={tw`text-center text-3xl font-bold text-gray-700 mb-6`}>Team Members</Text>
      {teamMembers.map((member) => {
        // Check if the member ID is already in the set
        if (!uniqueMemberIds.has(member.id)) {
          uniqueMemberIds.add(member.id);
          return (
            <View key={member.id} style={tw`bg-white border border-gray-300 rounded-lg mb-6 p-6 shadow-md`}>
              <View style={tw`flex-row items-center mb-4`}>
                <Image
                  source={{ uri: member.avatar }}
                  style={tw`w-32 h-32 rounded-full border mr-4`}
                  PlaceholderContent={<ActivityIndicator size="large" color="#DB202C" />}
                />
                <View>
                  <Text style={tw`text-2xl font-bold text-gray-800`}>
                    {member.first_name} {member.last_name}
                  </Text>
                  <View style={tw`flex-row items-center mt-2`}>
                    <FontAwesome
                      name={
                        member.gender === 'Male'
                          ? 'male'
                          : member.gender === 'Female'
                            ? 'female'
                            : 'transgender-alt'
                      }
                      size={20}
                      color={
                        member.gender === 'Male'
                          ? maleColor
                          : member.gender === 'Female'
                            ? femaleColor
                            : transgenderColor
                      }
                      style={tw`mr-2`}
                    />
                    <Text style={tw`text-lg font-bold text-gray-700`}>{member.gender}</Text>
                  </View>
                  <Text style={tw`text-base text-gray-600 text-xs`}>{member.email}</Text>
                </View>
              </View>
              <View style={tw`border-t border-gray-300 pt-4`}>
                <Text style={tw`text-xl font-bold text-gray-800 mt-4`}>{member.domain}</Text>
              </View>
            </View>
          );
        }
        else return null; // Skip rendering if it's a duplicate
      })}
    </ScrollView>
  );
};

export default Teams;
