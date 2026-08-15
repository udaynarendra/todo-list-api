import crypto from 'crypto';
const generateOtp=()=>{
    return crypto.randomInt(100000,1000000);
}
const hashOtp=(otp)=>{
    return crypto.createHash('sha256').update(otp.toString()).digest('hex');
}
const generateResetToken=()=>{
    return crypto.randomBytes(32).toString('hex');
}
const hashResetToken=(token)=>{
    return crypto.createHash('sha256').update(token).digest('hex');
}
export {generateOtp,hashOtp,generateResetToken,hashResetToken};