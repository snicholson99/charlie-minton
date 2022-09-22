import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import "./style.css";

export const Basket = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = () => {
    const assetIds = JSON.parse(sessionStorage.getItem("c_minton_basket"));
    setIsLoading(true);
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_KEY}/Gallery?api_key=${process.env.REACT_APP_AIRTABLE_API_KEY}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        const dataArr = data.records;
        const newArr = dataArr.filter((item) => {
          return assetIds?.includes(item.id);
        });
        setAssets(newArr);
      })
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.error("airtable fetch failed: ", err);
      });
  };

  const onRequestPurchaseClick = () => {
    const assetIds = JSON.parse(sessionStorage.getItem("c_minton_basket"));
    if (!name.length || !email.length) {
      return alert("Please fill in your name and email.");
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Name: name,
              "Requested Image Ids": assetIds.toString(),
              Notes: notes,
              Email: email,
              Status: "Todo",
            },
          },
        ],
      }),
    };
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_KEY}/Requests?api_key=${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(() => alert("Your request was successful!"));
  };

  const onRemoveClick = (recordId) => {
    const items = JSON.parse(sessionStorage.getItem("c_minton_basket"));
    console.log(items);
    const newItems = items.filter((item) => item !== recordId);
    sessionStorage.setItem("c_minton_basket", JSON.stringify(newItems));
    fetchResults();
    // console.log(newItems);
  };

  // console.log(assetIds);

  return (
    <div id="basket" className="page">
      {isLoading && !assets.length && <LoadingSpinner />}
      <div id="basket-items">
        {!!assets.length && <p id="basket-count">{assets.length} items</p>}
        {!assets.length && !isLoading && (
          <p id="empty-basket">Your basket is empty.</p>
        )}
        {assets?.map((asset) => (
          <div className="basket-item" key={asset.id}>
            <img src={asset.fields.Image[0].url} />
            <div className="basket-item-content">
              <p key={asset.id}>{asset.fields.Event} Photo</p>
              <button onClick={() => onRemoveClick(asset.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      {!!assets.length && (
        <div id="request-form">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Additional notes for your request (optional)"
            onChange={(e) => setNotes(e.target.value)}
          />
          <button onClick={onRequestPurchaseClick}>Request Order</button>
        </div>
      )}
    </div>
  );
};
