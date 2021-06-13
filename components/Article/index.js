import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { articleStyles } from './styles/articleStyles';

export function Article({ article }) {
    const today = new Date(article.updatedAt);
    const navigation = useNavigation();
    const defaultImage = 'https://static.productionready.io/images/smiley-cyrus.jpg';
    return (
        <TouchableOpacity
            onPress={()=> navigation.navigate('ArticleDetails', article)}
        >
            <View style={articleStyles.article}>
                <View style={articleStyles.authorWrapper}>
                    <Image
                        source={{ uri: !article.author.image ?  defaultImage: article.author.image}}
                        style={articleStyles.banner}
                    />
                    <Text>{article.author.username} ・</Text>
                    <Text>{`${today.getDate()}/${today.getFullYear()}`}</Text>
                </View>
                <Text style={articleStyles.titleArticle}>
                    {article.title}
                </Text>
                <Text>
                    {article.body.split(' ').length > 14 ? article.body.substring(0, 70) + '...' : article.body}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
