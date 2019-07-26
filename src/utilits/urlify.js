export default urlify = (text) => {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return text.replace(urlRegex, function(url,b,c) {
        var urlTransform = (c == 'www.') ? 'http://' + url : url;
        return urlTransform;
    }); 
}