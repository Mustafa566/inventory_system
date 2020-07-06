import Firebase from 'firebase'
import 'firebase/firestore'

 let config = {
    apiKey: "AIzaSyCPCFCRFx290_AAmWG1yipw94JRw_8IRNY",
    authDomain: "inventoryapp-c1092.firebaseapp.com",
    databaseURL: "https://inventoryapp-c1092.firebaseio.com",
    projectId: "inventoryapp-c1092",
    storageBucket: "inventoryapp-c1092.appspot.com",
    messagingSenderId: "751253207926",
    appId: "1:751253207926:web:7db883d69a9a02d2b59857"
  };
  
let app = Firebase.initializeApp(config)
export const db = app.database()