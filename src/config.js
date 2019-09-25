export default {
  //apiUrl: 'http://joeylin.net/api/',
};
const siteConfig = {
  siteName: 'TRIÂNGULO',
  siteIcon: 'ion-ios-arrow-forward',
  footerText: 'TRIÂNGULO ®',
};

const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault',
};
const language = 'english';
const AlgoliaSearchConfig = {
  appId: '',
  apiKey: '',
};
const Auth0Config = {
  domain: '',
  clientID: '', 
  options: {
    auth: {
      autoParseHash: true,
      redirect: false,
    },
    languageDictionary: {
      title: 'joeylin.net',
      emailInputPlaceholder: '',
      passwordInputPlaceholder: '',
    },
    icon: '',
    theme: {
      labeledSubmitButton: true,
      logo: 'https://s3.amazonaws.com/redqteam.com/logo/isomorphic.png',
      primaryColor: '#E14615',
      authButtons: {
        connectionName: {
          displayName: 'Log In',
          primaryColor: '#b7b7b7',
          foregroundColor: '#000000',
          icon: undefined,
        },
      },
    },
  },
};

const firebaseConfig = {
  apiKey: "AIzaSyD3GboHouKSnsFu3kikq6fHi-Oaz1DnOUM",
  authDomain: "react-auth-firebase-91602.firebaseapp.com",
  databaseURL: "https://react-auth-firebase-91602.firebaseio.com",
  projectId: "react-auth-firebase-91602",
  storageBucket: "",
  messagingSenderId: "702704441072",
  appId: "1:702704441072:web:280806a5779c34cc"
};


// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   databaseURL: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: ""
// };
const googleConfig = {
  apiKey: '', //
};
const mapboxConfig = {
  tileLayer: '',
  maxZoom: '',
  defaultZoom: '',
  center: [],
};
const youtubeSearchApi = '';
export {
  siteConfig,
  themeConfig,
  language,
  AlgoliaSearchConfig,
  Auth0Config,
  firebaseConfig,
  googleConfig,
  mapboxConfig,
  youtubeSearchApi,
};
