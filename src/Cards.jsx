/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import tw from 'twrnc';
import HeliverseData from './Heliverse';
import NextAndPrev from './NextAndPrev';
import FlatListRender from './FlatListRender';

const Cards = () => {
    const perPage = 10; // Number of cards to display per page
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    // Filter the data whenever the searchQuery changes
    useEffect(() => {
        const filtered = HeliverseData.filter(item => {
            const fullName = `${item.first_name} ${item.last_name}`;
            return fullName.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredData(filtered);
    }, [searchQuery]);

    const dataToRender = filteredData.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage === 1) return
        else setCurrentPage(currentPage - 1);
    };

    return (
        <View>
            <NextAndPrev prevFunc={handlePrevPage} nextFunc={handleNextPage} page={currentPage}/>
            <TextInput
                placeholder="Search by name"
                placeholderTextColor={"gray"}
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={tw`px-4 py-2 mx-4 mb-4 border-b border-gray-700 text-gray-700`}
            />
            <FlatListRender data={dataToRender}/>
        </View>
    );
};

export default Cards;
