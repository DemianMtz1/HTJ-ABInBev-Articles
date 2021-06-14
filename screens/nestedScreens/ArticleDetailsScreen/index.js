import React, { useState } from 'react';
import {
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import backgroundApp from '../../../assets/bg-pattern.jpg';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';

import { useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';
import { Comment } from '../../../components/Comment'
import { articleDetailsStyles } from './styles/articleDetailsStyles';
import { deleteArticle, deleteFavoritedArticle, getArticle, getComments, getIsFavoriteArticle, getSessionUserInfo, postComment, postFavoritedArticle } from '../../../utilities/services';
import { globalStyles } from '../../../styles/globalStyles';
import { showAlertComment } from '../../../utilities/validations';

export function ArticleDetailsScreen() {
    const [article, setArticle] = useState();
    const [user, setUser] = useState({});
    const [comments, setComments] = useState();
    const [comment, setComment] = useState({
        body: ''
    });
    const [isNewComment, setIsNewComment] = useState(false);
    const [favorite, setFavorite] = useState();
    const [isFavoriteArticle, setIsFavoriteArticle] = useState();

    const route = useRoute();
    const navigation = useNavigation();
    const { slug } = route.params;
    const defaultImage = 'https://static.productionready.io/images/smiley-cyrus.jpg';
    const today = new Date(!article ? '' : article.updatedAt);
    const iconConfg = {
        colorEdit: 'gold',
        size: 25,
        sizeHeader: 20,
        colorTrash: 'darkred',
        default: '#555'
    }

    useFocusEffect(
        React.useCallback(() => {
            const request = async () => {
                const currentUser = await getSessionUserInfo();
                setUser(currentUser.user)
            }
            request()
        }, [])
    )

    useFocusEffect(
        React.useCallback(() => {
            const request = async () => {
                const data = await getArticle(slug);
                setArticle(data.article)
            }
            request()
        }, [slug])
    )

    useFocusEffect(
        React.useCallback(() => {
            const request = async () => {
                const data = await getComments(slug);
                setComments(data.comments)
            }
            request()
        }, [slug, isNewComment])
    )

    useFocusEffect(
        React.useCallback(() => {
            const request = async () => {
                const data = await getIsFavoriteArticle(slug);
                setIsFavoriteArticle(data.article.favorited)
            }
            request()
        }, [slug, favorite])
    )

    const handleChangeBody = text => {
        setIsNewComment(false)
        setComment({ body: text })
    }

    const handleSubmitComment = async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            if (!comment.body) {
                showAlertComment()
                return;
            }
            const response = await postComment(token, slug, { comment });
            setIsNewComment(true)

            setIsNewComment(false)
            setComment({
                body: ''
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteArticle = async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            const response = await deleteArticle(token, slug);
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
        }
    }

    const handleChangeFavoriteArticle = async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            if (isFavoriteArticle === false) {
                const responseFavorite = await postFavoritedArticle(token, slug);
                setFavorite(!favorite);
                return
            }
            setFavorite(!favorite);
            const responseUnfavorite = await deleteFavoritedArticle(token, slug);
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdatePost = () => navigation.navigate('CreateArticle', { slug })

    const renderComment = ({ item }) => <Comment articleDetailsStyles={articleDetailsStyles} item={item} iconConfg={iconConfg} user={user} slug={slug} setIsNewComment={setIsNewComment} />

    if (!article || !comments) {
        return (
            <ImageBackground source={backgroundApp} style={articleDetailsStyles.container}>
            </ImageBackground>
        )
    }

    return (
        <ImageBackground source={backgroundApp} style={articleDetailsStyles.container}>
            <View style={articleDetailsStyles.headerWapper}>

            </View>

            <View style={articleDetailsStyles.contentWrapper}>
                <ScrollView>
                    <View style={articleDetailsStyles.titleArticleWrapper}>
                        <Text style={articleDetailsStyles.titleArticle}>{!article ? '' : article.title}</Text>
                    </View>

                    <View style={articleDetailsStyles.userWrapper}>
                        <TouchableOpacity
                            onPress={()=> navigation.navigate('UserDetails', article.author)}
                            style={articleDetailsStyles.userInfoWrapper}>
                            <Image source={{ uri: !article.author.image ? defaultImage : article.author.image }} style={articleDetailsStyles.imgAvatar} />
                            <Text style={articleDetailsStyles.usernameText}>{article.author.username} ・</Text>
                            <Text>{`${today.getDate()}/${today.getFullYear()}`}</Text>
                        </TouchableOpacity>

                        {
                            article.author.username !== user.username ?
                                null :
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        style={{ marginRight: 20 }}
                                        onPress={handleUpdatePost}
                                    >
                                        <Text><Ionicons name={'ios-brush'} size={iconConfg.size} color={iconConfg.default} /></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleDeleteArticle}
                                    >
                                        <Text><Ionicons name={'ios-trash'} size={iconConfg.size} color={iconConfg.colorTrash} /></Text>
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>

                    <SafeAreaView style={{ marginTop: 20 }}>
                        <Text style={articleDetailsStyles.descriptionArticle}>{article.description}</Text>
                        <Text style={articleDetailsStyles.articleBody}>{article.body}</Text>

                        <View style={{ marginTop: 25 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={articleDetailsStyles.discussionTitle}>Discussion ({comments.length})</Text>

                                <TouchableOpacity
                                    onPress={handleChangeFavoriteArticle}
                                >
                                    <Text><Ionicons name={'ios-bookmark'} size={iconConfg.size} color={isFavoriteArticle === false ? iconConfg.default : iconConfg.colorEdit} /></Text>
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                multiline
                                numberOfLines={10}
                                style={[globalStyles.generalInput, { borderRadius: 0, marginTop: 20 }]}
                                value={comment.body}
                                placeholder="Add to the discussion"
                                onChangeText={handleChangeBody}
                            />

                            <TouchableOpacity
                                style={globalStyles.btnPrimaryBackground}
                                onPress={handleSubmitComment}
                            >
                                <Text style={globalStyles.btnPrimaryText}>Add Comment</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </ScrollView>

                <FlatList
                    style={{ marginTop: 20 }}
                    data={comments}
                    keyExtractor={item => String(item.id)}
                    renderItem={renderComment}
                />
            </View>
        </ImageBackground>
    )
}
