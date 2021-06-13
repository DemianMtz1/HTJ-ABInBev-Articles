import React, { useRef, useState } from 'react';
import header from '../../../assets/bg-pattern.jpg';

import {
    FlatList,
    ImageBackground,
    SafeAreaView,
    Text,
} from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import { Article } from '../../../components/Article';
import { LoadMoreArticles } from '../../../components/LoadMoreArticles';
import { getArticlesByAuthor } from '../../../utilities/services';

import { myArticlesStyles } from './styles/myArticlesStyles';

export function MyArticlesScreen() {
    const route = useRoute();
    const articlesRef = useRef();
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState(0)

    useFocusEffect(
        React.useCallback(() => {
            const request = async () => {
                const myArticles = await getArticlesByAuthor(route.params.username);
                setArticles(myArticles.articles);
            }
            request()
        }, [])
    )

    const renderArticle = ({ item }) => <Article article={item} />

    const renderFooterArticle = () => <LoadMoreArticles articlesRef={articlesRef} setPagination={setPagination} pagination={pagination} />

    return (
        <ImageBackground source={header} style={myArticlesStyles.containerHome}>
            <SafeAreaView style={myArticlesStyles.headerWrapper}>
                <Text style={myArticlesStyles.headerTxt}>My Articles</Text>
            </SafeAreaView>

            <SafeAreaView style={myArticlesStyles.wrapperArticles}>
                {
                    articles.length == 0 ?
                        <Text style={myArticlesStyles.noArticlesTxt}>You don't have articles to see :(</Text>
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
