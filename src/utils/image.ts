import http from './http';

export const dataURItoBlob = (dataURI: string) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].includes('base64'))
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}

export const uploadImage = (dataUri: string, petType: string = 'dog') => {
  const formData = new FormData();
  formData.append('imagefile', dataURItoBlob(dataUri));
  formData.append('pet_type', petType);

  return http('/api/pets/recognize', {
    method: 'POST',
    body: formData
  });
}
