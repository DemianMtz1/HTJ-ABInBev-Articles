import axios from "axios";
import * as SecureStore from 'expo-secure-store';

// URLS
const HOST = 'https://conduit.productionready.io/api';
export const favoritedArticlesByUser = (username) => `${HOST}/articles?favorited=${username}`;
export const publishedArticlesByUser = (username) => `${HOST}/articles?author=${username}`;
export const currentUserURL = 'https://conduit.productionready.io/api/user';
export const postArticlesURL = 'https://conduit.productionready.io/api/articles';

// Methods
export const getToken = async () => await SecureStore.getItemAsync('token');

export const getFavArticlesLengthByUser = async (username) => {
    try {
        const { data } = await axios.get(favoritedArticlesByUser(username));
        return data.articlesCount
    } catch (error) {
        console.error(error)
    }
}

export const getArticlesLengthByAuthor = async (author) => {
    try {
        const { data } = await axios.get(publishedArticlesByUser(author));
        return data.articlesCount
    } catch (error) {
        console.error(error)
    }
}

export const getSessionUserInfo = async () => {
    try {
        const token = await getToken();
        const options = {
            headers: {
                Authorization: `Token ${token}`
            }
        }
        const { data } = await axios.get(currentUserURL, options);
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const postArticle = async (token, article) => {
    try {
        const options = {
            headers: {
                Authorization: `Token ${token}`
            }
        }
        const { data } = await axios.post(postArticlesURL, { article }, options);
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const putUserInfo = async (token, userData) => {
    try {
        const options = {
            headers: {
                Authorization: `Token ${token}`
            }
        }
        const { data } = await axios.put(currentUserURL, userData, options);
        return data;
    } catch (error) {
        console.error(error)
    }
}