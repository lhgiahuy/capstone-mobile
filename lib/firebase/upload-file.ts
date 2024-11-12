import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadImageToStorage(values: {
  user: any;
  imageType: "avatar" | "verifyCard";
  avatarUrl: string;
  // cardUrl: string;
}): Promise<string> {
  try {
    // Initialize Firebase storage

    // Choose folder base on img type
    const folderName =
      values.imageType === "avatar" ? "avatars" : "verifyCards";

    // Create a reference for the image with the event title as the folder name

    const storageRef = ref(
      storage,
      `users/${values.user.username}/${folderName}`
    );
    // const imageUri = values.imageType === "avatar" ? values.avatarUrl : values.cardUrl;

    const imageBlob = await fetch(values.avatarUrl).then((res) => res.blob());

    // Upload the image file
    const snapshot = await uploadBytes(storageRef, imageBlob);

    // Get the download URL
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
