import React from 'react'
import { View, Text, Button, Image } from 'react-native';
import {ImageType, chooseImage} from './PickImage'



export type PickedImage = {
  uri: string,
  width: number,
  height: number
};


const initialData={ imageUri: 'https://www.nbcsports.com/northwest/sites/csnnw/files/styles/article_hero_image/public/2019/08/31/083019-wilson.jpg?itok=1h0Y03xn'};

export default function ExamplePickImage({
  name= 'Luke',
}: AccountProps) {

  //
  const [image, setImage]= React.useState(initialData.imageUri);


  /*
    choose an image from the camera and edit it to fit the
    requirements of an Avatar.
   */
  const pickAndUploadImage = async () => {

    //define the avatar type
    const AVATAR_TYPE: ImageType= {
      width: 600,
      height: 600,
      aspect: [1,1]
    };

    //call the picker and get back the chosen, edited image
    let newImage: PickedImage= await chooseImage(AVATAR_TYPE);
    if(newImage){
      setImage(newImage.uri);
    }

  }


  return (
    <View>
      <Text>Example Image Picker</Text>
      {image && <Image
        style={{width: 300, height: 300}}
        source={{uri: image}}
      />}
      <Button onPress={pickAndUploadImage} title="Choose a New Avatar" />
    </View>
  )
}
