import axios from 'axios';
import { storage } from '../config/firebase-config';

export const uploadImage = (image, folder, cb) => {
  if (process.env.NODE_ENV === 'development') {
    folder = `development/${folder}`;
  } else {
    folder = `production/${folder}`;
  }

  let currentImageName = 'firebase-image-' + Date.now();

  const config = {
    headers: {
      'Context-Type': 'application/json'
    }
  };

  try {
    let uploadImage = storage.ref(`${folder}/${currentImageName}`).put(image);

    uploadImage.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        throw error;
      },
      () => {
        storage
          .ref(folder)
          .child(currentImageName)
          .getDownloadURL()
          .then(async (url) => {
            // store image object in the database
            let imageObj = {
              imageName: currentImageName,
              imageUrl: url
            };

            let res = await axios.post('/api/image', imageObj, config);

            cb(url, res.data.image._id);
          });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
