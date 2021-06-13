import React  from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

export const LoadMoreArticles = ({articlesRef, setPagination, pagination }) => {
    return (
        <TouchableOpacity
        style={globalStyles.btnSecondaryBackground}
        onPress={()=> {
            articlesRef.current.scrollToIndex({animated: true, index: 0})
            setPagination(pagination + 1)
        }}
    >
        <Text style={globalStyles.btnPrimaryText}>Load more articles...</Text>
    </TouchableOpacity>
    )
}
