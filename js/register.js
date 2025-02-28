console.log("before");
document.addEventListener("DOMContentLoaded", function () {
console.log("after");
    document.getElementById("registerForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!window._config || !window._config.cognito) {
            alert("Cognito configuration is missing!");
            return;
        }

        const userPool = new AmazonCognitoIdentity.CognitoUserPool({
            UserPoolId: window._config.cognito.userPoolId,
            ClientId: window._config.cognito.userPoolClientId
        });

        userPool.signUp(email, password, [], null, function (err, result) {
            if (err) {
                alert("Registration Error: " + err.message);
                return;
            }

            alert("Registration successful! Please check your email for verification.");
            window.location.href = "login.html"; // Redirect to login page
        });
    });
});
