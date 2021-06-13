import React from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { deleteComment } from '../../utilities/services';

export const Comment = ({ articleDetailsStyles, item, iconConfg, user, slug, setIsNewComment }) => {

    const commentDate = new Date(item.createdAt)
    const handleDeleteComment = async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            const response = await deleteComment(token, slug, item.id)
            setIsNewComment(true)
            setIsNewComment(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={articleDetailsStyles.commentWrapper}>
            <View style={[articleDetailsStyles.userInfoWrapper, { justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: item.author.image }} style={articleDetailsStyles.imgAvatar} />
                    <Text style={articleDetailsStyles.usernameText}>{item.author.username} ・</Text>
                    <Text>{`${commentDate.getDate()}/${commentDate.getFullYear()}`}</Text>
                </View>
                {
                    item.author.username !== user.username ?
                        null :
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={handleDeleteComment}
                            >
                                <Text><Ionicons name={'ios-trash'} size={iconConfg.size} color={iconConfg.colorTrash} /></Text>
                            </TouchableOpacity>
                        </View>
                }

            </View>
            <View style={{ marginBottom: 10 }}>
                <Text style={articleDetailsStyles.articleBody}>{item.body}</Text>
            </View>
        </View>
    )
}
