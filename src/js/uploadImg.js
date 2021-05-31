import firebase from 'firebase';
export default async function onUpload(imageData) {
    var urlImg = ''

    const storageRef = firebase.storage().ref(`${imageData.name}`).put(imageData);
    urlImg = await storageRef.snapshot.ref.getDownloadURL()
    return urlImg
}