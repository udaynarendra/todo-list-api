const statusCode={
    OK:200,                 //Successful get/put/patch
    CREATED:201,            //New resource Created
    NO_CONTENT:204,         //Success with no request body
    BAD_REQUEST:400,        //Invalid request
    UNAUTHORIZED:401,      //User not logged in 
    FORBIDDEN:403,         //No permission
    NOT_FOUND:404,         //Resource doesn't exist
    CONFLICT:409,          //Duplicate resource
    TOO_MANY_REQUESTS:429  //Too many requests
}
export default statusCode;