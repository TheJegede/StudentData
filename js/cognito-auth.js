/*global StudentData, _config, AmazonCognitoIdentity */

var StudentData = window.StudentData || {};

(function scopeWrapper($) {
    var signinUrl = '/signin.html';

    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };

    var userPool;

    if (!(_config.cognito.userPoolId &&
          _config.cognito.userPoolClientId &&
          _config.cognito.region)) {
        $('#noCognitoMessage').show();
        return;
    }

    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    StudentData.signOut = function signOut() {
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser) {
            cognitoUser.signOut();
        }
    };

    StudentData.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
            cognitoUser.getSession(function sessionCallback(err, session) {
                if (err) {
                    reject(err);
                } else if (!session.isValid()) {
                    resolve(null);
                } else {
                    resolve(session.getIdToken().getJwtToken());
                }
            });
        } else {
            resolve(null);
        }
    });

    /*
     * Cognito User Pool Registration Function
     */
    function register(email, password, onSuccess, onFailure) {
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'email',
            Value: email
        });

        userPool.signUp(email, password, [attributeEmail], null, function signUpCallback(err, result) {
            if (!err) {
                onSuccess(result);
            } else {
                onFailure(err);
            }
        });
    }

    StudentData.register = register;

})(jQuery);
