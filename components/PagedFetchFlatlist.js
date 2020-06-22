import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { FlatList, Keyboard } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../styles'


const PagedFetchFlatlist = ({fetchData, query, pageSize, renderElementComponent, style}) => {

    const page = useRef(0);
    const dataExhausted = useRef(false)
    const [data, setData] = useState([]);
    // prevent race condition with api calls and setState()
    const lastQueryPromise = useRef(null);

    const fetchNextDataPage = async (prevData) => {
        if(!dataExhausted.current){
            const nextPage = page.current + 1
            page.current = nextPage

            // record this promise, compare to latest promise later
            const currentQueryPromise = fetchData(nextPage, pageSize);
            lastQueryPromise.current = currentQueryPromise;
            nextPageData = await currentQueryPromise;

            if(nextPageData == null || nextPageData.length < pageSize){
                dataExhausted.current = true;
            }

            const newData = [...prevData, ...nextPageData];

            // https://sebastienlorber.com/handling-api-request-race-conditions-in-react
            // if this promise is the latest one, then accept. All older promises can be 
            // safely discarded as they are not what the user currently wants
            // (usually for fast query typing and slow networks)
            if(currentQueryPromise == lastQueryPromise.current){
                setData(newData);
            }
        }
    }

    // reset if query changes
    useEffect(() => {
        const resetData = async () => {
            page.current = 0;
            dataExhausted.current = false;
            fetchNextDataPage([]);
        }

        resetData();
    }, [query])

    return (
        <FlatList
            style = {style}
            data={data}
            renderItem={({ item }) => renderElementComponent(item)}
            keyExtractor={item => item.id.toString()}
            onEndReached={() => fetchNextDataPage(data)}
            onEndReachedThreshold={2}
            onScrollBeginDrag={() => Keyboard.dismiss()}
        />
  );
}
export default PagedFetchFlatlist;