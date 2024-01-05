import requests

def testRegister():
    data = {
        "username": "one",
        "firstname": "Heimer",
        "lastname": "Dinger",
        "email": "little@big.mail",
        "password": "passw0rd"
    }

    url_post = "http://localhost:3001/auth/register"

    post_response = requests.post(url_post, json=data)

    print("register:", post_response.json())

def testDelete(idd, cookies=None):
    session = requests.session()
    if cookies:
        session.cookies.update(cookies)

    url = f"http://localhost:3001/users/{idd}"
    response = session.delete(url)
    print("delete:", response.json())


def testLogin():
    session = requests.session()

    data = {
        "username": "one",
        "password": "passw0rd"
    }

    url_post = "http://localhost:3001/auth/login"

    post_response = session.post(url_post, json=data)

    post_response_json = post_response.json()
    print("login cookies:", session.cookies)
    print("login response:", post_response_json)
    return post_response_json, session.cookies

testRegister()
response, cookies = testLogin()

#testDelete(response["userID"], cookies)  # successful
#testDelete(response["userID"])  # not successful
