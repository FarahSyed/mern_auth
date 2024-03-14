const cookieExpiry = new Date(Date.now() + 3600000); //  Generate 1 hour expiry for cookie

export const cookieOptions = {
    httpOnly: true,
    expires: cookieExpiry
}

export const toCamelCase = (user) => {
    const { user_name, profile_picture, ...rest } = user;

    const newObj = { 
        ...rest,
        userName: user_name,
        profilePicture: profile_picture,
    };
    
    return newObj;
};