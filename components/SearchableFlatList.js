import React from 'react';
import { useMemo } from 'react'

import { Colors, Screens, Buttons, Font } from '../styles'

import { Keyboard } from 'react-native'

import PagedFlatlist from './PagedFlatlist'


const queryElements = (elements, query, queryKey) => {
    const queriedElements = elements.filter(element =>
        element[queryKey].toLowerCase().includes(query.toLowerCase())
    );
    return queriedElements;
}



const SearchableFlatList = ({query, elements, queryKey, renderElementComponent, pageSize, style, onEndReachedThreshold}) => {
    // elements must have a queryKey property to be indexable.
    const queriedElements = useMemo(() => queryElements(elements, query, queryKey), [query])

    return (
        <PagedFlatlist
            style={style}
            elements={queriedElements}
            renderElementComponent = {renderElementComponent}
            pageSize={pageSize}
            onEndReachedThreshold = {onEndReachedThreshold}
        />
  );
}

export default SearchableFlatList;