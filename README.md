# facebook-request
Utility for requesting group lists and group feed.

## Installation

```
npm i -g https://github.com/formed-solutions/facebook-request.git
```

## Usage

```
facebook-request [options]
```

## Options

```
  -h, --help              output usage information
  -V, --version           output the version number
  -t, --token <token>     Facebook access token.
  -g, --group <groupdId>  Facebook group id.
  -d, --download [value]  Name of JSON file that will be written.
  -l, --list              List Facebook groups you subscribe to.
```

## FAQ

- How to acquire Facebook access token?
  - Navigate to [facebook for developers](https://developers.facebook.com)
  - Log in
  - Click [Tools & Support](https://developers.facebook.com/tools-and-support/) located in main navigation at top of website
  - Click on [Graph API Explorer](https://developers.facebook.com/tools/explorer/145634995501895/) under "Popular Tools" section
  - Click "Get Token" dropdown to right of "Access Token" input
  - Check the input "user_managed_groups" under "Events, Groups & Pages" section
  - Click the button that says "Get Access Token" at bottom of modal
  - Copy the token that is inside the "Access Token" input to clipboard
- What is the `--group` option for?
  - When requesting to download a group feed you will need to provide the id of the group along with your token.
- How do I find the group id?
  - By using the `-l or --list` option
  - Example: `facebook-request -t <your_token> -l`
- How to download a group feed?
  - `facebook-request -t <your_token> -g <id_of_group> -d`
  - **NOTE** You will need to be the administrator of group to do this
- Is the token option always required?
  - You will always need to provide a token when requesting a list of your facebook groups or downloading posts
  
