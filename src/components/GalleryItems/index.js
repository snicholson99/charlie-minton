import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { Modal } from "../Modal";
import "./style.css";

export const GalleryItems = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [selectedAssetImg, setSelectedAssetImg] = useState(null);
  const [galleryData, setGalleryData] = useState([]);
  let { eventId } = useParams();
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_KEY}/Gallery?api_key=${process.env.REACT_APP_AIRTABLE_API_KEY}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        const newData = data.records.filter((el) => {
          return el.fields.Event.toLowerCase() === eventId;
        });
        setGalleryData(newData.reverse());
      })
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.error("airtable fetch failed: ", err);
      });
  }, [eventId]);

  const onAssetClick = (asset) => {
    setSelectedAssetId(asset.id);
    setSelectedAssetImg(asset.fields?.Image[0]?.url);
  };

  const onCloseModal = () => {
    setSelectedAssetId(null);
    setSelectedAssetImg(null);
  };

  return (
    <>
      {isLoading && !galleryData.length && <LoadingSpinner />}
      <div id="gallery-items" className="page">
        {galleryData.map((asset) => {
          if (asset.fields.Show && asset.fields?.Image) {
            return (
              <div
                key={asset.id}
                className="gallery-item"
                onClick={() => onAssetClick(asset)}
              >
                <img
                  src={asset.fields?.Image[0]?.url}
                  alt={asset.fields.Name ? asset.fields.Name : "photo"}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
        {!!selectedAssetId && (
          <Modal
            selectedAssetId={selectedAssetId}
            selectedAssetImg={selectedAssetImg}
            onCloseModal={onCloseModal}
          />
        )}
      </div>
    </>
  );
};
