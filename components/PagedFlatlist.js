import React from 'react';
import { useState } from 'react'
import { FlatList, Keyboard } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../styles'



const PagedFlatlist = ({elements, renderElementComponent, pageSize, style}) => {

    const [page, setPage] = useState(1);

    const loadNextPage = () => {
        if(pageSize * page < elements.length){
            setPage(page + 1);
        }
    }

    return (
        <FlatList
            style = {style}
            data={elements.slice(0, pageSize * page)}
            renderItem={({ item }) => renderElementComponent(item)}
            keyExtractor={item => item.id.toString()}
            onEndReached={loadNextPage}
            onEndReachedThreshold={1}
            onScrollBeginDrag={() => Keyboard.dismiss()}
            keyboardShouldPersistTaps = {'handled'}
        />
  );
}

export default PagedFlatlist;