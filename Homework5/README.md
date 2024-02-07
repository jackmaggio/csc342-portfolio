# Homework 5 Link to Files:

## [login.html](https://github.ncsu.edu/engr-csc342/csc342-2023Fall-jcmaggio/blob/master/Homework5/templates/login.html)
## [home.html](https://github.ncsu.edu/engr-csc342/csc342-2023Fall-jcmaggio/blob/master/Homework5/templates/home.html)

# Reflection

A challenge I had when creating the JWT tokens was recomputing the signature of the token when validating it. To do this, I had to parse the token by the period and then rebuild the header and payload to recompute the signature and validate that it was correct. To my knowledge, there are no security risks in my program. The user data is santized so if a cookie was decrypted then a malicious user would have their username but nothing more.