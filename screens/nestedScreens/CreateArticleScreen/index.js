import React, { useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Text,
    TouchableOpacity,
    View,
    Platform,

} from 'react-native';
import backgroundApp from '../../../assets/bg-pattern.jpg';

import { useRoute, useNavigation } from '@react-navigation/native';
import { createArtStyles } from './styles/createArtStyles';
import { globalStyles } from '../../../styles/globalStyles';
import { postArticle } from '../../../utilities/services';
import { showAlertCreateArticle } from '../../../utilities/validations';

export const CreateArticleScreen = () => {
    const [article, setArticle] = useState({
        title: '',
        description: '',
        body: '',
        tagList: []
    })

    const route = useRoute();
    const navigation = useNavigation();

    const handleTitle = title => {
        setArticle({ ...article, title })
    }

    const handleDescription = description => {
        setArticle({ ...article, description })
    }

    const handleTags = stringTags => {
        const tags = stringTags.trim().split(',')
        setArticle({ ...article, tags })
    }

    const handleBody = body => {
        setArticle({ ...article, body })
    }

    const handleSubmitArticle = async () => {
        const { title, description, body, tags } = article;
        showAlertCreateArticle(title, description, body, tags)
        if (!title || !description || !body || tags.length === 0) {
            return null;
        }
        const response = await postArticle(route.params.token, article);
        navigation.navigate('Settings');
        setArticle({
            title: '',
            description: '',
            body: '',
            tagList: []
        })
    }

    return (
        <ImageBackground source={backgroundApp} style={createArtStyles.container}>
            <View style={createArtStyles.headerContainer}></View>

            <KeyboardAvoidingView
                style={createArtStyles.formWrapper}
                behavior='padding'
                enabled={Platform.OS === 'ios' ? true : false}
            >
                <View>
                    <Text style={createArtStyles.headerFormTxt}>Create your article</Text>
                </View>
                <SafeAreaView>
                    <TextInput
                        style={globalStyles.generalInput}
                        placeholder="Article's Title"
                        onChangeText={handleTitle}
                    />

                    <TextInput
                        style={globalStyles.generalInput}
                        placeholder="Article's Description"
                        onChangeText={handleDescription}
                    />

                    <TextInput
                        style={globalStyles.generalInput}
                        placeholder="Create tags using 'comma'. E.g. tag1,tag2,tag3"
                        onChangeText={handleTags}
                    />

                    <TextInput
                        multiline
                        numberOfLines={10}
                        style={globalStyles.generalInput}
                        placeholder="Article's Body"
                        onChangeText={handleBody}
                    />

                    <TouchableOpacity
                        style={globalStyles.btnPrimaryBackground}
                        onPress={handleSubmitArticle}
                    >
                        <Text style={globalStyles.btnPrimaryText}>Create article</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}
