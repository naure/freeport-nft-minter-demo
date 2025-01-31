import bs58 from 'bs58';
import { useState } from "react";
import { attach } from "./utils/attach.js";

export default (_) => {
  const [tx, setTx] = useState(null);
  const [nftId, setNftId] = useState(1);
  const [cid, setCid] = useState("Qmddp2ATX5aGrvsCSaQDuXmgmH7U5JeSmYXYrJ3StYWq1n");
  const [cidError, setCidError] = useState("");

  const onNftIdInput = e => setNftId(e.target.value);
  const onCidInput = e => {
  	try {
  		const bytes = getBytes32FromIpfsHash(e.target.value);
	  	setCid(e.target.value);
  	} catch (err) {
  		setCidError(err.toString());
  	}
  };
  const submitAttach = async () => {
    const tx = await attach(nftId, cid);
    setTx(tx.hash);
  }
  return (
    <div className="Minter">
      <h2> Attach NFT to CID </h2>
      <div>
        <span> NFT ID: </span>
        <input type="number" placeholder="nftId" value={nftId} onChange={onNftIdInput}/>
      </div>
      <div>
        <span> Content ID: </span>
        <input placeholder="Content ID" value={cid} onChange={onCidInput}/>
        <span style={{color:"red"}}>{cidError}</span>
      </div>
      <button onClick={submitAttach}> Attach </button>
      { tx ? <TxLink tx={tx}/> : ""}
    </div>
  );
};

const TxLink = ({tx}) => (
  <a
    href={`https://mumbai.polygonscan.com/tx/${tx}`}
    target={"polyscanner"}>
    Transaction Link
  </a>
);
const getBytes32FromIpfsHash = (ipfsListing) =>
   "0x"+bs58.decode(ipfsListing).slice(2).toString('hex');

