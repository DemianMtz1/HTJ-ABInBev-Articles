import axios from "axios";
import * as SecureStore from 'expo-secure-store';

// URLS
const HOST = 'https://conduit.productionready.io/api';


export const globalArticlesURL = (pagination) => `${HOST}/articles?offset=${pagination}`;
export const articlesByFeedURL = (pagination) => `${HOST}/articles/feed?offset=${pagination}`;
export const articlesByTagURL = (pagination, tag) => `${HOST}/articles?offset=${pagination}?tag=${tag}`;
export const favoritedArticlesByUser = (username) => `${HOST}/articles?favorited=${username}`;
export const publishedArticlesByUser = (username) => `${HOST}/articles?author=${username}`;
export const articleBySlug = (slug) => `${HOST}/articles/${slug}`;
export const commentsBySlugURL = (slug) => `${HOST}/articles/${slug}/comments`
export const favoritedArticleURL = slug => `${HOST}/articles/${slug}/favorite`
export const deleteCommentById = (slug, id) => `${HOST}/articles/${slug}/comments/${id}`
export const currentUserURL = `${HOST}/user`;
export const postArticlesURL = `${HOST}/articles`;
export const tagsURL = `${HOST}/tags`
export const userRegister = `${HOST}/users`
export const loginURL = `${HOST}/users/login`

// Methods
export const getToken = async () => await SecureStore.getItemAsync('token');

export const getGlobalArticles = async (pagination) => {
    try {
        const { data } = await axios.get(globalArticlesURL(pagination));
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getArticlesByFeed = async (pagination, settings) => {
    try {
        const { data } = await axios.get(articlesByFeedURL(pagination), settings);
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getArticlesByTag = async (pagination, tag) => {
    try {
        const { data } = await axios.get(articlesByTagURL(pagination, tag));
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getFavArticlesLengthByUser = async (username) => {
    try {
        const { data } = await axios.get(favoritedArticlesByUser(username));
        return data.articlesCount
    } catch (error) {
        console.error(error)
    }
}

export const getTags = async () => {
    try {
        const { data } = await axios.get(tagsURL);
        return data;
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

export const getArticlesByAuthor = async (author) => {
    try {
        const { data } = await axios.get(publishedArticlesByUser(author));
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getArticle = async (slug) => {
    try {
        const { data } = await axios.get(articleBySlug(slug));
        return data
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


export const getComments = async (slug) => {
    try {
        const { data } = await axios.get(commentsBySlugURL(slug));
        return data
    } catch (error) {
        console.error(error)
    }
}

export const postComment = async (token, slug, body) => {
    try {
        const options = {
            headers: {
                Authorization: `Token ${token}`
            }
        }
        const { data } = await axios.post(commentsBySlugURL(slug), body, options);
        return data
    } catch (error) {
        console.error(error)
    }
}

export const deleteComment = async (token, slug, id) => {
    try {
        const options = {
            headers: {
                Authorization: `Token ${token}`
            }
        }
        const { data } = await axios.delete(deleteCommentById(slug, id), options);
        return data
    } catch (error) {
        console.error(error)
    }
}

export const deleteArticle = async (token, slug) => {
    try {
        const options = {
            headers: {
                Authorization: `Token ${token}`
            }
        }
        const { data } = await axios.delete(articleBySlug(slug), options);
        return data
    } catch (error) {
        console.error(error)
    }
}

export const postFavoritedArticle = async (token, slug) => {
    try {
        const options = {
            headers: {
                Authorization: `Token ${token}`
            }
        }
        const { data } = await axios.post(favoritedArticleURL(slug), null, options);
        return data
    } catch (error) {
        console.error(error)
    }
}

export const deleteFavoritedArticle = async (token, slug) => {
    try {
        const options = {
            headers: {
                Authorization: `Token ${token}`
            }
        }
        const { data } = await axios.delete(favoritedArticleURL(slug), options);
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getIsFavoriteArticle = async (slug) => {
    try {
        const options = {
            headers: {
                Authorization: `Token ${await getToken()}`
            }
        }
        const { data } = await axios.get(articleBySlug(slug), options);
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getFavoriteArticles = async (username) => {
    try {
        const { data } = await axios.get(favoritedArticlesByUser(username));
        return data
    } catch (error) {
        console.error(error)
    }
}

export const putArticle = async (token, slug, article) => {
    try {
        const options = {
            headers: {
                Authorization: `Token ${token}`
            }
        }
        const { data } = await axios.put(articleBySlug(slug), { article }, options);
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const postUser = async (user) => {
    try {
        let options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(userRegister, { user }, options);
        return data
    } catch (error) {
        console.log(error.response.data.errors)
    }
}

export const postLogin = async (user) => {
    try {
        let options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(loginURL, { user }, options);
        return data
    } catch (error) {
        console.log(error.response.data.errors)
    }
}