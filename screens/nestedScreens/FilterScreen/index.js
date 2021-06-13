import React, { useEffect, useState } from 'react';
import header from '../../../assets/bg-pattern.jpg';
import {
    FlatList,
    ImageBackground,
    SafeAreaView,
    Text,
    TextInput
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Article } from '../../../components/Article';
import { getGlobalArticles } from '../../../utilities/services';

import { filterStyles } from './styles/filterStyles';
import { globalStyles } from '../../../styles/globalStyles';

export function FilterScreen() {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState()
    const [titleArticle, setTitleArticle] = useState('');
    useFocusEffect(
        React.useCallback(() => {
            const request = async () => {
                const myArticles = await getGlobalArticles(0);
                setArticles(myArticles.articles);
            }
            request()
        }, [])
    )
    useEffect(() => {
        const getFilteredArticles = () => {
            const titleRegex = RegExp(titleArticle, 'gi');
            setFilteredArticles(articles.filter(article=> titleRegex.test(article.title)))
        }
        getFilteredArticles()
    }, [titleArticle]);
    
    const renderArticle = ({ item }) => <Article article={item} />
    const handleChangeFilter = title => setTitleArticle(title)
    return (
        <ImageBackground source={header} style={filterStyles.containerHome}>
            <SafeAreaView style={filterStyles.headerWrapper}>
                <Text style={filterStyles.headerTxt}>Filter your article by title</Text>
                <TextInput
                    placeholder='Find an article'
                    style={globalStyles.generalInput}
                    onChangeText={handleChangeFilter}
                />
            </SafeAreaView>

            <SafeAreaView style={filterStyles.wrapperArticles}>
                {
                    articles.length == 0 ?
                        <Text style={filterStyles.noArticlesTxt}>You don't have articles to see :(</Text>
                        :
                        <FlatList
                            data={filteredArticles}
                            keyExtractor={item => item.slug}
                            renderItem={renderArticle}
                        />
                }
            </SafeAreaView>
        </ImageBackground>
    );
}
