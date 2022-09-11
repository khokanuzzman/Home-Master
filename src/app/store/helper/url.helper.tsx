export interface UrlPathParameters {
    [parameterName: string]: any;
}

export const createURL = (url: string, parameters: UrlPathParameters) => {
    const placeholders = url.match(/({[a-zA-Z]*})/g);
    placeholders.forEach((placeholder: string) => {
        const key = placeholder.substr(1, placeholder.length - 2);
        const value = parameters[key];
        if (!value) {
            throw new Error(`Parameter ${key} was not provided`);
        }
        if (typeof value != 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
            throw new Error(`Value of Parameter ${key} should be either number or string or boolean`);
        }
        url = url.replace(placeholder, encodeURIComponent(value + ''));
    });
    return url;
}