import React from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

export function Tag({ tag, setTag, setPagination }) {
    const handlePressTag = () => {
        setTag(tag)
        setPagination(0)
    }

    return (
        <TouchableOpacity
            style={globalStyles.tag}
            onPress={handlePressTag}
        >
               <Text style={globalStyles.tagDesc}>{tag}</Text>
        </TouchableOpacity>
    );
}
