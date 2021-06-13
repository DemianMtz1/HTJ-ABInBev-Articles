import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';
import {
    Button,
    Text,
    ScrollView,
    View,
    FlatList,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { Article } from '../../../components/Article';
import { Tag } from '../../../components/Tag';
import { filterValidTags } from '../../../utilities/validations';
import { homeStyles } from './styles/homeStyles';
import { LoadMoreArticles } from '../../../components/LoadMoreArticles';

export function HomeScreen({ navigation }) {
    const articlesRef = useRef();
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState(0)
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('global');


    useEffect(() => {
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
                        const globalArticles = await axios.get(`https://conduit.productionready.io/api/articles?offset=${pagination}`);
                        setArticles(globalArticles.data.articles)
                        break;
                    case 'feed':
                        const articlesByFeed = await axios.get(`https://conduit.productionready.io/api/articles/feed?offset=${pagination}`, settings)
                        setArticles(articlesByFeed.data.articles)
                        break;
                    case tag:
                        const articlesByTag = await axios.get(`https://conduit.productionready.io/api/articles?offset=${pagination}?tag=${tag}`);
                        setArticles(articlesByTag.data.articles)
                        break;
                    default:
                        const { data } = await axios.get(`https://conduit.productionready.io/api/articles?offset=${pagination}`);
                        setArticles(data.articles)
                        break;
                }
            } catch (error) {
                console.error(error)
            }
        }
        getArticles()
    }, [tag, pagination]);

    useEffect(() => {
        const getTags = async () => {
            try {
                const { data } = await axios.get('https://conduit.productionready.io/api/tags');
                const newTags = filterValidTags(data.tags);
                setTags(newTags)
            } catch (error) {
                console.error(error)
            }
        }
        getTags()
    }, [])

    const renderArticle = ({ item }) => <Article article={item} />

    const renderTag = ({ item }) => <Tag tag={item} setTag={setTag} setPagination={setPagination} />

    const renderFooterArticle = () => <LoadMoreArticles articlesRef={articlesRef} setPagination={setPagination} pagination={pagination}/>

    return (
        <View style={homeStyles.containerHome}>
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
        </View>
    );
}
