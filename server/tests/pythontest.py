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

    post_response_json = post_response.text
    print(post_response_json)

def testDelete(idd):
    url = f"http://localhost:3001/users/{idd}"
    response = requests.delete(url)
    print(response.text)

testRegister()
#testDelete(input())
