# Try the Sample

1. Clone the repo to your local workspace or directly download the source code.
2. Download [Visual Studio Code](https://code.visualstudio.com) and install 'Teams Toolkit' extension.
3. Open the project in Visual Studio Code.
4. Open a new terminal, and enter `tabs` folder, then execute `npm i --legacy-peer-deps`.
5. Press `F5` to open a browser window.

> If prompted that you cannot authorize access to calendar, tasks and files, please use onmicrosoft's M365 account.

# Add a new Graph API call

1. Add consent scope first.
2. Create a graph client by adding the scope related to the Graph API you want to call.
3. Call the Graph API, and parse the response into a certain model, which will be used by front-end.

# Known Issues

- If there is a token error in page rendering, please try to refresh the page, it may be a problem of silent login.
- Component has not loading animation yet.
