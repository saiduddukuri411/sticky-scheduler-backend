import jwt from 'jsonwebtoken';
const getUserId = ( request, secretKey ) => {
    const header = request.request.headers.authorization;
    if( !header ){
        throw new Error( "invalid token" );
    }
    const token = header.replace( "Bearer ", "");
    const decoded = jwt.verify( token, secretKey );
    return decoded.userId;
}
export default getUserId;