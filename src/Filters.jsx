/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import HeliverseData from './Heliverse';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import NextAndPrev from './NextAndPrev';
import FlatListRender from './FlatListRender';

const Filters = () => {
  const perPage = 10; // Number of cards to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);

  const handleDomainSelect = (domain) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter((item) => item !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const handleGenderSelect = (gender) => {
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter((item) => item !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
  };

  const HeliverseDataResult = HeliverseData
    .filter((item) => (selectedDomains.length === 0 || selectedDomains.includes(item.domain)))
    .filter((item) => (selectedGenders.length === 0 || selectedGenders.includes(item.gender)))
    .filter((item) => (!isAvailable || item.available === true));

  const dataToRender = HeliverseDataResult.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) { return }
    else { setCurrentPage(currentPage - 1) }
  };

  const uniqueDomains = [...new Set(HeliverseData.map((item) => item.domain))];
  const uniqueGenders = [...new Set(HeliverseData.map((item) => item.gender))];

  // Collapsible sections state
  const [domainSectionOpen, setDomainSectionOpen] = useState(true);
  const [genderSectionOpen, setGenderSectionOpen] = useState(true);

  return (
    <>
      <NextAndPrev prevFunc={handlePrevPage} nextFunc={handleNextPage} page={currentPage} />
      <SafeAreaView>
        <ScrollView>
          <View style={tw`bg-gray-200 p-4 rounded-lg`}>
            <Text style={tw`text-black text-lg font-bold`}>Filtered Results:</Text>
            {/* Domain Filters */}
            <TouchableOpacity
              onPress={() => setDomainSectionOpen(!domainSectionOpen)}
              style={tw`flex-row justify-between items-center p-2 bg-white rounded-lg my-2`}
            >
              <Text style={tw`text-lg font-bold text-gray-700`}>Choose Domains</Text>
              <FontAwesome
                name={domainSectionOpen ? 'angle-up' : 'angle-down'}
                size={24}
                color="#000"
              />
            </TouchableOpacity>
            {domainSectionOpen && (
              <View style={tw`p-2 bg-white rounded-lg`}>
                {uniqueDomains.map((item) => (
                  <CheckBox
                    key={item}
                    text={item}
                    isChecked={selectedDomains.includes(item)}
                    onPress={() => handleDomainSelect(item)}
                  />
                ))}
              </View>
            )}
            {/* Gender Filters */}
            <TouchableOpacity
              onPress={() => setGenderSectionOpen(!genderSectionOpen)}
              style={tw`flex-row justify-between items-center p-2 bg-white rounded-lg my-2`}
            >
              <Text style={tw`text-lg font-bold text-gray-700`}>Choose Genders</Text>
              <FontAwesome
                name={genderSectionOpen ? 'angle-up' : 'angle-down'}
                size={24}
                color="#000"
              />
            </TouchableOpacity>
            {genderSectionOpen && (
              <View style={tw`p-2 bg-white rounded-lg`}>
                {uniqueGenders.map((item) => (
                  <CheckBox
                    key={item}
                    text={item}
                    isChecked={selectedGenders.includes(item)}
                    onPress={() => handleGenderSelect(item)}
                  />
                ))}
              </View>
            )}
            {/* Availability Filter */}
            <View style={tw`p-2 bg-white rounded-lg my-2`}>
              <BouncyCheckbox
                size={30}
                fillColor="red"
                unfillColor="white"
                text="Available"
                textStyle={tw`text-black`}
                iconStyle={tw`border-red-500`}
                innerIconStyle={tw`border-2`}
                onPress={() => setIsAvailable(!isAvailable)}
                isChecked={isAvailable}
                style={tw`py-.5`}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <FlatListRender data={dataToRender} />
    </>
  );
};

const CheckBox = ({ text, isChecked, onPress }) => (
  <TouchableOpacity onPress={onPress} style={tw`flex-row items-center justify-between my-2`}>
    <Text style={tw`text-black text-lg`}>{text}</Text>
    <BouncyCheckbox
      size={30}
      fillColor="red"
      unfillColor="white"
      isChecked={isChecked}
      onPress={onPress}
      style={tw`py-.5`}
    />
  </TouchableOpacity>
);

export default Filters;
