import React, { useRef, useState } from 'react';
import header from '../../../assets/bg-pattern.jpg';
import {
    FlatList,
    ImageBackground,
    SafeAreaView,
    Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Article } from '../../../components/Article';
import { LoadMoreArticles } from '../../../components/LoadMoreArticles';
import { getFavoriteArticles, getSessionUserInfo } from '../../../utilities/services';

import { favoritedArtStyles } from './styles/favoritedArtStyles';

export function FavoritedArticlesScreen() {
    const articlesRef = useRef();
    const [user, setUser] = useState({});
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState(0)

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
                const favoritedArticles = await getFavoriteArticles(user.username);
                setArticles(favoritedArticles.articles);
            }
            request()
        }, [user])
    )

    const renderArticle = ({ item }) => <Article article={item} />

    const renderFooterArticle = () => <LoadMoreArticles articlesRef={articlesRef} setPagination={setPagination} pagination={pagination} />


    if (!user.username) {
        return (
            <ImageBackground source={header} style={favoritedArtStyles.containerHome}>

            </ImageBackground>
        )
    }

    return (
        <ImageBackground source={header} style={favoritedArtStyles.containerHome}>
            <SafeAreaView style={favoritedArtStyles.headerWrapper}>
                <Text style={favoritedArtStyles.headerTxt}>Favorited Article</Text>
            </SafeAreaView>

            <SafeAreaView style={favoritedArtStyles.wrapperArticles}>
                {
                    articles.length == 0 ?
                        <Text style={favoritedArtStyles.noArticlesTxt}>You don't have articles to see :(</Text>
                        :
                        <FlatList
                            ref={articlesRef}
                            data={articles}
                            keyExtractor={item => item.slug}
                            renderItem={renderArticle}
                            ListFooterComponent={articles.length < 20 ? null : renderFooterArticle}
                        />
                }
            </SafeAreaView>
        </ImageBackground>
    );
}
