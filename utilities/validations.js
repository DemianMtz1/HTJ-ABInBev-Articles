import { Alert } from 'react-native'

export function showAlertSignIn(email, password) {
    if (!email || !password) {
        Alert.alert('Required Fields', 'Required fields are missing, validate and continue');
        return;
    }
}

export function showAlertSignUp(username, email, password, repeatedPassword) {
    if (!email || !password || !repeatedPassword || !username) {
        Alert.alert('Required Fields', 'Required fields are missing, validate and continue');
        return;
    }
}

export function showAlertCreateArticle(title, description, body, tagList) {
    if (!title || !description || !body || tagList.length === 0) {
        Alert.alert('Required Fields', 'Required fields are missing, validate and continue');
        return null;
    }
}

export function showAlertUpdate() {
    Alert.alert('Empty fields', 'Empty fields, please validate and continue.');
}

export function showAlertComment() {
    Alert.alert('No content in comment', 'Write something to add you to the discussion');
}

export function validateEmptyValues(value) {
    if (!value) {
        return true
    }
    else {
        return false
    }
}

export function validateEmailFormat(email) {
    const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    if (emailRegex.test(email)) {
        return true;
    }
    return false;
}

export function filterValidTags(tags) {
    const regExp = new RegExp(/[a-z]/gi)
    const filteredTags = tags.filter(tag => regExp.test(tag))
    filteredTags.unshift('global', 'feed');
    return filteredTags
}