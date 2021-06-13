import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import header from '../../../assets/bg-pattern.jpg';

import * as SecureStore from 'expo-secure-store';
import {
    FlatList,
    ImageBackground,
    SafeAreaView,
    Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Article } from '../../../components/Article';
import { Tag } from '../../../components/Tag';
import { LoadMoreArticles } from '../../../components/LoadMoreArticles';
import { getArticlesByFeed, getArticlesByTag, getGlobalArticles, getTags } from '../../../utilities/services';

import { filterValidTags } from '../../../utilities/validations';
import { homeStyles } from './styles/homeStyles';

export function HomeScreen() {
    const articlesRef = useRef();
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState(0)
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('global');

    useFocusEffect(
        React.useCallback(() => {
            const getArticles = async () => {
                try {
                    const token = await SecureStore.getItemAsync('token');
                    const settings = {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    }
                    switch (tag) {
                        case 'global':
                            const globalArticles = await getGlobalArticles(pagination);
                            setArticles(globalArticles.articles)
                            break;
                        case 'feed':
                            const articlesByFeed = await getArticlesByFeed(pagination, settings)
                            setArticles(articlesByFeed.articles)
                            break;
                        case tag:
                            const articlesByTag = await getArticlesByTag(pagination, tag);
                            setArticles(articlesByTag.articles)
                            break;
                        default:
                            const { data } = await getGlobalArticles(pagination);
                            setArticles(data.articles)
                            break;
                    }
                } catch (error) {
                    console.error(error)
                }
            }
            getArticles()
        }, [tag, pagination])
    )

    useFocusEffect(
        React.useCallback(() => {
            const request = async () => {
                const response = await getTags();
                const newTags = filterValidTags(response.tags);
                setTags(newTags)
            }
            request()
        }, [])
    )

    const renderArticle = ({ item }) => <Article article={item} />

    const renderTag = ({ item }) => <Tag tag={item} setTag={setTag} setPagination={setPagination} />

    const renderFooterArticle = () => <LoadMoreArticles articlesRef={articlesRef} setPagination={setPagination} pagination={pagination} />

    return (
        <ImageBackground source={header} style={homeStyles.containerHome}>
            <SafeAreaView style={homeStyles.headerWrapper}>
                <Text style={homeStyles.headerTxt}>
                    {
                        !tag ? 'Global' : tag.charAt(0).toUpperCase() + tag.slice(1, tag.length)
                    }
                </Text>
            </SafeAreaView>

            <SafeAreaView>
                <FlatList
                    horizontal
                    data={tags ? tags : []}
                    keyExtractor={item => item}
                    renderItem={renderTag}
                />
            </SafeAreaView>


            <SafeAreaView style={homeStyles.wrapperArticles}>
                {
                    articles.length == 0 ?
                        <Text style={homeStyles.noArticlesTxt}>You don't have articles to see :(</Text>
                        :
                        <FlatList
                            ref={articlesRef}
                            data={articles}
                            keyExtractor={item => item.slug}
                            renderItem={renderArticle}
                            ListFooterComponent={renderFooterArticle}
                        />
                }
            </SafeAreaView>
        </ImageBackground>
    );
}
