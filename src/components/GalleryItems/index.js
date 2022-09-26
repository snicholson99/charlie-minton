import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { Modal } from "../Modal";
import "./style.css";

export const GalleryItems = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [selectedAssetImg, setSelectedAssetImg] = useState(null);
  const [selectedAssetName, setSelectedAssetName] = useState(null);
  const [galleryData, setGalleryData] = useState([]);
  let { eventId } = useParams();
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_KEY}/Gallery?api_key=${process.env.REACT_APP_AIRTABLE_API_KEY}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        const newData = data.records.filter(
          (el) => el.fields.Event.toLowerCase() === eventId
        );
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
    setSelectedAssetName(asset.fields?.Name);
  };

  const onCloseModal = () => {
    setSelectedAssetId(null);
    setSelectedAssetImg(null);
    setSelectedAssetName(null);
  };

  return (
    <div id="gallery-items" className="page">
      {isLoading && !galleryData.length && <LoadingSpinner />}
      {!isLoading && !galleryData.length && (
        <p id="empty-gallery-items-text">
          Sorry, I haven't uploaded any content for this section yet. Please
          check back later.
        </p>
      )}
      <div id="gallery-items-inner-container">
        {galleryData.map((asset) => {
          if (
            asset.fields.Show &&
            asset.fields?.Image[0]?.url &&
            asset.fields?.Name
          ) {
            return (
              <div
                key={asset.id}
                className="gallery-item"
                onClick={() => onAssetClick(asset)}
              >
                <img src={asset.fields.Image[0].url} alt={asset.fields.Name} />
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
            selectedAssetName={selectedAssetName}
            onCloseModal={onCloseModal}
          />
        )}
      </div>
    </div>
  );
};
