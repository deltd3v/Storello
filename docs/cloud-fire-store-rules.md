// Default rules
//rules_version = '2'; 
//service cloud.firestore {
//  match /databases/{database}/documents {
//    match /{document=**} {
//      allow read, write: if false;
//    }
//  }
//}
 
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /boards/{document} {
    
      allow read;
      allow create: if requestMatchesUID();
      allow update: if resourceMatchesUID() && requestMatchesUID();
      allow delete: if resourceMatchesUID(); 
    }
    
    function requestMatchesUID() {
        return request.auth.uid == request.resource.data.uid;
    }

    function resourceMatchesUID() {
        return request.auth.uid == resource.data.uid;
    }
    
  }
}
