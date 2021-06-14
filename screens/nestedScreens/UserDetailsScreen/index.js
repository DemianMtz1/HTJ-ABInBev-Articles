import React, { useState } from 'react';
import header from '../../../assets/bg-pattern.jpg';
import {
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { postFollowByUsername, getIsFollowing, deleteFollowByUsername, } from '../../../utilities/services';
import { userDetailsStyles } from './styles/userDetailsStyles';
import { globalStyles } from '../../../styles/globalStyles';

export function UserDetailsScreen() {
    const [isFollowing, setIsFollowing] = useState()
    const route = useRoute()
    const author = route.params;

    useFocusEffect(
        React.useCallback(() => {
            const request = async () => {
                const followResponse = await getIsFollowing(author.username);
                setIsFollowing(followResponse.profile.following);
            }
            request()
        }, [])
    )

    const handleFollowUser = async () => {
        if (isFollowing === false) {
            const data = await postFollowByUsername(author.username);
            setIsFollowing(data.profile.following)
            return;
        }

        const data = await deleteFollowByUsername(author.username);
        setIsFollowing(data.profile.following)
    }

    return (
        <ImageBackground source={header} style={userDetailsStyles.containerSignUp}>
            <View style={userDetailsStyles.headerWapper}>
                <Text style={userDetailsStyles.titleTxt}>User details</Text>
                <View style={userDetailsStyles.userWrapper}>
                    <Image source={{ uri: author.image }} style={userDetailsStyles.imgAvatar} />
                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                        <Text style={userDetailsStyles.usernameText}>Hi, I'm @{author.username}</Text>
                        <Text style={userDetailsStyles.userBioText}>{!author.bio ? 'Not Found Bio' : author.bio}</Text>
                        <TouchableOpacity
                            style={[globalStyles.btnPrimaryBackground, { marginTop: 20 }]}
                            onPress={handleFollowUser}
                        >
                            <Text style={globalStyles.btnPrimaryText}>{!isFollowing ? 'Follow' : 'Unfollow'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </ImageBackground>
    );
}