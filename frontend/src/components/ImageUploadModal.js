import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import Cropper from "cropperjs";
import { useSelector } from "react-redux";
import axios from "axios";
const ImageUploadModal = ({ cover }) => {
  let cropper;
  let image;
  const [show, setShow] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);

  let aspectRatio = cover ? 16 / 9 : 1 / 1;

  const handleShow = () => setShow(true);

  const handleImagePreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (cover) {
          image = document.getElementById("coverPreview");
        } else {
          image = document.getElementById("imagePreview");
        }
        image.src = e.target.result;

        cropper = new Cropper(image, {
          aspectRatio,
          background: false,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const profilePhotoHandler = () => {
    let canvas = cropper.getCroppedCanvas();
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("croppedImage", blob);
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post(
          `/api/uploads/${cover ? "coverPicture" : "profilePicture"}`,
          formData,
          config
        );
        const userInfoFromLocal = JSON.parse(localStorage.getItem("userInfo"));
        if (cover) {
          userInfoFromLocal.user.coverPic = data;
        } else {
          userInfoFromLocal.user.profilPic = data;
        }
        localStorage.setItem("userInfo", JSON.stringify(userInfoFromLocal));
        setShow(false);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <FaCamera
        className={cover ? "coverPhotoButton" : "profilePictureButton"}
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {cover
              ? "Upload a new cover photo"
              : "Upload a New Profile Picture"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cover ? (
            <>
              <input
                type="file"
                name="filePhoto"
                onChange={handleImagePreview}
              />
              <div className="coverPreviewContainer">
                <img className="coverPreview" id="coverPreview" />
              </div>
            </>
          ) : (
            <>
              <input
                type="file"
                name="filePhoto"
                onChange={handleImagePreview}
              />
              <div className="imgPreviewContainer">
                <img alt="" className="imagePreview" id="imagePreview" />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={profilePhotoHandler}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageUploadModal;
