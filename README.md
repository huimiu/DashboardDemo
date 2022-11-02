# Prerequisites

- [NodeJS](https://nodejs.org/en/)
- An M365 account. If you do not have M365 account, apply one from [M365 developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program)
- [Teams Toolkit Visual Studio Code Extension](https://aka.ms/teams-toolkit) version after 1.55 or [TeamsFx CLI](https://aka.ms/teamsfx-cli)

# Try the Sample

1. Clone the repo to your local workspace or directly download the source code.
1. Download [Visual Studio Code](https://code.visualstudio.com) and install 'Teams Toolkit' extension.
1. Open the project in Visual Studio Code.
1. Open a new terminal, and enter `tabs` folder, then execute `npm i --legacy-peer-deps`.
1. Press `F5` to open a browser window.

> If prompted that you cannot authorize access to calendar, tasks and files, please use onmicrosoft's M365 account.

# Known Issues

- If there is a token error in page rendering, please try to refresh the page, it may be a problem of silent login.
- Component has not loading animation yet.
