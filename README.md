# Mobile-carriers
Mobile Carrier Database

## How to contribute to this repo

- Adding mobile carrier prefixes must come in the following format
          `{
            "Ghana": {
            "networks":{
                 "MTN": {
                    "prefixes": ["054", "059"]
                },
                "Vodafone": {
                    "prefixes": ["020"]
            } },`

- Each country already has prefixes for each mobile network. E.g based on the example above a full Ghana phone number with it's international dialing code is +233(0)549115753 is a valid phone number
-  After adding the country and prefixes for a network, send a pull request. The pull request should answer the following questions
-  Did you verify each number prefix added?
-  Did you run your contribution through a json linter
-  What sources did you crossreference with, share the links
- We will review your pull request and let you know when we merge it.
- For accuracy, we will only accept your PR if you live in or in the neigboring country where you submitted this from. If someone living in Kenya submits prefixes for Nigeria, the PR is likely going to get rejected.
   
