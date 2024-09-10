export const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.token;
        console.log('cookieExtractor', token)
    } else {
        console.log('cookieExtractor', 'no token')
    }
    return token
}