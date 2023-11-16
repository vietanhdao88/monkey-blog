import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export function useFireBase(setValue, getValues, imageName = null, cb = null) {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        // console.log("Upload is " + progressPercent + "% done");
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        //   default:
        //     console.log("default");
        // }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };

  const handleDeleteImage = () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      "images/" + (imageName || getValues("image_name"))
    );

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log("successfully delete");
        setImage("");
        setProgress(0);
        cb && cb();
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };
  const handleResetUpload = () => {
    setImage("");
    setProgress(0);
  };
  return {
    handleDeleteImage,
    image,
    setImage,
    progress,
    handleSelectImage,
    handleResetUpload,
  };
}
