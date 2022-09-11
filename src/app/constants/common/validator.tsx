import { notificationFn } from "../../core/notification/notification";

const MOBILE_REGEX = new RegExp(/^(?:(\+88)?01[3456789][0-9]{8}|)$/);
const NAME_REGEX = new RegExp(/^\s*([A-Za-z]{1,}([\.,] |[-']| ?))+[A-Za-z]+\.?\s*$/);
const EMAIL_REGEX = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

export const validatePhoneFn = (phone: string) => {
    return MOBILE_REGEX.test(phone);
};

export const validateNameFn = (name: string) => {
    return NAME_REGEX.test(name);
};

export const validateEmailFn = (email: string) => {
    if (!email) return true;
    return EMAIL_REGEX.test(email);
};

export const removeEmojis = (string) => {
    const emojiRegex = require('emoji-regex');
    const regex = emojiRegex();
    if (string.match(regex)) {
        notificationFn('Does not support Emoji!');
    }
    return string.replace(regex, '');
};