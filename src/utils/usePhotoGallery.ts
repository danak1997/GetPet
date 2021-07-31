// import { useState, useEffect } from "react";
// import { isPlatform } from "@ionic/react";

import {
    Camera,
    CameraResultType,
    CameraSource,
    // Photo,
} from "@capacitor/camera";
// import { Filesystem, Directory } from "@capacitor/filesystem";
// import { Storage } from "@capacitor/storage";
// import { Capacitor } from "@capacitor/core";

export default function usePhotoGallery() {
    const takePhoto = async () => {
        const image = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
            quality: 100,
        });

        return image;
    };

    return {
        takePhoto,
    };
}
