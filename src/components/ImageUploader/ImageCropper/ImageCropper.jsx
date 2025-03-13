import { IconButton, Slider, Tooltip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import ZoomOutRoundedIcon from "@mui/icons-material/ZoomOutRounded";
import RotateLeftRoundedIcon from "@mui/icons-material/Rotate90DegreesCcwRounded";
import RotateRightRoundedIcon from "@mui/icons-material/Rotate90DegreesCwRounded";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import PropTypes from "prop-types";
import "./ImageCropper.scss";

const ImageCropper = ({
  uploadedImage,
  setImageProperties,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setImageProperties((prevVal) => {
      if (
        prevVal.zoom !== zoom ||
        prevVal.rotation !== rotation ||
        prevVal.croppedAreaPixels !== croppedAreaPixels
      ) {
        return { zoom, rotation, croppedAreaPixels };
      }
      return prevVal;
    });
  }, [croppedAreaPixels, rotation, zoom]);

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleZoomChange = (value) => {
    setZoom(value);
  };

  const handleZoomClick = (mode) => {
    if (mode === "zoomin") {
      setZoom((prev) => {
        if (prev >= 3) return prev;
        return prev + 0.1;
      });
    } else {
      setZoom((prev) => {
        if (prev <= 1) return prev;
        return prev - 0.1;
      });
    }
  };

  const handleRotationChange = (direction) => {
    if (rotation >= 360 || rotation <= -360) setRotation(0);
    if (direction === "left") setRotation((prev) => prev - 90);
    else setRotation((prev) => prev + 90);
  };

  return (
    <>
      <div className="crop-container">
        <Cropper
          image={uploadedImage}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
        />
        <div className="move-btn">
          <OpenWithIcon /> <label htmlFor="none">Move</label>
        </div>
      </div>
      <div className="flex gap-4 control-container">
        <div className="flex gap-2 items-center">
          <Tooltip title="Zoom Out">
            <IconButton
              onClick={(e) => handleZoomClick("zoomout")}
              sx={{ outline: "none" }}
            >
              <ZoomOutRoundedIcon className="control-icon" />
            </IconButton>
          </Tooltip>
          <label htmlFor="none" className="label-text">
            <p>Zoom</p>
          </label>
          <Tooltip title="Zoom In">
            <IconButton onClick={() => handleZoomClick("zoomin")}>
              <ZoomInRoundedIcon className="control-icon" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="zoom-slider">
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, value) => handleZoomChange(value)}
            title="Slide to zoom in or out"
          />
        </div>

        <div className="flex gap-2 items-center">
          <Tooltip title="Rotate Left">
            <IconButton onClick={() => handleRotationChange("left")}>
              <RotateLeftRoundedIcon className="control-icon" />
            </IconButton>
          </Tooltip>
          <label className="label-text">
            <p>Rotate</p>
          </label>
          <Tooltip title="Rotate Right">
            <IconButton onClick={() => handleRotationChange("right")}>
              <RotateRightRoundedIcon className="control-icon" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

ImageCropper.propTypes = {
  uploadedImage:PropTypes.string,
  setImageProperties: PropTypes.func,
}

export default ImageCropper;
