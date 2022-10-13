import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import LoopIcon from "@mui/icons-material/Loop";

import useSelectFile from "../../hooks/useSelectFile";
import { auth, firestore, storage } from "../../firebase/firebase";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
};

type PostModalProps = {
  open: boolean;
  setOpen: any;
};

const PostModal: React.FC<PostModalProps> = ({ open, setOpen }) => {
  const [user] = useAuthState(auth);
  const { selectedFile, setSelectedFile, onSelectedFile } = useSelectFile();
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateCommunity = async () => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(firestore, "posts"), {
        userId: user?.uid,
        username: user?.displayName,
        caption: caption,
        profileImage: user?.photoURL,
        company: user?.email,
        timestamp: serverTimestamp() as Timestamp,
      });

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(imageRef, selectedFile as string, "data_url").then(
          async (snapshot) => {
            const downloadUrl = await getDownloadURL(imageRef);
            await updateDoc(doc(firestore, "posts", docRef.id), {
              image: downloadUrl,
            });
          }
        );
      } else {
        console.log("No Image");
      }
    } catch (error) {
      console.log(error);
    }
    setSelectedFile("");
    setCaption("");
    setLoading(false);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-md">
          <div>
            <div
              className="inline-block 
            rounded-lg px-0 pt-5 pb-0
            text-left overflow-hidden 
            shadow-xl transform transition-all sm:my-0 
            sm:align-middle sm:w-full sm:p-8"
            >
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    className="w-full object-contain cursor-pointer"
                    onClick={() => setSelectedFile("")}
                    alt=""
                  />
                ) : (
                  <div
                    className="mx-auto flex items-center justify-center h-12
                w-12 rounded-full bg-red-100 cursor-pointer"
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    <CameraAltIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    {!selectedFile && (
                      <Typography className="text-lg leading-6 font-medium text-green-900">
                        Upload a Photo
                      </Typography>
                    )}
                    <div>
                      <input
                        ref={selectedFileRef}
                        type="file"
                        hidden
                        onChange={onSelectedFile}
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        className="border-none focus:ring-0  w-full 
                      text-center"
                        type="text"
                        value={caption}
                        placeholder="Please Enter a Caption..."
                        onChange={(e) => setCaption(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  {loading ? (
                    <button
                      type="button"
                      disabled={loading}
                      className="inline-flex justify-center w-full rounded-md 
                border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base
                font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-blue-400
                disabled:cursor-not-allowed hover:disabled:bg-blue-500"
                    >
                      <LoopIcon className="animate-spin" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!selectedFile}
                      className="inline-flex justify-center w-full rounded-md 
                border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base
                font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                      onClick={handleCreateCommunity}
                    >
                      Post
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default PostModal;
