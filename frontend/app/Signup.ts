import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const userPool = new CognitoUserPool({
  UserPoolId: process.env.EXPO_PUBLIC_USER_POOL_ID || 'defaultUserPoolId', 
  ClientId: process.env.EXPO_PUBLIC_CLIENT_ID || 'defaultClientId',      
});

export const signUp = (username: string, email: string, password: string, fullName: string): Promise<string> => {
    console.log("Clicked");
    return new Promise((resolve, reject) => {
        const attributes = [
            new CognitoUserAttribute({ Name: 'email', Value: email }), 
            new CognitoUserAttribute({ Name: 'given_name', Value: username }), 
            new CognitoUserAttribute({ Name: 'family_name', Value: fullName }) 
        ];
        // Ensure username is not in email format
        if (username.includes('@')) {
            reject("Username should not be in email format.");
            return;
        }
        userPool.signUp(email, password, attributes, [], async (err, result) => {
            if (err) {
                console.error("Signup Error:", err);
                reject(err.message || JSON.stringify(err));
            } else {
                const apiUrl = process.env.EXPO_PUBLIC_API_URL
                const response = await fetch(`${apiUrl}/users`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: username,
                    full_name: fullName,
                    email: email,
                    profile_picture: "",
                    posts: [],
                    phone_number: "",
                    comments: []
                  }),
                });
                resolve('Signup successful! Check your email for the confirmation code.');
            }
        });
    });
};

export const confirmSignUp = (username: string, code: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: username, Pool: userPool });
    console.log(user)
    console.log(code)
    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err.message || JSON.stringify(err));
      } else {
        resolve('Account confirmed! You can now log in.');
      }
    });
  });
};
/**
 * Sign in user to Cognito
 */
export const signIn = (email: string, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    user.authenticateUser(authDetails, {
      onSuccess: (session: CognitoUserSession) => {
        resolve(session.getIdToken().getJwtToken()); // Return JWT Token
      },
      onFailure: (err) => {
        reject(err.message || JSON.stringify(err));
      },
    });
  });
};
/**
 * Sign out user from Cognito
 */
export const signOut = (email: string): void => {
  const user = new CognitoUser({
    Username: email,
    Pool: userPool,
  });
  user.signOut();
};