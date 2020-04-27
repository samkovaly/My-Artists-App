import React from 'react';
import { useState, useMemo } from 'react'

import { StyleSheet, Text, View, FlatList } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../styles'


const queryElements = (elements, query, queryKey) => {
    const queriedElements = elements.filter(element =>
        element[queryKey].toLowerCase().includes(query.toLowerCase())
    );
    return queriedElements;
}



const SearchableFlatList = ({query, elements, queryKey, renderElementComponenet, pageSize, style}) => {
    // elements must have a queryKey property to be indexable.

    const [page, setPage] = useState(1);
    const queriedElements = useMemo(() => queryElements(elements, query, queryKey), [query])

    const loadNextPage = () => {
        if(pageSize * page < queriedElements.length){
            setPage(page + 1);
        }
    }

      
    return (
        <FlatList
            style = {style}
            data={queriedElements.slice(0, pageSize * page)}
            renderItem={({ item }) => renderElementComponenet(item)}
            keyExtractor={item => item.id}
            onEndReached={loadNextPage}
            onEndReachedThreshold={1}
        />
  );
}

export default SearchableFlatList;