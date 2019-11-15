import { Alert } from 'react-native'
import { FileSystem } from 'expo'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'

export type ImageType = {
  width: number,
  height: number,
  aspect: number[]
};

/**
 * Use Expo's Permission, ImagePicker, and ImageManipulator to:
 *  1) ensure permission to access the user's photo library,
 *  2) choose an image from the phone, and
 *  3) format it based on the imageType
 * @param  {ImageType} imageType a const identifying the type of image to upload
 * @return {ImageManipulator.ImageResult} the image's local uri, width, and height
 */
export async function chooseImage(imageType: ImageType): ImageManipulator.ImageResult | null {
  const {
    status: cameraRollPerm
  } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  // only if user allows permission to camera roll
  if (cameraRollPerm === 'denied') {
    Alert.alert(`You denied permission to access your photos. If you change your mind, you can update this in your phone's settings.`)
    return null;
  }


  //pick an image from the photo library
  let image= await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: imageType.aspect,
    base64: false,
    quality: 0.9
  });



  //edit the image to match the imageType's requirements
  // AND ensure the uploaded image is always JPEG
  image= await ImageManipulator.manipulateAsync(image.uri,
    [
      { resize: {
        width: image.width <= imageType.width ? image.width : imageType.width
      }},
    ],
    {
      format: ImageManipulator.SaveFormat.JPEG
    }
  );

  return image;
}
