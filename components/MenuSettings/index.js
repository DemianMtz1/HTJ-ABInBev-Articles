import React from 'react'
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const MenuSettings = ({ interactions, styles, handleSignOut, navigation, user }) => {
    const iconConfg = {
        color: '#555',
        size: 15,
        sizeHeader: 20
    }

    return (
        <ScrollView >
            <Text style={styles.sectionHeader}><Ionicons name={'ios-heart'} size={iconConfg.sizeHeader} color={iconConfg.color} /> Interactions</Text>

            <View style={styles.wrapperSection}>
                <Text># {interactions.createdArticles} Articles published</Text>
            </View>

            <View style={styles.wrapperSection}>
                <Text># {interactions.favoritedCourses} Articles favorited</Text>
            </View>

            <Text style={styles.sectionHeader}><Ionicons name={'ios-settings'} size={iconConfg.sizeHeader} color={iconConfg.color} /> Configure your profile</Text>
            <TouchableOpacity
                style={styles.wrapperSection}
                onPress={() => navigation.navigate('EditInfo', user)}
            >
                <Text><Ionicons name={'ios-build'} size={iconConfg.size} color={iconConfg.color} /> Edit info</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.wrapperSection, { marginTop: 10 }]}
                onPress={() => navigation.navigate('CreateArticle', user)}
            >
                <Text><Ionicons name={'ios-add'} size={iconConfg.size} color={iconConfg.color} /> Create Article</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.wrapperSection, { marginTop: 10 }]}
                onPress={() => navigation.navigate('MyArticles', user)}
            >
                <Text><Ionicons name={'ios-folder'} size={iconConfg.size} color={iconConfg.color} /> My Articles</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signOutBtn}
                onPress={handleSignOut}
            >
                <Text style={styles.signOutText}>Sign out</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}